import mongoose from 'mongoose';

const connectDB = async (mongo_url) => {
  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully...');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;
