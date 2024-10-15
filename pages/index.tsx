import Layout from "@/components/wrapper/Layout";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return;
  }

  return (
    <Layout title="Ruang Belajar Farmasi Super Lengkap dan Fleksibel">
      <div className="relative mx-auto grid max-w-[600px] items-center gap-10 lg:max-w-[700px] xl:max-w-none xl:grid-cols-[1fr_500px] xl:gap-4">
        <div className="grid gap-10 justify-self-center lg:max-w-[580px] xl:justify-self-start">
          <div className="grid gap-4">
            <p className="font-medium text-gray">
              👋 Selamat datang di RuangObat
            </p>
            <h1 className="text-[48px] font-black capitalize leading-[100%] -tracking-wide text-black md:text-[56px] lg:text-[68px]">
              Ruang Belajar Farmasi Super Lengkap dan Fleksibel{" "}
              <AvatarGroup size="lg" className="hidden lg:inline-flex">
                <Avatar src="/img/home-avatar-1.png" />
                <Avatar src="/img/home-avatar-2.png" />
                <Avatar src="/img/home-avatar-3.png" />
              </AvatarGroup>
            </h1>
            <p className="font-medium leading-[170%] text-gray">
              RuangObat merupakan platform belajar farmasi private No.1 di
              Indonesia untuk seluruh mahasiswa di Indonesia. Terdapat banyak
              program menarik, mulai dari Kelas Mata Kuliah & Praktikum, Kelas
              Skripsi & Riset, Kelas Masuk Apoteker & OSCE, Serta TryOut
              UKMPPAI.
            </p>
            <p className="font-medium leading-[170%] text-gray">
              Di website RuangObat kalian akan dapat mengakses berbagai program.
              Mari raih gelar sarjana dan apotekermu bersama RuangObat
              #bimbelfarmasi #cukupdisiniaja.
            </p>
          </div>

          <div className="grid gap-2 sm:inline-flex sm:items-center sm:gap-4">
            <Button
              variant="solid"
              color="secondary"
              endContent={<ArrowRight weight="bold" size={16} />}
              onClick={() => {
                if (window.location.host == "localhost:3000") {
                  router.push("/dashboard");
                } else {
                  window.open("https://cbt.ruangobat.id/dashboard", "_blank");
                }
              }}
              className="px-4 font-bold"
            >
              Halaman Dashboard
            </Button>

            <Button
              variant="bordered"
              className="border-black px-4 font-bold text-black"
              onClick={() => {
                if (window.location.host == "localhost:3000") {
                  router.push("/dashboard");
                } else {
                  window.open(
                    "https://cbt.ruangobat.id/auth/register",
                    "_blank",
                  );
                }
              }}
            >
              Mulai Ujian Sekarang!
            </Button>
          </div>
        </div>

        <Image
          priority
          src="/img/home-img.png"
          alt="home img"
          width={396}
          height={512}
          className="h-auto w-full justify-self-center xl:justify-self-end"
        />
      </div>
    </Layout>
  );
}
