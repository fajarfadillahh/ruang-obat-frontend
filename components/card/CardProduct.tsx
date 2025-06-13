import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { ReactNode } from "react";

interface CardProductProps {
  title: string;
  icon: ReactNode;
  path: string;
  tagline: string;
}

export default function CardProduct({
  title,
  icon,
  path,
  tagline,
}: CardProductProps) {
  return (
    <Link
      href={path}
      className="group grid overflow-hidden rounded-xl bg-white shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
    >
      <div className="relative isolate aspect-square h-auto w-full bg-purple object-cover object-center group-hover:grayscale-[0.5]">
        {icon}

        <h2 className="absolute bottom-4 left-4 text-2xl font-black text-white sm:text-xl">
          {title}
        </h2>
      </div>

      <div className="grid gap-4 [padding:1.5rem_1rem]">
        <p className="text-sm font-medium leading-[170%] text-gray">
          {tagline}
        </p>

        <Link
          href={path}
          className="inline-flex w-max items-center gap-1 text-sm font-bold text-purple hover:underline"
        >
          Lihat Selengkapnya
          <ArrowRight weight="bold" size={16} />
        </Link>
      </div>
    </Link>
  );
}
