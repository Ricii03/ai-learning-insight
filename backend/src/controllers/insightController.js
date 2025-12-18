const LearningActivity = require('../models/LearningActivity'); // File name is LearningActivity.js (uppercase)
const Insight = require('../models/insight');
const User = require('../models/User');
const { generateInsights } = require('../services/mlService');
const fs = require('fs');
const path = require('path');

const getCurrentInsights = async (req, res, next) => {
  try {
    // Normalize userId: remove .0 if exists (e.g., '5181638.0' -> '5181638')
    let userId = String(req.params.userId).trim();
    if (userId.endsWith('.0')) {
      userId = userId.slice(0, -2);
    }
    
    console.log('[insightController] getCurrentInsights called for userId:', req.params.userId);
    console.log('[insightController] Normalized userId:', userId);

    // Load user_insights.json for specific descriptions
    let jsonInsight = null;
    try {
      const jsonPath = path.join(__dirname, '../../model_dev/user_insights.json');
      if (fs.existsSync(jsonPath)) {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        jsonInsight = jsonData.find(item => String(item.user_id) === userId);
        if (jsonInsight) {
          console.log('[insightController] Found matching insight in user_insights.json');
        }
      }
    } catch (err) {
      console.error('[insightController] Error reading user_insights.json:', err);
    }

    // Cari insight terbaru dari collection Insight (coba dengan normalized userId)
    let latestInsight = await Insight.findOne({ userId })
      .sort({ createdAt: -1 });
    
    // Jika tidak ditemukan dengan normalized, coba dengan original format
    if (!latestInsight && req.params.userId !== userId) {
      console.log('[insightController] Trying with original userId format:', req.params.userId);
      latestInsight = await Insight.findOne({ userId: req.params.userId })
        .sort({ createdAt: -1 });
    }

    console.log('[insightController] Latest insight found:', latestInsight ? 'Yes' : 'No');

    // Get user data from User collection (dataset)
    const user = await User.findOne({ userId });
    console.log('[insightController] User found:', user ? 'Yes' : 'No');
    if (user) {
      console.log('[insightController] User consistencyScore from dataset:', user.consistencyScore);
    }

    // Check if user has activities
    let activities = await LearningActivity.find({ userId })
      .sort({ date: -1 })
      .limit(50);
    
    // Jika tidak ditemukan dengan normalized, coba dengan original format
    if (activities.length === 0 && req.params.userId !== userId) {
      console.log('[insightController] Trying activities with original userId format:', req.params.userId);
      activities = await LearningActivity.find({ userId: req.params.userId })
        .sort({ date: -1 })
        .limit(50);
    }

    console.log('[insightController] Activities found:', activities.length);

    if (latestInsight) {
      // Prioritaskan data dari User dataset jika:
      // 1. Tidak ada activities, ATAU
      // 2. User punya consistencyScore di dataset yang lebih tinggi dari Insight
      const shouldUseDataset = (activities.length === 0 || 
        (user && user.consistencyScore !== undefined && 
         user.consistencyScore > latestInsight.consistencyScore));
      
      if (shouldUseDataset && user && user.consistencyScore !== undefined && user.consistencyScore > 0) {
        console.log('[insightController] Using User dataset data instead of Insight');
        console.log('[insightController] Dataset consistencyScore:', user.consistencyScore);
        console.log('[insightController] Insight consistencyScore:', latestInsight.consistencyScore);
        const insightWithUserData = {
          ...latestInsight.toObject(),
          consistencyScore: user.consistencyScore,
          mostActiveTime: user.mostActiveTime || latestInsight.mostActiveTime,
          insights: jsonInsight 
            ? `Berdasarkan data kamu, ${jsonInsight.consistency.category.toLowerCase()}. Konsistensi skor kamu adalah ${user.consistencyScore.toFixed(1)}%.`
            : (user.engagementLevel 
                ? `Berdasarkan data kamu, ${user.engagementLevel.toLowerCase()}. Konsistensi skor kamu adalah ${user.consistencyScore.toFixed(1)}%.`
                : latestInsight.insights)
        };
        return res.json({
          success: true,
          data: {
            ...insightWithUserData,
            jsonInsight
          }
        });
      }
      
      // Jika ada activities dan dataset tidak lebih tinggi, return Insight yang sudah ada (dari activities)
      console.log('[insightController] Returning existing insight from activities');
      return res.json({
        success: true,
        data: {
          ...latestInsight.toObject(),
          jsonInsight
        }
      });
    }

    // Activities sudah di-check di atas

    let result;
    if (activities.length === 0) {
      // Jika tidak ada activities, gunakan data dari User dataset jika ada
      console.log('[insightController] No activities, using User dataset data if available');
      if (user && user.consistencyScore !== undefined) {
        result = {
          mostActiveTime: user.mostActiveTime || 'morning',
          consistencyScore: user.consistencyScore,
          daysActive: 0,
          learningPattern: 'Reflective Learner',
          totalDuration: 0,
          totalActivities: 0,
          completionRate: 0,
          avgScore: 0,
          insights: jsonInsight
            ? `Berdasarkan data kamu, ${jsonInsight.consistency.category.toLowerCase()}. Konsistensi skor kamu adalah ${user.consistencyScore.toFixed(1)}%.`
            : (user.engagementLevel 
                ? `Berdasarkan data kamu, ${user.engagementLevel.toLowerCase()}. Konsistensi skor kamu adalah ${user.consistencyScore.toFixed(1)}%.`
                : 'Belum ada data aktivitas belajar. Mulai belajar untuk melihat insights-mu!')
        };
        console.log('[insightController] Using User dataset data:', {
          consistencyScore: result.consistencyScore,
          mostActiveTime: result.mostActiveTime
        });
      } else {
        // Jika tidak ada user data, return default
        result = {
          mostActiveTime: 'morning',
          consistencyScore: 0,
          daysActive: 0,
          learningPattern: 'Reflective Learner',
          totalDuration: 0,
          totalActivities: 0,
          completionRate: 0,
          avgScore: 0,
          insights: 'Belum ada data aktivitas belajar. Mulai belajar untuk melihat insights-mu!'
        };
      }
    } else {
      // Generate insights dari activities
      console.log('[insightController] Generating insights from activities');
      result = await generateInsights(activities);
      console.log('[insightController] Insights generated:', {
        mostActiveTime: result.mostActiveTime,
        consistencyScore: result.consistencyScore,
        learningPattern: result.learningPattern
      });
    }

    // Simpan insight ke database (termasuk default)
    console.log('[insightController] Creating insight in database');
    const insight = await Insight.create({
      userId,
      weekStart: new Date(),
      weekEnd: new Date(),
      ...result
    });

    console.log('[insightController] Insight created successfully, ID:', insight._id);

    res.json({
      success: true,
      data: {
        ...insight.toObject(),
        jsonInsight
      }
    });

  } catch (error) {
    console.error('[insightController] Error in getCurrentInsights:', error);
    next(error);
  }
};

