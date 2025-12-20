import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(path)}
      className="base-card group flex h-full flex-col hover:cursor-pointer"
    >
      <div className="relative isolate grid aspect-square h-auto w-full bg-purple-100 object-cover object-center">
        {icon}

        <h3 className="absolute bottom-0 left-0 m-4 text-2xl font-black leading-[120%] text-purple">
          Ruang
          <br />
          {title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-4 [padding:1.5rem_1rem]">
        <p className="flex-1 text-sm font-medium leading-[170%] text-gray">
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
    </article>
  );
}
