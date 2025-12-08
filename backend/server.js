require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// CORS Configuration - Allow specific origins
const allowedOrigins = [
  'http://localhost:5173', // Development frontend
  'http://localhost:3000', // Alternative dev port
  process.env.FRONTEND_URL, // Production frontend from env
];

// Add production URLs if provided
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      // In production, only allow specific origins
      if (process.env.NODE_ENV === 'production') {
        callback(new Error('Not allowed by CORS'));
      } else {
        // In development, allow all
        callback(null, true);
      }
    }
  },
  credentials: true
}));
app.use(express.json());

connectDB();

const authRoutes = require('./src/routes/authRoutes');
const activityRoutes = require('./src/routes/activityRoutes');
const insightRoutes = require('./src/routes/insightRoutes');

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    mongodb: require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'AI Learning Insight API',
    version: '1.0.0',
    endpoints: {
      auth: [
        'POST /api/auth/login',
        'GET /api/auth/me',
        'GET /api/auth/users',
        'GET /api/auth/users/:userId'
      ],
      activities: [
        'GET /api/activities/users/list',
        'GET /api/activities/:userId',
        'GET /api/activities/:userId/stats'
      ],
      insights: [
        'GET /api/insights/:userId',
        'GET /api/insights/:userId/history',
        'POST /api/insights/:userId/regenerate',
        'POST /api/insights/batch/generate'
      ]
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/insights', insightRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('='.repeat(50));
});