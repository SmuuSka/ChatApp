/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
//const url = 'http://10.114.34.7:3003/api/'
const url = 'http://localhost:3003/api/'
let token = null;

const setToken = token => {
    token = `Bearer ${token}`;
}


const getRooms = async () => {
    console.log('key')
    console.log(process.env.REACT_APP_API_KEY)
    const response = await axios.get(`${url}rooms`);
    return response.data;
}


const getRecentRooms = async (username) => {
    const response = await axios.get(`${url}rooms/user/${username}`);
    return response.data;
}

const getMessages = async (roomID) => {
    if (roomID === null) return [];
    const response = await axios.get(`${url}messages/${roomID}`)
    return response.data;
}

const postMessage = async (message) => {
    console.log('chat service: ' + message.content)
    const response = await axios.post(`${url}messages/${message.roomID}`, message)
    return response
}

const createRoom = async (roomName, password) => {
    console.log(`${url}rooms`)
    const response = await axios.post(`${url}rooms`, {name: roomName, password: password});
    return response
}
const getPublicRooms = async () => {
    const response = await axios.get(`${url}rooms/public`);
    return response.data;
}

export default {
    getRooms, 
    getMessages, 
    postMessage, 
    setToken, 
    createRoom, 
    getRecentRooms, 
    getPublicRooms
}
