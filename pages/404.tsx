import Layout from "@/components/wrapper/Layout";
import { Button } from "@nextui-org/react";
import { ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <Layout title="Ooppss, Halaman Tidak Ditemukan">
      <section className="flex flex-col items-center justify-center gap-8 pt-8">
        <Image
          priority
          src="/img/404-img.svg"
          alt="404 img"
          width={1000}
          height={500}
          className="h-auto w-[400px]"
        />

        <div className="grid justify-center gap-6">
          <div className="text-center">
            <h1 className="mb-2 text-[32px] font-bold -tracking-wide text-black">
              Ooppss, Halaman Tidak Ditemukan
            </h1>
            <p className="mx-auto max-w-[620px] font-medium leading-[170%] text-gray">
              Sepertinya halaman yang anda cari tidak tersedia atau sudah
              dipindahkan. Jangan khawatir, kami akan membantu anda menemukan
              jalan kembali.
            </p>
          </div>

          <Button
            variant="solid"
            color="secondary"
            startContent={<ArrowLeft weight="bold" size={18} />}
            onClick={() => router.push("/dashboard")}
            className="w-max justify-self-center px-4 font-bold"
          >
            Kembali Ke Dashboard
          </Button>
        </div>
      </section>
    </Layout>
  );
}
