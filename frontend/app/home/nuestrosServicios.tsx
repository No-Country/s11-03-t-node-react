import Link from "next/link";
import { ComponentType, SVGProps } from "react";
import {
  Peluqueria,
  Hospitalizacion,
  Vacunacion,
  MedicinaPreventiva,
  Services,
  Detalles,
} from "./icons";
interface NuestrosServicios {
  title: string;
  description: string;
  svg: ComponentType<SVGProps<SVGSVGElement>>;
  detalles: ComponentType<SVGProps<SVGSVGElement>>;
}
const data: NuestrosServicios[] = [
  {
    title: "Peluquería",
    description:
      "Mantener la higiene y el aspecto de tu mascota es muy importante.",
    svg: Peluqueria,
    detalles: Detalles,
  },
  {
    title: "Hospitalización",
    description:
      "El cuidado y el monitoreo de tu mascota durante las 24 horas.",
    svg: Hospitalizacion,
    detalles: Detalles,
  },
  {
    title: "Vacunación",
    description:
      "Creamos el mejor plan de vacunación para mantener saludable a tu mascota.",
    svg: Vacunacion,
    detalles: Detalles,
  },
  {
    title: "Medicina Preventiva",
    description:
      "Recomendaciones para mantener la salud de los animales, como programas de desparasitación y control de peso.",
    svg: MedicinaPreventiva,
    detalles: Detalles,
  },
];

export default function NuestrosServicios() {
  return (
    <section className="bg-secondary-content flex flex-col items-center justify-center pt-[18px] mb-[19px] ">
      <div className="flex flex-row justify-center items-center gap-x-2 mb-[18px]">
        <span>
          {" "}
          <Services />{" "}
        </span>
        <h1 className="text-accent text-base font-bold font-['Inter'] leading-relaxed">
          servicios
        </h1>
      </div>
      <h2 className=" text-center text-slate-700 text-xl font-normal font-['Secular One'] mb-[26px]">
        Nuestros Servicios
      </h2>
      <div className="md:flex md:flex-row md:gap-x-[18px] md:pb-[124px]">
        {data.map((item) => (
          <>
            <div className="w-[306px] h-[286px] bg-amber-50 rounded-[15px] shadow px-[18px] py-[18px] mb-[18px]">
              <span>{item.svg && <item.svg />}</span>
              <h3 className="text-slate-800 text-2xl font-bold font-['Inter'] leading-[34px] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm font-normal font-['Inter'] leading-normal mb-10">
                {item.description}
              </p>
              <Link
                href="#"
                className="text-slate-600 text-sm font-medium font-['Inter'] leading-normal flex flex-row items-center gap-x-2"
              >
                Ver detalles <span>{item.detalles && <item.detalles />}</span>
              </Link>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}
