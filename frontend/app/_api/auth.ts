import axios from 'axios'
const BASE_URL = 'https://s11-03-react-node-production.up.railway.app/api/v1'
// const BASE_URL = 'localhost:3001/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
})

export const loginService = async (email: string, password: string) => {
  try {
    const res = await api.post('/auth/login', {
      email: email,
      password: password,
    })
    return res
  } catch (error) {
   
    return error
  }
}

export const registerService = async (
  fullname: string,
  email: string,
  password: string,
) => {
  try {
    const res = await api.post('/auth/register', {
      fullname: fullname,
      email: email,
      password: password,
    })
    return res
  } catch (error) {
    return error
  }
}
