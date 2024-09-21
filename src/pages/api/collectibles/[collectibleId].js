// pages/api/collectibles/[collectibleId].js
import { ObjectId } from 'mongodb';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const collectible = await db.collection('collectibles').findOne({ _id: new ObjectId(req.query.collectibleId) });

  if (!collectible) {
    return res.status(404).json({ error: { message: 'Collectible not found' } });
  }

  res.json({ collectible });
});

export default handler;
