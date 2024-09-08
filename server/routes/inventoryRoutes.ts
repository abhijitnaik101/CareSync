import { Router } from 'express';
import { fetchAllMedicines, addInventoryRecord, reorderByExpiry, reorderByOutstock } from '../controllers/InventoryController';

const inventoryRouter = Router();

// Fetch all medicines
inventoryRouter.get('/all-medicines', fetchAllMedicines);

// Add new inventory record
inventoryRouter.post('/add-inventory', addInventoryRecord);

// Reorder medicine by expiry
inventoryRouter.post('/expiry-order', reorderByExpiry);

// Reorder medicine by stock depletion
inventoryRouter.post('/outstock-order', reorderByOutstock);

export default inventoryRouter;
