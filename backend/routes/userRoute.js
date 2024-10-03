import express from "express";
import {
  bookAppointment,
  cancelBookedAppointment,
  getAllBookedAppointments,
  getUserProfile,
  loginUser,
  regiterUser,
  updateUserProfile,
} from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", regiterUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", userAuth, getUserProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  userAuth,
  updateUserProfile
);
userRouter.post("/book-appointment", userAuth, bookAppointment);
userRouter.get("/appointments", userAuth, getAllBookedAppointments);
userRouter.post("/cancel-appointment", userAuth, cancelBookedAppointment);

export default userRouter;
