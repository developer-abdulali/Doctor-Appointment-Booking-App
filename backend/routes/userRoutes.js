import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, updateProfile);

export default router;
