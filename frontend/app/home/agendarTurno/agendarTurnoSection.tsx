import Image from 'next/image'
import petsHome from '../../assets/petsHome-big.png'
import Link from 'next/link'
import { FingerPrint, BiggerFingerprint } from '../icons'

export default function agendarTurnoSection() {
  return (
    <div className="flex flex-col-reverse items-center justify-center xl:flex-row px-10 bg-secondary-content">
      <div className="relative w-full max-w-[90rem]">
        <section
          className="flex flex-col 
    items-center justify-center px-[21px] pb-8 md:items-start md:pl-14 md:h-[650px]"
        >
          <span className="absolute top-[80px] left-[20px]  md:top-[630px]  md:left-32">
            <FingerPrint />
          </span>
          <span className=" hidden md:block md:absolute md:top-[150px] md:right-[20px]">
            <FingerPrint />
          </span>
          <span className="hidden md:block md:absolute md:bottom-[190px] md:right-0">
            <BiggerFingerprint />
          </span>
          <Image
            src={petsHome}
            alt="Pets Home"
            width={817}
            height={400}
            className="md:absolute md:bottom-[8px] md:right-[70px] md:w-[750px] bg-cover"
          />
          <h1
            className="text-[#062D3E] text-[20px] leading-[26px] 
      font-normal mt-5 md:text-6xl md:text-left"
          >
            No hay nada más <br />
            importante para nosotros que
            <br /> tu mascota
          </h1>
          <p
            className="text-center text-gray-500 
      text-sm font-normal  leading-relaxed mt-5 mb-[25px] md:text-left"
          >
            Las mascotas son humanizantes. Nos <br className="md:hidden" />{' '}
            recuerdan que <br className="hidden md:block" />
            tenemos la obligación y la <br className="md:hidden" />{' '}
            responsabilidad de
            <br />
            preservar, nutrir y cuidar toda la vida.
          </p>
          <div
            className=" w-[178px] h-[62px] bg-orange-500 
      rounded-md border border-orange-500 flex-col justify-center 
      items-center inline-flex px-[31px] py-[17px]"
          >
            <Link
              href="/servicios"
              className="font-inter text-center text-white text-base font-semibold leading-7"
            >
              Agendar Cita
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
