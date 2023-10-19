import Image from 'next/image'
import Section from './nuestrasSection'
import Card from './nuestroTeamCard'
import CardContainer from './nuestroTeamCardContainer'
import MySlider from './slider'

const getData = async () => {
  return await fetch(
    'https://s11-03-react-node-production.up.railway.app/api/v1/veterinarians',
    {
      cache: 'no-store',
    },
  ).then((res) => res.json())
}

async function NuestroTeam() {
  const vets = await getData()

  return (
    <div className="flex flex-col-reverse items-center justify-center xl:flex-row px-10 pb-24 bg-secondary">
      <div className="max-w-[90rem]">
        <h4 className="text-center mt-20 text-accent font-bold">
          Profesionales
        </h4>
        <h1 className="text-center text-xl xl:text-3xl mt-2 font-bold mb-10">
          Nuestro TEAM
        </h1>
        <div>
          <MySlider>
            {vets &&
              vets.data &&
              vets.data.results &&
              vets.data.results.map(
                (v: {
                  _id: number
                  photo_url: string
                  fullname: string
                  speciality: string
                }) => (
                  <Card
                    key={v._id}
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
