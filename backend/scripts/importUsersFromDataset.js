require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const connectDB = require('../src/config/database');
const User = require('../src/models/User');

// Path to dataset CSV
// NOTE: If DATA SPECIALIST folder is not available, you need to provide the CSV file path manually
// The CSV file should be placed in the project root or update this path accordingly
const CSV_PATH = path.join(__dirname, '../../DATA SPECIALIST/01_basic_user_summary_clean.csv');

// Default password for all users (can be changed)
const DEFAULT_PASSWORD = 'password123';

// Map time of day from dataset to our enum
const mapTimeOfDay = (time) => {
  const timeMap = {
    'Morning': 'morning',
    'Afternoon': 'afternoon',
    'Evening': 'evening',
    'Night': 'night',
    'Late Night': 'night'
  };
  return timeMap[time] || 'morning';
};

async function importUsers() {
  try {
    console.log('='.repeat(60));
    console.log('📥 Importing Users from Dataset');
    console.log('='.repeat(60));
    
    // Connect to database
    await connectDB();
    console.log('✅ Connected to MongoDB\n');

    const users = [];
    const errors = [];

    // Read CSV file
    return new Promise((resolve, reject) => {
      fs.createReadStream(CSV_PATH)
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          try {
            // Handle userId format - remove .0 if exists (5181638.0 -> 5181638)
            let userId = String(row['User ID']).trim();
            if (userId.endsWith('.0')) {
              userId = userId.slice(0, -2);
            }
            const displayName = row['Display Name'].trim();
            
            // Skip if invalid
            if (!userId || !displayName || displayName === 'Unknown User') {
              return;
            }

            // Generate email from displayName
            const email = `${displayName.replace(/\s+/g, '.').replace(/_/g, '.').toLowerCase()}@dicoding.com`;

            const userData = {
              userId: userId,
              displayName: displayName,
              email: email,
              password: DEFAULT_PASSWORD,
              mostActiveTime: mapTimeOfDay(row['Most Active Time']),
              consistencyScore: parseFloat(row['Consistency Score']) || 0,
              engagementLevel: row['Engagement Level'] || 'No Activity',
              avgExamScore: parseFloat(row['Avg Exam Score']) || 0,
              examPassRate: parseFloat(row['Exam Pass Rate']) || 0,
              hasExamData: parseInt(row['Has Exam Data']) === 1
            };

            users.push(userData);
          } catch (error) {
            errors.push({ row, error: error.message });
          }
        })
        .on('end', async () => {
          console.log(`📊 Found ${users.length} users in dataset\n`);

          if (users.length === 0) {
            console.log('❌ No valid users found in dataset');
            process.exit(1);
          }

          // Import users to database
          let imported = 0;
          let updated = 0;
          let skipped = 0;

          for (const userData of users) {
            try {
              // Check if user exists
              const existingUser = await User.findOne({ userId: userData.userId });

              if (existingUser) {
                // Update existing user
                await User.findOneAndUpdate(
                  { userId: userData.userId },
                  {
                    displayName: userData.displayName,
                    email: userData.email,
                    mostActiveTime: userData.mostActiveTime,
                    consistencyScore: userData.consistencyScore,
                    engagementLevel: userData.engagementLevel,
                    avgExamScore: userData.avgExamScore,
                    examPassRate: userData.examPassRate,
                    hasExamData: userData.hasExamData
                  },
                  { new: true }
                );
                updated++;
                console.log(`✅ Updated: ${userData.displayName} (${userData.userId}) - ${userData.email}`);
              } else {
                // Create new user
                await User.create(userData);
                imported++;
                console.log(`✅ Imported: ${userData.displayName} (${userData.userId}) - ${userData.email}`);
              }
            } catch (error) {
              skipped++;
              console.log(`❌ Error for ${userData.displayName}: ${error.message}`);
            }
          }

          console.log('\n' + '='.repeat(60));
          console.log('📊 Import Summary');
          console.log('='.repeat(60));
          console.log(`✅ Imported: ${imported} users`);
          console.log(`🔄 Updated: ${updated} users`);
          console.log(`❌ Skipped: ${skipped} users`);
          console.log(`📝 Total processed: ${users.length} users`);

          if (errors.length > 0) {
            console.log(`\n⚠️  Errors: ${errors.length}`);
            errors.forEach(err => {
              console.log(`   - ${err.error}`);
            });
          }

          console.log('\n✅ Import completed successfully!');
          console.log(`\n🔑 Default password for all users: ${DEFAULT_PASSWORD}`);
          console.log('💡 Users can login with:');
          console.log('   - userId (e.g., "5181638")');
          console.log('   - displayName (e.g., "anggit_andreansyah")');
          console.log('   - email (e.g., "anggit.andreansyah@dicoding.com")');
          console.log('\n📧 Email format: displayName@dicoding.com');
          console.log('   (underscores and spaces replaced with dots, lowercase)');
          
          process.exit(0);
        })
        .on('error', (error) => {
          console.error('❌ Error reading CSV:', error);
          reject(error);
        });
    });
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

// Run import
importUsers();

