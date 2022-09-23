require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const app = express();
const { routes } = require('./routes');
const { errorhandler } = require('./middlewares/errorHandler');

app.use(helmet());
// app.use(limiter);
app.use(cookieParser());
app.use(cors());

app.use(routes);
app.use(errors());
app.use(errorhandler);

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT);
    console.log(`Сервер запущен на ${PORT} порту`);
  } catch (err) {
    console.log(`Возникла ошибка: ${err} `);
  }
}

main();
