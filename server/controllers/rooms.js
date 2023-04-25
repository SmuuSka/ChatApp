/* eslint-disable new-cap */
const roomRouter = require('express').Router();
const queries = require('../queries');
require('dotenv').config();

roomRouter.get('/room/:key', async (request, response) => {
  if (request.params.key === process.env.API_KEY) {
    const rooms = await queries.searchRooms();
    return response.status(200).json(rooms);
  }
  return response.status(401).json({'error': 'wrong api key'});
});

// hakee huoneet joissa käyttäjä on viestitellyt
roomRouter.get('/user/:username/:key', async (request, response) => {
  if (request.params.key === process.env.API_KEY) {
    const rooms = await queries.findUserRooms(request.params.username);
    return response.json(rooms);
  }
  return response.status(401).json({'error': 'wrong api key'});
});

// hakee julkiset huoneet, eli huoneet joilla ei ole salasanaa.
roomRouter.get('/public/:key', async (request, response) => {
  if (request.params.key === process.env.API_KEY) {
    const rooms = await queries.findAllPublicRooms();
    return response.json(rooms);
  }
  return response.status(401).json({'error': 'wrong api key'});
});

roomRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
});

roomRouter.post('/', async (request, response) => {
  const {name, password} = request.body;
  if (name.length ===0 || name.length > 20) {
    return response.status(422).json({
      'error': 'room name is either too long or too short. max length is 20',
    },
    );
  }

  if (password) {
    if (password.length > 255) {
      return response.status(422).json({
        'error': 'password is too long. max length is 255',
      },
      );
    }
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

