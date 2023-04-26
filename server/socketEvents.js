/* eslint-disable max-len */
/* eslint-disable comma-dangle */
const findRoom = require('./queries').findRoom;

const eventHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`socket: käyttäjä liittyi`);

    socket.on('message', (message) => {
      const currentRoom = socket.currentRoom;
      const {content, from, time} = message;
      if (content !== '' && content.length < 255) {
        socket.to(currentRoom).emit('message', {message_content: content, username: from, created_at: time});
      }
      console.log(`socket: new message ${message} from user: ${from} in ${currentRoom}`);
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
      const usernames = getUsernames(io, roomID);
      socket.username = setUsername(usernames, socket.username);
      socket.emit('get-clients', usernames.filter((name) => name !== null));
    });

    socket.on('join-room-button', async (name, password, user) => {
      try {
        console.log('pass '+password);
        const room = (await findRoom(name, password))[0];
        if (room===undefined) {
          return socket.emit('not found', name);
        }
        const id = room.room_id;
        console.log(id);
        socket.rooms.forEach((room) => {
          socket.leave(room);
        });
        socket.currentRoom = id;
        socket.join(id);
        socket.emit('join-room', id, user);
        socket.username = user;
        const usernames = getUsernames(io, id);
        socket.username = setUsername(usernames, socket.username);
        socket.emit('get-clients', usernames.filter((name) => name !== null));
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

const setUsername = (usernames, username) => {
  const nameCount = usernames.filter((name) => name === username).length;
  console.log(nameCount);
  if (nameCount> 1) {
    return `${username} (${nameCount})`;
  }
  return username;
};

const getUsernames = (io, id) => {
  const sockets = io.sockets.adapter.rooms.get(id);
  const socketIds = [...sockets];
  const usernames = socketIds.map((socketId) => {
    const socketObj = io.sockets.sockets.get(socketId);
    return socketObj ? socketObj.username : null;
  });
  return usernames;
};

module.exports = eventHandler;
