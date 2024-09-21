// pages/api/collectibles/redeem.js
import {
  findCollectibleByCode,
  insertUserCollectible,
  findUserCollectible,
} from '@/api-lib/db/collectible';
import { getMongoDb } from '@/api-lib/mongodb';
import { auths, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc();

handler.use(...auths);

handler.post(
  validateBody({
    type: 'object',
    properties: {
      code: { type: 'string' },
    },
    required: ['code'],
    additionalProperties: false,
  }),
  async (req, res) => {
    console.log('req.body:', req.body);
    const db = await getMongoDb();

    const { code } = req.body;

    const collectible = await findCollectibleByCode(db, code);

    if (!collectible) {
      return res.status(400).json({ error: { message: 'Invalid code' } });
    }

    // Check if the user has already redeemed this collectible
    const userCollectible = await findUserCollectible(db, {
      userId: req.user._id,
      collectibleId: collectible._id,
    });

    if (userCollectible) {
      return res
        .status(400)
        .json({
          error: { message: 'You have already redeemed this collectible' },
        });
    }

    // Redeem the collectible for the user
    await insertUserCollectible(db, {
      userId: req.user._id,
      collectibleId: collectible._id,
    });

    res.json({ message: 'Collectible redeemed successfully' });
  },
);

export default handler;
