import { Router } from "express";
import { bookAppointment } from "./TicketController";

export const ticketRouter = Router();

ticketRouter.post('/', bookAppointment);