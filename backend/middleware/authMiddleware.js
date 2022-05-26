import jwt from 'jsonwebtoken';

import { Veterinary } from '../models/Veterinary.model.js';

export const checkAuth = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

      req.veterinary = await Veterinary.findById(decodeToken.id).select(
        '-password -token -acknowledged -__v'
      );

      if (!token) {
        const error = new Error('Invalid or non-existent Token.');

        return res.status(403).json({ msg: error.message });
      }

      return next();
    } else {
      const error = new Error('No Token provided.');

      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    console.log('eror de middleware');
    res.status(403).json({ msg: 'Invalid Token' });
  }
};
