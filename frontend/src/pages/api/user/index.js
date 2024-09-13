// frontend/src/pages/api/user/index.js

import { auths, validateBody } from '@/api-lib/middlewares';
import { getUserById, updateUserById } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(...auths);

// GET /api/user - Get the authenticated user's data
handler.get(async (req, res) => {
  if (!req.user) {
    return res.status(401).end('Not authenticated');
  }

  const db = await getMongoDb();
  const user = await getUserById(db, req.user._id);

  if (!user) {
    return res.status(404).end('User not found');
  }

  res.json({ user });
});

// PATCH /api/user - Update the authenticated user's data
handler.patch(
  validateBody({
    type: 'object',
    properties: {
      name: { type: 'string' },
      // Include other user properties you wish to allow updates for
    },
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end('Not authenticated');
    }

    const db = await getMongoDb();

    const updatedUser = await updateUserById(db, req.user._id, req.body);

    res.json({ user: updatedUser });
  }
);

export default handler;
