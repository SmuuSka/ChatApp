const server = require('./server');
const config = require('./utils/config');
const io = require('./socket');
require('./socketEvents')(io);

server.listen(3003, () => {
  console.log(`serveri on käynnissä portissa: ${3003}`);
});
