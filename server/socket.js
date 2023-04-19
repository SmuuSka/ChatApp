const server = require('./server');

const socket = require('socket.io')(server, {
  cors: {
    origin: '*',
    credentials: false,
  },
});

module.exports = socket;
