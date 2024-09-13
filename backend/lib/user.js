const slug = require('slug');

// Slugify function for usernames
const slugUsername = (username) => slug(username, '_');

module.exports = { slugUsername };
