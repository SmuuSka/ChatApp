/* eslint-disable new-cap */
const roomRouter = require('express').Router();
const queries = require('../queries');

roomRouter.get('/', async (request, response) => {
  const rooms = await queries.searchRooms();
  return response.json(rooms);
});

// hakee huoneet joissa käyttäjä on viestitellyt
roomRouter.get('/:username', async (request, response) => {
  const rooms = await queries.findUserRooms(request.params.username);
  return response.json(rooms);
});

roomRouter.post('/', async (request, response) => {
  const {name, password} = request.body;
  if (name.length ===0 || name.length > 20) {
    return response.status(422).json({
      'error': 'room name is either too long or too short. max length is 20',
    },
    );
  }

  if (password.length === 0 || password.length > 255) {
    return response.status(422).json({
      'error': 'password is either too long or too short. max length is 255',
    },
    );
  }
  try {
    const rooms = await queries.createRoom(name, password);
    return response.status(200).json(rooms);
  } catch (e) {
    return response.status(422).json({
      'error': 'room name already exists',
    });
  }
});

module.exports = roomRouter;

