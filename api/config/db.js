import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database connected"));

  const uri = `${process.env.MONGODB_URI}prescripto`;

  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
