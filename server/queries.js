/* eslint-disable max-len */
const pool = require('./database');
const crypto = require('crypto');
const createTable = `
    CREATE TABLE IF NOT EXISTS users ( 
        username varchar(50) PRIMARY KEY NOT NULL, 
        password varchar(255) NOT NULL
    )`;

const saveMessage = `INSERT INTO user_messages 
                    (username, room_id, message_content) 
                    VALUES (?, ?, ?)`;

const searchAllRooms = `SELECT * FROM rooms`;

const createQuery = `INSERT INTO rooms (room_id, room_name) VALUES (?,?)`;

const searchAllMessages = `SELECT * FROM user_messages WHERE room_id = ?`;

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
    const values = [message.from, message.roomID, message.content];
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
    console.log('connection succeeded');
    const rooms = await conn.query(searchAllRooms);
    console.log('search all rooms query succeeded');
    return JSON.parse(JSON.stringify(rooms));
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};

const createRoom = async (roomName) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    const id = crypto.randomBytes(20).toString('hex');
    await conn.query(createQuery, [id, roomName]);
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

module.exports = {createUserTable, sendMessage, searchRooms, searchMessages, createRoom};
