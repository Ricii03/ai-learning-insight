const Insight = require('../models/insight');

exports.saveMLInsights = async (req, res) => {
  try {
    const insightData = req.body;
    
    const insight = await Insight.create(insightData);
    
    res.status(201).json({
      success: true,
      message: 'Insight berhasil disimpan',
      data: insight
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getInsights = async (req, res) => {
  try {
    const { user_id } = req.query;
    
    let query = {};
    if (user_id) {
      query.user_id = user_id;
    }
    
    const insights = await Insight.find(query)
      .sort({ created_at: -1 })
      .limit(10);
    
    res.status(200).json({
      success: true,
      count: insights.length,
      data: insights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};