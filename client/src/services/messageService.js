import axios from 'axios';
const url = 'http://localhost:3003/api/messages'

let token = null;

const setToken = token => {
    token = `Bearer ${token}`;
}