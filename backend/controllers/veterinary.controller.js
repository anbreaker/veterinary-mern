import { randomUUID } from 'crypto';

import { emailRegister } from '../helpers/emailRegister.js';
import { generateJWT } from '../helpers/generateJWT.js';
import { Veterinary } from '../models/Veterinary.model.js';

export const registerController = async (req, res) => {
  const { email, name } = req.body;

  const userExists = await Veterinary.findOne({ email });

  if (userExists) return res.status(409).json({ msg: 'This Veterinary already exists.' });

  try {
    // save veterinary
    const veterinary = new Veterinary(req.body);

    const newVeterinary = await veterinary.save();

    // Send email
    emailRegister({
      name,
      email,
      token: newVeterinary.token,
    });

    res.json({ msg: 'Register Veterinarian!', newVeterinary });
  } catch (error) {
    console.log(error);
  }
};

export const ackController = async (req, res) => {
  const { token } = req.params;

  const ackVeterinary = await Veterinary.findOne({ token });

  if (!ackVeterinary)
    return res.status(404).json({ msg: 'This Token Veterinary is not valid.' });

  try {
    ackVeterinary.token = null;
    ackVeterinary.acknowledged = true;

    await ackVeterinary.save();

    res.json({ msg: 'Register Veterinarian Confirmed!', ackVeterinary });
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await Veterinary.findOne({ email });

    if (!userExists) return res.status(401).json({ msg: 'Unauthorized Veterinary.' });

    // Confirmed user?
    if (!userExists.acknowledged) {
      return res
        .status(401)
        .json({ msg: 'Unauthorized Veterinary. Please confirm your Acount,' });
    }

    if (await userExists.checkPassword(password))
      res.json({ token: generateJWT(userExists.id) });
  } catch (error) {
    res.status(403).json({ msg: 'Unauthorized Veterinary.' });
  }
};

export const profileController = async (req, res) => {
  const { veterinary } = req;

  res.json({ veterinary });
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  const veterinaryExist = await Veterinary.findOne({ email });

  if (!veterinaryExist) {
    const error = new Error('Not Found Veterinary');
    return res.status(400).json({ message: error.message });
  }

  try {
    veterinaryExist.token = randomUUID();

    await veterinaryExist.save();

    res.json({
      msg: 'Sent a message to your email with the account recovery instructions.',
    });
  } catch (error) {
    console.log(error);
  }
};

export const confirmTokenController = async (req, res) => {
  const { token } = req.params;

  const validToken = await Veterinary.findOne({ token });

  if (!validToken) {
    const error = new Error('Not Valid Token!');
    return res.status(400).json({ message: error.message });
  }

  res.json({ msg: 'Token valid, veterinary exist.' });
};

export const newPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinary = await Veterinary.findOne({ token });

  if (!veterinary) {
    const error = new Error('Not Found Veterinary');
    return res.status(400).json({ message: error.message });
  }

  try {
    veterinary.token = null;
    veterinary.password = password;

    await veterinary.save();

    res.json({ msg: 'Password successfully changed' });
  } catch (error) {
    console.log(error);
  }
};
