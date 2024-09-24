import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import userRouter from "./routes/userRoutes.js";
import companyRouter from "./routes/companyRoutes.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api endpoint
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
