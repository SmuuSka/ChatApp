/* eslint-disable max-len */
/* eslint-disable camelcase */
const supertest = require('supertest');
const app = require('../app');
const requestWithSupertest = supertest(app);
const queries = require('../queries');

test('GET "/api/users"', async () => {
  const get_users = await requestWithSupertest.get('/api/users');
  expect(get_users.status).toEqual(200);
  expect(get_users.type).toEqual(expect.stringContaining('json'));
  // Ensimmäiset kolme käyttäjää
  expect(get_users.body).toContainEqual({username: '3nj6i2zio9p'});
  expect(get_users.body).toContainEqual({username: 'kaspar'});
  expect(get_users.body).toContainEqual({username: 'joel'});
});

test('Find user', async () => {
  const find_user = await queries.findUser('joel');
  expect(find_user.username).toEqual('joel');
});

test('Create room', async () => {
  const randomString = Math.random().toString(36).slice(2);
  const room = await queries.createRoom(randomString);
  expect(room).toEqual(randomString);
});

test('Search room', async () =>{
  const room = await queries.searchRoom('testi2');
  expect(room[0].room_name).toEqual( 'testi2');
});


test('Search messages', async () =>{
  const messages = await queries.searchMessages('019d5680b7218b25e9b424b0a83d8fbddc1eecba');
  console.log('From test: ' + JSON.stringify(messages));
  const messageContents = messages.map((message) =>
    message.message_content,
  );
  console.log(messageContents);
  expect(messageContents).toContain('f');
});

test('POST "/api/rooms"', async () => {
  await requestWithSupertest.post('/api/rooms')
      .send({name: 'liianpitkahuoneennimitesti'})
      .expect(422)
      .expect('Content-Type', /application\/json/);
});

test('POST "/api/rooms"', async () => {
  await requestWithSupertest.post('/api/rooms')
      .send({name: Math.random().toString(36).slice(2), password: null})
      .expect(200)
      .expect('Content-Type', /application\/json/);
});

test('POST "/api/users fail', async () => {
  await requestWithSupertest.post('/api/users')
      .send({username: 'samuseppo3', password: 'sa'})
      .expect(400);
});

test('POST "/api/users ok', async () => {
  await requestWithSupertest.post('/api/users')
      .send({username: Math.random().toString(36).slice(2), password: 'testi'})
      .expect(201);
});
