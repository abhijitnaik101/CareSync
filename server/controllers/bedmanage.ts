import { Request, Response } from "express";
import { prisma } from "..";

export const approveBed = async (req: Request, res: Response) => {
    const ticketId = Number(req.params.ticketId);
    const { hospitalId } = req.body;

    try {
        await prisma.ticket.update({
            where: { 
                id: ticketId,
                hospitalId: Number(hospitalId)
            },
            data: { approved: true },
        });

        res.json({ message: "Ticket approved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const assignBed = async (req: Request, res: Response) => {
    const ticketId = Number(req.params.ticketId);
    const wardId = Number(req.params.wardId);
    const { hospitalId } = req.body;

    try {
        await prisma.$transaction([
            prisma.ticket.update({
                where: { 
                    id: ticketId,
                    hospitalId: Number(hospitalId)
                },
                data: { wardId },
            }), 
            prisma.ward.update({
                where: { id: wardId },
                data: {
                    occupiedBeds: { increment: 1 },
                    availableBeds: { decrement: 1 }
                },
            })
        ]);

        res.json({ message: "Bed assigned successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const bedStatus = async (req: Request, res: Response) => {
    if (req.user.role != "Receptionist" || req.user.role != "Admin")
        return res.status(403).json({ message: "Forbidden" });

    const { hospitalId } = req.params;

    try {
        const wards = await prisma.ward.findMany({
            where: { hospitalId: Number(hospitalId) },
            select: { id: true, name: true, occupiedBeds: true, availableBeds: true, totalBeds: true },
        });

        res.json(wards);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};