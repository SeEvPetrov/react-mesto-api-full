const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');
const { AuthorizationError } = require('../errors/index');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Авторизуйтесь');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new AuthorizationError('Авторизуйтесь'));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
