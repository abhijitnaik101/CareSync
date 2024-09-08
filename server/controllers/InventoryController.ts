import { Request, Response } from 'express';
import { prisma } from '..'; // Assuming you've set up Prisma client

// Function to fetch all medicines in the inventory
export const fetchAllMedicines = async (req: Request, res: Response) => {
    try {
        const medicines = await prisma.inventory.findMany({
            select: {
                id: true,
                name: true,
                quantity: true,
                price: true,
                expDate: true,
                mfgdate: true,
                category: true,
            },
        });
        return res.json(medicines);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching inventory data' });
    }
};

// Function to add a new inventory record and store transaction details
export const addInventoryRecord = async (req: Request, res: Response) => {
    try {
        const { name, quantity, price, category, supplier, orderdate, orderedtime, expecteddeliverdate, hospitalId } = req.body;

        // Check if required fields are present
        if (!name || !quantity || !price || !category || !hospitalId || !orderdate || !orderedtime || !expecteddeliverdate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newMedicine = await prisma.inventory.create({
            data: {
                name,
                quantity,
                price,
                category,
                supplier,  // Assuming this field exists in your schema
                mfgdate: new Date(),  // Set to current date for demo
                expDate: new Date(),  // Same for expDate; you can pass it as needed
                orderdate: new Date(orderdate),
                orderedtime,
                expecteddeliverdate: new Date(expecteddeliverdate),
                hospitalId,  // This is the required field
            },
        });

        return res.json({ message: 'New medicine added successfully!', medicine: newMedicine });
    } catch (error) {
        return res.status(500).json({ error: 'Error adding new medicine record' });
    }
};

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
