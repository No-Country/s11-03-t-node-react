import Link from "next/link";
import { SignIcon } from "../icons";

export default function DropDown() {
  return (
    <>
      <div className="dropdown dropdown-end">
        <span tabIndex={0} className="">
          <SignIcon />
        </span>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-secondary rounded-box w-52 mt-11 -mr-[18px]"
        >
          <li>
            <Link href={"/login"} >
              Iniciar Sesion
            </Link>
          </li>
          <li>
            {" "}
            <Link href={"/register"} >
              Registrarse
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
