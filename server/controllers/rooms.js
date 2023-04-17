/* eslint-disable new-cap */
const roomRouter = require('express').Router();
const queries = require('../queries');

roomRouter.get('/', async (request, response) => {
  const rooms = await queries.searchRooms();
  return response.json(rooms);
});


module.exports = roomRouter;

