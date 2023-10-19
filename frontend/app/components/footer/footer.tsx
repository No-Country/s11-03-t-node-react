import Link from "next/link";
import { SocialNetwork, SocialNetworkDesktop, Vet } from "./icons";

export default function Footer() {
  return (
    <section className="bg-[#2F2D53] h-[102px] md:h-[230px] flex flex-col md:flex-row 
    items-center md:justify-between mt-[54px] pt-[18px] md:px-[85px] md:py-[95px]">
        <span className="md:hidden">
          <Vet />
        </span>
      <div className="hidden md:flex md:flex-row">
        <span className="text-primary text-3xl font-normal h-9">Vet</span>
        <span className="">
          <Vet />
        </span>
        <span className="text-primary text-3xl font-normal  h-9">care</span>
      </div>
      <h1
        className="w-[360px] text-center text-gray-100 
        text-[10px] font-normal font-['Inter'] leading-none mt-[10px] md:hidden"
      >
        © 2023 VetCare. Todos los derechos reservados
      </h1>
      <span className="mt-[10px] md:hidden">
        <SocialNetwork />
      </span>
      <div className="hidden md:flex md:flex-col  md:gap-x-[17px] ">
        <ul className="hidden md:flex md:flex-row md:mb-[15px] md:text-left ">
          <li className="mr-4 my-6 md:my-0 text-primary">
            <Link href="/">Home</Link>
          </li>
          <li className="mx-4 my-6 md:my-0 text-primary h-[42px]">
            <Link href="/servicios ">Servicios</Link>
          </li>
          <li className="mx-4 my-6 md:my-0 text-primary text-base h-[42px]">
            <Link href="/adopta">Adopta</Link>
          </li>
          <li className="mx-4 my-6 md:my-0 text-primary text-base h-[42px]">
            <Link href="/nosotros">Nosotros</Link>
          </li>
          <li className="mx-4 my-6 md:my-0 text-primary text-base h-[42px]">
            <Link href="/contacto">Contacto</Link>
          </li>
        </ul>
        <div className="hidden md:flex md:flex-row">
          <span className="w-[108px] text-white text-xl font-semibold font-['Inter'] leading-[42px] tracking-tight">Seguinos</span>
          <span>
            <SocialNetworkDesktop />
          </span>
        </div>
      </div>
    </section>
  );
}
