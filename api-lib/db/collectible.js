// api-lib/db/collectible.js
import { ObjectId } from 'mongodb';

export async function findCollectibleByCode(db, code) {
  return db.collection('collectibles').findOne({ code });
}

export async function insertCollectible(db, collectible) {
  return db.collection('collectibles').insertOne(collectible);
}

export async function findCollectiblesByUser(db, userId) {
  return db
    .collection('user_collectibles')
    .aggregate([
      { $match: { userId: new ObjectId(userId) } },
      {
        $lookup: {
          from: 'collectibles',
          localField: 'collectibleId',
          foreignField: '_id',
          as: 'collectible',
        },
      },
      { $unwind: '$collectible' },
    ])
    .toArray();
}

export async function insertUserCollectible(db, { userId, collectibleId }) {
  const doc = {
    userId: new ObjectId(userId),
    collectibleId: new ObjectId(collectibleId),
    redeemedAt: new Date(),
  };
  const { insertedId } = await db
    .collection('user_collectibles')
    .insertOne(doc);
  doc._id = insertedId;
  return doc;
}

export async function findUserCollectible(db, { userId, collectibleId }) {
  return db.collection('user_collectibles').findOne({
    userId: new ObjectId(userId),
    collectibleId: new ObjectId(collectibleId),
  });
}
