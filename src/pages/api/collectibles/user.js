// pages/api/collectibles/user.js
import { findCollectiblesByUser } from '@/api-lib/db/collectible';
import { getMongoDb } from '@/api-lib/mongodb';
import { auths } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  // Get the userId from the query parameters, if available, or use the logged-in user's ID
  const userId = req.query.userId || req.user._id;

  // Fetch collectibles for the user
  const collectibles = await findCollectiblesByUser(db, userId);

  res.json({ collectibles });
});

export default handler;
