import { Router } from "express";
import { getDepartments, getDoctors, getHospitalIdByName, getHospitals } from "../controllers/HospitalController";

export const hospitalRoute = Router();

hospitalRoute.get("/hospitalid", getHospitalIdByName);

hospitalRoute.get("/hospitals", getHospitals);

hospitalRoute.get("/deps/doctors", getDoctors);

hospitalRoute.get("/departments", getDepartments);