import Card from '../../home/nuestroTeamCard'

const getData = async () => {
  return await fetch('https://vetcare-qwzz.onrender.com/api/v1/veterinarians', {
    cache: 'no-store',
  }).then((res) => res.json())
}

type Props = {
  params: {
    id: number
  }
}

export default async function Post({ params }: Props) {
  const { id } = params
  const vets = await getData()

  return (
    <div className="flex justify-center">
      <div className="mt-16 shadow bg-red-200 w-fit">
        {vets &&
          vets.data &&
          vets.data.results &&
          vets.data.results.map(
            (v: {
              _id: number
              photo_url: string
              fullname: string
              speciality: string
            }) =>
              v._id === id && (
                <Card
                  id={undefined}
                  key={v._id}
                  src={v.photo_url}
                  title={v.fullname}
                  text={v.speciality}
                />
              ),
          )}
      </div>
    </div>
  )
}
