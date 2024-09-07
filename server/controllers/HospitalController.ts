import { Request, Response } from "express";
import { prisma } from "..";

/**
 * Fetches the hospital ID based on the provided hospital name in the query parameters.
 *
 * @param req The Express request object containing the hospital name in the query parameter.
 * @param res The Express response object for sending the response.
 */
export const getHospitalIdByName = async (req: Request, res: Response) => {
  const { hospitalName } = req.query; // Destructure hospital name from query

  if (!hospitalName) {
    return res.status(400).json({ message: "Missing hospital name in query" }); // Use 400 for missing data
  }

  try {
    const hospital = await prisma.hospital.findFirst({
      where: {
        name: hospitalName.toString(),
      },
      select: {
        id: true,
        services: true, // Assuming services field exists in the hospital model
        name: true,
      },
    });

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" }); // Use 404 for not found
    }

    res.json(hospital); // Send the hospital information
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHospitals = async (req: Request, res: Response) => {
  try {
    const hospitals = await prisma.hospital.findMany({
      select: {
        id: true, 
        name: true,
        coordinates: true
      },
    });
    
    res.json(hospitals); // Send the list of hospitals
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};