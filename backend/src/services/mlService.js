const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const pythonPath = process.env.PYTHON_PATH || path.join(__dirname, '../../../.venv/Scripts/python.exe');
const scriptPath = path.join(__dirname, '../../model_dev/predict.py');

console.log('[mlService] Python path:', pythonPath);
console.log('[mlService] Script path:', scriptPath);

async function callPython(activities) {
  return new Promise((resolve, reject) => {
    // Check if pythonPath is a command (like 'python3') or a direct path
    const isCommand = !pythonPath.includes('/') && !pythonPath.includes('\\');
    
    if (!isCommand && !fs.existsSync(pythonPath)) {
      console.error('[mlService] Python executable not found at path:', pythonPath);
      return reject(new Error(`Python not found at: ${pythonPath}`));
    }
    
    if (!fs.existsSync(scriptPath)) {
      console.error('[mlService] predict.py not found at:', scriptPath);
      return reject(new Error(`predict.py not found at: ${scriptPath}`));
    }

    const inputData = JSON.stringify({ activities });
    console.log(`[mlService] Calling Python (${pythonPath}) with ${activities.length} activities`);
    
    const pythonProcess = spawn(pythonPath, [scriptPath, inputData]);
    
    let outputData = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('[mlService] Python stderr:', errorData);
        return reject(new Error(`Python error (code ${code}): ${errorData}`));
      }

      try {
        const result = JSON.parse(outputData);
        if (!result.success) {
          console.error('[mlService] Python returned error:', result.error);
          return reject(new Error(result.error || 'Prediction failed'));
        }
        console.log('[mlService] Python execution successful');
        resolve(result);
      } catch (err) {
        console.error('[mlService] Failed to parse Python output:', outputData);
        reject(new Error(`Failed to parse Python output: ${err.message}`));
      }
    });

    pythonProcess.on('error', (err) => {
      console.error('[mlService] Python process error:', err);
      reject(new Error(`Python process error: ${err.message}`));
    });
  });
}

async function generateInsights(activities) {
  console.log('[mlService] generateInsights called with', activities?.length || 0, 'activities');
  
  if (!activities || activities.length === 0) {
    return {
      mostActiveTime: 'morning',
      consistencyScore: 0,
      daysActive: 0,
      learningPattern: 'Reflective Learner',
      totalDuration: 0,
      totalActivities: 0,
      completionRate: 0,
      avgScore: 0,
      insights: 'Belum ada data aktivitas belajar.'
    };
  }

  try {
    const formattedActivities = activities.map(activity => {
      const activityObj = activity.toObject ? activity.toObject() : activity;
      
      let dateString = activityObj.date instanceof Date ? activityObj.date.toISOString() : new Date(activityObj.date).toISOString();
      
      return {
        date: dateString,
        duration: activityObj.duration || 0,
        timeOfDay: activityObj.timeOfDay || 'morning',
        courseName: activityObj.courseName || 'Unknown',
        activityType: activityObj.activityType || 'other',
        completionStatus: activityObj.completionStatus || false,
        score: activityObj.score || 0
      };
    });

    const result = await callPython(formattedActivities);
    return result;
    
  } catch (error) {
    console.error('[mlService] Error generating insights:', error);
    throw error;
  }
}

module.exports = { generateInsights };
