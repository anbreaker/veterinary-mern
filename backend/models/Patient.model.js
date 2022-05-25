import mongoose from 'mongoose';

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    petName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    data: {
      type: Date,
      required: true,
    },
    veterinary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Veterinary',
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = mongoose.model('Patient', patientSchema);
