import { generateJWT } from '../helpers/generateJWT.js';
import { Veterinary } from '../models/Veterinary.model.js';

export const registerController = async (req, res) => {
  const { email } = req.body;

  const userExists = await Veterinary.findOne({ email });

  if (userExists) return res.status(409).json({ msg: 'This Veterinary already exists.' });

  try {
    // save veterinary
    const veterinary = new Veterinary(req.body);

    const newVeterinary = await veterinary.save();

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

  res.status(403).json({ msg: 'Unauthorized Veterinary.' });
};

export const profileController = async (req, res) => {
  res.json({ msg: 'Profile' });
};
