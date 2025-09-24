const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  startTime: { 
    type: String, 
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Please provide a valid time format']
  },
  endTime: { 
    type: String, 
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Please provide a valid time format']
  },
  available: { 
    type: Boolean, 
    default: true 
  },
  maxCapacity: {
    type: Number,
    default: 1,
    min: [1, 'Capacity must be at least 1']
  },
  bookedCount: {
    type: Number,
    default: 0,
    min: [0, 'Booked count cannot be negative']
  }
});

const availabilitySchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true, 
    unique: true,
    index: true
  },
  slots: [slotSchema],
  businessHours: {
    open: { 
      type: String, 
      default: '09:00:00',
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Please provide a valid time format']
    },
    close: { 
      type: String, 
      default: '17:00:00',
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Please provide a valid time format']
    }
  },
  isHoliday: { 
    type: Boolean, 
    default: false 
  },
  notes: {
    type: String,
    maxlength: [200, 'Notes cannot be more than 200 characters'],
    trim: true
  }
});

// Compound index for faster queries
availabilitySchema.index({ date: 1, 'slots.startTime': 1 });

// Virtual for formatted date
availabilitySchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
});

// Method to get available slots
availabilitySchema.methods.getAvailableSlots = function() {
  return this.slots.filter(slot => 
    slot.available && slot.bookedCount < slot.maxCapacity
  );
};

// Method to check if a specific slot is available
availabilitySchema.methods.isSlotAvailable = function(startTime, endTime) {
  const slot = this.slots.find(s => 
    s.startTime === startTime && s.endTime === endTime
  );
  return slot && slot.available && slot.bookedCount < slot.maxCapacity;
};

// Method to book a slot
availabilitySchema.methods.bookSlot = function(startTime, endTime) {
  const slot = this.slots.find(s => 
    s.startTime === startTime && s.endTime === endTime
  );
  
  if (!slot || !slot.available || slot.bookedCount >= slot.maxCapacity) {
    throw new Error('Slot is not available');
  }
  
  slot.bookedCount += 1;
  if (slot.bookedCount >= slot.maxCapacity) {
    slot.available = false;
  }
  
  return this.save();
};

// Method to free a slot
availabilitySchema.methods.freeSlot = function(startTime, endTime) {
  const slot = this.slots.find(s => 
    s.startTime === startTime && s.endTime === endTime
  );
  
  if (slot) {
    slot.bookedCount = Math.max(0, slot.bookedCount - 1);
    if (slot.bookedCount < slot.maxCapacity) {
      slot.available = true;
    }
  }
  
  return this.save();
};

module.exports = mongoose.model('Availability', availabilitySchema);