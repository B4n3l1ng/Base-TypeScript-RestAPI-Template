import express from 'express';
import { User } from '../models/User.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.status(400).json({ message: 'Please provide email and password.' });
    return;
  }
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(406).json({ message: 'That email already exists, please try a different one.' });
    } else {
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(password, salt);
      await User.create({ email, hashedPassword });
      res.status(201).json({ message: 'User created successfully' });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      if (bcrypt.compareSync(password, foundUser.hashedPassword)) {
        const authToken = jwt.sign({ expiresIn: '6h', userId: foundUser._id }, process.env.TOKEN_SECRET! as string, { algorithm: 'HS256' });
        res.status(200).json(authToken);
      } else {
        res.status(401).json({ message: 'Incorrect password.' });
      }
    } else {
      res.status(404).json({ message: 'No user with that email was found.' });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get('/verify', isAuthenticated, (req, res, next) => {
  // You need to use the middleware there, if the request passes the middleware, it means your token is good
  console.log(req.payload);
  res.status(200).json(req.payload);
});

export default router;
