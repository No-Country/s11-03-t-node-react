import Image from 'next/image'
const petImage1 = '/pet-icon-1.png'
const petImage2 = '/pet-icon-2.png'
const petImage3 = '/pet-icon-3.png'
const petImage4 = '/pet-icon-1.png'
const petImage5 = '/pet-icon-2.png'
const petImage6 = '/pet-icon-3.png'
const petImage7 = '/pet-icon-1.png'
const petImage8 = '/pet-icon-2.png'
const petImage9 = '/pet-icon-3.png'
const petImage10 = '/pet-icon-1.png'
const petImage11 = '/pet-icon-2.png'
const petImage12 = '/pet-icon-3.png'

export default function Mascotas() {
  return (
    <div className="flex flex-col-reverse items-center justify-center xl:flex-row px-10 bg-secondary-content">
      <div className="max-w-[90rem] relative ">
        <section className="bg-background h-[149px] md:h-[186px] bg-cover bg-secondary-content">
          <div className="flex flex-col md:flex-row ">
            <h1
              className=" text-slate-700 text-xl font-normal text-center mt-[26px] mb-3 md:mt-[60px]"
            >
              Más de{' '}
              <span className="md:text-slate-700 md:text-[26px]">
                2.350 mascotas
              </span>
            </h1>
            <div className="carousel rounded-box md:mt-[50px] gap-x-[15px] ">
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage1}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px] filter brightness-50"
                />
              </div>
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage2}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px] filter brightness-50"
                />
              </div>
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage3}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px] filter brightness-50"
                />
              </div>
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage4}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px] filter brightness-50"
                />
              </div>
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage5}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px] filter brightness-50"
                />
              </div>
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage6}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px]  filter brightness-50"
                />
              </div>
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage7}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px] filter brightness-50"
                />
              </div>
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage8}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px] filter brightness-50 "
                />
              </div>
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage9}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px] filter brightness-50 "
                />
              </div>
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage10}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px] filter brightness-50"
                />
              </div>
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage11}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px] filter brightness-50"
                />
              </div>
              <div className="carousel-item">
                <Image
                  width={54}
                  height={54}
                  src={petImage12}
                  alt="pet"
                  className="bg-cover md:w-[95px] md:h-[95px] filter brightness-50"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
