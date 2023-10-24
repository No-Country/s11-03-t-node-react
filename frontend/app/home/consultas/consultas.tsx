'use client'
import { addConsulta } from '@/app/_api/consulta'
import SubmitButton from './submitButton'
import { Toaster } from 'react-hot-toast'
import { useConsultas } from '@/app/hooks/home/consultas'

export function Consultas() {
  const { handleSubmit, state } = useConsultas()

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-primary md:w-[856px] md:h-[708px] md:p-12"
    >
      <h1
        className="w-[292px] text-center md:text-left text-slate-700 text-xl 
      font-normal font-['Secular One'] mb-[47px]"
      >
        <Toaster />
        Consultas
      </h1>
      <label
        htmlFor="nombreyapellido"
        className="text-slate-800 text-base font-medium  leading-none mb-[2px]"
      >
        Nombre y Apellido
      </label>
      <input
        type="text"
        placeholder="Ingresa tu nombre y apellido"
        className="w-[318px] 
      h-[62px] px-[23px] py-[21px] bg-gray-100 rounded-md border
       border-gray-200  md:w-full"
        name="fullname"
      />
      <label className="text-error">{state?.fullname}</label>
      <label
        htmlFor=""
        className="text-slate-800 text-base font-medium 
       leading-none mb-[2px] mt-7"
      >
        Correo electrónico
      </label>
      <input
        type="text"
        placeholder="vetcare@gmail.com"
        className="w-[318px] 
      h-[62px] px-[23px] py-[21px] bg-gray-100 rounded-md border
       border-gray-200 md:w-full"
        name="email"
      />
      <label className="text-error">{state?.email}</label>
      <label
        htmlFor=""
        className="text-slate-800 text-base font-medium 
       leading-none mb-[2px] mt-7"
      >
        Mensaje
      </label>
      <textarea
        className="w-[321px] h-[158px] bg-gray-100 rounded-md border 
      border-gray-200 md:w-full"
        name="message"
      />
      <label className="text-error">{state?.message}</label>
      <SubmitButton />
    </form>
  )
}
