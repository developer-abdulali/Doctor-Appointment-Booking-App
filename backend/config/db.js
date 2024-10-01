// import mongoose from "mongoose";

// const connectDB = async () => {
//   mongoose.connection.on("connected", () => console.log("Database connected"));

//   await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
// };

// export default connectDB;

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

    // Use the environment variable directly without appending `/prescripto`
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, // Optional in latest versions but you can keep for clarity
      useUnifiedTopology: true, // Optional but often recommended
      dbName: "prescripto", // Specify database name here
    });

    console.log("MongoDB connection successful.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
