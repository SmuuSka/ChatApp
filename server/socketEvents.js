/* eslint-disable max-len */
/* eslint-disable comma-dangle */
const queries = require('./queries');

const eventHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`socket: käyttäjä liittyi`);

    socket.on('message', (message) => {
      const currentRoom = socket.currentRoom;
      const {content, from, time} = message;
      socket.to(currentRoom).emit('message', {message_content: content, username: from, time: time});
      console.log({message_content: content, username: from, time: time});
      console.log(socket.rooms);
      console.log(`
        socket: new message ${message} from user: ${from} in ${currentRoom}`
      );
    });

    socket.on('disconnect', () => {
      console.log('socket: käyttäjä poistui.');
    });

    socket.on('join-room', (roomID, user) => {
      socket.currentRoom = roomID;
      socket.rooms.forEach((room) => {
        socket.leave(room);
      });
      socket.join(roomID);
      socket.emit('join-room', roomID);
      console.log(`joined room ${roomID}`);
      queries.setUserRooms(roomID, user);
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
