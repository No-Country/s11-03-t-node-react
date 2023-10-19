"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  let segment = useSelectedLayoutSegment();
  let active = href === `/${segment}` || (href === "/" && segment === null)
  
  return (
    <Link
      className={
        active
          ? "underline decoration-accent text-xl text-accent hover:text-accent duration-500"
          : "text-xl hover:text-accent duration-500"
      }
      href={href}
    >
      {children}
    </Link>
  );
}
