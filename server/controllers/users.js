/* eslint-disable require-jsdoc */
// eslint-disable-next-line new-cap
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../database');


usersRouter.post('/', async (request, response) => {
  console.log('lol');
  const {username, password} = request.body;
  if (password.length < 3) {
    return response.status(400).json({
      error: 'passwords length must be atleast three',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  await saveUser(username, passwordHash);
  response.status(200).json({username: username, passwordHash: passwordHash});
});

usersRouter.get('/', async (request, response) => {
  const users = await getUsers();
  console.log(users);
  return response.status(200).json(users);
});


const saveUser = async (username, password) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const save = await conn.query(`
    INSERT INTO testi (username, password) 
    VALUES (?, ?)`, [username, password]);
    console.log(save);
    return save;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) conn.end();
  }
};

const getUsers = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(`SELECT username FROM testi`);
    return JSON.parse(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) conn.end();
  }
};

module.exports = usersRouter;
