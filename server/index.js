const io = require('./socket');
const server = require('./server');
const config = require('./utils/config');
require('./socketEvents')(io);

server.listen(config.PORT, () => {
  console.log(`serveri on käynnissä portissa: ${config.PORT}`);
});
