import { Router } from "express";
import { authenticatePatient } from "../middlewares/patientAuth";
import { authenticate } from "../middlewares/authMiddleware";
import { getHospitalRecommend, getWaitTimeRecommend } from "../controllers/mlFuncs";

export const mlRouter = Router();

mlRouter.get("/hospital", authenticate, authenticatePatient, getHospitalRecommend);

mlRouter.get("/waittime", getWaitTimeRecommend);