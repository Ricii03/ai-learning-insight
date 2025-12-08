const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: function() {
      // Generate email from displayName if not provided
      return `${this.displayName.replace(/\s+/g, '.').toLowerCase()}@dicoding.com`;
    }
  },
  password: {
    type: String,
    required: true,
    select: false // Don't return password by default
  },
  // Data from dataset
  mostActiveTime: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'night'],
    default: 'morning'
  },
  consistencyScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  engagementLevel: {
    type: String,
    enum: ['Low Engagement', 'Medium Engagement', 'High Engagement', 'No Activity'],
    default: 'No Activity'
  },
  avgExamScore: {
    type: Number,
    default: 0
  },
  examPassRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 1
  },
  hasExamData: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ userId: 1 });
userSchema.index({ displayName: 1 });
userSchema.index({ email: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get user data without sensitive info
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);

