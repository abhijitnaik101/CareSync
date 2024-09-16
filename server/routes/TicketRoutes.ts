import { Router } from "express";
import { bookAppointment, createAppointment, getAppointments } from "../controllers/TicketController";

export const ticketRouter = Router();

ticketRouter.post('/bookappointment', bookAppointment);

ticketRouter.get('/appointments', getAppointments);

ticketRouter.post('/create/appoint', createAppointment);