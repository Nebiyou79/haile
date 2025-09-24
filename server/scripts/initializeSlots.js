// scripts/initializeSlots.js
const mongoose = require('mongoose');
const Availability = require('../models/Availability');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

const BUSINESS_HOURS = { open: '09:00:00', close: '17:00:00' };
const BLOCKED_HOURS = { start: '09:00:00', end: '13:00:00' }; // morning busy hours
const SLOT_DURATION_MINUTES = 60; // 1-hour slots
const MAX_CAPACITY = 1; // default capacity per slot
const TOTAL_DAYS = 365; // create slots for 1 year

// Helper to add minutes to a time string
function addMinutes(timeStr, minsToAdd) {
  const [h, m, s] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m + minsToAdd, s, 0);
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

async function initializeSlots() {
  try {
    await Availability.deleteMany({});
    console.log('🧹 Cleared existing availability data');

    const today = new Date();
    for (let i = 0; i < TOTAL_DAYS; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Skip weekends
      const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      const slots = [];
      let slotStart = BUSINESS_HOURS.open;

      while (true) {
        let slotEnd = addMinutes(slotStart, SLOT_DURATION_MINUTES);
        if (slotEnd > BUSINESS_HOURS.close) break;

        // Determine availability
        const available = !(slotStart >= BLOCKED_HOURS.start && slotEnd <= BLOCKED_HOURS.end);

        slots.push({
          startTime: slotStart,
          endTime: slotEnd,
          maxCapacity: MAX_CAPACITY,
          available, // morning slots false, afternoon true
        });

        slotStart = slotEnd;
      }

      const availability = new Availability({
        date: currentDate,
        slots,
        businessHours: BUSINESS_HOURS,
      });

      await availability.save();
      console.log(`📅 Slots initialized for ${currentDate.toDateString()}`);
    }

    console.log('✅ All time slots initialized with morning blocked and afternoon available for the year');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing slots:', error);
    process.exit(1);
  }
}

initializeSlots();
