require('dotenv').config();

const PORT = process.env.PORT;

const sql = {
  host: 'localhost-placeholder',
  user: 'user',
  password: 'testi',
  database: 'chat_app',
  port: '3306',
};
module.exports = {sql, PORT};
