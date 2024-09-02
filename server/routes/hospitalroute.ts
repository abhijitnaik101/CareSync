import { Router } from "express";
import { getHospitalId } from "../controllers/hospitalFunc";

export const hospitalRoute = Router();

hospitalRoute.get("/hospitalid", getHospitalId);