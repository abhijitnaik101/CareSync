import { prisma } from "..";
import { Request, Response } from "express";
import { ticketAppointRequest } from "./QueueServiceTypes";

/**
 * Handles booking an appointment for a patient.
 *
 * This function creates a new ticket entry in the database and optionally adds the patient to the queue for an OPD (Outpatient Department) appointment.
 *
 * @param req The Express request object containing appointment details.
 * @param res The Express response object for sending the booking response.
 */
export const bookAppointment = async (req: Request, res: Response) => {
  // Validate the request body
  if (!ticketAppointRequest.safeParse(req.body).success) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  // Extract appointment details from the request
  const { name, age, gender, appointType, patientId, doctorId, hospitalId, appointmentDate } = req.body;

  try {
    // Create a new ticket entry for the patient
    const ticket = await prisma.ticket.create({
      data: {
        name,
        age,
        gender,
        appointType,
        patientId,
        doctorId,
        hospitalId,
      },
    });

    // Respond with success message, ticket details, and queue position (if OPD)
    res.json({
      message: 'Appointment booked successfully!',
      ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while booking the appointment' });
  }
};