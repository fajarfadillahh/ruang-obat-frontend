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
    <Link href={path} className="base-card group">
      <div className="relative isolate aspect-square h-auto w-full bg-purple object-cover object-center group-hover:grayscale-[0.5]">
        {icon}

        <h2 className="absolute bottom-0 left-0 m-4 text-2xl font-black text-white sm:text-xl">
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
