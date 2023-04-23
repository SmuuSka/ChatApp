require('dotenv').config();

const PORT = process.env.PORT;

const sql = {
  host: process.env.MARIADB_ROOT_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  port: process.env.MARIADB_PORT,
};
module.exports = {sql, PORT};
