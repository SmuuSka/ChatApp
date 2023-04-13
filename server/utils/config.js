require('dotenv').config();

const PORT = process.env.PORT;

const sql = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

module.exports = {sql, PORT};
