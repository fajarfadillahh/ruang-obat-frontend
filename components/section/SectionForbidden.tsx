import { Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SectionForbidden() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center bg-white">
      <div className="grid gap-8">
        <Image
          priority
          src="https://s3.nevaobjects.id/ruang-obat-assets/statics/images/main-illustrations/forbidden-img.webp"
          alt="forbidden img"
          width={1000}
          height={1000}
          className="h-[400px] w-auto justify-self-center"
        />

        <div className="grid justify-items-center gap-8">
          <div className="grid gap-4 text-center">
            <h1 className="text-4xl font-black capitalize text-black">
              Akses kamu ditolak 🔒
            </h1>
            <p className="max-w-[500px] font-medium leading-[170%] text-gray">
              Kamu tidak memiliki hak untuk mengakses halaman ini. Segala bentuk
              percobaan akses yang tidak sah dilarang.
            </p>
          </div>

          <Button
            color="secondary"
            endContent={<ArrowRight weight="bold" size={18} />}
            onClick={() => router.push("/")}
            className="w-max px-6 font-bold"
          >
            Kembali ke Halaman Utama
          </Button>
        </div>
      </div>
    </div>
  );
}
