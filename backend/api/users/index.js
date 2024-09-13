const express = require('express');
const { ValidateProps } = require('../../api-lib/constants');
const { findUserByEmail, findUserByUsername, insertUser } = require('../../api-lib/db');
const { getMongoDb } = require('../../api-lib/mongodb');
const isEmail = require('validator/lib/isEmail');
const normalizeEmail = require('validator/lib/normalizeEmail');
const slug = require('slug');

const router = express.Router();

// Slugify function for usernames
const slugUsername = (username) => slug(username, '_');

router.post('/', async (req, res) => {
  const db = await getMongoDb();

  let { username, name, email, password } = req.body;
  username = slugUsername(username);
  email = normalizeEmail(email);

  if (!isEmail(email)) {
    return res.status(400).json({ error: { message: 'The email you entered is invalid.' } });
  }
  if (await findUserByEmail(db, email)) {
    return res.status(403).json({ error: { message: 'The email has already been used.' } });
  }
  if (await findUserByUsername(db, username)) {
    return res.status(403).json({ error: { message: 'The username has already been taken.' } });
  }

  const user = await insertUser(db, {
    email,
    originalPassword: password,
    bio: '',
    name,
    username,
  });

  res.status(201).json({ user });
});

module.exports = router;
