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
        coordinates: true,
        services: true,
        departments: {
          include: {
            doctors: {
              select: { id: true, name: true, averageTreatmentTime: true }
            }
          }
        }
      }
    });
    
    res.json(hospitals); // Send the list of hospitals
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDoctors = async (req: Request, res: Response) => {
  const { hospitalId, departmentId } = req.query;

  if (!hospitalId ||!departmentId) {
    return res.status(400).json({ message: "Missing hospital ID or department ID in query" });
  }

  try {
    const depdoctors = await prisma.department.findUnique({
      where: {
        hospitalId: Number(hospitalId),
        id: Number(departmentId),
      },
      select: { doctors: {
        select: { id: true, name: true, specialty: true, workingdays: true, workinghrs: true,
          averageTreatmentTime: true
         } },
         name: true
      }
    });

    res.json(depdoctors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getDepartments = async (req: Request, res: Response) => {
  const { hospitalId } = req.query;

  if (!hospitalId) {
    return res.status(400).json({ message: "Missing hospital ID in query" });
  }

  try {
    const departments = await prisma.department.findMany({
      where: { hospitalId: Number(hospitalId) }
    });

    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};