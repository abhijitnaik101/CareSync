import { Router } from "express";
import {
  deleteQueueEntry,
  getDoctorQueue,
  getPatientQueuePosition,
  getQueueTotal,
  createFutureAppointment,
  markQueueEntryPending,
} from "./QueueController";

export const queueRouter = Router();

// Get doctor's queue for a specific date and hospital
queueRouter.get('/queues/doctor/:doctorId', getDoctorQueue);

// Get a patient's current position in a doctor's queue for a specific date
queueRouter.get('/queues/status/active', getPatientQueuePosition);

// Get the total number of patients in a doctor's queue for a specific date
queueRouter.get('/queues/status/total', getQueueTotal); // Changed "archive" to "total"

// Delete a patient from a doctor's queue
queueRouter.delete("/queues", deleteQueueEntry);

// Mark a patient's queue entry as pending
queueRouter.put("/queues/mark-pending", markQueueEntryPending);

// Create a new future appointment reference
queueRouter.post('/future-appointments', createFutureAppointment);