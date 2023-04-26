/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line new-cap
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const queries = require('../queries');

/**

Lisää uuden käyttäjän tietokantaan.
@function
@async
@param {object} request - HTTP-pyyntöobjekti.
@param {object} response - HTTP-vastausobjekti.
@returns {object} - HTTP-Vastausobjekti.
@throws {object} - HTTP-Virheobjekti, jos rekisteröinti epäonnistuu.
*/
usersRouter.post('/', async (request, response) => {
  const {username, password} = request.body;

  if (password.length < 3) {
    return response.status(400).json({
      error: 'passwords length must be atleast three',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    await queries.saveUser(username, passwordHash);
    response.status(201).json({username: username, passwordHash: passwordHash});
  } catch {
    response.status(500).json({'error': 'register failed'});
  }
});

/**
 * Hakee kaikki käyttäjät tietokannasta ja palauttaa ne JSON-vastausobjektina.
 * @function
 * @async
 * @param {object} request - HTTP-pyyntöobjekti.
 * @param {object} response - HTTP-vastausobjekti.
 * @returns {object} - JSON-vastausobjekti, joka sisältää kaikki käyttäjät tietokannasta.
 */
usersRouter.get('/', async (request, response) => {
  const users = await queries.getUsers();
  return response.status(200).json(users);
});

module.exports = usersRouter;
