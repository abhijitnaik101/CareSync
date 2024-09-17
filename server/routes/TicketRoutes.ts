import { Router } from "express";
import { bookAppointment, createAppointment, getAppointments, getPatientRequests } from "../controllers/TicketController";
import { authenticate, authorizeReceptionist } from "../middlewares/authMiddleware";

export const ticketRouter = Router();

ticketRouter.post('/bookappointment', bookAppointment);

ticketRouter.get('/appointments', getAppointments);

ticketRouter.get('/getappoints/:hospitalId', authenticate, authorizeReceptionist, getPatientRequests)

ticketRouter.post('/create/appoint', createAppointment);