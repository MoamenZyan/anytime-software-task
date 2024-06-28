import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Database connection configuring
const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) throw new Error('MongoURI is not defined !');

    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

export default connectDB;
