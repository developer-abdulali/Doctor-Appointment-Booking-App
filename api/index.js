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

// Connect to database and Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: [
      "https://doctor-appointment-booking-app-nu.vercel.app", // Admin site
      "https://doctor-appointment-booking-system-theta.vercel.app", // Frontend site
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Doctor Booking Server is working");
});

// Export the app for Vercel
export default app;
