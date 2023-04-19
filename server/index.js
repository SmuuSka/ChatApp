const server = require('./server');
const io = require('./socket');
require('./socketEvents')(io);

server.listen(3003, () => {
  console.log(`serveri on käynnissä portissa: ${server.listening}`);
});
