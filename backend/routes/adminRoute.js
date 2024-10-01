import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor, adminLogin } from "../controllers/adminController.js";
import adminAuth from "../middlewares/adminAuth.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", adminAuth, upload.single("image"), addDoctor);
adminRouter.post("/login", adminLogin);

export default adminRouter;
