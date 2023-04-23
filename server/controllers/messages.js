/* eslint-disable new-cap */

const messageRouter = require('express').Router();
const queries = require('../queries');

messageRouter.get('/:id', async (request, response) => {
  const roomMessages = await queries.searchMessages(request.params.id);
  return response.json(roomMessages);
});

messageRouter.post('/:id', async (request, response) => {
  const message = request.body;
  if (message.content.length === 0|| message.content.length > 255) {
    return response.status(422).json({
      'error': 'message is either too long or too short',
    });
  }
  const send = await queries.sendMessage(request.body);
  return response.json(send);
});

module.exports = messageRouter;
