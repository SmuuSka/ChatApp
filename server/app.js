const express = require('express');
const app = express();
const cors = require('cors');

const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');


app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
