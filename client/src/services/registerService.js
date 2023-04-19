import axios from 'axios';
const url = 'http://10.114.34.7:3003/api/users'
//const url = 'http://localhost:3003/api/users'
const register = async registerCredentials => {
    const response = await axios.post(url, registerCredentials)
    return response
}

export default {register}
