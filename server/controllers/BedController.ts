import { prisma } from "..";
import { Request, Response } from "express";

/**
 * Approves a bed ticket and updates the corresponding ward information.
 *
 * @param req The Express request object containing the ticket ID and hospital ID.
 * @param res The Express response object for sending the response.
 */
export const approveBedAndUpdateWard = async (req: Request, res: Response) => {
  const ticketId = Number(req.params.ticketId);
  const { hospitalId } = req.body;

  try {
    // Use a Prisma transaction to ensure both updates are performed atomically
    await prisma.$transaction([
      prisma.ticket.update({
        where: {
          id: ticketId,
          hospitalId,
        },
        data: { approved: true },
      }),
      prisma.ward.update({
        where: { hospitalId }, // Assuming the ward is associated with the hospital
        data: {
          occupiedBeds: { increment: 1 },
          availableBeds: { decrement: 1 },
        },
      }),
    ]);

    res.json({ message: "Ticket approved and bed assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Assigns a ticket to a specific ward.
 *
 * @param req The Express request object containing the ticket ID, ward ID, and hospital ID.
 * @param res The Express response object for sending the response.
 */
export const assignTicketToWard = async (req: Request, res: Response) => {
  const ticketId = Number(req.params.ticketId);
  const wardId = Number(req.params.wardId);
  const { hospitalId } = req.body;

  try {
    await prisma.$transaction([
      prisma.ticket.update({
        where: {
          id: ticketId,
          hospitalId,
        },
        data: { wardId },
      }),
      prisma.ward.update({
        where: { id: wardId },
        data: {
          occupiedBeds: { increment: 1 },
          availableBeds: { decrement: 1 },
        },
      }),
    ]);

    res.json({ message: "Ticket assigned to ward successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Retrieves the ward information for a given hospital.
 *
 * @param req The Express request object containing the hospital ID.
 * @param res The Express response object for sending the ward information.
 */
export const getWardInformation = async (req: Request, res: Response) => {
  if (req.user.role !== "Receptionist" && req.user.role !== "Admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

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