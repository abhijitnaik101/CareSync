import { Router } from 'express';
import { reorderByExpiry, reorderByOutstock } from '../controllers/InventoryController';

const inventoryRouter = Router();

inventoryRouter.post('/expiry-order', reorderByExpiry);
inventoryRouter.post('/outstock-order', reorderByOutstock);

export default inventoryRouter;
