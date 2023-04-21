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

const createQuery = `INSERT INTO rooms (room_id, room_name, password) VALUES (?,?,?)`;

const searchAllMessages = `SELECT * FROM user_messages WHERE room_id = ?`;

const userRoomsQuery = `SELECT DISTINCT user_messages.room_id, rooms.room_name 
                        FROM user_messages, rooms 
                        WHERE user_messages.username = ? 
                        AND user_messages.room_id = rooms.room_id`;

const findRoomQuery = `SELECT * FROM rooms WHERE room_name = ? AND password = ?`;

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

const sendMessage = async (message) => {
  let conn;
  console.log('message');
  console.log(message);
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    console.log(message.time);
    const values = [message.from, message.roomID, message.content, message.time];
    await conn.query(saveMessage, values);
    console.log('save message query succeeded');
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.end();
  }
};

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

const createRoom = async (roomName, password) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    const id = crypto.randomBytes(20).toString('hex');
    await conn.query(createQuery, [id, roomName, password]);
    console.log('create room query succeeded');
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};

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

const findRoom = async (username, password) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    const rooms = await conn.query(findRoomQuery, [username, password]);
    console.log('found room with password');
    return JSON.parse(JSON.stringify(rooms));
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
  searchMessages,
  createRoom,
  findUserRooms,
  findRoom,
};
