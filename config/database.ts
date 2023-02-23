import mongoose from "mongoose";
const { MONGO_URI } = process.env

mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI || "mongodb://127.0.0.1:27017/chat-app");

        console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;
