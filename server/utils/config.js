require('dotenv').config();

const PORT = process.env.PORT;

const sql = {
  host: '172.25.0.10',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'chat_app',
  port: '3306',
};
module.exports = {sql, PORT};
