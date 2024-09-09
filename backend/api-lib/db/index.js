const post = require('./post');
const token = require('./token');
const user = require('./user');

module.exports = {
  ...post,
  ...token,
  ...user,
};
