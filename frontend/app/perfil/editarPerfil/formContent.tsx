'use client'
import axios from 'axios'
import MascotaImage from '../mascotaModal/mascotaImage'
import SubmitButton, { CancelarButton } from '../mascotaModal/submitButton'
import UserData from '@/app/hooks/perfil/userData'
import UseToken from '@/app/hooks/useToken'
import { useImageMascota } from '@/app/store/mascota/ImageMascota'
import { useState } from 'react'
import { useUpdateMutations } from '@/app/store/mascota/updateMutation'
import toast from 'react-hot-toast'
import { useLoader } from '@/app/hooks/useLoader'
import { Loader } from '@/app/components/loader'

export async function updateDtaUser({
  id,
  token,
  data,
}: {
  id: number | null
  token: string | null
  data: any
}) {
  return await axios.put(
    `https://vetcare-qwzz.onrender.com/api/v1/clients/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
const notifyOk = (msg: string) => toast.success(msg)
export default function FormContent({ onClick }: { onClick: () => void }) {
  const initiaState = {
    fullname: '',
    phone: '',
    email: '',
    photo_url: '',
  }
  const { userId } = UserData()
  const { token } = UseToken()
  const ImageMascota = useImageMascota((state) => state.imageMascota)
  const setUpdateMutations = useUpdateMutations(
    (state) => state.setUpdateMutations,
  )
  const setImageMascota = useImageMascota((state) => state.setImageMascota)
  const [state, setState] = useState(initiaState)
  const { isLoading, openLoader, closeLoader } = useLoader()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const form = e.currentTarget
    const formDataa = new FormData(form)
    const fullname = formDataa.get('fullname')
    const phone = formDataa.get('phone')
    const email = formDataa.get('email')

    const formData = {
      fullname: fullname,
      phone: phone,
      email: email,
      photo_url: ImageMascota,
    }
    try {
      openLoader()
      const data = await updateDtaUser({
        id: userId,
        token: token,
        data: formData,
      })
      if (data?.status) {
        notifyOk('Datos actualizados')
        form.reset()
        setUpdateMutations(true)
        setState(initiaState)
        onClick()
        setImageMascota(null)
        closeLoader()
      }
    } catch (error: any) {
      closeLoader()
      if (error.response.data?.errors) {
        setState({
          fullname: error.response.data?.errors?.fullname
            ? error.response.data?.errors.fullname[0]
            : '',
          phone: error.response.data?.errors?.phone
            ? error.response.data?.errors.phone[0]
            : '',
          email: error.response.data?.errors?.email
            ? error.response.data?.errors.email[0]
            : '',
          photo_url: error.response.data?.errors?.photo_url
            ? error.response.data?.errors.photo_url[0]
            : '',
        })
      }
    }
  }
  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <MascotaImage />
        <label className="text-error">{state?.photo_url}</label>
        <label
          htmlFor="ingrese el nombre"
          className="text-slate-800 text-base font-medium font-inter leading-none mb-[3px]"
        >
          Nombre y apellido
        </label>
        <input
          type="text"
          placeholder="Ingresa tu nombre y apellido"
          className="w-full
      h-[62px] px-[23px] py-[21px] bg-gray-100 rounded-md border
       border-gray-200 text-gray-500  md:w-full mb-1"
          name="fullname"
        />
        <label className="text-error">{state?.fullname}</label>
        <label
          htmlFor=""
          className="text-slate-800 text-base font-medium 
      font-inter leading-none mb-[3px] mt-3"
        >
          Telefono
        </label>

        <input
          type="number"
          placeholder="Ej: +54 9 11 1234-5678"
          className="w-full 
      h-[62px] px-[23px] py-[21px] bg-gray-100 rounded-md border
       border-gray-200 text-gray-500  md:w-full mb-1"
          name="phone"
        />
        <label className="text-error">{state?.phone}</label>
        <label
          htmlFor="ingrese el nombre"
          className="text-slate-800 text-base font-medium font-inter leading-none mt-3 mb-[3px]"
        >
          Correo Electronico
        </label>
        <input
          type="text"
          placeholder="vetcarefamily@gmail.com"
          className="w-full
      h-[62px] px-[23px] py-[21px] bg-gray-100 rounded-md border
       border-gray-200 text-gray-500  md:w-full mb-1"
          name="email"
        />
        <label className="text-error">{state?.email}</label>
        <Loader isLoading={isLoading} />
        {!isLoading && <SubmitButton text="Confirmar cambios" />}
      </form>
      {!isLoading && <CancelarButton />}
    </div>
  )
}
