const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    visaType: {
      type: String,
      enum: ['Tourist', 'Business', 'Student'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Booked', 'Expired'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;
