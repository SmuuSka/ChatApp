/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const pool = require('./database');
const crypto = require('crypto');

const createTable = `
    CREATE TABLE IF NOT EXISTS users ( 
        username varchar(50) PRIMARY KEY NOT NULL, 
        password varchar(255) NOT NULL
    )`;

const saveMessage = `INSERT INTO user_messages 
                    (username, room_id, message_content, created_at) 
                    VALUES (?, ?, ?, ?)`;

const searchAllRooms = `SELECT * FROM rooms`;

const createQuery = `INSERT INTO rooms (room_id, room_name, room_password) VALUES (?,?,?)`;

const searchAllMessages = `SELECT * FROM user_messages WHERE room_id = ?`;

const searchRoomQuery = `SELECT * FROM rooms WHERE room_name = ?`;

const deleteRoomQuery = `SELECT * FROM rooms WHERE room_id = ?`;

const findPublicRoom = `SELECT * FROM rooms WHERE room_name = ? AND room_password IS NULL`;

const findPublicRooms = `SELECT * FROM rooms WHERE room_password IS NULL`;

const userRoomsQuery = `SELECT DISTINCT user_messages.room_id, rooms.room_name 
                        FROM user_messages, rooms 
                        WHERE user_messages.username = ? 
                        AND user_messages.room_id = rooms.room_id`;

const findRoomQuery = `SELECT * FROM rooms WHERE room_name = ? AND room_password = ?`;

const createWihtoutPassword = `INSERT INTO rooms (room_id, room_name) VALUES (?,?)`;


/**
 * Luo users-taulun tietokantaan.
 *
 * @async
 * @function createUserTable
 */
const createUserTable = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    await conn.query(createTable);
    console.log('create table query succeeded');
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};


/**
 * Lähettää viestin tietokantaan.
 *
 * @async
 * @param {Object} message - Viesti-objekti, joka sisältää seuraavat avaimet: from (lähettäjän nimi), roomID (huoneen ID), content (viestin sisältö) ja time (viestin aikaleima).
 * @returns {Object} - Palauttaa viesti-objektin, joka sisältää samat avaimet kuin syöte.
 */

const sendMessage = async (message) => {
  let conn;
  console.log('message');
  console.log(message);
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    console.log(message.time);
    await conn.query('SET FOREIGN_KEY_CHECKS=0');
    const values = [message.from, message.roomID, message.content, message.time];
    await conn.query(saveMessage, values);
    await conn.query('SET FOREIGN_KEY_CHECKS=1');
    console.log('save message query succeeded');
    return message;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.end();
  }
};

/**
 * Etsii kaikki huoneet tietokannasta.
 *
 * @async
 * @returns {Array} - Palauttaa taulukon, joka sisältää kaikki huoneet tietokannassa.
 */

const searchRooms = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rooms = await conn.query(searchAllRooms);
    return JSON.parse(JSON.stringify(rooms));
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};
// Hakee kaikki julkiset huoneet tietokannasta
/**

Hakee kaikki julkiset huoneet tietokannasta.
@async
@function
*/
const findAllPublicRooms = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rooms = await conn.query(findPublicRooms);
    return JSON.parse(JSON.stringify(rooms));
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};

// Hakee huoneen nimen perusteella tietokannasta
/**

Hakee huoneen nimen perusteella tietokannasta.
@async
@function
@param {string} roomName - Haettavan huoneen nimi.
*/
const searchRoom = async (roomName) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    const room = await conn.query(searchRoomQuery, [roomName]);
    console.log('search room query succeeded');
    return JSON.parse(JSON.stringify(room));
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};
/**

Luo uuden huoneen tietokantaan.
@async
@function
@param {string} roomName - Huoneen nimi.
@param {string} [password] - Salasana huoneelle. Jos jätetään tyhjäksi, huone luodaan ilman salasanaa.
*/
const createRoom = async (roomName, password) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    const id = crypto.randomBytes(20).toString('hex');
    if (!password) {
      await conn.query(createWihtoutPassword, [id, roomName]);
      console.log('created without pass');
    } else {
      await conn.query(createQuery, [id, roomName, password]);
      console.log('create room query succeeded');
    }
    return roomName;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};
/**
 * Hakee kaikki annetun huoneen viestit tietokannasta.
 * @async
 * @function
 * @param {string} roomID - Huoneen ID, jonka viestit halutaan hakea.
 */
const searchMessages = async (roomID) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    const messages = await conn.query(searchAllMessages, [roomID]);
    console.log('search all messages query succeeded');
    console.log(JSON.parse(JSON.stringify(messages)));
    return JSON.parse(JSON.stringify(messages));
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};

/**
 * Hakee käyttäjän tiedot käyttäjänimen perusteella tietokannasta.
 * @async
 * @function
 * @param {string} username - Käyttäjänimi.
 */
const findUser = async (username) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log(conn);
    const find = await conn.query(`
    SELECT * FROM users
    WHERE username=?`, [username]);
    return JSON.parse(JSON.stringify(find))[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};


/**
 * Hakee käyttäjän kaikki huoneet tietokannasta.
 * @async
 * @function
 * @param {string} username - Käyttäjänimi.
 */
const findUserRooms = async (username) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    const rooms = await conn.query(userRoomsQuery, [username]);
    console.log('found all users rooms');
    return JSON.parse(JSON.stringify(rooms));
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};

/**
 * Etsii huonetta tietokannasta sen nimen ja mahdollisen salasanan perusteella.
  * @async
 * @function
 * @param {string} name - Haettavan huoneen nimi.
 * @param {string|null} password - Haettavan huoneen salasana, tai null jos huone on julkinen.
 */
const findRoom = async (name, password) => {
  let conn;
  let rooms;
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    if (password === null) {
      rooms = await conn.query(findPublicRoom, [name]);
      console.log(`found room named ${name} with no password`);
    } else {
      rooms = await conn.query(findRoomQuery, [name, password]);
      console.log('found room with password');
    }
    return JSON.parse(JSON.stringify(rooms));
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};

/**
 * Tallentaa uuden käyttäjän tietokantaan.
 * @async
 * @function
 * @param {string} username - Uuden käyttäjän käyttäjänimi.
 * @param {string} password - Uuden käyttäjän salasana.
 * @throws {Error} - Heittää poikkeuksen, jos tallentaminen epäonnistuu.
 */
const saveUser = async (username, password) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const save = await conn.query(`
    INSERT INTO users (username, user_password) 
    VALUES (?, ?)`, [username, password]);
    console.log(save);
    return save;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};

/**
 * Hakee kaikki käyttäjät tietokannasta.
 * @async
 * @function
 */
const getUsers = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(`SELECT username FROM users`);
    return JSON.parse(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};

module.exports = {
  createUserTable,
  sendMessage,
  searchRooms,
  searchRoom,
  searchMessages,
  createRoom,
  findUserRooms,
  findRoom,
  findUser,
  findAllPublicRooms,
  saveUser,
  getUsers,
};
