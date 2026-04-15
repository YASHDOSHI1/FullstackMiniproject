
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Actual DB connection can be added here later
    /*
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    */
    console.log('MongoDB Schema Ready - Connection Placeholder');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
