const express = require('express');
const { getMongoDb } = require('../../api-lib/mongodb');
const { findCollectibleByCode, markCodeAsRedeemed } = require('../../api-lib/db/collectibles');
const router = express.Router();

// POST route to handle collectible code redemption
router.post('/', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Redemption code is required' });
  }

  const db = await getMongoDb();

  // Check if collectible exists for the code
  const collectible = await findCollectibleByCode(db, code);

  if (!collectible) {
    return res.status(404).json({ error: 'Collectible not found or code invalid' });
  }

  // Optionally, mark the code as redeemed to prevent reuse
  await markCodeAsRedeemed(db, code);

  res.status(200).json({ collectible });
});

module.exports = router;
