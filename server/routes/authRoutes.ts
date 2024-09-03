import { Router } from 'express';
import { loginUser, registerUser } from './AuthFunc';

const router = Router();

// User registration route (for all roles)
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

export default router;
