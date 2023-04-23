const supertest = require('supertest')
const app = require('../app')
const requestWithSupertest = supertest(app)
const queries = require('../queries')

test('GET "/api/users"', async () => {
    const get_users = await requestWithSupertest.get('/api/users')
    expect(get_users.status).toEqual(200)
    expect(get_users.type).toEqual(expect.stringContaining('json'))
    expect(get_users.body[0]).toEqual({ username: "joel" })
    expect(get_users.body[1]).toEqual({ username: "kaspar" })
    expect(get_users.body[2]).toEqual({ username: "samu" })
})

test('Find user', async () => {
    const find_user = await queries.findUser('joel')
    expect(find_user.username).toEqual('joel')
})

test('Create room', async () => {
    const room = await queries.createRoom('testihuone_6')
    expect(room).toEqual('testihuone_6')

})

test('Search room', async () =>{
    const room = await queries.searchRoom('testihuone_6')
    expect(room[0].room_name).toEqual( 'testihuone_6')
})


test('Search messages', async () =>{
    const messages = await queries.searchMessages('1046695efbca6da2e0e73ee96fc76ce3423dd7c1')
    console.log('From test: ' + JSON.stringify(messages))
    const messageContents = messages.map(message =>
        message.message_content
    )
    console.log(messageContents)
    expect(messageContents).toContain('testi')
})

test('POST "/api/rooms"', async () => {
    const room = await requestWithSupertest.post('/api/rooms')
        .send({name:'liianpitkahuoneennimitesti'})
        .expect(422)
        .expect('Content-Type',/application\/json/)
})

test('POST "/api/rooms"', async () => {
    const room = await requestWithSupertest.post('/api/rooms')
        .send({name:'sopivatestinimionok'})
        .expect(200)
        .expect('Content-Type',/application\/json/)
})

test('POST "/api/users fail', async () => {
    const user = await requestWithSupertest.post('/api/users')
        .send({username:'samuseppo3', password:'sa'})
        .expect(400)
})

test('POST "/api/users ok', async () => {
    const user = await requestWithSupertest.post('/api/users')
        .send({username:'samuseppo4', password:'samu'})
        .expect(200)
})