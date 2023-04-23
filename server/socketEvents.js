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

    socket.on('join-room', (roomID) => {
      socket.currentRoom = roomID;
      socket.rooms.forEach((room) => {
        socket.leave(room);
      });
      socket.join(roomID);
      socket.emit('join-room', roomID);
      console.log(`joined room ${roomID}`);
    });

    socket.on('join-room-button', async (name, password) => {
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
        console.log(`joined room id: ${id} name: ${name}`);
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
