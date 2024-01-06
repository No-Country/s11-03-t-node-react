import Card from './nuestroTeamCard'
import MySlider from './slider'

const getData = async () => {
  return await fetch('https://vetcare-qwzz.onrender.com/api/v1/veterinarians', {
    cache: 'no-store',
  }).then((res) => res.json())
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

async function NuestroTeam({ rows = 1 }) {
  const vets = await getData()

  return (
    <div className="block px-10 pb-24 bg-secondary pt-24">
      <div className="max-w-[90rem] m-auto">
        <h4 className="text-center text-accent font-bold">Profesionales</h4>
        <h1 className="text-center text-xl xl:text-3xl mt-2 font-bold mb-10">
          Nuestro TEAM
        </h1>
        <div>
          <MySlider settings={{ rows: rows, ...settings }}>
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
