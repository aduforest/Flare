import { ValidateProps } from '@/api-lib/constants';
import { findUserByUsername, updateUserById } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import slugUsername from '@/lib/user';  // If slugUsername is available from your lib folder
import cloudinary from 'cloudinary';
import multer from 'multer';
import nextConnect from 'next-connect';

const upload = multer({ dest: '/tmp' });

const handler = nextConnect();

if (process.env.CLOUDINARY_URL) {
  const { hostname: cloud_name, username: api_key, password: api_secret } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

// GET user route
handler.get(...auths, async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ user: null });
    }
    return res.json({ user: req.user });
  } catch (error) {
    console.error('Error in /api/user GET route:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH user route to update user data
handler.patch(
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
  ...auths,
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
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
      if (username !== req.user.username && (await findUserByUsername(db, username))) {
        return res.status(403).json({ error: { message: 'The username has already been taken.' } });
      }
    }

    const user = await updateUserById(db, req.user._id, {
      ...(username && { username }),
      ...(name && { name }),
      ...(typeof bio === 'string' && { bio }),
      ...(profilePicture && { profilePicture }),
    });

    return res.json({ user });
  }
);

export default handler;
