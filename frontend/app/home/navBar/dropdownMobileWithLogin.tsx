import { useRouter } from "next/navigation";
import { HamburgerIcon } from "../icons";
import NavLink from "./navLink";
import Link from "next/link";
import UseToken from "@/app/hooks/useToken";
export default function DropdownMobileWithLogin(){

  const {handleUpdateToken} = UseToken()
  
    return(
        <div className="dropdown dropdown-end ">
        <span tabIndex={0} className="text-3xl cursor-pointer mx-2 md:hidden">
          <HamburgerIcon />
        </span>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu  shadow bg-secondary rounded-box -mt-4 -mr-8 w-72 "
        >
          <li className="mx-4 my-6 md:my-0">
            <NavLink href="/">Home</NavLink>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <NavLink href="/servicios">Servicios</NavLink>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <NavLink href="/adopta">Adopta</NavLink>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <NavLink href="/nosotros">Nosotros</NavLink>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <NavLink href="/contacto">Contacto</NavLink>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <NavLink href="/perfil">Perfil</NavLink>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <Link className="text-xl"href="/" onClick={handleUpdateToken}>Cerrar sesion</Link>
          </li> 
        </ul>
      </div>
    )
}