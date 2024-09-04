const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/AuthRoutes');
const { PrismaClient } = require('@prisma/client');
const { ticketRouter } = require('./routes/TicketRoutes');
const { queueRouter } = require('./routes/OPDQueueRoutes');
const { bedManage } = require('./routes/BedManageRoutes');
const { mlRouter } = require('./routes/MLRoutes');
const inventoryRouter = require('./routes/InventoryRoutes');
const { hospitalRoute } = require('./routes/HospitalRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/booking', ticketRouter);
app.use('/queuing', queueRouter);
app.use('/beds', bedManage);
app.use('/recommend', mlRouter);
app.use('/inventory', inventoryRouter);
app.use('/', hospitalRoute);

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.listen(PORT, () => {
  prisma.$connect();
  console.log(`Server running on port ${PORT}`);
});