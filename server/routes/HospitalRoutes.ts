import { Router } from "express";
import { getHospitalIdByName, getHospitals } from "./HospitalController";

export const hospitalRoute = Router();

hospitalRoute.get("/hospitalid", getHospitalIdByName);

hospitalRoute.get("/hospitals", getHospitals);