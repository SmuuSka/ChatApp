/* eslint-disable new-cap */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const pool = require('../database');
const findUser = require('../queries').findUser;

loginRouter.post('/', async (request, response) => {
  const {username, password} = request.body;
  const user = await findUser(username);
  const passwordCorrect = user === undefined ?
    false :
    await bcrypt.compare(password, user.user_password);

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
      .send({token, username: user.username});
});

module.exports = loginRouter;
