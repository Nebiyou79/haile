const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Client name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true
  },
  service: { 
    type: String, 
    required: [true, 'Service is required'],
    enum: {
      values: ['Tax Consultation', 'Accounting Services', 'Financial Planning', 'Business Advisory'],
      message: 'Service {VALUE} is not supported'
    }
  },
  appointmentType: {
    type: String,
    required: [true, 'Appointment type is required'],
    enum: {
      values: ['in-person', 'virtual'],
      message: 'Appointment type {VALUE} is not supported'
    },
    default: 'in-person'
  },
  date: { 
    type: Date, 
    required: [true, 'Date is required'],
    validate: {
      validator: function(value) {
        return value >= new Date().setHours(0, 0, 0, 0);
      },
      message: 'Appointment date must be in the future'
    }
  },
  timeSlot: { 
    startTime: { 
      type: String, 
      required: [true, 'Start time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Please provide a valid time format']
    },
    endTime: { 
      type: String, 
      required: [true, 'End time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Please provide a valid time format']
    }
  },
  status: {
    type: String,
    enum: {
      values: ['scheduled', 'completed', 'cancelled'],
      message: 'Status {VALUE} is not supported'
    },
    default: 'scheduled'
  },
  notes: { 
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters'],
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
appointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add index for better query performance
appointmentSchema.index({ date: 1, timeSlot: 1 });
appointmentSchema.index({ email: 1, date: 1 });
appointmentSchema.index({ status: 1, date: 1 });

// Virtual for formatted date
appointmentSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
});

// Virtual for formatted time
appointmentSchema.virtual('formattedTime').get(function() {
  return `${this.timeSlot.startTime.slice(0, 5)} - ${this.timeSlot.endTime.slice(0, 5)}`;
});

// Ensure virtual fields are serialized
appointmentSchema.set('toJSON', { virtuals: true });
appointmentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Appointment', appointmentSchema);