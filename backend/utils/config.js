const { JWT_SECRET = 'secret-key', HASH_LENGTH = 10 } = process.env;

module.exports = { JWT_SECRET, HASH_LENGTH: Number(HASH_LENGTH) };
