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

    let queuePosition = null;

    // If it's an OPD appointment, add the patient to the queue
    if (appointType === 'OPD') {
      // Get the current queue count for the doctor on the selected date
      const queueCount = await prisma.queue.count({
        where: {
          hospitalId,
          doctorId,
          appointmentDate: new Date(appointmentDate).toISOString(),
        },
      });

      // Create a new queue entry for the patient
      const queue = await prisma.queue.create({
        data: {
          hospitalId,
          doctorId,
          position: queueCount + 1,
          appointmentDate: new Date(appointmentDate), // Use the provided date
          pending: false,
          ticketId: ticket.id,
        },
      });

      queuePosition = queue.position;
    }

    // Respond with success message, ticket details, and queue position (if OPD)
    res.json({
      message: 'Appointment booked successfully!',
      ticket,
      queuePosition,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while booking the appointment' });
  }
};