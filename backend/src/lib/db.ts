import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log('Attempting to connect with URI:', process.env.MONGODB_URI); // Add this line
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not defined. Please check your .env file or deployment config.');
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection Error: ", error);
        process.exit(1);
    }
};