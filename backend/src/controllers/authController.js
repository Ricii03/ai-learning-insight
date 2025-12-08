const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Login user - can use userId, displayName, or email
const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    // Validate input
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide identifier (userId/displayName/email) and password'
      });
    }

    // Find user by userId, displayName, or email
    const user = await User.findOne({
      $or: [
        { userId: identifier },
        { displayName: identifier },
        { email: identifier.toLowerCase() }
      ]
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user.userId);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          userId: user.userId,
          displayName: user.displayName,
          email: user.email,
          mostActiveTime: user.mostActiveTime,
          consistencyScore: user.consistencyScore,
          engagementLevel: user.engagementLevel,
          avgExamScore: user.avgExamScore,
          examPassRate: user.examPassRate,
          hasExamData: user.hasExamData,
          role: user.role,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
const getMe = async (req, res, next) => {
  try {
    // Normalize userId: remove .0 if exists
    let userId = String(req.user.userId).trim();
    if (userId.endsWith('.0')) {
      userId = userId.slice(0, -2);
    }
    
    console.log('[authController] getMe called for userId:', req.user.userId);
    console.log('[authController] Normalized userId:', userId);
    
    // Try to find user with normalized userId first
    let user = await User.findOne({ userId });
    
    // If not found, try with original userId
    if (!user && req.user.userId !== userId) {
      user = await User.findOne({ userId: req.user.userId });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          userId: user.userId,
          displayName: user.displayName,
          email: user.email,
          mostActiveTime: user.mostActiveTime,
          consistencyScore: user.consistencyScore,
          engagementLevel: user.engagementLevel,
          avgExamScore: user.avgExamScore,
          examPassRate: user.examPassRate,
          hasExamData: user.hasExamData,
          role: user.role,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all users (for testing/admin)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isActive: true })
      .select('-password')
      .sort({ displayName: 1 });

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// Get user by userId
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId }).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getMe,
  getAllUsers,
  getUserById
};

