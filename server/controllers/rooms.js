/* eslint-disable new-cap */
const roomRouter = require('express').Router();
const queries = require('../queries');

roomRouter.get('/', async (request, response) => {
  const rooms = await queries.searchRooms();
  return response.json(rooms);
});

roomRouter.post('/', async (request, response) => {
  const name = request.body.name;
  console.log(name);
  const rooms = await queries.createRoom(name);
  return response.json(rooms);
});


module.exports = roomRouter;

