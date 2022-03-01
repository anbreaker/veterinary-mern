import { Router } from 'express';
import {
  ackController,
  loginController,
  profileController,
  registerController,
} from '../controllers/veterinary.controller.js';
import { checkAuth } from '../middleware/authMiddleware.js';

const router = Router();

// /api/veterinarians/register
router.post('/register', registerController);

// /api/veterinarians/ack/:token
router.get('/ack/:token', ackController);

// /api/veterinarians/login
router.post('/login', loginController);

// /api/veterinarians/profile
router.get('/profile', checkAuth, profileController);

export default router;
