/* eslint-disable new-cap */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const pool = require('../database');

loginRouter.post('/', async (request, response) => {
  const {username, password} = request.body;

  const user = await findUser(username);
  console.log('user is' + user);

  const passwordCorrect = user === undefined ?
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

  const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      {expiresIn: 2*60*60},
  );

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
    SELECT * FROM users
    WHERE username=?`, [username]);
    return JSON.parse(JSON.stringify(find))[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) await conn.end();
  }
};

module.exports = loginRouter;
