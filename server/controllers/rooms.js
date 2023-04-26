/* eslint-disable max-len */
/* eslint-disable new-cap */
const roomRouter = require('express').Router();
const queries = require('../queries');
require('dotenv').config();

/**
 * Hakee kaikki huoneet ja palauttaa listan huoneista, joissa jokainen huone on objekti, jossa on huoneen tunnus ja nimi.
 * @param {object} request - HTTP-pyynnön objekti
 * @param {object} response - HTTP-vastauksen objekti
 * @returns {object} - Lista objekteista, joissa on huoneiden tunnukset ja nimet
 */
roomRouter.get('/', async (request, response) => {
  const rooms = await queries.searchRooms();
  const roomObject = rooms.map((r) => {
    return {room_id: r.room_id, room_name: r.room_name};
  });
  console.log(rooms);
  return response.status(200).json(roomObject);
});

/**
 * Hakee huoneet, joissa käyttäjä on viestitellyt
 * @param {object} request - HTTP-pyynnön objekti
 * @param {object} response - HTTP-vastauksen objekti
 * @returns {array} - Lista huoneista, joissa käyttäjä on viestitellyt
 */
roomRouter.get('/user/:username/', async (request, response) => {
  const rooms = await queries.findUserRooms(request.params.username);
  return response.status(200).json(rooms);
});

/**
 * Hakee julkiset huoneet, eli huoneet, joilla ei ole salasanaa
 * @param {object} request - HTTP-pyynnön objekti
 * @param {object} response - HTTP-vastauksen objekti
 * @returns {object} - Lista julkisista huoneista
 */
roomRouter.get('/public/', async (request, response) => {
  const rooms = await queries.findAllPublicRooms();
  const roomObject = rooms.map((r) => {
    return {room_id: r.room_id, room_name: r.room_name};
  });
  return response.status(200).json(roomObject);
});


/**
 * Luo uuden huoneen
 * @param {object} request - HTTP-pyynnön objekti, jossa on uuden huoneen nimi ja mahdollinen salasana
 * @param {object} response - HTTP-vastauksen objekti
 * @returns {object} - Uuden huoneen tiedot
 */
roomRouter.post('/', async (request, response) => {
  const {name, password} = request.body;
  if (name.length === 0 || name.length > 20) {
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
      'error': 'something went wrong',
    });
  }
});

module.exports = roomRouter;

