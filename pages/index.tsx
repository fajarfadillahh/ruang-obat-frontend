import Layout from "@/components/wrapper/Layout";
import { siteConfig } from "@/config/site";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { IconContext } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

export default function HomePage() {
  const router = useRouter();
  const [client, setClient] = useState<boolean>(false);

  function getCardStyles(item: any, type: "reasons" | "programs") {
    const cardItem =
      (type === "reasons" && item.id === 2) ||
      (type === "programs" && item.id === 1);

    const cardWrapper = cardItem
      ? "bg-purple"
      : "bg-white [box-shadow:0_0_12px_rgba(0,0,0,0.1)]";
    const cardIcon = cardItem ? "text-white" : "text-purple";
    const cardTitle = cardItem ? "text-white" : "text-black";
    const cardText = cardItem ? "text-gray-200" : "text-gray";

    return { cardWrapper, cardIcon, cardTitle, cardText };
  }

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return;

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
                className="px-4 font-bold"
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

        {/* reasons */}
        <section className="mx-auto grid max-w-[600px] gap-8 [padding:200px_0_100px] lg:max-w-[700px] xl:max-w-none">
          <h1 className="text-center text-[32px] font-black text-black">
            Kenapa Harus Pilih Ruang Obat?
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-12">
            {siteConfig.reasons.map((item) => {
              const { cardWrapper, cardIcon, cardTitle, cardText } =
                getCardStyles(item, "reasons");

              return (
                <IconContext.Provider
                  key={item.id}
                  value={{
                    weight: "bold",
                    size: 58,
                    className: cardIcon,
                  }}
                >
                  <div
                    className={`grid w-[290px] gap-5 rounded-xl [padding:2.5rem_1.5rem] ${cardWrapper}`}
                  >
                    <item.icon />

                    <div className="grid gap-2">
                      <h4
                        className={`max-w-[220px] text-[24px] font-black leading-[120%] ${cardTitle}`}
                      >
                        {item.title}
                      </h4>
                      <p className={`font-medium leading-[170%] ${cardText}`}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </IconContext.Provider>
              );
            })}
          </div>
        </section>

        {/* programs */}
        <section className="mx-auto grid max-w-[600px] gap-8 py-[100px] lg:max-w-[700px] xl:max-w-none">
          <div className="grid gap-2">
            <h1 className="text-center text-[32px] font-black text-black">
              Program Unggulan Ruang Obat
            </h1>
            <p className="mx-auto max-w-[650px] text-center font-medium leading-[170%] text-gray">
              Explore berbagai program unggulan yang dirancang khusus buat
              mahasiswa farmasi. Pilih program sesuai kebutuhanmu.
            </p>
          </div>

          <div className="grid justify-center gap-4 lg:grid-cols-2 xl:gap-y-6">
            {siteConfig.programs.map((item) => {
              const { cardWrapper, cardIcon, cardTitle, cardText } =
                getCardStyles(item, "programs");

              return (
                <IconContext.Provider
                  key={item.id}
                  value={{
                    weight: "bold",
                    size: 91,
                    className: cardIcon,
                  }}
                >
                  <div
                    className={`grid max-w-[592px] items-center gap-4 rounded-xl [padding:2.5rem_1.5rem] xl:flex ${cardWrapper}`}
                  >
                    <item.icon />

                    <div className="grid flex-1 gap-2">
                      <h4
                        className={`text-[24px] font-black leading-[120%] ${cardTitle}`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`max-w-[430px] font-medium leading-[170%] ${cardText}`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                </IconContext.Provider>
              );
            })}
          </div>
        </section>

        {/* mentors */}
        <section className="grid gap-4 py-[100px]">
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
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
            >
              {siteConfig.mentors.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="mt-4 grid max-w-[300px] overflow-hidden rounded-xl bg-white p-6 [box-shadow:0_0_12px_rgba(0,0,0,0.1)] xs:max-w-[330px]"
                >
                  <Image
                    src={item.image as string}
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

        {/* faqs */}
        <section className="mx-auto grid max-w-[600px] gap-8 py-[100px] lg:max-w-[700px] xl:max-w-full">
          <h1 className="text-center text-[32px] font-black text-black">
            Yang Paling Banyak Ditanyakan
          </h1>

          <IconContext.Provider
            value={{
              weight: "bold",
              size: 24,
              className: "text-black",
            }}
          >
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
            >
              {siteConfig.faqs.map((item) => (
                <AccordionItem
                  key={item.id}
                  title={item.title}
                  startContent={<item.icon />}
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
          </IconContext.Provider>
        </section>

        {/* cta */}
        <section className="py-[100px]">
          <div className="mx-auto grid max-w-[600px] gap-12 rounded-xl border-2 border-l-[16px] border-black px-4 py-20 sm:px-16 lg:max-w-[700px] xl:max-w-[950px]">
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
        <div className="relative mx-auto h-full w-full max-w-[1200px] px-6 xl:p-0">
          <div className="grid gap-16 py-[164px] sm:flex sm:items-center">
            <div className="grid grid-cols-2 grid-rows-3 gap-4 sm:gap-x-16 sm:gap-y-6">
              {siteConfig.footer.menu.map((item, index) => (
                <Link
                  key={index}
                  href={item.href as string}
                  className="w-max text-[18px] font-medium text-white hover:rounded-md hover:bg-pink-500 hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden h-1 w-full flex-1 bg-white/20 md:flex" />

            <IconContext.Provider
              value={{
                weight: "bold",
                size: 24,
                className: "text-white",
              }}
            >
              <div className="flex items-center gap-6">
                {siteConfig.footer.sosmed.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href as string}
                    target="_blank"
                    className="rounded-md p-1 hover:bg-pink-500"
                  >
                    <item.icon />
                  </Link>
                ))}
              </div>
            </IconContext.Provider>
          </div>

          <p className="pb-8 text-center font-medium capitalize text-white xl:relative xl:-mb-10 xl:pb-0">
            &copy; {siteConfig.footer.copyright}
          </p>
        </div>

        <h1 className="hidden select-none justify-self-center text-center text-[240px] font-black leading-tight -tracking-[12px] text-white/20 xl:flex">
          RuangObat.
        </h1>
      </footer>
    </>
  );
}
