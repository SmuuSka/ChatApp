const server = require('./server');
const io = require('./socket');
const config = require('./utils/config');

io.on('connection', (socket) => {
  console.log('connected');
  socket.emit('message', 'moro');
});


server.listen(config.PORT, () => {
  console.log(`serveri on käynnissä portissa: ${config.PORT}`);
});
