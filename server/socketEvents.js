/* eslint-disable max-len */
/* eslint-disable comma-dangle */
const findRoom = require('./queries').findRoom;

const eventHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`socket: käyttäjä liittyi`);

    socket.on('message', (message) => {
      const currentRoom = socket.currentRoom;
      const {content, from, time} = message;
      socket.to(currentRoom).emit('message', {message_content: content, username: from, created_at: time});
      console.log({message_content: content, username: from, time: time});
      console.log(socket.rooms);
      console.log(`
        socket: new message ${message} from user: ${from} in ${currentRoom}`
      );
    });

    socket.on('disconnect', () => {
      console.log('socket: käyttäjä poistui.');
    });

    socket.on('join-room', async (roomID, username) => {
      socket.rooms.forEach((room) => {
        socket.leave(room);
      });
      socket.currentRoom = roomID;
      socket.join(roomID);
      console.log(username);
      socket.emit('join-room', roomID);
      console.log(`joined room ${roomID}`);
      socket.username = username;
      const sockets = io.sockets.adapter.rooms.get(roomID);
      const socketIds = [...sockets];
      const usernames = socketIds.map((socketId) => {
        const socketObj = io.sockets.sockets.get(socketId);
        return socketObj ? socketObj.username : null;
      });
      console.log('usernames');
      console.log(usernames);
      socket.emit('get-clients', usernames.filter((name) => name !== null));
    });

    socket.on('join-room-button', async (name, password, user) => {
      // TODO: testaa salasanaa
      try {
        const room = (await findRoom(name, password))[0];
        console.log(room);
        const id = room.room_id;
        console.log(id);
        socket.rooms.forEach((room) => {
          socket.leave(room);
        });
        socket.currentRoom = id;
        socket.join(id);
        socket.emit('join-room', id);
      } catch (e) {
        console.log('room not found');
        console.log(e);
      }
    });

    socket.on('leave-room', (roomID) => {
      socket.rooms.forEach((room) => {
        socket.leave(room);
      });
      socket.emit('leave-room', roomID);
    });
  });
};

module.exports = eventHandler;
