import jwt from 'jsonwebtoken';

import { Veterinary } from '../models/Veterinary.model.js';

export const checkAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    let token;

    try {
      token = req.headers.authorization.split(' ')[1];

      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

      req.veterinary = await Veterinary.findById(decodeToken.id).select(
        '-password -token -acknowledged -__v'
      );

      // TODO delete this!
      // console.log(req.veterinary);

      return next();
    } catch (error) {
      res.status(403).json({ msg: 'Invalid Token' });
    }

    if (!token) {
      const error = new Error('Invalid or non-existent Token.');

      return res.status(403).json({ msg: error.message });
    }

    next();
  }

  // const error = new Error('Invalid or missing Token');
  // res.status(403).json({ msg: error.message });

  next();
};
