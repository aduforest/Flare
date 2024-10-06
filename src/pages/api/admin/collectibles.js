// pages/api/admin/collectibles.js
import { getMongoDb } from '@/api-lib/mongodb';

export default async function handler(req, res) {
  const db = await getMongoDb();

  // Fetch all collectibles along with their owners
  const collectibles = await db.collection('collectibles').aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'ownerId',
        foreignField: '_id',
        as: 'owner',
      },
    },
    {
      $unwind: '$owner',
    },
  ]).toArray();

  res.status(200).json({ collectibles });
}
