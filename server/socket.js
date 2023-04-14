const server = require('./server');

const socket = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

module.exports = socket;
