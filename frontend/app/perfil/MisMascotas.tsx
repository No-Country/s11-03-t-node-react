"use client";
import { AddIcon, DeleteIcon } from "./icons";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { usePetId } from "../store/mascota/petId";

export default function MisMascostas() {
  const router = useRouter();
  const params = useParams();
  const setPetId = usePetId((state) => state.setPetId)

  const handleClickAddMascota = () => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    modal?.showModal();

    router.push("/perfil/mascotaModal", { scroll: false });
  };
  const handleClickDeleteMascota = () => {
    if (!params.id) {
      return <h1>no has seleccionado ninguna mascota</h1>;
    } else {
      const modal = document.getElementById("my_modal_6") as HTMLDialogElement;
      modal?.showModal();
      router.push(`/perfil/${params.id}/deleteMascota`, { scroll: false });
      setPetId(params.id)      
    }
    
  };
  return (
    <section
      className="relative mt-[26px] md:mt-[73px] mr-4"
    >
      <h1 className="md:text-[32px] text-center text-xl">Mis Mascostas</h1>
      <div className="absolute top-0 right-0 md:right-16 flex gap-x-[7px] ">
        <button onClick={handleClickAddMascota} className="cursor-pointer">
          <AddIcon />
        </button>
        <button className={`${params.id ? "cursor-pointer" : "opacity-40 cursor-not-allowed"}`} onClick={handleClickDeleteMascota}>
          <DeleteIcon />
        </button>
      </div>
    </section>
  );
}
