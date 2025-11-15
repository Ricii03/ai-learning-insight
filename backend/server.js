const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/insights', require('./src/routes/insightRoutes'));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'AI Learning Insight Backend API',
    version: '1.0.0',
    port: process.env.PORT,
    endpoints: {
      health: '/api/health',
      insights: '/api/insights',
      saveInsight: '/api/insights/save'
    }
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` API: http://localhost:${PORT}`);
  console.log(` Health: http://localhost:${PORT}/api/health`);
});