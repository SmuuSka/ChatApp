const express = require('express');
const app = express();
const cors = require('cors');

const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const roomRouter = require('./controllers/rooms');
const messageRouter = require('./controllers/messages');

app.use(express.json());
const corsOptions = {
  origin: '*',
};


app.use(cors(corsOptions));

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/messages', messageRouter);

const queries = require('./queries');
queries.createUserTable();


app.get('/', (request, response) => {
  return response.send({ name: "samu" });
});

module.exports = app;
