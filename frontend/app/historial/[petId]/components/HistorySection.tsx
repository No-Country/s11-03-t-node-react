"use client";

import Image from "next/image";
import Link from "next/link";
import HistoryCardsContainer from "../components/HistoryCardsContainer";
import UseToken from "@/app/hooks/useToken";
import { PetData } from "../../models/petData.model";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  pet: PetData;
}

export default function HistorySection({ pet }: Props) {
  const { token, data } = UseToken();
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    if (!pet) {
      router.push("/");
    } else {
      if (data) {
        if (data.clientId === pet.clientId) {
          setLoading(false);
        } else {
          router.push("/");
        }
      } else {
        if (data === null) {
          router.push("/");
        }
      }
    }
  }, [data]);

  return loading ? (
    <div className="relative h-screen"></div>
  ) : (
    <>
      <div className="relative flex flex-col items-center py-4 md:py-8 gap-2 md:gap-6">
        <div className="left-16 top-12 absolute hidden md:block">
          <Link href="/">
            <Image
              src="/icons/arrow-left-square.svg"
              width={30}
              height={30}
              alt="Go back icon"
            />
          </Link>
        </div>
        <h3 className="text-[24px] md:text-[32px] text-[#062D3E]">HISTORIAL</h3>
        <div className="flex items-center px-8 py-2 gap-8 h-20 shadow-[1px_1px_8px_0px_rgba(102,102,102,0.1)]">
          <div className="relative flex items-center justify-center rounded-full overflow-y-hidden bg-gray-500 h-[63px] w-[63px]">
            <Image fill src={pet.photo_url} alt="pet picture" />
          </div>
          <span className="text-[20px] md:text-[28px] font-medium font-inter text-[#2F2D53]">
            {pet.name}
          </span>
        </div>
      </div>
      <HistoryCardsContainer appointments={pet.appointments} />
    </>
  );
}