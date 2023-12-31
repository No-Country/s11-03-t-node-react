"use client"
import { useRouter } from "next/navigation";
import { Close, Tick } from "../../icons";

export default function MascotaCreada() {
  
    const route = useRouter()
    const handleGoBackProfile = () => {
      const closeButton = document.querySelector('#my_modal_5 button') as HTMLButtonElement | null;;
      if (closeButton) {
        closeButton.click();
      }
      route.push("/perfil",{scroll:false});
    }
    
  return (
    <dialog id="my_modal_7" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box ">
        <form method="dialog" className="flex justify-end mb-[19px]">
          {/* if there is a button in form, it will close the modal */}
          <button>
            <Close />
          </button>
        </form>
        <div className="flex justify-center mb-[21px]">
        <span>
          
        <Tick />
        </span>
        </div>
        <div className="px-5 ">
          <h1 className="text-xl font-normal text-center font-inter mb-[37px]">
            Tu mascota fue agregada con éxito.
          </h1>
          <form method="dialog" className="flex flex-col">
            <button
              onClick={ () => route.push("/perfil/mascotaModal", {scroll:false})}
              className="py-4 rounded-md border border-accent bg-accent text-center text-white text-base font-medium mb-[27px]"
            >
              Agregar otra Mascota
            </button>
            <button onClick={handleGoBackProfile} className="py-4 bg-amber-300 rounded-md border border-amber-300 text-center text-slate-800 text-base font-medium font-inter">
              volver a mi perfil .
            </button>
          </form>
        </div>
        <div className="modal-action"></div>
      </div>
    </dialog>
  );
}
