import { Router } from 'express';
import {
  patientRegisterController,
  getAllPatientsController,
  getPatientById,
  updatePatient,
  deletetePatient,
} from '../controllers/patient.controller.js';

import { checkAuth } from '../middleware/authMiddleware.js';

const router = Router();

//* Public Routes
// /api/patients/register
router.post('/register', checkAuth, patientRegisterController);

// /api/patient/getAllPatients
router.get('/getAllPatients', checkAuth, getAllPatientsController);

// /api/patients/:id
router.get('/getPatient/:id', checkAuth, getPatientById);

// /api/patient/:id
router.put('/updatePatient/:id', checkAuth, updatePatient);

// /api/patient/:id
router.delete('/deletePatient/:id', checkAuth, deletetePatient);

export default router;
