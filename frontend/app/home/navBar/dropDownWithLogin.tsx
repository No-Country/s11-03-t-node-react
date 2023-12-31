"use client "
import Link from "next/link";
import { Profile } from "../icons";
import UseToken from "@/app/hooks/useToken";

export default function DropDownWithLogin(){

  const { handleUpdateToken } = UseToken()
  return (
    <>
      <div className="dropdown dropdown-end">
        <span tabIndex={0} className="">
          <Profile />
        </span>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-secondary rounded-box w-52 mt-11 -mr-[18px]"
        >
          <li>
            <Link href={"/perfil"}>Mi Perfil</Link>
          </li>
          <li>
            <Link href={"/agenda/activas"}>Citas Programadas</Link>
          </li>
          <li >
            <Link href={"#"} onClick={handleUpdateToken}>Cerrar sesion</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
