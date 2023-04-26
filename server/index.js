const server = require('./server');
const io = require('./socket');
require('./socketEvents')(io);

const PORT = '3003';

server.listen(PORT, () => {
  console.log(`serveri on käynnissä portissa: ${PORT}`);
});
