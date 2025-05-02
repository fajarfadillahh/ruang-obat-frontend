import { Button, Image } from "@nextui-org/react";
import { ArrowClockwise } from "@phosphor-icons/react";

export default function ServerErrorPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center px-6">
      <section className="grid justify-items-center gap-12">
        <Image
          src="/img/500-img.svg"
          alt="500 img"
          className="h-[250px] w-auto"
        />

        <div className="grid gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl font-black -tracking-wide text-black">
              Gawat! Server Mengalami Kendala
            </h1>

            <p className="w-full max-w-[650px] font-medium leading-[170%] text-gray">
              Sepertinya ada kendala teknis di server kami. Tim kami sedang
              bekerja keras untuk memperbaikinya. Silakan coba beberapa saat
              lagi.
            </p>
          </div>

          <Button
            color="secondary"
            startContent={<ArrowClockwise weight="bold" size={18} />}
            onPress={() => window.location.reload()}
            className="w-max justify-self-center px-12 font-bold"
          >
            Refresh Halaman
          </Button>
        </div>
      </section>
    </main>
  );
}
