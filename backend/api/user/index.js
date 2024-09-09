const { ValidateProps } = require('../../api-lib/constants');
const { findUserByUsername, updateUserById } = require('../../api-lib/db');
const { auths, validateBody } = require('../../api-lib/middlewares');
const { getMongoDb } = require('../../api-lib/mongodb');
const slugUsername = require('../../lib/user').slugUsername;
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const express = require('express');

const upload = multer({ dest: '/tmp' });
const router = express.Router();

// Cloudinary config if applicable
if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

// Middleware for authentication
router.use(...auths);

// GET user route
router.get('/', async (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
});

// PATCH user route to update user data
router.patch(
  upload.single('profilePicture'),
  validateBody({
    type: 'object',
    properties: {
      username: ValidateProps.user.username,
      name: ValidateProps.user.name,
      bio: ValidateProps.user.bio,
    },
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      res.status(401).end();
      return;
    }

    const db = await getMongoDb();
    let profilePicture;

    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: 'fill',
      });
      profilePicture = image.secure_url;
    }

    const { name, bio } = req.body;
    let username;

    if (req.body.username) {
      username = slugUsername(req.body.username);
      if (
        username !== req.user.username &&
        (await findUserByUsername(db, username))
      ) {
        res
          .status(403)
          .json({ error: { message: 'The username has already been taken.' } });
        return;
      }
    }

    const user = await updateUserById(db, req.user._id, {
      ...(username && { username }),
      ...(name && { name }),
      ...(typeof bio === 'string' && { bio }),
      ...(profilePicture && { profilePicture }),
    });

    res.json({ user });
  }
);

// Config for file uploads
module.exports = router;
