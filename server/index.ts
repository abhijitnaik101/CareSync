import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes';
import { PrismaClient } from '@prisma/client';
import { ticketRouter } from './routes/TicketRoutes';
import { queueRouter } from './routes/OPDQueueRoutes';
import { bedManage } from './routes/BedManageRoutes';
import { mlRouter } from './routes/MLRoutes';
import inventoryRouter from './routes/InventoryRoutes';
import { hospitalRoute } from './routes/HospitalRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/booking', ticketRouter);
app.use('/queuing', queueRouter);
app.use('/beds', bedManage);
app.use('/recommend', mlRouter);
app.use('/inventory',inventoryRouter);
app.use('/', hospitalRoute);

const PORT = process.env.PORT || 3000;
export const prisma = new PrismaClient();

app.listen(PORT, () => {
  prisma.$connect();
  console.log(`Server running on port ${PORT}`);
});
