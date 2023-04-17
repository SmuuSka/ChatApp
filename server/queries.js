/* eslint-disable max-len */
const pool = require('./database');

const createTable = `
    CREATE TABLE IF NOT EXISTS testi ( 
        id int AUTO_INCREMENT PRIMARY KEY,
        username varchar(50) NOT NULL, 
        password varchar(200) NOT NULL
    )`;

const saveMessage = `INSERT INTO messages 
                    (content, roomID, from, time) 
                    VALUES (?, ?, ?, ?)`;

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
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    const values = [message.content, message. roomID, message.from, message.time];
    await conn.query(saveMessage, values);
    console.log('save message query succeeded');
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.end();
  }
};

module.exports = {createUserTable, sendMessage};
