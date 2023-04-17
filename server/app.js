const express = require('express');
const app = express();
const cors = require('cors');

const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const roomRouter = require('./controllers/rooms');

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/chat', roomRouter);

const queries = require('./queries');
queries.createUserTable();

app.get('/', (request, response) => {
  return response.send('<h1>morjesta pöytään</h1>');
});

module.exports = app;
