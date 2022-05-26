import { Patient } from '../models/Patient.model.js';

export const patientRegisterController = async (req, res) => {
  const patient = new Patient(req.body);
  patient.veterinary = req.veterinary._id;

  try {
    const newPatient = await patient.save();

    res.json(newPatient);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Error registering patient',
      error,
    });
  }
};

export const getAllPatientsController = async (req, res) => {
  try {
    const patients = await Patient.find().where('veterinary').equals(req.veterinary);

    res.json(patients);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Error getting patients',
      error,
    });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (patient.veterinary._id.toString() !== req.veterinary._id.toString()) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    res.json({ patient });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: 'Patient not found',
      error,
    });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (patient.veterinary._id.toString() !== req.veterinary._id.toString()) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    // Updated patient
    patient.name = req.body.name || patient.name;
    patient.owner = req.body.owner || patient.owner;
    patient.email = req.body.email || patient.email;
    patient.data = req.body.data || patient.data;
    patient.symptoms = req.body.symptoms || patient.symptoms;

    const updatedPatient = await patient.save();

    res.json({ msg: 'Patient Updated', updatedPatient });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: 'Patient not found',
      error,
    });
  }
};

export const deletetePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (patient.veterinary._id.toString() !== req.veterinary._id.toString()) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    await patient.deleteOne();

    res.json({ msg: 'Patient Deleted' });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: 'Patient not found',
      error,
    });
  }
};
