import { Router } from "express";
import { appointBooking } from "../controllers/ticketFuncs";

export const ticketRouter = Router();

ticketRouter.post('/', appointBooking);