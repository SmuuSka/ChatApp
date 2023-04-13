const mariadb = require('mariadb');
const config = require('./utils/config');

const pool = mariadb.createPool(config.sql);

// eslint-disable-next-line require-jsdoc
async function createUserTable() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('connection succeeded');
    await conn.query(
        `CREATE TABLE IF NOT EXISTS testi (
          username varchar(50), password varchar(200) 
        )`,
    );
    console.log('query succeeded');
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}


createUserTable();

module.exports = pool;


