'use client'
import axios from 'axios'
import { Close } from '../../icons'
import { usePetId } from '@/app/store/mascota/petId'
import { useUpdateMutations } from '@/app/store/mascota/updateMutation'
import { useRouter } from 'next/navigation'

export default function DeleteMascota() {
  const route = useRouter()
  const setUpdateMutation = useUpdateMutations(
    (state) => state.setUpdateMutations,
  )
  const petId = usePetId((state) => state.petId)

  const handleDeleteMascota = () => {
    axios
      .delete(`https://vetcare-qwzz.onrender.com/api/v1/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        const modal = document.getElementById('my_modal_8') as HTMLDialogElement
        modal?.showModal()
        if (response) {
          return setUpdateMutation(true)
        }
        // if (response) {
        //   axios.delete(
        //     `https://vetcare-qwzz.onrender.com/api/v1/images/${imageId}`,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${localStorage.getItem("token")}`,
        //       },
        //      }
        //  );
        // }
      })
      .catch((error) => {
        console.error('Error deleting pet', error)
      })
  }

  return (
    <div>
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box ">
          <form method="dialog" className="flex justify-end mb-[19px]">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={() => route.back()}>
              <Close />
            </button>
          </form>
          <div className="px-5 ">
            <h3 className="text-xl font-normal text-center font-inter mb-[37px]">
              ¿Está seguro que desea eliminar la mascota?
            </h3>
            <form method="dialog" className="flex flex-col">
              <button
                onClick={handleDeleteMascota}
                className="py-4 h-[70px] btn btn-accent capitalize rounded-md border border-accent bg-accent text-center text-white text-base font-medium mb-[27px]"
              >
                Si, eliminar.
              </button>
              <button
                onClick={() => route.back()}
                className="py-4 w-full h-[70px]  bg-amber-300 rounded-md border border-amber-300 text-center text-slate-800 text-base font-medium font-inter"
              >
                No, Cancelar.
              </button>
            </form>
          </div>
          <div className="modal-action"></div>
        </div>
      </dialog>
    </div>
  )
}
