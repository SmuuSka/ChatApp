const server = require('./server');
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

module.exports = io;
