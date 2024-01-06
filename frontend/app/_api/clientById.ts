import axios from 'axios'
const BASE_URL = 'https://vetcare-qwzz.onrender.com/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
})

export const clientByIdService = async (token: string, id: string) => {
  try {
    if (id) {
      const res = await api.get(`/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res
    }
    return null
  } catch (error) {
    return error
  }
}
