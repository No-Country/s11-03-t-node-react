import axios from 'axios'

export async function uploadFile(img: File) {
  const token = localStorage.getItem('token')
  const formData = new FormData()
  formData.append('image', img)

  try {
    const response = await axios.post(
      'https://vetcare-qwzz.onrender.com/api/v1/images/upload',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    return error
  }
}
