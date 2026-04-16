const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for admin seeding...');
    
    const adminEmail = 'test@gmail.com';
    const adminPassword = '12345'; // Model hashes this on save
    
    // Check if admin exists
    let admin = await User.findOne({ email: adminEmail });
    
    if (admin) {
      console.log('Admin user already exists. Updating role...');
      admin.role = 'admin';
      admin.password = adminPassword; // This will trigger the pre-save hash
      await admin.save();
    } else {
      console.log('Creating new Admin user...');
      admin = new User({
        name: 'Super Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      await admin.save();
    }
    
    console.log('Admin user created/updated successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

createAdmin();
