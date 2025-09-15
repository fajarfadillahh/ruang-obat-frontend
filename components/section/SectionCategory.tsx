import CardCategory from "@/components/card/CardCategory";
import { MutableRefObject } from "react";
import { twMerge } from "tailwind-merge";

interface SectionCategoryProps {
  type?: "videocourse" | "apotekerclass" | "videoukmppai";
  className?: string;
  sectionRef?: MutableRefObject<HTMLElement | null>;
  categories?: CategoryProps[];
}

type CategoryProps = {
  category_id: string;
  name: string;
  slug: string;
  img_url: string;
};

export default function SectionCategory({
  className,
  type,
  sectionRef,
  categories,
}: SectionCategoryProps) {
  return (
    <section
      className={twMerge("base-container gap-4 py-[100px]", `${className}`)}
      ref={sectionRef}
    >
      <div className="grid gap-1">
        <h2 className="text-2xl font-black -tracking-wide text-black sm:text-3xl">
          Daftar Kategori
        </h2>

        <p className="font-medium leading-[170%] text-gray">
          Pilih video belajar sesuai dengan kategori yang tersedia.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {categories?.map((item) => (
          <CardCategory
            key={item.category_id}
            href={
              type === "apotekerclass"
                ? `/material/${item.slug}?type=${type}`
                : `/categories/${item.slug}?type=${type}`
            }
            image={item.img_url}
            name={item.name}
          />
        ))}
      </div>
    </section>
  );
}