const getInsightsHistory = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    const insights = await Insight.find({ userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: insights.length,
      data: insights
    });

  } catch (error) {
    next(error);
  }
};

const regenerateInsights = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    console.log('UserId:', userId);
    console.log('Body:', req.body);
    console.log('Activities:', req.body.activities);

    const activities = req.body.activities || [];

    if (!activities || activities.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Tidak ada aktivitas untuk diproses'
      });
    }

    const result = await generateInsights(activities);

    const insight = await Insight.create({
      userId,
      weekStart: new Date(),
      weekEnd: new Date(),
      ...result
    });

    res.json({
      success: true,
      message: 'Insights berhasil di-regenerate',
      data: insight
    });

  } catch (error) {
    next(error);
  }
};

const batchGenerateInsights = async (req, res, next) => {
  try {
    const users = await LearningActivity.distinct('userId');
    const results = [];

    for (const userId of users) {
      const activities = await LearningActivity.find({ userId })
        .sort({ date: -1 })
        .limit(50);

      if (activities.length > 0) {
        const result = await generateInsights(activities);
        
        const insight = await Insight.create({
          userId,
          weekStart: new Date(),
          weekEnd: new Date(),
          ...result
        });

        results.push(insight);
      }
    }

    res.json({
      success: true,
      message: `Generated insights for ${results.length} users`,
      data: results
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentInsights,
  getInsightsHistory,
  regenerateInsights,
  batchGenerateInsights
};