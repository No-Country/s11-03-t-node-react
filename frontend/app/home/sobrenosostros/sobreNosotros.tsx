import Image from "next/image";
import sobreNosotros from "../../assets/sobreNosotros/sobreNosotrosImage.png";
import sobreNosotrosDesktop from "../../assets/sobreNosotros/sobreNosotrosDesktop.png" 
import aboutDot from "../../assets/sobreNosotros/about-dot.png.png";
import aboutDotDesktop from "../../assets/sobreNosotros/about-dotDesktop.png"
import { Tick } from "../icons";
import { ComponentType, SVGProps } from "react";
interface ListItemType {
  title: string;
  svg: ComponentType<SVGProps<SVGSVGElement>>;
  index?: number;
}
const data: ListItemType[] = [
  { title: "El mejor veterinario", svg: Tick },
  { title: "Vacunaciones", svg: Tick },
  { title: "Cuidado las 24 horas", svg: Tick },
  { title: "Alimentacion saludable", svg: Tick },
];
const ListItemType = ({ title }: ListItemType) => (
  <div className="flex flex-col items-center md:hidden ">
    <div className="flex flex-row ">
      <span className="mr-6">{Tick && <Tick />}</span>
      <h3
        className="text-slate-700 text-base font-medium
    font-['Inter'] leading-relaxed mb-7"
      >
        {title}
      </h3>
    </div>
  </div>
);

const ListItemType2 = ({start, end}:{start: number, end: number}) => (
  <div className="hidden md:grid  md:grid-cols-2 ">
    {data.slice(start, end).map((item, index) => (
      <div key={index} className="md:flex-row md:flex">
        <span className="mr-6">{Tick && <Tick />}</span>
        <h3 className="text-slate-700 text-base font-medium font-['Inter'] leading-relaxed mb-7">
          {item.title}
        </h3>
      </div>
    ))}
  </div>
);

export default function SobreNosotros() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:gap-x-[200px] ">
      <div className="relative ">
        <Image
          src={aboutDot}
          alt="sobreNosotros"
          width={85}
          height={82}
          className="absolute top-[-15px] left-[-20px] z-[-30] md:hidden"
        />
         <Image
          src={aboutDotDesktop}
          alt="sobreNosotros"
          width={197}
          height={197}
          className="hidden md:block md:absolute md:top-[-80px] md:left-[-70px] md:z-[-30]"
        />
        <Image
          src={sobreNosotros}
          alt="sobreNosotros"
          width={208}
          height={207}
          className="z-40 md:hidden "
        />
         <Image
          src={sobreNosotrosDesktop}
          alt="sobreNosotros"
          width={481}
          height={385}
          className="hidden md:block  "
        />
      </div>
      <div className="md:order-1 text-center md:text-left ">
        <h1
          className="w-80 text-accent text-base 
       font-bold font-['Inter'] leading-relaxed mb-6"
        >
          Sobre nosotros
        </h1>
        <h2
          className="w-[318px] md:w-[609px]  md:text-[40px] text-slate-700 
text-xl font-normal font-['Secular One'] mb-[33px] leading-normal"
        >
          Cuidamos tu mascota con mucho amor
        </h2>
        <p
          className="w-80  md:w-[624px] md:h-[78px] text-gray-500 text-sm md:text-xl font-normal 
      font-['Inter'] leading-relaxed mb-8 "
        >
          En última instancia, el cuidado de mascotas y los servicios
          veterinarios son críticos para asegurar que nuestros amigos peludos,
          emplumados lideren Vidas felices y saludables.
        </p>

        {data.map((item, index) => (
          <ListItemType key={index} {...item} />
        ))}
          <ListItemType2 start={0} end={2}/>
          <ListItemType2 start={2} end={4}/> 
      </div>
    </section>
  );
}
