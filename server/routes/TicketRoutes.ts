import { Router } from "express";
import { bookAppointment, getAppointments } from "../controllers/TicketController";

export const ticketRouter = Router();

ticketRouter.post('/', bookAppointment);

ticketRouter.get('/appointments', getAppointments);