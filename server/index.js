const server = require('./server');
const io = require('./socket');
require('./socketEvents')(io);

server.listen(process.env.PORT, () => {
  console.log(`serveri on käynnissä portissa: ${process.env.PORT}`);
});
