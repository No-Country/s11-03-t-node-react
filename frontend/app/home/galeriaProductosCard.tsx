import React from 'react'
import Image from 'next/image'

type Props = {
  src: string
}

function GaleriaProductosCard({ src }: Props) {
  return (
    <div className="card gap-4">
      <figure>
        <Image src={src} alt="Movie" width={450} height={200} />
      </figure>
    </div>
  )
}

export default GaleriaProductosCard
