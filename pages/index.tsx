import Layout from "@/components/wrapper/Layout";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import {
  ClipboardText,
  CloudSun,
  Gift,
  Globe,
  GraduationCap,
  Headset,
  InstagramLogo,
  Notebook,
  NotePencil,
  PencilRuler,
  Pill,
  RocketLaunch,
  Target,
  TiktokLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const data = {
  reasons: [
    {
      id: 1,
      title: "Program Menarik & Lengkap",
      icon: <GraduationCap weight="bold" size={72} className="text-purple" />,
      text: "Beragam pilihan program farmasi mulai dari mata kuliah, riset, hingga persiapan apoteker. Semua tersedia di satu tempat.",
    },
    {
      id: 2,
      title: "Soal Ujian yang Up-to-Date",
      icon: <ClipboardText weight="bold" size={72} className="text-purple" />,
      text: "Soal-soal ujian terbaru yang sesuai blueprint terkini, membuat persiapan makin maksimal dengan kualitas terbaik.",
    },
    {
      id: 3,
      title: "Website Nyaman & Responsif",
      icon: <RocketLaunch weight="bold" size={72} className="text-purple" />,
      text: "Akses belajar nyaman dengan website yang responsif. Bisa diakses kapan aja, di mana aja, dan tanpa hambatan.",
    },
  ],
  programs: [
    {
      program_id: 1,
      title: "Kelas Mata Kuliah & Praktikum",
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
      title: "Kelas Skripsi & Riset",
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
  mentors: [
    {
      id: 1,
      image: "/img/mentors/kak-asma-farmakologi-dan-toksikologi.webp",
      name: "Kak Asma",
      mentor_title: "Mentor Farmakologi dan Toksikologi",
    },
    {
      id: 2,
      image: "/img/mentors/kak-aurel-farmasi-klinis.webp",
      name: "Kak Aurel",
      mentor_title: "Mentor Farmasi Klinis",
    },
    {
      id: 3,
      image: "/img/mentors/kak-azka-teknologi-farmasi.webp",
      name: "Kak Azka",
      mentor_title: "Mentor Teknologi Farmasi",
    },
    {
      id: 4,
      image: "/img/mentors/kak-daffa-kimia-farmasi.webp",
      name: "Kak Daffa",
      mentor_title: "Mentor Kimia Farmasi",
    },
    {
      id: 5,
      image: "/img/mentors/kak-dellia-formulasi.webp",
      name: "Kak Dellia",
      mentor_title: "Mentor Formulasi",
    },
    {
      id: 6,
      image: "/img/mentors/kak-dhea-spss.webp",
      name: "Kak Dhea",
      mentor_title: "Mentor SPSS",
    },
    {
      id: 7,
      image: "/img/mentors/kak-disel-riset-sains-dan-teknologi.webp",
      name: "Kak Disel",
      mentor_title: "Mentor Riset Sains dan Teknologi",
    },
    {
      id: 8,
      image: "/img/mentors/kak-fasha-teknologi-farmasi.webp",
      name: "Kak Fasha",
      mentor_title: "Mentor Teknologi Farmasi",
    },
    {
      id: 9,
      image: "/img/mentors/kak-friska-klinis.webp",
      name: "Kak Friska",
      mentor_title: "Mentor Klinis",
    },
    {
      id: 10,
      image: "/img/mentors/kak-nanda-farmasi-klinis.webp",
      name: "Kak Nanda",
      mentor_title: "Mentor Farmasi Klinis",
    },
    {
      id: 11,
      image: "/img/mentors/kak-pradhini-farmakologi-dan-toksikologi.webp",
      name: "Kak Pradhini",
      mentor_title: "Mentor Farmakologi dan Toksikologi",
    },
    {
      id: 12,
      image: "/img/mentors/kak-tiya-teknologi-formulasi-dan-kimia.webp",
      name: "Kak Tiya",
      mentor_title: "Mentor Teknologi Formulasi dan Kimia",
    },
  ],
  faqs: [
    {
      id: 1,
      title: "Apa itu Ruang Obat?",
      text: "Ruang Obat adalah tempat belajar online khusus mahasiswa farmasi yang menyediakan berbagai program belajar, mulai dari mata kuliah, persiapan ujian masuk apoteker, hingga tryout UKMPPAI. Semua program disusun untuk membantu kamu sukses dalam pendidikan farmasi.",
      icon: <Pill weight="bold" size={24} className="text-black" />,
    },
    {
      id: 2,
      title: "Bagaimana cara mendaftar di Ruang Obat?",
      text: "Klik tombol register di pojok kanan atas untuk membuat akun, pilih program yang sesuai kebutuhan, dan ikuti instruksi pendaftaran. Setelah daftar, kamu bisa langsung akses program dan mulai belajar.",
      icon: <NotePencil weight="bold" size={24} className="text-black" />,
    },
    {
      id: 3,
      title: "Apakah ada program yang gratis di Ruang Obat?",
      text: "Ya, Ruang Obat menyediakan beberapa program gratis dengan syarat tertentu, seperti upload bukti follow, share, dan komen di media sosial Ruang Obat. Detailnya bisa cek di halaman program gratis.",
      icon: <Gift weight="bold" size={24} className="text-black" />,
    },
    {
      id: 4,
      title: "Bagaimana cara mengikuti tryout di Ruang Obat?",
      text: "Kamu bisa ikut tryout UKMPPAI di program khusus yang sudah disediakan. Cukup pilih program tryout, ikuti instruksi, dan selamat kamu bisa mengerjakan soal-soal tryout yang sesuai dengan standar terbaru.",
      icon: <Target weight="bold" size={24} className="text-black" />,
    },
    {
      id: 5,
      title: "Apakah materi ujian bisa diakses kapan saja?",
      text: "Bisa banget! Materi di Ruang Obat tersedia selama 24/7, jadi kamu bisa belajar kapan aja sesuai jadwal dan ritme belajarmu.",
      icon: <CloudSun weight="bold" size={24} className="text-black" />,
    },
    {
      id: 6,
      title: "Siapa yang bisa saya hubungi jika ada kendala?",
      text: "Jika kamu butuh bantuan, kamu bisa hubungi tim support Ruang Obat via nomor WhatsApp.",
      icon: <Headset weight="bold" size={24} className="text-black" />,
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
    <>
      <Layout title="Ruang Belajar Farmasi Super Lengkap dan Fleksibel">
        <section className="relative mx-auto grid max-w-[600px] items-center gap-10 lg:max-w-[700px] xl:max-w-none xl:grid-cols-[1fr_500px] xl:gap-4">
          <div className="grid gap-10 justify-self-center lg:max-w-[580px] xl:justify-self-start">
            <div className="grid gap-4">
              <p className="font-medium text-gray">
                👋 Selamat datang di Ruang Obat
              </p>
              <h1 className="text-[48px] font-black capitalize leading-[100%] -tracking-wide text-black md:text-[56px] lg:text-[68px]">
                Ruang Belajar Farmasi Super Lengkap dan Fleksibel{" "}
                <div className="inline-flex -space-x-3">
                  <Image
                    src="/img/home-avatar1.webp"
                    alt="avatar mentor img"
                    width={100}
                    height={100}
                    className="size-10 rounded-full lg:size-14"
                    priority
                  />
                  <Image
                    src="/img/home-avatar2.webp"
                    alt="avatar mentor img"
                    width={100}
                    height={100}
                    className="size-10 rounded-full lg:size-14"
                    priority
                  />
                  <Image
                    src="/img/home-avatar3.webp"
                    alt="avatar mentor img"
                    width={100}
                    height={100}
                    className="size-10 rounded-full lg:size-14"
                    priority
                  />
                </div>
              </h1>
              <p className="font-medium leading-[170%] text-gray">
                Ruang Obat merupakan tempat belajar farmasi private No.1 di
                Indonesia untuk seluruh mahasiswa di Indonesia. Terdapat banyak
                program menarik, mulai dari Kelas Mata Kuliah & Praktikum, Kelas
                Skripsi & Riset, Kelas Masuk Apoteker & OSCE, Serta TryOut
                UKMPPAI.
              </p>
              <p className="font-medium leading-[170%] text-gray">
                Di website Ruang Obat kalian akan dapat mengakses berbagai
                program. Mari raih gelar sarjana dan apotekermu bersama Ruang
                Obat.
                <br />
                #bimbelfarmasi #cukupdisiniaja
              </p>
            </div>

            <div className="grid gap-2 sm:inline-flex sm:items-center sm:gap-4">
              <Button
                variant="solid"
                color="secondary"
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
            src="/img/home-img.webp"
            alt="home img"
            width={396}
            height={512}
            className="h-auto w-full justify-self-center xl:justify-self-end"
          />
        </section>

        <section className="mx-auto grid max-w-[600px] gap-8 pb-[70px] pt-[76px] lg:max-w-[700px] xl:max-w-none">
          <h1 className="text-center text-[32px] font-black text-black">
            Kenapa Pilih Ruang Obat?
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-16">
            {data.reasons.map((item) => (
              <div
                key={item.id}
                className="grid w-[290px] gap-5 px-6 py-[42px]"
              >
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
              Program Unggulan Ruang Obat
            </h1>
            <p className="mx-auto max-w-[500px] text-center font-medium leading-[170%] text-gray">
              Explore berbagai program unggulan yang dirancang khusus buat
              mahasiswa farmasi. Pilih program sesuai kebutuhanmu.
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

        <section className="grid gap-8 py-[70px]">
          <div className="grid gap-2">
            <h1 className="text-center text-[32px] font-black text-black">
              Ayo, Kenalan Dengan Mentor Ruang Obat
            </h1>
            <p className="mx-auto max-w-[700px] text-center font-medium leading-[170%] text-gray">
              Ruang Obat memiliki mentor yang sangat berpengalaman dan siap
              bantu kamu mencapai target belajar. Dari praktisi, peneliti,
              sampai apoteker senior, semuanya ada di sini.
            </p>
          </div>

          <div className="mentor-container overflow-hidden">
            <Swiper
              loop={true}
              slidesPerView={"auto"}
              spaceBetween={24}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
            >
              {data.mentors.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="grid max-w-[320px] overflow-hidden rounded-xl border-2 border-gray/20 bg-white p-6 xs:max-w-[350px]"
                >
                  <Image
                    src={`${item.image}`}
                    alt={`image ${item.name}`}
                    width={500}
                    height={500}
                    className="aspect-square rounded-xl"
                    priority
                  />

                  <div className="mt-8 grid flex-1 gap-1">
                    <h4 className="text-[20px] font-black leading-[120%] text-black">
                      {item.name}
                    </h4>
                    <p className="text-sm font-medium capitalize leading-[170%] text-gray">
                      {item.mentor_title}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="grid gap-8 py-[70px]">
          <h1 className="text-center text-[32px] font-black text-black">
            Yang Paling Banyak Ditanyakan
          </h1>

          <Accordion
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
            defaultExpandedKeys={["1"]}
            className="mx-auto max-w-[950px]"
          >
            {data.faqs.map((item) => (
              <AccordionItem
                key={item.id}
                title={item.title}
                startContent={item.icon}
                classNames={{
                  title: "text-[18px] text-black font-bold xs:text-[20px]",
                  indicator: "text-black",
                  content: "text-gray leading-[170%] font-medium pb-8",
                }}
              >
                {item.text}
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="py-[70px]">
          <div className="mx-auto grid max-w-[950px] gap-12 rounded-xl border-2 border-l-[16px] border-black px-4 py-20 sm:px-16">
            <div className="grid gap-2">
              <h1 className="text-center text-[28px] font-black text-black">
                Siap Mulai Perjalanan Belajar Bersama Ruang Obat?
              </h1>
              <p className="mx-auto max-w-[800px] text-center font-medium leading-[170%] text-gray">
                Gabung sekarang dan raih kesempatan belajar farmasi dengan
                materi lengkap, mentor berpengalaman, dan akses penuh ke
                berbagai program unggulan. Buka pintu kesuksesan karier farmasi
                kamu di sini.
              </p>
            </div>

            <Button
              variant="solid"
              color="secondary"
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
              className="w-max justify-self-center px-4 font-bold"
            >
              Daftar Sekarang!
            </Button>
          </div>
        </section>
      </Layout>

      <footer className="grid overflow-hidden bg-purple">
        <div className="mx-auto h-full w-full max-w-[1200px] px-6">
          <div className="grid gap-16 py-[140px] sm:flex sm:items-center">
            <div className="grid grid-cols-2 grid-rows-3 gap-4 sm:gap-x-16 sm:gap-y-6">
              {[
                ["Beranda", "#"],
                ["Kebijakan Privasi", "/company/privacy"],
                ["Ketentuan Layanan", "/company/terms"],
                ["Tentang Kami", "#"],
                ["CBT", "https://cbt.ruangobat.id"],
              ].map(([text, link], index) => (
                <Link
                  key={index}
                  href={`${link}`}
                  className="text-[18px] font-medium text-white hover:underline"
                >
                  {text}
                </Link>
              ))}
            </div>

            <div className="hidden h-1 w-full flex-1 bg-white/20 md:flex" />

            <div className="flex items-center gap-8">
              <Link
                href="https://www.instagram.com/ruangobat.id/"
                target="_blank"
              >
                <InstagramLogo weight="bold" size={28} className="text-white" />
              </Link>

              <Link
                href="https://api.whatsapp.com/send?phone=6289637015733"
                target="_blank"
              >
                <WhatsappLogo weight="bold" size={28} className="text-white" />
              </Link>

              <Link href="https://ruangobat.id/" target="_blank">
                <Globe weight="bold" size={28} className="text-white" />
              </Link>

              <Link href="https://www.tiktok.com/@ruangobat.id" target="_blank">
                <TiktokLogo weight="fill" size={28} className="text-white" />
              </Link>
            </div>
          </div>

          <p className="z-30 pb-8 text-center font-medium capitalize text-white xl:relative xl:-mb-20 xl:pb-0">
            &copy; PT. Pharmacy Cone Group 2024 | seluruh hak cipta dilindungi
            undang-undang.
          </p>
        </div>

        <h1 className="hidden select-none justify-self-center text-center text-[240px] font-black -tracking-[0.5rem] text-white/20 xl:flex">
          RuangObat.
        </h1>
      </footer>
    </>
  );
}
