import axios from 'axios';
const url = 'http://10.114.34.7:3003/api/login'

const login = async (loginCredentials) => {
    const response = await axios.post(url, loginCredentials)
    return response
}

export default { login }