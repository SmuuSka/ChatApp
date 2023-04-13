/* eslint-disable new-cap */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const pool = require('../database');

loginRouter.post('/', async (request, response) => {
  const {username, password} = request.body;

  let user = await findUser(username);
  user = user[0];

  const passwordCorrect = user === null ?
    false :
    await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
      .status(200)
      .send({token, username: user.username, name: user.name});
});


const findUser = async (username) => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log(conn);
    const find = await conn.query(`
    SELECT * FROM testi
    WHERE username=?`, [username]);
    return JSON.parse(JSON.stringify(find));
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) conn.end();
  }
};

module.exports = loginRouter;
