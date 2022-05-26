import { Patient } from '../models/Patient.model.js';

export const patientRegisterController = async (req, res) => {
  const patient = new Patient(req.body);
  patient.veterinary = req.veterinary._id;

  try {
    const newPatient = await patient.save();

    res.json(newPatient);
  } catch (error) {
    res.status(500).json({
      message: 'Error registering patient',
      error,
    });
  }
};

export const getAllPatientsController = async (req, res) => {
  try {
    const patients = await Patient.find().where('veterinary').equals(req.veterinary._id);

    res.json(patients);
  } catch (error) {
    res.status(500).json({
      message: 'Error getting patients',
      error,
    });
  }
};
