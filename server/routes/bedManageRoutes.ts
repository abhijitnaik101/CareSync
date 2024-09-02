import { authenticate, authorizeAdmin, authorizeReceptionist } from "../middlewares/authMiddleware";
import { Router } from "express";
import { approveBed, assignBed, bedStatus } from "../controllers/bedmanage";

export const bedManage = Router();

bedManage.post("/receptionist/approve/:ticketId", authenticate, authorizeReceptionist, approveBed);

bedManage.post("/admin/assign-bed/:ticketId/:wardId", authenticate, authorizeAdmin, assignBed);

bedManage.get("/wards/available-beds/:hospitalId", authenticate, bedStatus);