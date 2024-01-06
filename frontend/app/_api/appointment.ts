import axios from 'axios'
import App from 'next/app'
const BASE_URL = 'https://vetcare-qwzz.onrender.com/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
})

type Appointment = {
  date: string
  start_time: string
  end_time: string
  reason?: string
  notes: string
  petId?: string
  veterinarianId: string | null
}

type Data = {
  appointment: Appointment
  token: string
}

export const createAppointment = async (
  appointment: Appointment,
  token: string,
  petSelected: string,
  motivoCita: string,
) => {
  try {
    const res = await api.post(
      '/appointments',
      {
        ...appointment,
        petId: petSelected, // ID de la mascota
        reason: motivoCita, // Motivo de la cita
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return res
  } catch (error: any) {
    return error
  }
}

export const deleteAppointment = async (id: string, token: string) => {
  try {
    const res = await api.delete(`/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(res)
    return res
  } catch (error) {
    return error
  }
}
