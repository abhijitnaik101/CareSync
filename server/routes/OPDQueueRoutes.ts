import { Router } from "express";
import {
  deleteQueueEntry,
  getDoctorQueue,
  getPatientQueuePosition,
  getQueueTotal,
  createFutureAppointment,
  AdmitPatient,
} from "../controllers/QueueController";

export const queueRouter = Router();

// Get doctor's queue for a specific date and hospital
queueRouter.get('/queues/doctor/:doctorId', getDoctorQueue);

// Get a patient's current position in a doctor's queue for a specific date
queueRouter.get('/queues/status/active/:doctorId', getPatientQueuePosition);

// Get the total number of patients in a doctor's queue for a specific date
queueRouter.get('/queues/status/total/:doctorId', getQueueTotal); // Changed "archive" to "total"

// Delete a patient from a doctor's queue
queueRouter.delete("/queues/:doctorId", deleteQueueEntry);

queueRouter.put("/queus/toipd", AdmitPatient);

// Create a new future appointment reference
queueRouter.post('/future-appointments/:doctorId', createFutureAppointment);