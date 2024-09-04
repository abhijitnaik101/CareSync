import { Router } from "express";
import { bookAppointment, getAppointments } from "./TicketController";

export const ticketRouter = Router();

ticketRouter.post('/', bookAppointment);

ticketRouter.get('/appointments', getAppointments);