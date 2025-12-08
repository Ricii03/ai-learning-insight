const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key-change-in-production'
      );

      // Get user from token (token contains userId)
      req.user = { userId: decoded.userId };
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }
  } catch (error) {
    next(error);
  }
};

// Optional: Check if user exists and is active
const checkUser = async (req, res, next) => {
  try {
    if (req.user && req.user.userId) {
      const user = await User.findOne({ userId: req.user.userId });
      
      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          error: 'User not found or account is deactivated'
        });
      }
      
      req.user.user = user;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  protect,
  checkUser
};


