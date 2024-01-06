export const getPetById = (id: string) => {
  try {
    const url = `https://vetcare-qwzz.onrender.com/api/v1/pets/${id}`
    return fetch(url, {
      cache: 'no-store',
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => response.json())
      .then((data) => data)
  } catch (err) {
    return err
  }
}
