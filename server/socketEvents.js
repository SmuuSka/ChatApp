/* eslint-disable max-len */
/* eslint-disable comma-dangle */
const findRoom = require('./queries').findRoom;

/**

Käsittelee socket.io -tapahtumia.

@param {Object} io - socket.io:n server-instanssi.

@return {void}
*/
const eventHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('socket: käyttäjä liittyi');

    /**

  Käsittelee 'message'-tapahtumaa, joka liittyy viestien lähettämiseen.
  @param {Object} message - Viestin sisältö, käyttäjän nimi ja aika.
  @returns {void}
  */
    socket.on('message', (message) => {
      const currentRoom = socket.currentRoom;
      const {content, from, time} = message;
      if (content !== '' && content.length < 255) {
        socket.to(currentRoom).emit('message', {message_content: content, username: from, created_at: time});
      }
      console.log(`socket: uusi viesti ${message} käyttäjältä: ${from} huoneessa ${currentRoom}`);
    });
    /**

  Käsittelee 'disconnect'-tapahtumaa, joka liittyy yhteyden katkaisuun.
  @returns {void}
  */
    socket.on('disconnect', () => {
      console.log('socket: käyttäjä poistui.');
    });
    /**

  Käsittelee huoneeseen liittymistä ilman salasanaa.
  @async
  @param {string} roomID - Huoneen ID.
  @param {string} username - Käyttäjänimi.
  @returns {void}
  */
    socket.on('join-room', async (roomID, username) => {
      socket.rooms.forEach((room) => {
        socket.leave(room);
      });
      socket.currentRoom = roomID;
      socket.join(roomID);
      console.log(username);
      socket.emit('join-room', roomID);
      console.log(`liitytty huoneeseen ${roomID}`);
      socket.username = username;
      const usernames = getUsernames(io, roomID);
      socket.username = setUsername(usernames, socket.username);
      socket.emit('get-clients', usernames.filter((name) => name !== null));
    });
    /**
 * Yhdistää käyttäjän huoneeseen huoneen nimen, salasanan ja käyttäjän nimimerkin perusteella. Tätä käytetään Join & Create popoutin kautta liittymiseen.
 *
 * @param {string} name - Huoneen nimi
 * @param {string} password - Huoneen salasana
 * @param {string} user - Käyttäjän nimimerkki
 */
    socket.on('join-room-button', async (name, password, user) => {
      try {
        console.log('pass ' + password);
        const room = (await findRoom(name, password))[0];
        console.log(room);
        const id = room.room_id;
        console.log(id);
        socket.rooms.forEach((room) => {
          socket.leave(room);
        });
        socket.currentRoom = id;
        socket.join(id);
        socket.emit('join-room', id, user);
      } catch (e) {
        console.log('huonetta ei löytynyt');
        console.log(e);
      }
    });

    /**
 * Poistaa käyttäjän huoneesta huoneen ID:n perusteella.
 *
 * @param {string} roomID - Huoneen ID
 */
    socket.on('leave-room', (roomID) => {
      socket.rooms.forEach((room) => {
        socket.leave(room);
      });
      socket.emit('leave-room', roomID);
    });

    /**
 * Asettaa käyttäjänimen, joka on yksilöllinen huoneessa, ja lisää nimelle indeksin, jos samannimisiä käyttäjiä on jo huoneessa.
 *
 * @param {Array} usernames - Taulukko, joka sisältää huoneessa olevien käyttäjien nimet
 * @param {string} username - Käyttäjänimi, joka asetetaan yksilölliseksi huoneessa
 * @return {string} Käyttäjänimi, joka on yksilöllinen huoneessa
 */
    const setUsername = (usernames, username) => {
      const nameCount = usernames.filter((name) => name === username).length;
      console.log(nameCount);
      if (nameCount > 1) {
        return `${username} (${nameCount})`;
      }
      return username;
    };

    /**
 * Palauttaa taulukon huoneessa olevien käyttäjien nimistä.
 *
 * @param {Object} io - Socket.io-instanssi
 * @param {string} id - Huoneen ID
 * @return {Array} Taulukko, joka sisältää huoneessa olevien käyttäjien nimet
 */
    const getUsernames = (io, id) => {
      const sockets = io.sockets.adapter.rooms.get(id);
      const socketIds = [...sockets];
      const usernames = socketIds.map((socketId) => {
        const socketObj = io.sockets.sockets.get(socketId);
        return socketObj ? socketObj.username : null;
      });
      return usernames;
    };
  });
};
module.exports = eventHandler;
