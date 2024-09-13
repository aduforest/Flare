const express = require('express');
const { findUserWithEmailAndPassword } = require('../../api-lib/db');
const { getMongoDb } = require('../../api-lib/mongodb');
const router = express.Router();
const bcrypt = require('bcryptjs');

// POST: Log in
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const db = await getMongoDb();
    const user = await findUserWithEmailAndPassword(db, email, password);

    if (!user) {
      console.log('Invalid email or password:', { email });
      return res.status(403).json({ error: { message: 'Invalid email or password.' } });
    }

    // Assuming you want to use sessions
    req.session.user = user;

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// DELETE: Log out
router.delete('/', (req, res) => {
    console.log(req);
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Replace with your session cookie name if different
        return res.status(200).json({ message: 'Logged out successfully' });
      });
    } else {
      return res.status(200).json({ message: 'No active session' });
    }
  });
  

module.exports = router;
