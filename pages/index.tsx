import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { siteConfigHomePage } from "@/config/site";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { HomepageResponse, MentorType } from "@/types/mentor.type";
import { fetcher } from "@/utils/fetcher";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { IconContext } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomePage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [client, setClient] = useState<boolean>(false);

  function getCardStyles(item: any, type: "reasons" | "programs") {
    const cardItem =
      (type === "reasons" && item.id === 2) ||
      (type === "programs" && item.id === 1);

    const cardWrapper = cardItem
      ? "bg-purple"
      : "bg-white shadow-[4px_4px_36px_rgba(0,0,0,0.1)]";
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
        <section className="grid gap-16">
          <div className="base-container items-center gap-6 xl:grid-cols-[500px_1fr] xl:gap-16">
            <Image
              priority
              src="/img/base/main-img-1.svg"
              alt="home img"
              width={415}
              height={567}
              className="order-2 h-auto w-full justify-self-center xl:-order-1"
            />

            <div className="grid gap-10">
              <div className="grid gap-4 justify-self-end">
                <p className="font-medium text-gray">
                  👋 Selamat datang di RuangObat
                </p>

                <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
                  Bimbel Farmasi No.1 di Indonesia Yang{" "}
                  <span className="relative inline-block before:absolute before:-inset-1 before:-z-10 before:block before:bg-purple">
                    <span className="relative text-white">
                      Fasilitasi 10.000+
                    </span>
                  </span>
                  Mahasiswa Farmasi Seluruh Indonesia
                </h1>

                <p className="font-medium leading-[170%] text-gray">
                  Dapatkan{" "}
                  <strong className="font-bold text-purple">
                    Akses Video Pembelajaran Farmasi, Persiapan Skripsi & Riset,
                    Masuk Apoteker, OSCE dan UKMPPAI Sumatif
                  </strong>{" "}
                  untuk membantu kamu meraih gelar Sarjana Farmasi & Apoteker
                </p>
              </div>

              <div className="grid gap-2 sm:inline-flex sm:items-center sm:gap-4">
                <Button
                  color="secondary"
                  as={Link}
                  href="#list-class"
                  className="px-10 font-bold"
                >
                  Lihat Daftar Kelas
                </Button>

                <Button
                  variant="bordered"
                  className="px-6 font-bold"
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard Tryout CBT
                </Button>
              </div>
            </div>
          </div>

          <div id="list-class" className="base-container gap-5">
            <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
              Daftar Kelas di RuangObat
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
              {siteConfigHomePage.classes.map((item, index) => (
                <div
                  key={index}
                  className="group grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
                >
                  <Image
                    priority
                    src={item.image as string}
                    alt="product img"
                    width={304}
                    height={304}
                    className="aspect-square h-auto w-full rounded-xl object-cover object-center group-hover:grayscale-[0.5]"
                  />

                  <div className="grid gap-4">
                    <h1 className="max-w-[250px] text-xl font-black text-black group-hover:text-purple">
                      {item.title}
                    </h1>

                    <Button
                      variant={item.id === 5 ? "solid" : "flat"}
                      color="secondary"
                      onClick={() => router.push(item.path as string)}
                      className="font-bold"
                    >
                      {item.id === 5 ? "Mulai Ujian" : "Detail Kelas"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="base-container items-center gap-6 [padding:200px_0_100px] xl:grid-cols-[1fr_500px]">
          <div className="grid gap-4">
            <h1 className="mb-2 text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
              Ruang Belajar Farmasi Super Lengkap, Bebas Akses Kapan Saja
              <span className="text-purple">.</span>
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              RuangObat merupakan platform Bimbel Private Farmasi No. 1 yang
              telah memfasilitasi 10.000+ Mahasiswa Farmasi di seluruh
              Indonesia. Terdapat berbagai kelas menarik untSumatifa jenjang
              pendidikan, antara lain: Video Pembelajaran Farmasi, Persiapan
              Skripsi & Riset, Masuk Apoteker, OSCE dan UKMPPAI Sumatif.
              <div />
              Di website ini kalian dapat mengakses berbagai program. Mari raih
              gelar sarjana dan apotekermu bersama RuangObat.
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <Button
                color="secondary"
                onClick={() => router.push("/company/about-us")}
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
            className="h-auto w-full justify-self-center"
          />
        </section>

        <section className="base-container gap-8 py-[100px]">
          <h1 className="text-center text-4xl font-black -tracking-wide text-black">
            Kenapa Harus Pilih RuangObat?
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 xl:gap-12">
            {siteConfigHomePage.reasons.map((item, index) => {
              const { cardWrapper, cardIcon, cardTitle, cardText } =
                getCardStyles(item, "reasons");

              return (
                <IconContext.Provider
                  key={index}
                  value={{
                    weight: "bold",
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

        <section className="grid gap-8 py-[100px]">
          <div className="base-container place-items-center gap-2 text-center">
            <h1 className="text-4xl font-black -tracking-wide text-black">
              Ayo, Kenalan Dengan Mentor RuangObat
            </h1>

            <p className="max-w-[700px] font-medium leading-[170%] text-gray">
              RuangObat memiliki mentor yang sangat berpengalaman dan siap bantu
              kamu mencapai target belajar. Dari praktisi, peneliti, sampai
              apoteker senior, semuanya ada di sini.
            </p>
          </div>

          <div className="mentor-container overflow-hidden">
            <Swiper
              loop={true}
              slidesPerView={"auto"}
              spaceBetween={32}
              centeredSlides={true}
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
                  className="max-w-[300px] xs:max-w-[330px] lg:max-w-[368px]"
                >
                  <Link
                    href={`/mentor/${mentor.mentor_id}`}
                    className="group mt-4 grid overflow-hidden rounded-xl bg-white p-6 [box-shadow:0_0_12px_rgba(0,0,0,0.1)]"
                  >
                    <Image
                      src={mentor.img_url as string}
                      alt={`image ${mentor.fullname}`}
                      width={500}
                      height={500}
                      className="aspect-square rounded-xl group-hover:grayscale-[0.5]"
                      priority
                    />

                    <div className="mt-8 grid flex-1 gap-1">
                      <h4 className="line-clamp-1 text-xl font-black text-black group-hover:text-purple">
                        {mentor.fullname}
                      </h4>

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

        <section className="base-container gap-8 py-[100px]">
          <h1 className="text-center text-4xl font-black -tracking-wide text-black">
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
              defaultExpandedKeys={["0"]}
            >
              {siteConfigHomePage.faqs.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  // startContent={<item.icon />}
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
