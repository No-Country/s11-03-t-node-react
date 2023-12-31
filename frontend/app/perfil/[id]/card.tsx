"use client";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { CheckSqueaare, UploadImage } from "../icons";
import { MouseEventHandler } from "react";

export default function CardLink({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const isSelected = segment === id;
  const route = useRouter()
  const handleDeleteSelect:MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    route.push("/perfil",{scroll:false})
  }

  return (
    <div
      className={`${
        isSelected
          ? " rounded-[10px] shadow border border-slate-700 bg-white h-[458px] pb-[18px] w-[270px]"
          : "bg-white rounded-[10px] pb-[18px] shadow h-[458px] w-[270px]"
      }`}
    >
      <Link href={`/perfil/${id}`} scroll={false} className=" ">
        <div className="flex  justify-between w-full pt-2 px-[6px]">
          <span className="">
            <UploadImage />
          </span>
          {isSelected && (
            <span className="" onClick={handleDeleteSelect}>
              <CheckSqueaare />
            </span>
          )}
        </div>
        {children}
      </Link>
    </div>
  );
}
