import mongoose from "mongoose";
import {consoleLogDebug, consoleLogError, consoleLogSuccess, LOG_MESSAGES} from "@constants/constants"; // Adjust path as needed

export const connectDB = async () => {
    try {
        consoleLogDebug(`Attempting to connect with URI: ${process.env.MONGODB_URI}`); // Add this line
        if (!process.env.MONGODB_URI) {
            throw new Error(`${LOG_MESSAGES.ERROR} MONGODB_URI environment variable is not defined. Please check your .env file or deployment config.`);
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        consoleLogSuccess(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        consoleLogError(`MongoDB connection Error: ${error}`);
        process.exit(1);
    }
};