require('dotenv').config({ path: 'backend/.env' });
const mongoose = require('mongoose');

const checkDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI not found in backend/.env');
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB:', process.env.MONGODB_URI.split('@')[1] || 'Local');
    
    const db = mongoose.connection.db;
    
    // Check for Dimas
    const dimas = await db.collection('users').findOne({ 
      $or: [
        { displayName: /Dimas/i },
        { email: /Dimas/i }
      ]
    });
    
    if (dimas) {
      console.log(`Found User Dimas:`, JSON.stringify(dimas, null, 2));
      const activities = await db.collection('learningactivities').find({ userId: dimas.userId }).toArray();
      console.log(`Activities for Dimas (ID: ${dimas.userId}):`, activities.length);
      if (activities.length > 0) {
        console.log('First activity:', JSON.stringify(activities[0], null, 2));
      }
    } else {
      console.log('User Dimas not found in "users" collection.');
    }
    
    // List all activity userIds
    const uniqueUserIds = await db.collection('learningactivities').distinct('userId');
    console.log('\nUser IDs with activities:', uniqueUserIds);

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

checkDB();

