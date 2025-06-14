import CardProduct from "@/components/card/CardProduct";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/footer/Footer";
import Balatro from "@/components/reactbits/Balatro";
import TextHighlight from "@/components/text/TextHighlight";
import TextHighlightBackground from "@/components/text/TextHighlightBackground";
import Layout from "@/components/wrapper/Layout";
import { siteConfigCompanyPage, siteConfigHomePage } from "@/data/site";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { HomepageResponse, MentorType } from "@/types/mentor.type";
import { fetcher } from "@/utils/fetcher";
import { scrollToSection } from "@/utils/scrollToSection";
import { Accordion, AccordionItem, Button, Chip } from "@nextui-org/react";
import {
  ArrowRight,
  IconContext,
  Microscope,
  Sparkle,
  Star,
  Syringe,
  TestTube,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomePage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const listClassRef = useRef<HTMLElement | null>(null);
  const [client, setClient] = useState<boolean>(false);

  function getCardStyles(item: any, type: "reasons" | "programs") {
    const cardItem =
      (type === "reasons" && item.id === 2) ||
      (type === "programs" && item.id === 1);

    const cardWrapper = cardItem
      ? "bg-purple"
      : "bg-white border-2 border-gray/10";
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
      <Layout title="Bimbel Private Farmasi No. 1 di Indonesia Yang Memfasilitasi 10.000+ Mahasiswa Farmasi">
        {/* hero section */}
        <section className="base-container relative isolate gap-20 [padding:50px_0_100px]">
          <Sparkle
            weight="duotone"
            className="absolute left-0 top-0 hidden size-16 -rotate-12 text-purple lg:flex"
          />

          <Microscope
            weight="duotone"
            className="absolute bottom-64 right-0 hidden size-16 rotate-12 text-purple lg:flex"
          />

          <div className="grid justify-items-center gap-4 text-center">
            <Chip
              color="secondary"
              variant="flat"
              size="lg"
              classNames={{
                content: "font-bold",
              }}
            >
              🔥 Selamat datang di RuangObat
            </Chip>

            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
              Bimbel Private Farmasi No. 1 di Indonesia Yang{" "}
              <TextHighlightBackground text="Memfasilitasi 10.000+" /> Mahasiswa
              Farmasi Seluruh Indonesia
            </h1>

            <p className="max-w-[800px] font-medium leading-[170%] text-gray">
              Dapatkan{" "}
              <TextHighlight
                text="akses lengkap video pembelajaran farmasi, bimbingan skripsi & riset, persiapan masuk profesi Apoteker, OSCE, hingga UKMPPAI."
                className="normal-case"
              />{" "}
              Semua yang kamu butuhkan untuk sukses menjadi{" "}
              <TextHighlight
                text="Sarjana Farmasi & Apoteker,"
                className="lowercase"
              />{" "}
              ada di sini!
            </p>

            <div className="mt-4 grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                color="secondary"
                endContent={<Sparkle weight="duotone" size={18} />}
                onClick={() => scrollToSection(listClassRef)}
                className="px-10 font-bold"
              >
                Lihat Daftar Kelas
              </Button>

              <Button
                variant="bordered"
                endContent={<ArrowRight weight="bold" size={18} />}
                onClick={() => router.push("/perusahaan")}
                className="px-8 font-bold"
              >
                Jelajahi RuangObat
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {siteConfigHomePage.statistics.map((item, index) => (
              <div
                key={index}
                className="grid gap-1 rounded-xl border-2 border-gray/10 p-8"
              >
                <h3 className="text-4xl font-extrabold text-purple">
                  {item.amount}
                </h3>

                <p className="font-medium leading-[170%] text-gray">
                  {item.label}{" "}
                  <ArrowRight
                    weight="bold"
                    size={16}
                    className="ml-1 inline-flex text-purple"
                  />
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* classes section */}
        <section ref={listClassRef} className="base-container gap-5 py-[100px]">
          <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
            Daftar Kelas di RuangObat
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
            {siteConfigHomePage.classes.map((item, index) => (
              <CardProduct
                key={index}
                title={item.title}
                icon={
                  <item.icon
                    weight="duotone"
                    className="size-[calc(100%-7rem)] justify-self-end text-white/30"
                  />
                }
                path={item.path}
                tagline={item.tagline}
              />
            ))}
          </div>
        </section>

        {/* summary section */}
        <section className="base-container relative isolate items-center gap-6 py-[100px] xl:grid-cols-[1fr_500px] xl:gap-0">
          <Syringe
            weight="duotone"
            className="absolute right-0 top-0 hidden size-20 text-purple lg:flex"
          />

          <div className="grid gap-4">
            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl">
              Ruang Belajar Farmasi{" "}
              <TextHighlightBackground text="Paling Lengkap" /> Bebas Akses,
              Kapan dan Dimana Aja Kamu Butuh.
            </h1>

            <div className="grid gap-2">
              <p className="font-medium leading-[170%] text-gray">
                RuangObat adalah platform{" "}
                <TextHighlight
                  text="Bimbel Private Farmasi No. 1 di
                Indonesia,"
                  className="normal-case"
                />{" "}
                telah memfasilitasi 10.000+ mahasiswa farmasi dari Sabang sampai
                Merauke! Mau belajar buat ujian, skripsi, OSCE, atau UKMPPAI?
                Tenang, semua ada disini.
              </p>

              <ul className="grid gap-1 xl:ml-4">
                {[
                  ["📚 Ruang Video Pembelajaran Interaktif", "/video"],
                  ["🔐 Ruang Private 1 on 1", "/kelas/private-1-on-1"],
                  ["🧪 Ruang Skripsi Farmasi", "/kelas/skripsi-farmasi"],
                  ["🔍 Ruang Riset Farmasi", "/kelas/riset-farmasi"],
                  [
                    "👨‍⚕️ Ruang Persiapan Masuk Profesi Apoteker",
                    "/kelas/masuk-apoteker",
                  ],
                  ["💉 Ruang OSCE & UKMPPAI Sumatif", "/dashboard"],
                ].map(([title, path], index) => (
                  <Link
                    key={index}
                    href={path}
                    className="w-max font-medium leading-[170%] text-gray hover:text-purple hover:underline"
                  >
                    {title}
                  </Link>
                ))}
              </ul>

              <p className="font-medium leading-[170%] text-gray">
                Cukup satu tempat buat semua jenjang pendidikan farmasi. Yuk,
                raih gelar sarjana dan profesi apoteker bareng RuangObat!
              </p>
            </div>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <Button
                color="secondary"
                endContent={<ArrowRight weight="bold" size={18} />}
                onClick={() => router.push("/perusahaan/tentang-kami")}
                className="w-full px-10 font-bold sm:w-max"
              >
                Baca Selengkapnya
              </Button>

              <span className="font-bold text-purple">
                #bimbelfarmasi #cukupdisiniaja
              </span>
            </div>
          </div>

          <Image
            priority
            src="/img/base/main-img-2.svg"
            alt="home img"
            width={396}
            height={512}
            className="h-auto w-[500px] justify-self-center lg:w-[580px] xl:w-[430px]"
          />
        </section>

        {/* reasoning section */}
        <section className="base-container relative isolate gap-8 py-[100px]">
          <Star
            weight="duotone"
            className="absolute left-0 top-12 hidden size-16 -rotate-12 text-purple lg:flex"
          />

          <TestTube
            weight="duotone"
            className="absolute bottom-12 right-0 hidden size-16 text-purple lg:flex"
          />

          <h1 className="text-center text-4xl font-black -tracking-wide text-black">
            Kenapa Harus Pilih RuangObat?
          </h1>

          <div className="flex flex-wrap items-start justify-center gap-4 xl:gap-8">
            {siteConfigHomePage.reasons.map((item, index) => {
              const { cardWrapper, cardIcon, cardTitle, cardText } =
                getCardStyles(item, "reasons");

              return (
                <IconContext.Provider
                  key={index}
                  value={{
                    weight: "duotone",
                    size: 64,
                    className: cardIcon,
                  }}
                >
                  <div
                    className={`grid w-[290px] gap-5 rounded-xl [padding:2.5rem_1.5rem] ${cardWrapper}`}
                  >
                    <item.icon />

                    <div className="grid gap-2">
                      <h4
                        className={`max-w-[220px] text-2xl font-black ${cardTitle}`}
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

        {/* apoteker rosa section */}
        <section className="base-container py-[100px]">
          <div className="relative isolate h-[700px] overflow-hidden rounded-3xl lg:h-[600px]">
            <Balatro
              isRotate={false}
              mouseInteraction={false}
              pixelFilter={1750}
              color1="#ffffff"
              color2="#ec4899"
              color3="#6238C3"
              className="w-auto overflow-hidden rounded-xl"
            />

            <div className="absolute left-0 top-0 z-10 grid h-full w-full items-center gap-8 bg-purple/70 [padding:6rem_2rem] xl:grid-cols-2 xl:[padding:4rem_6rem]">
              <div className="grid gap-4">
                <p className="text-xl font-semibold capitalize text-white">
                  RuangObat mempersembahkan! 🎉🎉🎉
                </p>

                <h1 className="text-4xl font-black text-white lg:text-5xl">
                  Apoteker ROSA: AI Farmasi Pertama Di Indonesia
                </h1>

                <p className="font-medium leading-[170%] text-white">
                  Smart assistant berbasis AI yang dirancang khusus untuk
                  membantu kamu dalam proses pembelajaran secara praktis, cepat,
                  dan efisien.
                </p>

                <Button
                  endContent={<Sparkle weight="duotone" size={20} />}
                  onClick={() => router.push("/rosa/chat")}
                  className="mt-4 w-max bg-pink-500 px-12 font-bold text-white"
                >
                  Tanya ROSA Sekarang
                </Button>
              </div>

              <Image
                priority
                src="/img/ai/APOTEKER-ROSA-1.webp"
                alt="apoteker rosa image"
                width={1000}
                height={1000}
                className="hidden h-auto w-[400px] justify-self-center xl:flex"
              />
            </div>
          </div>
        </section>

        {/* mentor section */}
        <section className="grid gap-8 py-[100px]">
          <div className="base-container place-items-center gap-2 text-center">
            <h1 className="text-4xl font-black -tracking-wide text-black">
              Kenalan Yuk Sama Mentor Keren di RuangObat
            </h1>

            <p className="max-w-[700px] font-medium leading-[170%] text-gray">
              Dari Klinis hingga Industri, berbagai mentor di ruangobat siap
              bantu kamu capai target. Belajar dengan pengalaman dan insight
              langsung dari lapangan!
            </p>
          </div>

          <div className="mentor-container overflow-hidden">
            <Swiper
              loop={true}
              slidesPerView={"auto"}
              spaceBetween={16}
              // centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
            >
              {data?.mentors.map((mentor: MentorType) => (
                <SwiperSlide
                  key={mentor.mentor_id}
                  className="max-w-[330px] lg:max-w-[276px]"
                >
                  <Link
                    href={`/mentor/${mentor.mentor_id}`}
                    className="group mt-4 grid overflow-hidden rounded-xl border-2 border-gray/10 hover:bg-purple/10"
                  >
                    <Image
                      src={mentor.img_url as string}
                      alt={`image ${mentor.fullname}`}
                      width={500}
                      height={500}
                      className="aspect-square group-hover:grayscale-[0.5]"
                      priority
                    />

                    <div className="grid flex-1 gap-1 [padding:1.5rem_1rem]">
                      <h1 className="text-2xl font-black -tracking-wide text-black group-hover:text-purple sm:text-xl">
                        {mentor.fullname}
                      </h1>

                      <p className="line-clamp-1 text-sm font-medium capitalize leading-[170%] text-gray">
                        {mentor.mentor_title}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* testimonial section */}
        <section className="base-container gap-8 py-[100px]">
          <h1 className="text-center text-4xl font-black -tracking-wide text-black">
            Kata Mereka Tentang RuangObat
          </h1>

          <div className="testimonial-container overflow-hidden">
            <Swiper
              loop={true}
              slidesPerView={"auto"}
              spaceBetween={16}
              // centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
              {siteConfigCompanyPage.testimonials
                .slice(0, 12)
                .map((testimonial, index) => (
                  <SwiperSlide
                    key={index}
                    className="max-w-[330px] lg:max-w-[276px]"
                  >
                    <div className="group grid divide-y-2 divide-dashed divide-gray/20 overflow-hidden rounded-xl border-2 border-gray/10 p-6 [margin:1rem_0] hover:bg-purple/10">
                      <div className="flex items-start gap-4 pb-4">
                        <Image
                          src="/img/avatar-male.svg"
                          alt="avatar"
                          width={100}
                          height={100}
                          className="aspect-square size-10 rounded-full bg-purple/20"
                        />

                        <div className="grid flex-1">
                          <h1 className="text-sm font-bold text-black">
                            {testimonial.name}
                          </h1>

                          <p className="line-clamp-1 text-xs font-medium leading-[170%] text-gray">
                            {testimonial.university}
                          </p>
                        </div>
                      </div>

                      <p className="line-clamp-5 pt-4 text-sm font-medium leading-[170%] text-gray">
                        {testimonial.comment}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          <Button
            color="secondary"
            endContent={<ArrowRight weight="bold" size={18} />}
            onClick={() => router.push("/perusahaan/testimonial")}
            className="mx-auto -mt-4 px-8 font-bold"
          >
            Lihat Testimonial
          </Button>
        </section>

        {/* faq section */}
        <section className="base-container gap-8 py-[100px]">
          <h1 className="text-center text-4xl font-black -tracking-wide text-black">
            Yang Paling Banyak Ditanyakan
          </h1>

          <IconContext.Provider
            value={{
              weight: "duotone",
              size: 28,
              className: "text-purple",
            }}
          >
            <Accordion defaultExpandedKeys={["0"]}>
              {siteConfigHomePage.faqs.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  startContent={<item.icon />}
                  classNames={{
                    title: "text-lg text-black font-bold xs:text-xl",
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

        <CTAMain />
      </Layout>

      <Footer />
    </>
  );
}

type DataProps = {
  data?: HomepageResponse;
  error?: ErrorDataType;
};

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  try {
    const response = (await fetcher({
      method: "GET",
      url: "/general/homepage",
    })) as SuccessResponse<HomepageResponse>;

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error: any) {
    console.error(error);

    return {
      props: {
        error:
          error?.message || "Telah terjadi kesalahan, mohon reload halaman!",
      },
    };
  }
};
