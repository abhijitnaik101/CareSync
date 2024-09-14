// File: src/server.ts

import express, { Request, Response } from 'express';
import { Server } from "socket.io";
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/authRoutes';
import { ticketRouter } from './routes/TicketRoutes';
import { queueRouter } from './routes/OPDQueueRoutes';
import { bedManage } from './routes/bedManageRoutes';
import { mlRouter } from './routes/mlRoutes';
import inventoryRouter from './routes/inventoryRoutes';
import { hospitalRoute } from './routes/HospitalRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const END_POINT = process.env.END_POINT || 'http://localhost:5173';

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/booking', ticketRouter);
app.use('/queuing', queueRouter);
app.use('/beds', bedManage);
app.use('/recommend', mlRouter);
app.use('/inventory', inventoryRouter);
app.use('/', hospitalRoute);

// Prisma Client Initialization
export const prisma = new PrismaClient();

// Create HTTP server
export const server = http.createServer(app);


// Socket.io setup
export const io = new Server(server, {
    cors: {
        origin: END_POINT,
        methods: ['GET', 'POST'],
    }
});
io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('book-appointment', (data) => {
        console.log("book appointment data recieved from patient", data);
        io.emit('patient-request', data);
    });

    socket.on('sendTicketToUser', (data) => {
        console.log("book appointment data recieved from receptionist", data);
        io.emit('fetch-ticket');
        io.emit('UserTicket', data);
    })

    socket.on('doctorFetchQueue', ()=> {
       io.emit('doctorFetchQueue');
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });

    // Example event listener
    socket.on('message', (message: string) => {
        console.log(`Message received: ${message}`);
        io.emit('message', message); // Broadcast the message to all clients
    });
});

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Server is up and running on port ${PORT}`);
});

// Start server
server.listen(PORT, async () => {
    await prisma.$connect();
    console.log(`Server running on port ${PORT}`);
});
