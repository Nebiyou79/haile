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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
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

    // Send emails with improved error handling
    try {
      await Promise.all([
        sendConfirmationEmail(appointment),
        sendAdminNotification(appointment)
      ]);
      console.log('All emails sent successfully for appointment:', appointment._id);
    } catch (emailError) {
      // Log email errors but don't fail the appointment creation
      console.error('Email sending failed for appointment:', appointment._id, emailError);
      // Implement retry mechanism or queue for failed emails
    }

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
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};
    
    const appointments = await Appointment.find(query)
      .sort({ date: 1, 'timeSlot.startTime': 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Appointment.countDocuments(query);
    
    res.json({
      appointments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
});

// Update appointment status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['scheduled', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json({ success: true, appointment });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ error: 'Failed to update appointment status' });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    // Free up the time slot
    const appointmentDate = new Date(appointment.date);
    const availability = await Availability.findOne({
      date: {
        $gte: new Date(appointmentDate.setHours(0, 0, 0, 0)),
        $lt: new Date(appointmentDate.setHours(23, 59, 59, 999))
      }
    });
    
    if (availability) {
      const slot = availability.slots.find(s => 
        s.startTime === appointment.timeSlot.startTime && 
        s.endTime === appointment.timeSlot.endTime
      );
      
      if (slot) {
        slot.bookedCount = Math.max(0, slot.bookedCount - 1);
        if (slot.bookedCount < slot.maxCapacity) {
          slot.available = true;
        }
        await availability.save();
      }
    }
    
    await Appointment.findByIdAndDelete(req.params.id);
    
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

// Email testing endpoint
router.post('/test-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    const testAppointment = {
      name: 'Test Client',
      email: email || 'nebawale1111@gmail.com.com',
      phone: '123-456-7890',
      service: 'Tax Consultation',
      appointmentType: 'virtual',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      timeSlot: {
        startTime: '10:00:00',
        endTime: '11:00:00'
      },
      notes: 'This is a test appointment',
      createdAt: new Date()
    };

    await sendConfirmationEmail(testAppointment);
    await sendAdminNotification(testAppointment);
    
    res.json({ success: true, message: 'Test emails sent successfully' });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send test emails',
      error: error.message 
    });
  }
});

module.exports = router;