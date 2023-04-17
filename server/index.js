const server = require('./server');
const config = require('./utils/config');
const io = require('./socket');
require('./socketEvents')(io);

server.listen(config.PORT, () => {
  console.log(`serveri on käynnissä portissa: ${config.PORT}`);
});
