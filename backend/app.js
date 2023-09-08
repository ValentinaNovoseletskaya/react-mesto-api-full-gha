const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./middlewares/errors/NotFoundError');
const { signInValidation, signUpValidation } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(cors);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res, next) => {
  const err = new NotFoundError('Страница не найдена');
  next(err);
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use(limiter);
app.listen(PORT);
