// pages/api/admin/collectibles/add.js
import { getMongoDb } from '@/api-lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const db = await getMongoDb();
    const { name, description, image, glb, ownerId } = req.body;

    const collectible = {
      name,
      description,
      image,
      glb,
      ownerId,
      createdAt: new Date(),
    };

    await db.collection('collectibles').insertOne(collectible);

    res.status(201).json({ message: 'Collectible added successfully!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
