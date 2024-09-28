import mongoose from "mongoose";

export async function connectDB() {
    try {
        const connectString = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB is now Connected: ${connectString.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}