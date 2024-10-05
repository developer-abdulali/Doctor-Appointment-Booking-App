import express from "express";
import {
  doctorAppointments,
  doctorDashboard,
  doctorLogin,
  doctorsList,
  getDoctorProfile,
  markAppointmentCancel,
  markAppointmentCompleted,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import doctorAuth from "../middlewares/doctorAuth.js";

const doctorRouter = express.Router();

doctorRouter.get("/doctor-list", doctorsList);
doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/appointments", doctorAuth, doctorAppointments);
doctorRouter.post(
  "/complete-appointment",
  doctorAuth,
  markAppointmentCompleted
);
doctorRouter.post("/cancel-appointment", doctorAuth, markAppointmentCancel);
doctorRouter.get("/dashboard", doctorAuth, doctorDashboard);
doctorRouter.get("/profile", doctorAuth, getDoctorProfile);
doctorRouter.post("/update-profile", doctorAuth, updateDoctorProfile);

export default doctorRouter;
