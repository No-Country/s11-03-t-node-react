import axios from 'axios'

const BASE_URL = 'https://vetcare-qwzz.onrender.com/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
})

export const getPetsService = async () => {
  try {
    const res = await api.get('/pets?limit=20')
    return res.data
  } catch (error) {
    return error
  }
}
