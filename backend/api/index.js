// import express from "express";
// import cors from "cors";
// import connectDB from "../config/db.js";
// import dotenv from "dotenv";
// import connectCloudinary from "../config/cloudinary.js";
// import adminRouter from "../routes/adminRoute.js";
// import doctorRouter from "../routes/doctorRoute.js";
// import userRouter from "../routes/userRoute.js";

// dotenv.config();

// // app config
// const app = express();
// const port = process.env.PORT || 3000;
// connectDB();
// connectCloudinary();

// // CORS options
// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "https://doctor-appointment-booking-system-theta.vercel.app",
//     "https://doctor-appointment-booking-app-gipw.vercel.app",
//     "https://doctor-appointment-booking-app-nu.vercel.app",
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure OPTIONS is included
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "token",
//     "atoken",
//     "dtoken",
//   ],
//   credentials: true,
// };

// // middleware
// app.use(cors(corsOptions)); // Use CORS middleware before your routes
// app.use(express.json());

// // Log request and response headers for debugging
// app.use((req, res, next) => {
//   console.log('Request Headers:', req.headers);
//   res.on('finish', () => {
//     console.log('Response Headers:', res.getHeaders());
//   });
//   next();
// });

// // api endpoints
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/user", userRouter);

// app.get("/", (req, res) => {
//   res.send("API working");
// });

// // Preflight requests handling
// app.options('*', cors(corsOptions)); // Handle preflight requests

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

import express from "express";
import cors from "cors";
import connectDB from "../config/db.js"; // Ensure the path is correct
import dotenv from "dotenv";
import connectCloudinary from "../config/cloudinary.js"; // Ensure the path is correct
import adminRouter from "../routes/adminRoute.js"; // Ensure the path is correct
import doctorRouter from "../routes/doctorRoute.js"; // Ensure the path is correct
import userRouter from "../routes/userRoute.js"; // Ensure the path is correct

dotenv.config();

// App configuration
const app = express();
const port = process.env.PORT || 3000;

// Connect to database and Cloudinary
connectDB();
connectCloudinary();

// CORS options
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://doctor-appointment-booking-system-theta.vercel.app",
    "https://doctor-appointment-booking-app-gipw.vercel.app",
    "https://doctor-appointment-booking-app-nu.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "token",
    "atoken",
    "dtoken",
  ],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions)); // Use CORS middleware before your routes
app.use(express.json());

// Log request and response headers for debugging
app.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  res.on("finish", () => {
    console.log("Response Headers:", res.getHeaders());
  });
  next();
});

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Doctor Booking Server is working");
});

// Preflight requests handling
app.options("*", cors(corsOptions)); // Handle preflight requests

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
