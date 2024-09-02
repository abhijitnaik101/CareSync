import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { PrismaClient } from '@prisma/client';
import { ticketRouter } from './routes/ticket_routes';
import { queueRouter } from './routes/opdqueue_routes';
import { bedManage } from './routes/bedManageRoutes';
import { mlRouter } from './routes/mlRoutes';
import inventoryRouter from './routes/inventoryRoutes';
import { hospitalRoute } from './routes/hospitalroute';

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
