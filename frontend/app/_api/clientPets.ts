import axios from 'axios'
const BASE_URL = 'https://vetcare-qwzz.onrender.com/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
})

export const clientPetsService = async (token: string) => {
  try {
    const res = await api.get('/clients/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res
  } catch (error) {
    return error
  }
}
