import mongoose from 'mongoose';
import config from './config';

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;