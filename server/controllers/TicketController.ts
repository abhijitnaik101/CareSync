import { prisma } from "..";
import { Request, Response } from "express";
import { ticketAppointRequest } from "./QueueServiceTypes";

/**
 * Handles booking an appointment for a patient.
 *
 * This function creates a new ticket entry in the database
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

export const getAppointments = async (req: Request, res: Response) => {
  const { patientId } = req.query;

  try {
    const appointments = await prisma.ticket.findMany({
      where: { 
        patientId: Number(patientId)
      },
      include: {
        hospital: {
          select: {
            name: true,
            services: true
          }
        }
      }
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};