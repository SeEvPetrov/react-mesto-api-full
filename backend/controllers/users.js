const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, HASH_LENGTH } = require('../utils/config');
const {
  ErrorNotFound,
  AuthorizationError,
  customError,
} = require('../errors/index');

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, HASH_LENGTH);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: passwordHash,
    });
    res.status(200).send(user);
  } catch (err) {
    customError(err, req, res, next);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    customError(err, req, res, next);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new ErrorNotFound('Пользователь не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    customError(err, req, res, next);
  }
};

const getUserMe = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ErrorNotFound('Пользователь не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    customError(err, req, res, next);
  }
};

const updateUserInfo = async (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new ErrorNotFound('Пользователь не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    customError(err, req, res, next);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new ErrorNotFound('Пользователь не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    customError(err, req, res, next);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthorizationError('Неправильный логин или пароль');
    }
    const isUserValid = await bcrypt.compare(password, user.password);
    if (!isUserValid) {
      throw new AuthorizationError('Неправильный логин или пароль');
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );
    res.send({ token });
  } catch (err) {
    customError(err, req, res, next);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUserMe,
};
