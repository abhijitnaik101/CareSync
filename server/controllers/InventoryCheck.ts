import { Request, Response } from 'express';
import { prisma } from '..'; // Assuming you've set up Prisma client

// Function to handle reordering of medicines based on expiration date
export const reorderByExpiry = async (req: Request, res: Response) => {
    try {
        const { medicineId } = req.body;

        // Find the medicine by ID
        const medicine = await prisma.inventory.findUnique({
            where: { id: medicineId },
        });

        // Check if the medicine exists and if it's expired
        if (medicine && new Date(medicine.expDate) < new Date()) {
            // Logic to reorder the medicine, for example, by increasing the quantity
            const updatedMedicine = await prisma.inventory.update({
                where: { id: medicineId },
                data: { quantity: { increment: 10 } }, // Reorder by adding 10 units
            });
            return res.json(updatedMedicine);
        }

        return res.status(400).json({ message: 'Medicine not expired or not found' });
    } catch (error) {
        return res.status(500).json({ error: 'Error reordering medicine by expiration' });
    }
};

// Function to handle reordering of medicines based on stock depletion
export const reorderByOutstock = async (req: Request, res: Response) => {
    try {
        const { medicineId } = req.body;

        // Find the medicine by ID
        const medicine = await prisma.inventory.findUnique({
            where: { id: medicineId },
        });

        // Check if the medicine exists and if it's out of stock
        if (medicine && medicine.quantity <= 0) {
            // Logic to reorder the medicine, for example, by increasing the quantity
            const updatedMedicine = await prisma.inventory.update({
                where: { id: medicineId },
                data: { quantity: { increment: 10 } }, // Reorder by adding 10 units
            });
            return res.json(updatedMedicine);
        }

        return res.status(400).json({ message: 'Medicine not out of stock or not found' });
    } catch (error) {
        return res.status(500).json({ error: 'Error reordering medicine by stock depletion' });
    }
};
