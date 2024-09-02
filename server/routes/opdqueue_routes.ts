import { Router } from "express";
import { deleteQueueUser, getDocQueue, getDocQueueStatus, getStatusArchive, postFutureStatus, putPending } from "../controllers/queueManageFuncs";

export const queueRouter = Router();

queueRouter.get('/queues/doctor/:doctorId', getDocQueue);

queueRouter.get('/queues/status/active', getDocQueueStatus);

queueRouter.get("queues/status/archive", getStatusArchive);

queueRouter.delete("/queues", deleteQueueUser);

queueRouter.put("/queues/mark-pending", putPending);

queueRouter.post('/future-references', postFutureStatus);