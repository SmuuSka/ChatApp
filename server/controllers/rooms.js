/* eslint-disable new-cap */
const roomRouter = require('express').Router();
const queries = require('../queries');

roomRouter.get('/', async (request, response) => {
  const rooms = await queries.searchRooms();
  return response.json(rooms);
});

roomRouter.post('/', async (request, response) => {
  const name = request.body.name;
  if (name.length===0 || name.length > 20) {
    return response.status(422).json({
      'error': 'room name is either too long or too short.',
    },
    );
  }
  const rooms = await queries.createRoom(name);
  return response.json(rooms);
});

module.exports = roomRouter;

