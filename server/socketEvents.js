const eventHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`socket: käyttäjä liittyi`);

    socket.on('message', (message, roomID) => {
      socket.to(roomID).emit('message', message);
      console.log(socket.rooms);
      console.log(`socket: new message ${message} to room ${roomID}`);
    });

    socket.on('disconnect', () => {
      console.log('socket: käyttäjä poistui.');
    });

    socket.on('join-room', (roomID) => {
      socket.join(roomID);
      console.log(`joined room ${roomID}`);
    });
  });
};

module.exports = eventHandler;
