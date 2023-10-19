import { Consultas } from "../consultas/consultas";
import { Message, Phone, Location } from "./icons";

export default function Contacto() {
  return (
    <section className="flex flex-col items-center justify-center mt-[58px]  md:flex-row md:p-20 md:bg-amber-50 md:justify-start">
      <article className="flex flex-col items-center justify-center md:flex md:flex-col md:items-start md:w-[440px] md:h-[786px]">
      <h1 className="text-slate-700 text-xl md:text-[40px] font-normal font-['Secular One'] mb-3 ">
        Contacto
      </h1>
      <p className="w-[316px] text-center md:text-left text-gray-500 text-base font-normal font-['Inter'] leading-relaxed md:mt-9">
        Información de contacto para el cuidado de las mascotas y los servicios
        veterinarios puede variar dependiendo de la providención específica
      </p>
      <div className="flex flex-col mt-[27px]">
      <div className="flex flex-row  mb-6 gap-x-5">
        <span
          className="w-10 h-10 px-[13.25px] py-[11px] bg-orange-500 rounded-[20px] 
        justify-center items-center inline-flex"
        >
          <Phone />
        </span>
        <h2 className="text-slate-600 text-lg font-medium font-['Inter'] leading-7">
          +1 234 567 890
        </h2>
      </div>
      <div className="flex flex-row  mb-6 gap-x-5">
        <span
          className="w-10 h-10 px-[13.25px] py-[11px] bg-orange-500 rounded-[20px] 
        justify-center items-center inline-flex"
        >
          <Message />
        </span>
        <h3 className="text-slate-600 text-lg font-medium font-['Inter'] leading-7">
          petcare@gmail.com
        </h3>
      </div>
      <div className="flex flex-row mb-6 gap-x-5">
        <span
          className="w-10 h-10 px-[13.25px] py-[11px] bg-orange-500 rounded-[20px] 
        justify-center items-center inline-flex"
        >
          <Location />
        </span>
        <h3 className="text-slate-600 text-lg font-medium font-['Inter'] leading-7">
          Urquiza 1234, CABA
        </h3>
      </div>
      </div>
      <h4 className="w-80 text-center md:text-left text-slate-700 text-xl mb-[15px] font-normal font-['Secular One']">
        Horarios
      </h4>
      <h5 className="w-80 text-center md:text-left text-gray-500 text-lg mb-[2px] font-normal font-['Inter'] leading-7">
        Lunes a Domingos
      </h5>
      <h6 className="text-gray-500 text-lg font-normal mb-[59px] font-['Inter'] leading-7">07:45 AM - 9:45 PM</h6>
      </article>
      <div>
      <Consultas />
      </div>
    </section>
  );
}
