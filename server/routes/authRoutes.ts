import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword, generateToken } from '../utils/auth'; // Adjust the path if needed

const router = Router();
const prisma = new PrismaClient();

// User registration route (for all roles)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  let hashedPassword: string | null = null;

  if (role !== 'reception') {
    if (!password) {
      return res.status(400).json({ message: 'Password is required for this role' });
    }
    hashedPassword = await hashPassword(password);
  }

  try {
    let user;
    switch (role) {
      case 'admin':
        user = await prisma.admin.create({
          data: { name, email, password: hashedPassword!, hospitalId: 1 }, // Add hospitalId
        });
        break;
      case 'doctor':
        user = await prisma.doctor.create({
          data: { name, email, password: hashedPassword!, department: 'General', specialties: [], hospitalId: 1 }, // Add hospitalId
        });
        break;
      case 'patient':
        user = await prisma.patient.create({
          data: { name, email, password: hashedPassword!, age: 30, hospitalId: 1 }, // Add hospitalId
        });
        break;
      case 'reception':
        user = await prisma.reception.create({
          data: { hospitalId: 1, appointmentdate: new Date() }, // No password required
        });
        break;
      case 'inventoryman':
        user = await prisma.inventoryman.create({
          data: { name, email, password: hashedPassword!, hospitalId: 1 }, // Add hospitalId
        });
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    const token = generateToken(user.id, role);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'User registration failed' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user: any; // Use any to handle different user types

    switch (role) {
      case 'admin':
        user = await prisma.admin.findUnique({ where: { email } });
        break;
      case 'doctor':
        user = await prisma.doctor.findUnique({ where: { email } });
        break;
      case 'patient':
        user = await prisma.patient.findUnique({ where: { email } });
        break;
      case 'inventoryman':
        user = await prisma.inventoryman.findUnique({ where: { email } });
        break;
      case 'reception':
        // Reception users may need to be identified differently
        const reception = await prisma.reception.findMany({ where: { hospitalId: 1 } });
        user = reception.length > 0 ? reception[0] : null;
        if (!user) return res.status(401).json({ message: 'Invalid reception credentials' });
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    // Ensure user is not null and has a password
    if (role !== 'reception' && (!user || !user.password || !(await comparePassword(password, user.password)))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token based on user id and role
    const token = generateToken(user.id, role);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

export default router;
