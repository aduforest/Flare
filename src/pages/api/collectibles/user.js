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

  const collectibles = await findCollectiblesByUser(db, req.user._id);

  res.json({ collectibles });
});

export default handler;
