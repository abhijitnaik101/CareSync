import { Router } from "express";
import { authenticatePatient } from "../middlewares/patientAuth";
import { authenticate } from "../middlewares/authMiddleware";
import { getHospitalRecommendations, getHospitalWaitTimes } from "../controllers/MLController";

export const mlRouter = Router();

// Get hospital recommendations
mlRouter.get("/hospital", authenticate, authenticatePatient, getHospitalRecommendations);

// Get estimated waiting times for hospitals
mlRouter.get("/waittime", getHospitalWaitTimes);