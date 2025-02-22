import { Button } from "@nextui-org/react";
import { ArrowClockwise } from "@phosphor-icons/react";
import Image from "next/image";

export default function ServerErrorPage() {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-8 px-6">
      <Image
        priority
        src="/img/500-img.svg"
        alt="500 img"
        width={1000}
        height={500}
        className="h-auto w-[450px]"
      />

      <div className="grid justify-center gap-6">
        <div className="text-center">
          <h1 className="mb-2 text-[38px] font-black leading-[120%] -tracking-wide text-black">
            Hmmm, Server Sepertinya Error
          </h1>
          <p className="mx-auto max-w-[580px] font-medium leading-[170%] text-gray">
            Sepertinya ada kendala teknis di server kami. Tim kami sedang
            bekerja keras untuk memperbaikinya. Silakan coba beberapa saat lagi.
          </p>
        </div>

        <Button
          color="secondary"
          startContent={<ArrowClockwise weight="bold" size={18} />}
          onClick={() => window.location.reload()}
          className="w-max justify-self-center px-4 font-bold"
        >
          Muat Ulang Halaman
        </Button>
      </div>
    </section>
  );
}
