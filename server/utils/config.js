require('dotenv').config();

const PORT = '3003';

const sql = {
  host: 'localhost-placeholder',
  user: 'user-placeholder',
  password: 'password--placeholder',
  database: 'chat_app',
  port: '3306',
};
module.exports = {sql, PORT};
