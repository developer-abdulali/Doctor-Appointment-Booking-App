// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import connectCloudinary from "./config/cloudinary.js";
// import adminRouter from "./routes/adminRoute.js";
// import doctorRouter from "./routes/doctorRoute.js";
// import userRouter from "./routes/userRoute.js";

// dotenv.config();

// // App configuration
// const app = express();
// const port = process.env.PORT || 3000;

// // Connect to database and Cloudinary
// connectDB();
// connectCloudinary();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // API endpoints
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/user", userRouter);

// // Test endpoint
// app.get("/", (req, res) => {
//   res.send("Doctor Booking Server is working");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

// App configuration
const app = express();
const port = process.env.PORT || 3000;

// Connect to database and Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(
  cors({
    origin: ["https://doctor-appointment-booking-app-nu.vercel.app"], // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // If your requests include credentials like cookies
  })
);

app.use(express.json());

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Doctor Booking Server is working");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
