const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/userModel');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const checkuser = await User.findOne({ email: email });

  if (!checkuser) {
    return res.status(404).send('User not found');
  }
  const checkpassword = await User.findOne({ email: email, password: password });
  if (!checkpassword) {
    return res.status(404).send('Password not match');
  }
  const token = jwt.sign({ email }, config.jwtSecret);
  res.json({ token });
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    return res.status(201).json({ state: 'success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', authMiddleware.authenticate, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
