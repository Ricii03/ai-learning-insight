const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  
  most_active_time: {
    type: String,
    enum: ['pagi', 'siang', 'malam'],
    default: null
  },
  most_active_time_detail: {
    type: mongoose.Schema.Types.Mixed, 
    default: {}
  },
  
  consistency_score: {
    type: Number,
    min: 0,
    max: 1,
    default: 0
  },
  consistency_message: {
    type: String,
    default: ''
  },
  
  learning_pattern: {
    type: String,
    enum: ['consistent learner', 'fast learner', 'reflective learner'],
    default: null
  },
  
  additional_data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  generated_at: {
    type: Date,
    default: Date.now
  },
  
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Insight', insightSchema);