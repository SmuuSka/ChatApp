/* eslint-disable max-len */
/* eslint-disable new-cap */

const messageRouter = require('express').Router();
const queries = require('../queries');

/**
 * Hakee tietokannasta viestit tietyltä huoneelta.
 * @function
 * @async
 * @param {object} request - HTTP-pyyntöobjekti, joka sisältää huoneen ID:n.
 * @param {object} response - HTTP-vastausobjekti.
 * @returns {object} - HTTP-vastausobjekti, joka sisältää huoneen viestit.
 */
messageRouter.get('/:id', async (request, response) => {
  const roomMessages = await queries.searchMessages(request.params.id);
  return response.json(roomMessages);
});

/**
 * Tallentaa uuden viestin tietokantaan.
 * @function
 * @async
 * @param {object} request - HTTP-pyyntöobjekti, joka sisältää uuden viestin tiedot.
 * @param {object} response - HTTP-vastausobjekti.
 * @returns {object} - HTTP-vastausobjekti, joka sisältää tallennetun viestin tiedot.
 * @throws {object} - HTTP-virheobjekti, jos viestin sisältö on liian pitkä tai liian lyhyt.
 */
messageRouter.post('/:id', async (request, response) => {
  const message = request.body;
  if (message.content.length === 0 || message.content.length > 255) {
    return response.status(422).json({
      'error': 'message is either too short or too long',
    });
  }
  const send = await queries.sendMessage(request.body);
  return response.json(send);
});

module.exports = messageRouter;
