import { prisma } from "..";
import { queueRequest } from "../types/queueservice";
import { Request, Response } from "express";

export const getDocQueue = async (req: Request, res: Response) => {
    if (!queueRequest.safeParse(req.body).success)
        return res.status(400).json({ message: 'Invalid request' });

    const { doctorId } = req.params;
    const { appointmentDate, hospitalId } = req.body;

    try {
        const queues = await prisma.queue.findMany({
            where: {
                doctorId: Number(doctorId),
                hospitalId,
                appointmentDate: new Date(appointmentDate).toISOString()
            },
            orderBy: { position: "asc" },
            include: {
                ticket: true
            }
        });

        res.json(queues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Can't retrive Queue data" });
    }
};

export const getDocQueueStatus = async (req: Request, res: Response) => {
    if (!queueRequest.safeParse(req.body).success)
        return res.status(400).json({ message: 'Invalid request' });

    const { doctorId } = req.query;
    const { appointmentDate, hospitalId } = req.body;

    try {
        const order = await prisma.queue.findMany({
            select: { position: true },
            where: {
                doctorId: Number(doctorId),
                appointmentDate: new Date(appointmentDate).toISOString(), 
                hospitalId,
                pending: false
            },
            orderBy: { position: "asc" },
        });

        const position = order[0];
        res.json(position);
    } catch (error) {
        res.status(500).json({ message: "Can't retrive Queue status data" });
    }
};

export const getStatusArchive = async (req: Request, res: Response) => {
    if (!queueRequest.safeParse(req.body).success)
        return res.status(400).json({ message: 'Invalid request' });

    const { doctorId } = req.query;
    const { appointmentDate, hospitalId } = req.body;

    try {
        const oreder = await prisma.queue.findMany({
            select: { position: true },
            where: {
                doctorId: Number(doctorId),
                appointmentDate: new Date(appointmentDate).toISOString(), 
                hospitalId,
            },
        });
        const total = oreder.length;
        res.json({ total });
    } catch (error) {
        res.status(500).json({ message: "Can't retrive Queue status data" });
    }
};

export const deleteQueueUser = async (req: Request, res: Response) => {
    if (!queueRequest.safeParse(req.body).success)
        return res.status(400).json({ message: 'Invalid request' });

    const { doctorId, position } = req.query;
    const { appointmentDate, hospitalId } = req.body;

    try {
        await prisma.queue.deleteMany({
            where: {
                doctorId: Number(doctorId),
                appointmentDate: new Date(appointmentDate).toISOString(), 
                hospitalId,
                position: Number(position)
            },
        });
        res.status(200).json({ message: 'Queue deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Can't delete Queue status data" });
    }
};

export const postFutureStatus = async (req: Request, res: Response) => {
    const { doctorId, patientId, nextdate, notes } = req.body;

    try {
        const futureReference = await prisma.futureReference.create({
            data: {
                doctorId,
                patientId,
                futureAppointmentDate: new Date(nextdate).toISOString(),
                notes
            },
        });

        res.status(201).json(futureReference);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const putPending = async (req: Request, res: Response) => {
    if (!queueRequest.safeParse(req.body).success) 
        res.status(400).json({ message: "Invalid request" }); 

    const { doctorId, position } = req.query;
    const { appointmentDate, hospitalId } = req.body;

    try {
        await prisma.queue.updateMany({
            data: { pending: true },
            where: {
                doctorId: Number(doctorId),
                appointmentDate: new Date(appointmentDate).toISOString(), 
                hospitalId: Number(hospitalId),
                position: Number(position)
            }
        });

        res.status(200).json({ message: 'Queue deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}