const { ObjectId } = require('mongodb');

// Find collectible by code
async function findCollectibleByCode(db, code) {
  return db.collection('collectibles').findOne({ code, redeemed: false });
}

// Mark collectible code as redeemed
async function markCodeAsRedeemed(db, code) {
  return db.collection('collectibles').updateOne({ code }, { $set: { redeemed: true } });
}

module.exports = {
  findCollectibleByCode,
  markCodeAsRedeemed,
};
