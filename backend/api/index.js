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

// middleware
app.use(express.json());
app.use(cors());

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
