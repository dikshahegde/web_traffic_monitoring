const mongoose = require('mongoose');

const TrafficSchema = new mongoose.Schema({
  url: { type: String, required: true },
  ip: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Traffic', TrafficSchema);
