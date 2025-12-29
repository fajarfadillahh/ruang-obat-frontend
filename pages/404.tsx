import { Button, Image } from "@nextui-org/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="flex h-screen w-full items-center justify-center px-6">
      <section className="grid justify-items-center gap-12">
        <Image
          src="https://cdn.ruangobat.id/statics/images/second-illustrations/404-img.svg"
          alt="404 img"
          className="h-[250px] w-auto"
        />

        <div className="grid gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl font-black -tracking-wide text-black">
              Oops, Halaman Tidak Ditemukan
            </h1>

            <p className="w-full max-w-[650px] font-medium leading-[170%] text-gray">
              Sepertinya halaman yang kamu cari tidak tersedia atau sudah
              dipindahkan. Jangan khawatir, kami akan membantu kamu menemukan
              jalan kembali.
            </p>
          </div>

          <Button
            color="secondary"
            startContent={<ArrowLeft weight="bold" size={18} />}
            onClick={() => router.back()}
            className="w-max justify-self-center px-12 font-bold"
          >
            Kembali
          </Button>
        </div>
      </section>
    </main>
  );
}
