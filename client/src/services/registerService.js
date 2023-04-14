import axios from 'axios';
const url = 'http://10.114.34.7:3003/api/users'

const register = async credentials => {
    const response = await axios.post(url, credentials)
    return response
}

export default {register}