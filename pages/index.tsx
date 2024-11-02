import Layout from "@/components/wrapper/Layout";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import {
  ArrowRight,
  ClipboardText,
  GraduationCap,
  Notebook,
  PencilRuler,
  Pill,
  RocketLaunch,
  Target,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const data = {
  reasons: [
    {
      id: 1,
      title: "Program Menarik dan Lengkap",
      icon: <GraduationCap weight="bold" size={72} className="text-purple" />,
      text: "Beragam pilihan program farmasi mulai dari mata kuliah, riset, hingga persiapan apoteker. Semua tersedia di satu tempat!",
    },
    {
      id: 2,
      title: "Soal Ujian yang Up-to-Date",
      icon: <ClipboardText weight="bold" size={72} className="text-purple" />,
      text: "Soal-soal ujian terbaru yang sesuai blueprint terkini, membuat persiapan makin maksimal dengan kualitas terbaik!",
    },
    {
      id: 3,
      title: "Website Nyaman dan Responsif",
      icon: <RocketLaunch weight="bold" size={72} className="text-purple" />,
      text: "Akses belajar nyaman dengan website yang responsif. Bisa diakses kapan aja, di mana aja, dan tanpa hambatan!",
    },
  ],
  programs: [
    {
      program_id: 1,
      title: "Kelas Mata Kulish & Praktikum",
      icon: <PencilRuler weight="bold" size={96} className="text-purple" />,
      text: "Dapatkan pemahaman mendalam tentang mata kuliah farmasi sekaligus pengalaman praktikum yang aplikatif.",
    },
    {
      program_id: 2,
      title: "Kelas Masuk Apoteker & OSCE",
      icon: <Pill weight="bold" size={96} className="text-purple" />,
      text: "Persiapkan diri kamu untuk ujian masuk Apoteker dan OSCE dengan latihan intensif di kelas ini.",
    },
    {
      program_id: 3,
      title: "Kelas Skripsi dan Riset",
      icon: <Notebook weight="bold" size={96} className="text-purple" />,
      text: "Butuh bimbingan buat skripsi atau riset? Di kelas ini, kamu bakal dipandu langsung oleh para mentor.",
    },
    {
      program_id: 4,
      title: "TryOut UKMPPAI",
      icon: <Target weight="bold" size={96} className="text-purple" />,
      text: "Rangkaian soal didesain sesuai blueprint terbaru untuk menguji kesiapan kamu dalam menghadapi ujian.",
    },
  ],
};

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

      <section className="mx-auto grid max-w-[600px] gap-8 pb-[70px] pt-[76px] lg:max-w-[700px] xl:max-w-none">
        <h1 className="text-center text-[32px] font-black text-black">
          Kenapa Pilih RuangObat?
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-16">
          {data.reasons.map((item) => (
            <div key={item.id} className="grid w-[290px] gap-5 px-6 py-[42px]">
              {item.icon}

              <div className="grid gap-2">
                <h4 className="max-w-[220px] text-[24px] font-black leading-[120%] text-black">
                  {item.title}
                </h4>
                <p className="font-medium leading-[170%] text-gray">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[600px] gap-8 py-[70px] lg:max-w-[700px] xl:max-w-none">
        <div className="grid gap-2">
          <h1 className="text-center text-[32px] font-black text-black">
            Program Unggulan RuangObat
          </h1>
          <p className="mx-auto max-w-[500px] text-center font-medium leading-[170%] text-gray">
            Explore berbagai program unggulan yang dirancang khusus buat
            mahasiswa farmasi. Pilih program sesuai kebutuhanmu!
          </p>
        </div>

        <div className="grid justify-center gap-4 xl:grid-cols-2 xl:gap-y-6">
          {data.programs.map((item) => (
            <div
              key={item.program_id}
              className="grid max-w-[592px] items-center gap-4 p-6 xl:flex"
            >
              {item.icon}

              <div className="grid flex-1 gap-2">
                <h4 className="text-[24px] font-black leading-[120%] text-black">
                  {item.title}
                </h4>
                <p className="max-w-[430px] font-medium leading-[170%] text-gray">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
