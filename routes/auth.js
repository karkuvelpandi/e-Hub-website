import express from 'express';
import { addUser, findUser } from '../models/User.js';
import { generateToken, verifyToken } from '../utils/jwt.js';
import bcrypt from 'bcrypt';
const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (findUser(email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  await addUser(email, password);
  return res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = findUser(email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = generateToken({ email });
  return res.status(200).json({ token });
});

export default router
