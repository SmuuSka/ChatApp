/* eslint-disable new-cap */

const socket = require('../socket');
const roomRouter = require('express').Router();

roomRouter.get('/:id', (request, response) => {
  const roomID = request.params.id;
  socket.join(roomID);
});


module.exports = roomRouter;

