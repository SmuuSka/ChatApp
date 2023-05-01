/* eslint-disable max-len */
/* eslint-disable new-cap */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const findUser = require('../queries').findUser;

/**
 * Tarkistaa käyttäjän antamat kirjautumistiedot ja luo tarvittaessa uuden JWT-tokenin.
 * @function
 * @async
 * @param {object} request - HTTP-pyyntöobjekti, joka sisältää käyttäjän antamat kirjautumistiedot.
 * @param {object} response - HTTP-vastausobjekti.
 * @returns {object} - HTTP-vastausobjekti, joka sisältää JWT-tokenin ja käyttäjänimen, jos kirjautuminen onnistui.
 *
 * @throws {object} - HTTP-virheobjekti, jos käyttäjänimi tai salasana on virheellinen.
 */
loginRouter.post('/', async (request, response) => {
  const {username, password} = request.body;
  const user = await findUser(username);
  const passwordCorrect = user === undefined ?
    false :
    await bcrypt.compare(password, user.user_password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Virheellinen käyttäjänimi tai salasana',
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

  return response
      .status(200)
      .send({token, username: user.username});
});

module.exports = loginRouter;
