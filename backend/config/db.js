import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Listening for connection events
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    mongoose.connection.on("error", (err) =>
      console.error("Database connection error:", err)
    );

    // Use the environment variable directly and specify the database name
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "prescripto", // Specify the database name here
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;
