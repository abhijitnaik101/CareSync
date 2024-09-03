import { Router } from "express";
import { authenticatePatient } from "./patientAuth";
import { authenticate } from "./authMiddleware";
import { getHospitalRecommendations, getHospitalWaitTimes } from "./MLController";

export const mlRouter = Router();

// Get hospital recommendations
mlRouter.get("/hospital", authenticate, authenticatePatient, getHospitalRecommendations);

// Get estimated waiting times for hospitals
mlRouter.get("/waittime", getHospitalWaitTimes);