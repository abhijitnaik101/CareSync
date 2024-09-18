import { Router } from "express";
import { getDepartments, getDoctors, getHospitalIdByName, getHospitals } from "../controllers/HospitalController";
import { authenticate, authorizeAdmin, authorizeDoctor, authorizeInventoryman, authorizePatient, authorizeReceptionist } from "../middlewares/authMiddleware";
import { acceptAuthentication } from "../controllers/authorize";

export const hospitalRoute = Router();

hospitalRoute.get("/hospitalid", getHospitalIdByName);

hospitalRoute.get("/hospitals", getHospitals);

hospitalRoute.get("/deps/doctors", getDoctors);

hospitalRoute.get("/departments", getDepartments);

hospitalRoute.get("/authenticate/doctor", authenticate, authorizeDoctor, acceptAuthentication);

hospitalRoute.get("/authenticate/admin", authenticate, authorizeAdmin, acceptAuthentication);

hospitalRoute.get("/authenticate/receptionist", authenticate, authorizeReceptionist, acceptAuthentication);

hospitalRoute.get("/authenticate/inventoryman", authenticate, authorizeInventoryman, acceptAuthentication);

hospitalRoute.get("/authenticate/patient", authenticate, authorizePatient, acceptAuthentication);