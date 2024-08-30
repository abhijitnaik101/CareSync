import { prisma } from "..";
import { Request, Response } from "express";
import { ticketAppointRequest } from "../types/queueservice";

export const appointBooking = async (req: Request, res: Response) => {
    if (!ticketAppointRequest.safeParse(req.body).success)
        return res.status(400).json({ message: 'Invalid request' });

    const { name, age, gender, appointType, patientId, doctorId, hospitalId, appointmentDate } = req.body;

    try {
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

        if (appointType === 'OPD') {
            const queueCount = await prisma.queue.count({
                where: {
                    hospitalId,
                    doctorId,
                    appointmentDate: new Date(appointmentDate).toISOString(), // Today's date
                },
            });

            const queue = await prisma.queue.create({
                data: {
                    hospitalId,
                    doctorId,
                    position: queueCount + 1,
                    appointmentDate: new Date(),
                    pending: false,
                    ticketId: ticket.id,
                },
            });

            queuePosition = queue.position;
        }

        // Respond with ticket details and queue position (if OPD)
        res.json({
            message: 'Appointment booked successfully!',
            ticket,
            queuePosition: appointType === 'OPD' ? queuePosition : null,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while booking the appointment' });
    }
};