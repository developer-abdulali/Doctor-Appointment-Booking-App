import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed", error);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
