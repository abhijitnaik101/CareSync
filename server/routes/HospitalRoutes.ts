import { Router } from "express";
import { getHospitalIdByName } from "./HospitalController";

export const hospitalRoute = Router();

hospitalRoute.get("/hospitalid", getHospitalIdByName);