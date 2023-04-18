/* eslint-disable max-len */
/* eslint-disable comma-dangle */

const eventHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`socket: käyttäjä liittyi`);

    socket.on('message', (message, user) => {
      const currentRoom = socket.currentRoom;
      socket.to(currentRoom).emit('message', {message_content: message, username: user});
      console.log(socket.rooms);
      console.log(`
        socket: new message ${message} from user: ${user} in ${currentRoom}`
      );
    });

    socket.on('disconnect', () => {
      console.log('socket: käyttäjä poistui.');
    });

    socket.on('join-room', (roomID) => {
      socket.currentRoom = roomID;
      socket.rooms.forEach((room) => {
        socket.leave(room);
      });
      socket.join(roomID);
      socket.emit('join-room', roomID);
      console.log(`joined room ${roomID}`);
    });

    socket.on('setUsername', (username) => {
      socket.user = username;
    });

    socket.on('leave-room', (roomID) => {
      socket.rooms.forEach((room) => {
        socket.leave(room);
      });
    });
  });
};

module.exports = eventHandler;
