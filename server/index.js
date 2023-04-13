const app = require('./app');
const config = require('./utils/config');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('connected');
  socket.emit('message', 'moro');
});

app.get('/', (request, response) => {
  return response.send('lol');
});

server.listen(config.PORT, () => {
  console.log(`serveri pyörii portissa ${config.PORT}`);
});
