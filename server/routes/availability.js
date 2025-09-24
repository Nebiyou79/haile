const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability');
const { sendConfirmationEmail, sendAdminNotification } = require('../utils/emailService');

// Get available time slots for a specific date
router.get('/availability', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const selectedDate = new Date(date);
    const availability = await Availability.findOne({ 
      date: { 
        $gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
        $lt: new Date(selectedDate.setHours(23, 59, 59, 999))
      }
    });

    if (!availability) {
      return res.json([]);
    }

    // Filter available slots
    const availableSlots = availability.slots.filter(slot => 
      slot.available && slot.bookedCount < slot.maxCapacity
    );

    res.json(availableSlots);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, appointmentType, date, timeSlot, notes } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service || !appointmentType || !date || !timeSlot) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if slot is still available
    const selectedDate = new Date(date);
    const availability = await Availability.findOne({
      date: {
        $gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
        $lt: new Date(selectedDate.setHours(23, 59, 59, 999))
      }
    });

    if (!availability) {
      return res.status(400).json({ error: 'No availability for selected date' });
    }

    const slot = availability.slots.find(s => 
      s.startTime === timeSlot.startTime && 
      s.endTime === timeSlot.endTime
    );

    if (!slot || !slot.available || slot.bookedCount >= slot.maxCapacity) {
      return res.status(400).json({ error: 'Selected time slot is no longer available' });
    }

    // Create appointment
    const appointment = new Appointment({
      name,
      email,
      phone,
      service,
      appointmentType,
      date: selectedDate,
      timeSlot,
      notes
    });

    await appointment.save();

    // Update availability
    slot.bookedCount += 1;
    if (slot.bookedCount >= slot.maxCapacity) {
      slot.available = false;
    }
    await availability.save();

    // Send emails (async - don't wait for response)
    Promise.all([
      sendConfirmationEmail(appointment),
      sendAdminNotification(appointment)
    ]).catch(console.error);

    res.status(201).json({ 
      success: true, 
      message: 'Appointment booked successfully',
      appointment 
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// Get all appointments (for admin)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ date: 1, 'timeSlot.startTime': 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

module.exports = router;