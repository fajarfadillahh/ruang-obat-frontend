import { dummyCategories } from "@/data/dummy";
import { Heartbeat } from "@phosphor-icons/react";
import Link from "next/link";
import { MutableRefObject } from "react";
import { twMerge } from "tailwind-merge";

interface SectionCategoryProps {
  type?: "videocourse" | "apotekerclass" | "videoukmppai";
  className?: string;
  sectionRef?: MutableRefObject<HTMLElement | null>;
}

export default function SectionCategory({
  className,
  type,
  sectionRef,
}: SectionCategoryProps) {
  return (
    <section
      className={twMerge(
        "base-container gap-4 [padding:50px_0_100px]",
        `${className}`,
      )}
      ref={sectionRef}
    >
      <div className="grid">
        <h2 className="text-3xl font-black -tracking-wide text-black">
          Daftar Kategori
        </h2>

        <p className="font-medium leading-[170%] text-gray">
          Pilih video belajar sesuai dengan kategori yang tersedia.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {dummyCategories.map((item) => (
          <Link
            key={item.category_id}
            href={
              type === "apotekerclass"
                ? `/materi/${item.category_slug}?type=${type}`
                : `/kategori/${item.category_slug}?type=${type}`
            }
            className="group grid justify-items-center gap-4 overflow-hidden rounded-xl border-2 border-gray/10 text-sm [padding:2rem_1rem] hover:cursor-pointer hover:bg-purple/10 sm:text-base"
          >
            <Heartbeat
              weight="duotone"
              className="text-5xl text-purple sm:text-6xl"
            />

            <h4 className="line-clamp-2 text-center font-extrabold text-black group-hover:line-clamp-none">
              {item.category_name}
            </h4>
          </Link>
        ))}
      </div>
    </section>
  );
}
