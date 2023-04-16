import axios from 'axios';
const url = 'http://localhost:3003/api/users'

const register = async registerCredentials => {
    const response = await axios.post(url, registerCredentials)
    return response
}

export default {register}
