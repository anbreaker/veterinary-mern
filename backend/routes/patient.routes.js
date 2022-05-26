import { Router } from 'express';
import {
  patientRegisterController,
  getAllPatientsController,
} from '../controllers/patient.controller.js';

import { checkAuth } from '../middleware/authMiddleware.js';

const router = Router();

//* Public Routes
// /api/patients/register
router.post('/register', checkAuth, patientRegisterController);

// /api/patients/getAllPatients
router.get('/getAllPatients', checkAuth, getAllPatientsController);

export default router;
