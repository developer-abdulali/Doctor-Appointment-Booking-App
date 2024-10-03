import express from "express";
import upload from "../middlewares/multer.js";
import {
  addDoctor,
  adminLogin,
  getAllAppointmentsAdmin,
  getAllDoctors,
} from "../controllers/adminController.js";
import adminAuth from "../middlewares/adminAuth.js";
import { changeDoctorAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", adminAuth, upload.single("image"), addDoctor);
adminRouter.post("/login", adminLogin);
adminRouter.post("/all-doctors", adminAuth, getAllDoctors);
adminRouter.post("/change-availability", adminAuth, changeDoctorAvailability);
adminRouter.get("/appointments", adminAuth, getAllAppointmentsAdmin);

export default adminRouter;
