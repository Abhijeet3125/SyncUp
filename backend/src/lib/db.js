import mongoose from "mongoose";

export const connectDB = async () => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/chat-appdb");
        console.log("connected to the database");
    } catch (err) {
        console.log("mongodb connection error:", err);
    }
}