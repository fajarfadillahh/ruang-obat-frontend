import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { Button } from "@nextui-org/react";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import Head from "next/head";
import Image from "next/image";

export default function MaintenancePage() {
  return (
    <>
      <Head>
        <title>Server Sedang Dalam Masa Pemeliharaan | Ruangobat.id</title>
      </Head>

      <main className="mx-auto flex min-h-screen w-full max-w-[1200px] items-center justify-center p-8">
        <section className="mx-auto flex max-w-[550px] flex-col gap-16 lg:grid lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-10">
          <div className="grid gap-8">
            <div className="inline-flex items-center gap-2">
              <LogoRuangobat className="h-auto w-10 text-gray/20" />
              <h1 className="text-[24px] font-extrabold -tracking-wide text-black">
                Ruang Obat<span className="text-purple">.</span>
              </h1>
            </div>

            <div className="grid gap-2">
              <h1 className="text-[30px] font-black leading-[120%] -tracking-wide text-black md:text-[42px] lg:text-[48px]">
                Server Sedang Dalam Masa Pemeliharaan
              </h1>
              <p className="max-w-[500px] font-medium leading-[170%] text-gray">
                Kami sedang memberi sentuhan ajaib di balik layar. Website
                sementara dalam proses pemeliharaan untuk layanan yang lebih
                baik. Jangan khawatir, kita bakal balik lagi dalam waktu dekat!
              </p>
            </div>

            <div className="grid gap-2">
              <h6 className="font-bold text-black">Sosial Media Kami</h6>

              <div className="inline-flex items-center gap-6">
                <Button
                  isIconOnly
                  variant="flat"
                  color="secondary"
                  radius="full"
                >
                  <InstagramLogo
                    weight="bold"
                    size={22}
                    className="text-purple"
                  />
                </Button>

                <Button
                  isIconOnly
                  variant="flat"
                  color="secondary"
                  radius="full"
                >
                  <TwitterLogo
                    weight="bold"
                    size={22}
                    className="text-purple"
                  />
                </Button>

                <Button
                  isIconOnly
                  variant="flat"
                  color="secondary"
                  radius="full"
                >
                  <FacebookLogo
                    weight="bold"
                    size={22}
                    className="text-purple"
                  />
                </Button>

                <Button
                  isIconOnly
                  variant="flat"
                  color="secondary"
                  radius="full"
                >
                  <LinkedinLogo
                    weight="bold"
                    size={22}
                    className="text-purple"
                  />
                </Button>
              </div>
            </div>
          </div>

          <Image
            priority
            src="/img/maintenance-img.svg"
            alt="maintenance img"
            width={1000}
            height={500}
          />
        </section>
      </main>
    </>
  );
}
