import axios from 'axios';
const url = 'http://10.114.34.7:3003/api/'

let token = null;

const setToken = token => {
    token = `Bearer ${token}`;
}


const getRooms = async () => {
    const response = await axios.get(url+'rooms');
    return response.data;
}

const getMessages = async (roomID) => {
    if (roomID === null) return [];
    const response = await axios.get(url+'messages/'+roomID)
    return response.data;
}

const postMessage = async (message) => {
    console.log('chat service: ' + message.content)
    const response = await axios.post(url+'messages/'+message.roomID, message)
    return response
}

export default {getRooms, getMessages, postMessage, setToken}
