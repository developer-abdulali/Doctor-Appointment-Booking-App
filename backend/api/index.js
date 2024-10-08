import express from "express";
import cors from "cors";
import connectDB from "../config/db.js";
import dotenv from "dotenv";
import connectCloudinary from "../config/cloudinary.js";
import adminRouter from "../routes/adminRoute.js";
import doctorRouter from "../routes/doctorRoute.js";
import userRouter from "../routes/userRoute.js";
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// CORS options
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://doctor-appointment-booking-system-theta.vercel.app",
    "https://doctor-appointment-booking-app-gipw.vercel.app/",
    "https://doctor-appointment-booking-app-nu.vercel.app/",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "token",
    "atoken",
    "dtoken",
  ],
  credentials: true,
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
