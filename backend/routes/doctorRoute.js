import express from "express";
import { doctorsList } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get("/doctor-list", doctorsList);

export default doctorRouter;
