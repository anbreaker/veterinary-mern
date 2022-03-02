import { Router } from 'express';
import {
  ackController,
  confirmTokenController,
  forgotPasswordController,
  loginController,
  profileController,
  registerController,
  newPasswordController,
} from '../controllers/veterinary.controller.js';
import { checkAuth } from '../middleware/authMiddleware.js';

const router = Router();

//* Public Routes
// /api/veterinarians/register
router.post('/register', registerController);

// /api/veterinarians/ack/:token
router.get('/ack/:token', ackController);

// /api/veterinarians/login
router.post('/login', loginController);

// /api/veterinarians/forgot-password
router.post('/forgot-password', forgotPasswordController);

// /api/veterinarians/forgot-password/:token
router.get('/forgot-password/:token', confirmTokenController);

// /api/veterinarians/forgot-password/:token
router.post('/forgot-password/:token', newPasswordController);

//Example with only one line
// router.route('/forgot-password/:token').get(confirmTokenController).post(newPasswordController);

//* Private Routes
// /api/veterinarians/profile
router.get('/profile', checkAuth, profileController);

export default router;
