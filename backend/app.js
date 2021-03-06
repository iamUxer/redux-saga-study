const { sequelize } = require('./models');
sequelize.sync();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const PORT = 3010;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');

const app = express();

app.use(cors());
// app.use(auth);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
