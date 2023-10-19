import GaleriaProductosCard from './galeriaProductosCard'

function PinterestLayout() {
  return (
    <section className="flex flex-col flex-wrap bg-secondary items-center justify-center pt-[18px] mb-[19px]">
      <div className="max-w-[78rem]">
        <h4 className="self-start mt-20 text-accent font-bold">
          Nuestros productos
        </h4>
        <h1 className="self-start text-xl xl:text-3xl mt-2 font-bold mb-10">
          Galeria de Imágenes
        </h1>
        <div className="flex flex-row justify-center items-end gap-x-2 mb-[18px]">
          <div className="flex flex-col">
            <GaleriaProductosCard src="/gallery-1.png" />
            <GaleriaProductosCard src="/gallery-2.png" />
          </div>
          <div className="flex flex-col">
            <GaleriaProductosCard src="/gallery-3.png" />
            <GaleriaProductosCard src="/gallery-4.png" />
          </div>
          <div className="flex flex-col">
            <GaleriaProductosCard src="/gallery-6.png" />
            <GaleriaProductosCard src="/gallery-5.png" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PinterestLayout
