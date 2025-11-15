// src/routes/insightRoutes.js
const express = require('express');
const router = express.Router();
const { getInsights, saveMLInsights } = require('../controllers/insightController');

// Endpoint untuk menerima data dari ML
router.post('/save', saveMLInsights);

// Endpoint untuk frontend ambil data
router.get('/', getInsights);

module.exports = router;