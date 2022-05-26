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
    email: {
      type: String,
      required: true,
      trim: true,
    },
    data: {
      type: Date,
      required: true,
      default: Date.now,
    },
    symptoms: {
      type: String,
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
