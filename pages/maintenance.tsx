import Layout from "@/components/wrapper/Layout";
import { Button } from "@nextui-org/react";
import { ArrowClockwise } from "@phosphor-icons/react";
import Image from "next/image";

export default function MaintenancePage() {
  return (
    <Layout title="Server Error Page">
      <section className="flex flex-col items-center justify-center gap-8 pt-8">
        <Image
          priority
          src="/img/maintenance-img.svg"
          alt="maintenance img"
          width={1000}
          height={500}
          className="h-auto w-[400px]"
        />

        <div className="grid justify-center gap-6">
          <div className="text-center">
            <h1 className="mb-2 text-[32px] font-bold -tracking-wide text-black">
              Server sedang dalam perbaikan
            </h1>
            <p className="mx-auto max-w-[650px] font-medium leading-[170%] text-gray">
              Kami sedang memberi sentuhan ajaib di balik layar. Website
              sementara dalam proses perbaikan untuk layanan yang lebih baik.
              Jangan khawatir, kita bakal balik lagi dalam waktu dekat!
            </p>
          </div>

          <Button
            variant="solid"
            color="secondary"
            startContent={<ArrowClockwise weight="bold" size={18} />}
            onClick={() => window.location.reload()}
            className="w-max justify-self-center px-4 font-bold"
          >
            Muat Ulang Halaman
          </Button>
        </div>
      </section>
    </Layout>
  );
}