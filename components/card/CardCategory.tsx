import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface CardCategoryProps {
  href: string;
  image: string;
  name: string;
  className?: string;
}

export default function CardCategory({
  href,
  image,
  name,
  className,
}: CardCategoryProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        "group relative grid justify-items-center gap-4 overflow-hidden rounded-xl border-2 border-gray/10 p-8 text-sm hover:cursor-pointer hover:bg-purple/10",
        `${className}`,
      )}
    >
      <Image
        src={image}
        alt={name}
        width={1000}
        height={1000}
        className="size-20 object-fill"
      />

      <h3 className="line-clamp-2 text-center font-extrabold text-black group-hover:line-clamp-none">
        {name}
      </h3>
    </Link>
  );
}
