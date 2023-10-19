import Image from 'next/image'

type Props = {
  src: string
  text: string
  title: string
}

const Card = ({ title, text, src }: Props) => (
  <div className="card bg-base-100 rounded-none">
    <figure>
      <Image src={src} alt="Veterinario" width={300} height={300} />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{title}</h2>
      <p className="hidden xl:flex">{text}</p>
      <div className="card-actions w-4/6 items-center justify-center">
        <button className="btn btn-accent text-base w-full max-w-sm">Pedir Cita</button>
      </div>
    </div>
  </div>
)

export default Card
