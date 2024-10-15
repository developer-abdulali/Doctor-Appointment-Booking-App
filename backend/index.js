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
app.use(cors());
app.use(express.json());

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Doctor Booking Server is working");
});

// Export the app (no need for app.listen() in Vercel)
export default app;
