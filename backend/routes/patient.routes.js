import { Router } from 'express';
import {
  registerController,
  getAllPatientsController,
} from '../controllers/patient.controller.js';

const router = Router();

//* Public Routes
// /api/patients/register
router.post('/register', registerController);

// /api/patients/getAllPatients
router.get('/patients', getAllPatientsController);

export default router;
