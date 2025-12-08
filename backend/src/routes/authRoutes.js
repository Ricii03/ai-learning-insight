const express = require('express');
const router = express.Router();
const {
  login,
  getMe,
  getAllUsers,
  getUserById
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.get('/users', protect, getAllUsers);
router.get('/users/:userId', protect, getUserById);

module.exports = router;


