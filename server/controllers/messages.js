/* eslint-disable new-cap */

const messageRouter = require('express').Router();
const queries = require('../queries');

messageRouter.get('/:id', async (request, response) => {
  const roomMessages = await queries.searchMessages(request.params.id);
  return response.json(roomMessages);
});

messageRouter.post('/:id', async (request, response) => {
  const message = await queries.sendMessage(request.body);
  return response.json(message);
});

module.exports = messageRouter;
