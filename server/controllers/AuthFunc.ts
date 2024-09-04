import { Request, Response } from "express";
import { AdminRequest, DocRequest, loginRequest, PatientRequest, ReceptionRequest, roleSchema } from "../types/userTypes";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";
import { prisma } from "..";


export const registerUser = async (req: Request, res: Response) => {
    if (req.body.role === null)
        return res.status(400).json({ message: 'Invalid role request' });

    const { name, email, password, role } = req.body;
    let hashedPassword: string | null = null;
    hashedPassword = await hashPassword(password);

    try {
        let user, hospitalPass: {
            adminPass?: string,
            doctorPass?: string,
            receptionistPass?: string,
            inventoryPass?: string,
            id: number
        } | null;
        switch (role) {
            case 'Admin':
                if (!AdminRequest.safeParse(req.body).success)
                    return res.status(400).json({ message: 'Invalid request' });
                hospitalPass = await prisma.hospital.findFirst({
                    where: {
                        name: req.body.hospitalName
                    }, select: {
                        adminPass: true,
                        id: true,
                    }
                });
                if (!hospitalPass)
                    return res.status(404).json({ message: 'Hospital not found' });
                if (hospitalPass.adminPass != req.body.hospitalAdminpass)
                    return res.status(401).json({ message: 'Invalid admin password' });

                user = await prisma.admin.create({
                    data: { name, email, password: hashedPassword!, hospitalId: hospitalPass.id }, // Add hospitalId
                });
                break;

            case 'Doctor':
                if (!DocRequest.safeParse(req.body).success)
                    return res.status(400).json({ message: 'Invalid request' });

                hospitalPass = await prisma.hospital.findFirst({
                    where: {
                        name: req.body.hospitalName
                    }, select: {
                        doctorPass: true,
                        id: true,
                    }
                });
                if (!hospitalPass)
                    return res.status(404).json({ message: 'Hospital not found' });
                if (hospitalPass.doctorPass != req.body.hospitalDocpass)
                    return res.status(401).json({ message: 'Invalid doctor password' });

                user = await prisma.doctor.create({
                    data: {
                        name, email, password: hashedPassword!,
                        department: 'General',
                        specialty: req.body.speciality || "General",
                        hospitalId: hospitalPass.id,
                        workingdays: Number(req.body.workingdays)
                    },
                });
                break;

            case 'Patient':
                if (!PatientRequest.safeParse(req.body))
                    return res.status(400).json({ message: 'Invalid request' });

                user = await prisma.patient.create({
                    data: {
                        name, email, password: hashedPassword!,
                        age: Number(req.body.age),
                        contact: req.body.contact as string
                    },
                });
                break;

            case 'Receptionist':
                if (!ReceptionRequest.safeParse(req.body).success)
                    return res.status(400).json({ message: 'Invalid request' });

                hospitalPass = await prisma.hospital.findFirst({
                    where: {
                        name: req.body.hospitalName
                    }, select: {
                        receptionistPass: true,
                        id: true,
                    }
                });

                if (!hospitalPass)
                    return res.status(404).json({ message: 'Hospital not found' });
                if (hospitalPass.receptionistPass != req.body.hospitalReceptionpass)
                    return res.status(401).json({ message: 'Invalid receptionist password' });
                user = await prisma.receptionist.create({
                    data: {
                        name, email, password: hashedPassword!,
                        hospitalId: hospitalPass.id,
                    }
                });
                break;

            case 'Inventoryman':
                if (!roleSchema.safeParse(req.body).success)
                    return res.status(400).json({ message: 'Invalid request' });

                hospitalPass = await prisma.hospital.findFirst({
                    where: {
                        name: req.body.hospitalName
                    }, select: {
                        inventoryPass: true,
                        id: true,
                    }
                });
                if (!hospitalPass)
                    return res.status(404).json({ message: 'Hospital not found' });
                if (hospitalPass.inventoryPass != req.body.hospitalInventorypass)
                    return res.status(401).json({ message: 'Invalid inventory password' });
                user = await prisma.inventoryman.create({
                    data: {
                        name, email, password: hashedPassword!,
                        hospitalId: hospitalPass.id
                    }
                });
                break;

            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        const token = generateToken(user.id, role);
        res.json({ token, user: {...user, password: null} });
    } catch (error) {
        res.status(500).json({ message: 'User registration failed' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    if (!loginRequest.safeParse(req.body).success)
        return res.status(400).json({ message: 'Invalid request' });

    const { email, password, role } = req.body;

    try {
        let user: any; // Use any to handle different user types

        switch (role) {
            case 'Admin':
                user = await prisma.admin.findUnique({ where: { email } });
                break;
            case 'Doctor':
                user = await prisma.doctor.findUnique({ where: { email } });
                break;
            case 'Patient':
                user = await prisma.patient.findUnique({ where: { email } });
                break;
            case 'Inventoryman':
                user = await prisma.inventoryman.findUnique({ where: { email } });
                break;
            case 'Receptionist':
                user = await prisma.receptionist.findUnique({ where: { email } });
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        // Ensure user is not null and has a password
        if ((!user || !(await comparePassword(password, user.password)))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token based on user id and role
        const token = generateToken(user.id, role);
        res.json({ token, user: {...user, password: null} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
};