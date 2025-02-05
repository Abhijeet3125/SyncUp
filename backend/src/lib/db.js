import mongoose from "mongoose";

export const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to the database");
    } catch (err) {
        console.log("mongodb connection error:", err);
    }
}