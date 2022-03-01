import { randomUUID } from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const veterinarySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: randomUUID(),
  },
  acknowledged: {
    type: Boolean,
    default: false,
  },
});

// middlewares mongoose
veterinarySchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

veterinarySchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

export const Veterinary = mongoose.model('Veterinary', veterinarySchema);
