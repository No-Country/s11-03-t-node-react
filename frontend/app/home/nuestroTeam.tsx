import Card from './nuestroTeamCard'
import MySlider from './slider'

const getData = async () => {
  return await fetch(
    'https://s11-03-react-node-production.up.railway.app/api/v1/veterinarians',
    {
      cache: 'no-store',
    },
  ).then((res) => res.json())
}

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
}

async function NuestroTeam() {
  const vets = await getData()

  return (
    <div className="flex flex-col-reverse items-center justify-center xl:flex-row px-10 pb-24 bg-secondary">
      <div className="max-w-[90rem]">
        <h4 className="text-center mt-24 text-accent font-bold">
          Profesionales
        </h4>
        <h1 className="text-center text-xl xl:text-3xl mt-3 font-bold mb-10">
          Nuestro TEAM
        </h1>
        <div>
          <MySlider settings={settings}>
            {vets &&
              vets.data &&
              vets.data.results &&
              vets.data.results.map(
                (v: {
                  _id: string
                  photo_url: string
                  fullname: string
                  speciality: string
                }) => (
                  <Card
                    key={v._id}
                    id={v._id}
                    src={v.photo_url}
                    title={v.fullname}
                    text={v.speciality}
                  />
                ),
              )}
          </MySlider>
        </div>
      </div>
    </div>
  )
}

export default NuestroTeam
