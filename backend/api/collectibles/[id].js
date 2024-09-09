const express = require('express');
const { getMongoDb } = require('../../api-lib/mongodb');
const { ObjectId } = require('mongodb');
const router = express.Router();

// GET route to fetch collectible details by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await getMongoDb();

  const collectible = await db.collection('collectibles').findOne({ _id: new ObjectId(id) });

  if (!collectible) {
    return res.status(404).json({ error: 'Collectible not found' });
  }

  res.status(200).json({ collectible });
});

module.exports = router;
