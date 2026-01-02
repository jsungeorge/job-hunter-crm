const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  link: { type: String }, 
  status: {
    type: String,
    default: 'Planning',
    enum: ['Planning', 'Applied', 'Interview', 'Offer', 'Rejected']
  },
  dateApplied: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);