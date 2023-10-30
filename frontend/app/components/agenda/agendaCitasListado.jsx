import Image from 'next/image'
import { deleteAppointment } from '@/app/_api/appointment'
import toast, { Toaster } from 'react-hot-toast'

const notifyOk = (msg) => toast.success(msg)
const notifyError = (msg) => toast.error(msg)

const vets = [
  {
    _id: '65257fdb84a825a841323454',
    fullname: 'Miguel A. Velasquez',
    speciality: 'Veterinaria Clinica',
  },
  {
    _id: '6528cc704d4f663f63ce38a4',
    fullname: 'María J. González',
    speciality: 'Veterinaria Clinica',
  },
  {
    _id: '65306159ea6ccf98ad0282fe',
    fullname: 'Cathy J. Gomez',
    speciality: 'Veterinaria Clinica',
  },
  {
    _id: '6530616eea6ccf98ad028302',
    fullname: 'Velma S. Barry',
    speciality: 'Veterinario Cardiologo',
  },
  {
    _id: '65306177ea6ccf98ad028304',
    fullname: 'Carol C. Queen',
    speciality: 'Veterinaria Nutricionista',
  },
  {
    _id: '65306187ea6ccf98ad028306',
    fullname: 'Julie K. Rusella',
    speciality: 'Veterinaria Clinica',
  },
  {
    _id: '65306bef24f577a26f63ca15',
    fullname: 'Daniel S. Martinez',
    speciality: 'Veterinario Cirujano',
  },
  {
    _id: '65306c0124f577a26f63ca17',
    fullname: 'Lucia M. Rodríguez',
    speciality: 'Veterinaria Dermatóloga',
  },
  {
    _id: '653070ee24f577a26f63ca1d',
    fullname: 'Carlos A. Pérez',
    speciality: 'Veterinario Oftalmólogo',
  },
  {
    _id: '653070fa24f577a26f63ca1f',
    fullname: 'Sofia R. Vargas',
    speciality: 'Veterinaria Nutricionista',
  },
]

// Función para obtener fullname y speciality por _id
function getInfoById(id) {
  const veterinarian = vets.find((vet) => vet._id === id)
  if (veterinarian) {
    const { fullname, speciality } = veterinarian
    return { fullname, speciality }
  } else {
    return null // Si no se encuentra el _id, puedes manejar este caso como desees
  }
}

const AgendaCitasListado = ({
  token,
  appointments,
  image,
  name,
  updateAppointments,
  setUpdateAppointments,
  filtro,
}) => {
  function formatearFecha(fechaISO) {
    const meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ]

    const fecha = new Date(fechaISO)
    const dia = fecha.getUTCDate()
    const mes = meses[fecha.getUTCMonth()]
    const año = fecha.getUTCFullYear()
    const horas = fecha.getUTCHours()
    const minutos =
      (fecha.getUTCMinutes() < 10 ? '0' : '') + fecha.getUTCMinutes()

    const fechaF = `${dia} de ${mes} de ${año}`
    const horaF = `${horas}:${minutos} hs`
    return { fecha: fechaF, hora: horaF }
  }

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(id, token)
      notifyOk('Cita cancelada correctamente ')
      setUpdateAppointments(!updateAppointments)
    } catch (error) {
      console.log(error)
      notifyError('Error al cancelar cita')
      notifyError(JSON.stringify(error))
      setUpdateAppointments(!updateAppointments)
    }
  }

  return (
    <>
      <Toaster />
      {appointments.map((a, index) => (
        <div key={index}>
          {a.isActive == filtro && (
            <div className="w-full p-4">
              <div className="flex justify-between gap-8">
                <section className="flex flex-col w-full">
                  <div className="font-inter text-xl font-bold">                    
                    {formatearFecha(a.start_time).fecha}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-10 h-auto rounded-full"
                        alt="imagen de mascota"
                      />
                      <div className="font-bold top-6 capitalize">{name}</div>
                    </div>

                    <div className="flex">
                      <div className="flex flex-col w-full">
                        <h3 className="font-bold text-lg">
                          Turno: {getInfoById(a.veterinarianId).fullname} -{' '}
                          {getInfoById(a.veterinarianId).speciality}
                        </h3>
                        <div className="font-bold">
                          Motivo de la cita: {a.reason}
                        </div>
                        {/*
                      <div className="font-bold">Notas: {a.notes}</div>
                      <div className="font-bold">
                        Estado de la cita: {a.isActive ? 'Activa' : 'Cancelada'}
                      </div> */}
                      </div>
                    </div>
                  </div>
                </section>
                <section className="flex flex-col w-full items-end justify-end gap-2">
                  <div> {formatearFecha(a.start_time).hora}</div>
                  <div
                    className={
                      a.isActive
                        ? 'btn btn-accent flex flex-col capitalize'
                        : 'btn btn-disabled flex flex-col capitalize disabled'
                    }
                    onClick={() => handleDeleteAppointment(a._id)}
                  >
                    <div>Cancelar Cita</div>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default AgendaCitasListado