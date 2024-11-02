import Layout from "@/components/wrapper/Layout";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import {
  ArrowRight,
  ClipboardText,
  GraduationCap,
  RocketLaunch,
} from "@phosphor-icons/react";
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
      <section className="relative mx-auto grid max-w-[600px] items-center gap-10 lg:max-w-[700px] xl:max-w-none xl:grid-cols-[1fr_500px] xl:gap-4">
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
          src="/img/landing-page-img.png"
          alt="home img"
          width={396}
          height={512}
          className="h-auto w-full justify-self-center xl:justify-self-end"
        />
      </section>

      <section className="grid gap-8 pb-[70px] pt-[76px]">
        <h1 className="text-center text-[32px] font-black text-black">
          Kenapa Pilih RuangObat?
        </h1>

        <div className="flex items-center justify-center gap-16">
          <div className="grid w-[290px] gap-5 px-6 py-[42px]">
            <GraduationCap weight="bold" size={72} className="text-purple" />

            <div className="grid gap-3">
              <h4 className="text-[24px] font-black leading-[120%] text-black">
                Program Menarik dan Lengkap
              </h4>
              <p className="font-medium leading-[170%] text-gray">
                Beragam pilihan program farmasi mulai dari mata kuliah, riset,
                hingga persiapan apoteker. Semua tersedia di satu tempat!
              </p>
            </div>
          </div>

          <div className="grid w-[290px] gap-5 px-6 py-[42px]">
            <ClipboardText weight="bold" size={72} className="text-purple" />

            <div className="grid gap-3">
              <h4 className="text-[24px] font-black leading-[120%] text-black">
                Soal Ujian yang Up-to-Date
              </h4>
              <p className="font-medium leading-[170%] text-gray">
                Soal-soal ujian terbaru yang sesuai blueprint terkini, membuat
                persiapan makin maksimal dengan kualitas terbaik!
              </p>
            </div>
          </div>

          <div className="grid w-[290px] gap-5 px-6 py-[42px]">
            <RocketLaunch weight="bold" size={72} className="text-purple" />

            <div className="grid gap-3">
              <h4 className="text-[24px] font-black leading-[120%] text-black">
                Website Nyaman dan Responsif
              </h4>
              <p className="font-medium leading-[170%] text-gray">
                Akses belajar nyaman dengan website yang responsif. Bisa diakses
                kapan aja, di mana aja, dan tanpa hambatan!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
