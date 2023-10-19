import UseToken from "@/app/hooks/token";
import DropDownWithLogin from "./dropDownWithLogin";
import DropDownWithOutLogin from "./dropDownWithOutLogin";
import NavLink from "./navLink";

export default function navBarLogic() {
  
  const {token} = UseToken()
  
  
  return (
    <ul className="md:flex  md:items-center z-[-1] md:z-auto md:static absolute bg-secondary w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
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
        <li className="mx-4 my-6 md:my-0 md:pt-2 link">
          {!token ? <DropDownWithOutLogin /> :
          <DropDownWithLogin /> }
        </li>
    </ul>
  );
}
