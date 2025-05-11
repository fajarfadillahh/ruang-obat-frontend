import { Button } from "@nextui-org/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

type ButtonBackProps = {
  href?: string;
  className?: string;
};

export default function ButtonBack({ href, className }: ButtonBackProps) {
  const router = useRouter();

  const handleClick = () => {
    href ? router.push(href) : router.back();
  };

  return (
    <Button
      variant="light"
      startContent={<ArrowLeft weight="bold" size={16} />}
      onClick={handleClick}
      className={twMerge("w-max px-4 font-bold text-black", `${className}`)}
    >
      Kembali
    </Button>
  );
}
