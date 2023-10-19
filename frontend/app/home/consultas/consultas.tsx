export function Consultas() {
  return (
    <form className="flex flex-col bg-primary md:w-[856px] md:h-[708px] md:p-12">
      <h1 className="w-[292px] text-center md:text-left text-slate-700 text-xl 
      font-normal font-['Secular One'] mb-[47px]">Consultas</h1>
     <div className="flex flex-col md:flex-row md:gap-x-4">
    <div className="flex flex-col">
        <label htmlFor="" className="text-slate-800 text-base font-medium font-['Inter'] leading-none mb-[2px]">Nombre</label>
        <input type="text" placeholder="ingrese su nombre" className="w-[318px] md:w-[368px] h-[62px] px-[23px] py-[21px] bg-gray-100 rounded-md border border-gray-200 mb-7" />
    </div>
    <div className="flex flex-col">
        <label htmlFor="" className="text-slate-800 text-base font-medium font-['Inter'] leading-none mb-[2px]">Apellido</label>
        <input type="text" placeholder="ingrese su apellido" className="w-[318px] md:w-[368px] h-[62px] px-[23px] py-[21px] bg-gray-100 rounded-md border border-gray-200 mb-7" />
    </div>
</div>

      <label htmlFor="" className="text-slate-800 text-base font-medium 
      font-['Inter'] leading-none mb-[2px]">Correo electrónico</label>
      <input type="text" placeholder="vetcare@gmail.com" className="w-[318px] 
      h-[62px] px-[23px] py-[21px] bg-gray-100 rounded-md border
       border-gray-200 mb-7 md:w-full" />
      <label htmlFor="" className="text-slate-800 text-base font-medium 
      font-['Inter'] leading-none mb-[2px]">Mensaje</label>
      <textarea className="w-[321px] h-[158px] bg-gray-100 rounded-md border 
      border-gray-200 md:w-full" />
      <div className="flex flex-col items-center mt-[28px]">
      <button type="submit"className="w-[182px] h-[62px]  bg-accent 
      rounded-md border border-accent text-primary text-center">Enviar</button>
      </div>
    </form>
  );
}
