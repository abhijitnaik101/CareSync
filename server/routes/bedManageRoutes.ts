import { authenticate, authorizeAdmin, authorizeReceptionist } from "./authMiddleware";
import { Router } from "express";
import { approveBedAndUpdateWard, assignTicketToWard, getWardInformation } from "./BedController";

export const bedManage = Router();
// Route for receptionists to approve a bed ticket and update ward information (assuming previous discussions)
bedManage.post("/receptionist/approve/:ticketId", authenticate, authorizeReceptionist, approveBedAndUpdateWard);
// Route for admins to assign a bed ticket to a ward
bedManage.post("/admin/assign-bed/:ticketId/:wardId", authenticate, authorizeAdmin, assignTicketToWard);
// Route to retrieve ward information for a given hospital
bedManage.get("/wards/available-beds/:hospitalId", authenticate, getWardInformation);