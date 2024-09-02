import { Request, Response } from "express"
import { prisma } from "..";

export const getHospitalId = async (req: Request, res: Response) => {
    const hospitalname = req.query;

    if (!hospitalname)
        res.status(401).json({ message: "Invalid query" });

    try {
        const id = await prisma.hospital.findFirst({
            where: {
                name: hospitalname
            },
            select: {
                id: true, services: true, name: true
            }
        });

        res.json({ ...id });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}