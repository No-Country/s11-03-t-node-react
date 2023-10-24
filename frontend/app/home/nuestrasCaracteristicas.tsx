import Image from 'next/image'
import Section from './nuestrasSection'

const NuestrasCaracteristicas = () => (
  <div className="flex flex-col-reverse items-center xl:flex-row text-primary-content justify-center pb-28">
    <div className="max-w-2xl">
      <h4 className="text-center xl:text-start text-accent font-bold mt-5"> Nuestras Característcas</h4>
      <h1 className="text-center xl:text-start text-xl xl:text-4xl mt-5 font-bold"> Cuidamos de tu mascota</h1>
      <p className="text-center xl:text-start mt-9 text-xl">
        El equipo de VetCare se dedica a proporcionar el más alto atención de
        calidad para su perro. Todos nuestros campistas reciben atención
        individual y cuidados amor amores sensibles
      </p>
      <Section
        src="/vacunas.png"
        title="Vacunas"
        text="Inmunizaciones para proteger a tu mascota contra la potencialmente
        enfermedades peligrosas."
      />
      <Section
        src="/nutricion.png"
        title="Nutrición"
        text="Consejos para la selección de la alimentación adecuada y los servicios de suplementos para las necesidades específicas de tu mascota."
      />
      <Section
        src="/seguro.png"
        title="Seguro"
        text="Planes de seguros que pueden ayudar a cubrir los costos de atención y tratamientos veterinarios."
      />
      <Section
        src="/cuidado-dental.png"
        title="Cuidado Dental"
        text="Limpiezas rutinarias y exámenes dentales para mantener la de tu mascota salud bucal."
      />
    </div>
    <div className="xl:ml-20 xl:mt-32 relative">
      <Image
        className="rounded-br-3xl"
        src="/veterinario-trabajando.png"
        width={585}
        height={585}
        alt="veterinario trabajando"
      />
      <div className="absolute -right-6 -bottom-16 -z-10">
        {' '}
        <Image
          className="rounded-br-3xl"
          src="/yellow-pointed-circle.png"
          width={200}
          height={200}
          alt="puntillado amarillo"
        />
      </div>
    </div>
  </div>
)

export default NuestrasCaracteristicas
