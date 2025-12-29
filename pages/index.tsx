import CardProduct from "@/components/card/CardProduct";
import CTAMain from "@/components/cta/CTAMain";
import CTARosaAi from "@/components/cta/CTARosaAi";
import Footer from "@/components/footer/Footer";
import GradientText from "@/components/reactbits/GradientText";
import TextHighlight from "@/components/text/TextHighlight";
import Layout from "@/components/wrapper/Layout";
import { siteConfigCompanyPage, siteConfigHomePage } from "@/data/site";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { HomepageResponse, MentorType } from "@/types/mentor.type";
import { fetcher } from "@/utils/fetcher";
import { scrollToSection } from "@/utils/scrollToSection";
import { Accordion, AccordionItem, Button, Chip } from "@nextui-org/react";
import {
  ArrowRight,
  ChatTeardropText,
  IconContext,
  Microscope,
  Question,
  Sparkle,
  Star,
  TestTube,
} from "@phosphor-icons/react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
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

  if (!client) {
    return (
      <>
        <Layout
          title="Bimbel Private Farmasi No.1 di Indonesia"
          description="RuangObat adalah tempat private farmasi No.1 di Indonesia telah memfasilitasi 10.000+ mahasiswa farmasi"
        >
          <section className="base-container relative isolate gap-20 [padding:50px_0_100px]">
            <Sparkle
              weight="duotone"
              className="absolute left-0 top-0 hidden size-16 -rotate-12 text-purple xl:flex"
            />

            <Microscope
              weight="duotone"
              className="absolute right-0 top-[400px] hidden size-20 rotate-12 text-purple xl:flex"
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
                🔥 Selamat Datang Di RuangObat
              </Chip>

              <h1 className="text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl xs:leading-[115%] lg:text-5xl">
                <GradientText
                  colors={["#6238C3", "#ec4899", "#805DD0"]}
                  animationSpeed={3}
                  showBorder={false}
                >
                  <span className="font-black leading-[115%]">
                    “Bimbel Private Farmasi No.1 di Indonesia”
                  </span>
                </GradientText>
                Telah Memfasilitasi 10.000+ Mahasiswa Farmasi untuk meraih gelar
                Sarjana, Diploma, hingga Profesi Apoteker di Seluruh Indonesia
              </h1>

              <p className="max-w-[850px] font-medium leading-[170%] text-gray xs:text-lg">
                Dapatkan{" "}
                <TextHighlight
                  text="akses lengkap video pembelajaran, bimbingan private skripsi & riset, persiapan masuk profesi Apoteker, OSCE, hingga UKMPPAI."
                  className="normal-case"
                />{" "}
                Semua yang kamu butuhkan untuk sukses menjadi{" "}
                <TextHighlight text="Sarjana Farmasi & Apoteker," /> ada di
                sini!
              </p>

              <div className="mt-4 grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
                <Button
                  color="secondary"
                  endContent={<Sparkle weight="duotone" size={18} />}
                  onClick={() => scrollToSection(listClassRef)}
                  className="px-6 font-bold"
                >
                  Lihat Daftar Program
                </Button>

                <Button
                  variant="bordered"
                  endContent={<ArrowRight weight="bold" size={18} />}
                  onClick={() => router.push("/packages")}
                  className="px-6 font-bold"
                >
                  Beli Paket Belajar
                </Button>
              </div>
            </div>

            <div className="mt-8 grid items-center gap-4 xl:grid-cols-2">
              <div className="grid max-w-[480px] justify-items-center gap-2 justify-self-center text-center xl:text-left">
                <h2 className="text-2xl font-black -tracking-wide text-black xs:text-3xl md:text-4xl">
                  RuangObat: Mudah, Cepat & Terpercaya!
                </h2>

                <p className="font-medium leading-[170%] text-gray">
                  Kami hadir memberikan materi yang relevan, up-to-date, dan
                  dikemas dengan gaya yang friendly tapi tetap fokus sama
                  kualitas.
                </p>
              </div>

              <div className="grid gap-4 xl:-order-1 xl:grid-cols-2">
                {siteConfigHomePage.statistics.map((item, index) => (
                  <div
                    key={index}
                    className="grid gap-2 rounded-xl border-2 border-gray/10 p-8"
                  >
                    <h3 className="text-4xl font-extrabold text-purple">
                      {item.amount}
                    </h3>

                    <p className="text-sm font-medium leading-[170%] text-gray">
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
            </div>

            <div className="grid pt-5">
              <Image
                priority
                src="https://cdn.ruangobat.id/statics/images/new-illustration-program/img-riset.webp"
                alt="illustration img"
                width={1000}
                height={1000}
                className="h-auto justify-self-center"
              />
            </div>
          </section>

          <section className="base-container relative isolate items-center gap-6 py-[100px] xl:grid-cols-2 xl:items-start xl:gap-0">
            <div className="grid gap-4">
              <h2 className="text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl md:text-4xl">
                Belajar Farmasi Jadi{" "}
                <TextHighlight
                  text="Gampang, Kapan Aja Dimana Aja."
                  className="font-black"
                />{" "}
                Semua yang Kamu Butuhin Ada di Sini.
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                RuangObat adalah platform{" "}
                <TextHighlight
                  text="Bimbel Private Farmasi No. 1 di
                Indonesia,"
                  className="normal-case"
                />{" "}
                dipercaya lebih dari 10.000+ mahasiswa farmasi. Dari Sabang
                sampai Merauke, Ruangobat bantu mereka lulus, skripsi, masuk
                profesi hingga meraih gelar apoteker.
              </p>

              <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                <Button
                  color="secondary"
                  endContent={<ArrowRight weight="bold" size={18} />}
                  onClick={() => router.push("/packages")}
                  className="w-full px-6 font-bold sm:w-max"
                >
                  Mulai Belajar Sekarang!
                </Button>

                <span className="font-bold text-purple">
                  #bimbelfarmasi #cukupdisiniaja
                </span>
              </div>
            </div>

            <Image
              loading="eager"
              src="https://cdn.ruangobat.id/statics/images/new-illustration-program/img-skripsi.webp"
              alt="ilustration img"
              width={1000}
              height={1000}
              className="h-auto justify-self-center"
            />

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-4 xl:col-span-2">
              {[
                [
                  "🎬 Ruang Sarjana & Diploma Farmasi",
                  "/programs/sarjana-diploma",
                ],
                ["📋 Ruang Private 1 on 1 Farmasi", "/programs/private-1-on-1"],
                ["📚 Ruang Skripsi Farmasi", "/programs/skripsi-farmasi"],
                ["🔍 Ruang Riset Farmasi", "/programs/riset-farmasi"],
                ["💊 Ruang Masuk Apoteker", "/programs/masuk-apoteker"],
                ["💉 Ruang OSCE & UKMPPAI", "/programs/osce-ukmppai"],
                ["🤖 Apoteker ROSA", "/rosa"],
              ].map(([title, path], index) => (
                <Link
                  key={index}
                  href={path}
                  className="base-card p-4 font-medium leading-[170%] text-gray"
                >
                  {title}
                </Link>
              ))}
            </ul>
          </section>

          <section className="base-container relative isolate gap-8 py-[100px]">
            <Star
              weight="duotone"
              className="absolute left-0 top-12 hidden size-16 -rotate-12 text-purple xl:flex"
            />

            <TestTube
              weight="duotone"
              className="absolute bottom-12 right-0 hidden size-16 text-purple xl:flex"
            />

            <h2 className="text-center text-2xl font-black -tracking-wide text-black xs:text-3xl md:text-4xl">
              Kenapa Harus Pilih RuangObat?
            </h2>

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
                      className={`grid w-[300px] gap-5 rounded-xl [padding:2.5rem_1.5rem] ${cardWrapper}`}
                    >
                      <item.icon />

                      <div className="grid gap-2">
                        <h3 className={`text-2xl font-black ${cardTitle}`}>
                          {item.title}
                        </h3>

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

          <CTARosaAi />

          <CTAMain />
        </Layout>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Layout
        title="Bimbel Private Farmasi No.1 di Indonesia"
        description="RuangObat adalah tempat private farmasi No.1 di Indonesia telah memfasilitasi 10.000+ mahasiswa farmasi."
      >
        <section className="base-container relative isolate gap-20 [padding:50px_0_100px]">
          <Sparkle
            weight="duotone"
            className="absolute left-0 top-0 hidden size-16 -rotate-12 text-purple xl:flex"
          />

          <Microscope
            weight="duotone"
            className="absolute right-0 top-[400px] hidden size-20 rotate-12 text-purple xl:flex"
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
              🔥 Selamat Datang Di RuangObat
            </Chip>

            <h1 className="text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl xs:leading-[115%] lg:text-5xl">
              <GradientText
                colors={["#6238C3", "#ec4899", "#805DD0"]}
                animationSpeed={3}
                showBorder={false}
              >
                <span className="font-black leading-[115%]">
                  “Bimbel Private Farmasi No.1 di Indonesia”
                </span>
              </GradientText>
              Telah Memfasilitasi 10.000+ Mahasiswa Farmasi untuk meraih gelar
              Sarjana, Diploma, hingga Profesi Apoteker di Seluruh Indonesia
            </h1>

            <p className="max-w-[850px] font-medium leading-[170%] text-gray xs:text-lg">
              Dapatkan{" "}
              <TextHighlight
                text="akses lengkap video pembelajaran, bimbingan private skripsi & riset, persiapan masuk profesi Apoteker, OSCE, hingga UKMPPAI."
                className="normal-case"
              />{" "}
              Semua yang kamu butuhkan untuk sukses menjadi{" "}
              <TextHighlight text="Sarjana Farmasi & Apoteker," /> ada di sini!
            </p>

            <div className="mt-4 grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                color="secondary"
                endContent={<Sparkle weight="duotone" size={18} />}
                onClick={() => scrollToSection(listClassRef)}
                className="px-6 font-bold"
              >
                Lihat Daftar Program
              </Button>

              <Button
                variant="bordered"
                endContent={<ArrowRight weight="bold" size={18} />}
                onClick={() => router.push("/packages")}
                className="px-6 font-bold"
              >
                Beli Paket Belajar
              </Button>
            </div>
          </div>

          <div className="mt-8 grid items-center gap-4 xl:grid-cols-2">
            <div className="grid max-w-[480px] justify-items-center gap-2 justify-self-center text-center xl:text-left">
              <h2 className="text-2xl font-black -tracking-wide text-black xs:text-3xl md:text-4xl">
                RuangObat: Mudah, Cepat & Terpercaya!
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                Kami hadir memberikan materi yang relevan, up-to-date, dan
                dikemas dengan gaya yang friendly tapi tetap fokus sama
                kualitas.
              </p>
            </div>

            <div className="grid gap-4 xl:-order-1 xl:grid-cols-2">
              {siteConfigHomePage.statistics.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-2 rounded-xl border-2 border-gray/10 p-8"
                >
                  <h3 className="text-4xl font-extrabold text-purple">
                    {item.amount}
                  </h3>

                  <p className="text-sm font-medium leading-[170%] text-gray">
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
          </div>

          <div className="grid pt-5">
            <Image
              priority
              src="https://cdn.ruangobat.id/statics/images/new-illustration-program/new-research.webp"
              alt="illustration img"
              width={1000}
              height={1000}
              className="h-auto justify-self-center"
            />
          </div>
        </section>

        <section
          ref={listClassRef}
          className="base-container relative gap-5 py-[100px]"
        >
          <h2 className="text-center text-2xl font-black -tracking-wide text-black xs:text-3xl xl:text-left">
            Daftar Program RuangObat
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
            {siteConfigHomePage.classes.map((item, index) => (
              <CardProduct
                key={index}
                title={item.title}
                icon={
                  <Image
                    src={item.icon as string}
                    alt="icon program"
                    width={500}
                    height={500}
                    loading="lazy"
                    className="size-[calc(100%-8rem)] justify-self-end"
                  />
                }
                path={item.path}
                tagline={item.tagline}
              />
            ))}
          </div>
        </section>

        <section className="base-container relative isolate items-center gap-6 py-[100px] xl:grid-cols-2 xl:items-start xl:gap-0">
          <div className="grid gap-4">
            <h2 className="text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl md:text-4xl">
              Belajar Farmasi Jadi{" "}
              <TextHighlight
                text="Gampang, Kapan Aja Dimana Aja."
                className="font-black"
              />{" "}
              Semua yang Kamu Butuhin Ada di Sini.
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              RuangObat adalah platform{" "}
              <TextHighlight
                text="Bimbel Private Farmasi No. 1 di
                Indonesia,"
                className="normal-case"
              />{" "}
              dipercaya lebih dari 10.000+ mahasiswa farmasi. Dari Sabang sampai
              Merauke, Ruangobat bantu mereka lulus, skripsi, masuk profesi
              hingga meraih gelar apoteker.
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <Button
                color="secondary"
                endContent={<ArrowRight weight="bold" size={18} />}
                onClick={() => router.push("/packages")}
                className="w-full px-6 font-bold sm:w-max"
              >
                Mulai Belajar Sekarang!
              </Button>

              <span className="font-bold text-purple">
                #bimbelfarmasi #cukupdisiniaja
              </span>
            </div>
          </div>

          <Image
            loading="eager"
            src="https://cdn.ruangobat.id/statics/images/new-illustration-program/img-skripsi.webp"
            alt="ilustration img"
            width={1000}
            height={1000}
            className="h-auto justify-self-center"
          />

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-4 xl:col-span-2">
            {[
              [
                "🎬 Ruang Sarjana & Diploma Farmasi",
                "/programs/sarjana-diploma",
              ],
              ["📋 Ruang Private 1 on 1 Farmasi", "/programs/private-1-on-1"],
              ["📚 Ruang Skripsi Farmasi", "/programs/skripsi-farmasi"],
              ["🔍 Ruang Riset Farmasi", "/programs/riset-farmasi"],
              ["💊 Ruang Masuk Apoteker", "/programs/masuk-apoteker"],
              ["💉 Ruang OSCE & UKMPPAI", "/programs/osce-ukmppai"],
              ["🤖 Apoteker ROSA", "/rosa"],
            ].map(([title, path], index) => (
              <Link
                key={index}
                href={path}
                className="base-card p-4 font-medium leading-[170%] text-gray"
              >
                {title}
              </Link>
            ))}
          </ul>
        </section>

        <section className="base-container relative isolate gap-8 py-[100px]">
          <Star
            weight="duotone"
            className="absolute left-0 top-12 hidden size-16 -rotate-12 text-purple xl:flex"
          />

          <TestTube
            weight="duotone"
            className="absolute bottom-12 right-0 hidden size-16 text-purple xl:flex"
          />

          <h2 className="text-center text-2xl font-black -tracking-wide text-black xs:text-3xl md:text-4xl">
            Kenapa Harus Pilih RuangObat?
          </h2>

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
                    className={`grid w-[300px] gap-5 rounded-xl [padding:2.5rem_1.5rem] ${cardWrapper}`}
                  >
                    <item.icon />

                    <div className="grid gap-2">
                      <h3 className={`text-2xl font-black ${cardTitle}`}>
                        {item.title}
                      </h3>

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

        <CTARosaAi />

        {!error ? (
          <section className="grid gap-8 py-[100px]">
            <div className="base-container place-items-center gap-2 text-center">
              <h2 className="text-2xl font-black -tracking-wide text-black xs:text-3xl md:text-4xl">
                Kenalan Yuk Sama Mentor Keren di RuangObat
              </h2>

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
                      className="base-card group mt-4"
                    >
                      <Image
                        src={mentor.img_url as string}
                        alt={`image ${mentor.fullname}`}
                        width={500}
                        height={500}
                        className="aspect-square group-hover:grayscale-[0.5]"
                      />

                      <div className="grid flex-1 gap-1 [padding:1.5rem_1rem]">
                        <h3 className="text-2xl font-black -tracking-wide text-black group-hover:text-purple sm:text-xl">
                          {mentor.fullname}
                        </h3>

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
        ) : null}

        <section className="base-container relative isolate gap-4 py-[100px] md:gap-8">
          <ChatTeardropText
            weight="duotone"
            className="absolute left-24 top-0 hidden size-20 -rotate-12 text-purple xl:flex"
          />

          <h2 className="text-center text-2xl font-black -tracking-wide text-black xs:text-3xl md:text-4xl">
            Kata Mereka Tentang RuangObat
          </h2>

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
                    <div className="base-card group divide-y-2 divide-dashed divide-gray/20 p-6 [margin:1rem_0]">
                      <div className="flex items-start gap-4 pb-4">
                        <Image
                          src="https://cdn.ruangobat.id/statics/images/avatar-img/avatar-male.svg"
                          alt="avatar"
                          width={100}
                          height={100}
                          className="aspect-square size-10 rounded-full bg-purple/20"
                        />

                        <div className="grid flex-1">
                          <h3 className="text-sm font-bold text-black">
                            {testimonial.name}
                          </h3>

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

        <section className="base-container relative isolate gap-8 py-[100px]">
          <Question
            weight="duotone"
            className="absolute right-24 top-0 hidden size-20 rotate-12 text-purple xl:flex"
          />

          <h2 className="text-center text-2xl font-black -tracking-wide text-black xs:text-3xl md:text-4xl">
            Yang Paling Banyak Ditanyakan
          </h2>

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

export const getStaticProps: GetStaticProps<{
  data?: HomepageResponse;
  error?: ErrorDataType;
}> = async () => {
  try {
    const response: SuccessResponse<HomepageResponse> = await fetcher({
      method: "GET",
      url: "/homepage",
    });

    return {
      props: {
        data: response.data,
      },
      revalidate: 3600,
    };
  } catch (error: any) {
    console.error(error);

    return {
      props: {
        error:
          error?.message || "Telah terjadi kesalahan, mohon reload halaman!",
      },
      revalidate: 60,
    };
  }
};
