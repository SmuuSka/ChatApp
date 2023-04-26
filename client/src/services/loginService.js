import axios from 'axios';
const url = 'http://localhost:3003/api/login'
//const url = 'http://172.25.0.9:3003/api/login'
const login = async (loginCredentials) => {
    const response = await axios.post(url, loginCredentials)
    return response
}

export default { login }
