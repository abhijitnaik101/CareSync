import express from 'express';
import { Server } from "socket.io";
import http from 'http';
import cors from 'cors';

import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { PrismaClient } from '@prisma/client';
import { ticketRouter } from './routes/TicketRoutes';
import { queueRouter } from './routes/OPDQueueRoutes';
import { bedManage } from './routes/bedManageRoutes';
import { mlRouter } from './routes/mlRoutes';
import inventoryRouter from './routes/inventoryRoutes';
import { hospitalRoute } from './routes/HospitalRoutes';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/booking', ticketRouter);
app.use('/queuing', queueRouter);
app.use('/beds', bedManage);
app.use('/recommend', mlRouter);
app.use('/inventory', inventoryRouter);
app.use('/', hospitalRoute);

const PORT = process.env.PORT || 3000;
export const prisma = new PrismaClient();

//Socket code
const END_POINT = 'http://localhost:5173';

const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: END_POINT,
        methods: ["GET", "POST"]
    }
})

app.listen(PORT, () => {
  prisma.$connect();
  console.log(`Server running on port ${PORT}`);
});