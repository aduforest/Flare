async function createToken(db, { creatorId, type, expireAt }) {
  const { nanoid } = await import('nanoid'); // Use dynamic import
  const securedTokenId = nanoid(32);
  const token = {
    _id: securedTokenId,
    creatorId,
    type,
    expireAt,
  };
  await db.collection('tokens').insertOne(token);
  return token;
}

function findTokenByIdAndType(db, id, type) {
  return db.collection('tokens').findOne({
    _id: id,
    type,
  });
}

function findAndDeleteTokenByIdAndType(db, id, type) {
  return db
    .collection('tokens')
    .findOneAndDelete({ _id: id, type })
    .then(({ value }) => value);
}

module.exports = {
  findTokenByIdAndType,
  findAndDeleteTokenByIdAndType,
  createToken,
};
