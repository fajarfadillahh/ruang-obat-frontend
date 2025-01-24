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
        <section className="relative mx-auto grid max-w-[600px] items-center gap-10 lg:max-w-[700px] xl:max-w-none xl:grid-cols-[1fr_500px] xl:gap-4">
          <div className="grid gap-10 justify-self-center lg:max-w-[580px] xl:justify-self-start">
            <div className="grid gap-4">
              <p className="font-medium text-gray">
                👋 Selamat datang di Ruang Obat
              </p>
              <h1 className="text-[48px] font-black capitalize leading-[110%] -tracking-wide text-black md:text-[56px] md:leading-[100%] lg:text-[72px]">
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
                Ruang Obat merupakan platform Bimbel Private Farmasi No. 1 yang
                telah memfasilitasi 10.000+ Mahasiswa Farmasi di seluruh
                Indonesia. Terdapat berbagai kelas menarik untuk semua jenjang
                pendidikan, antara lain: Kelas Mata Kuliah, Kelas Skripsi
                Farmasi, Kelas Riset Farmasi, Kelas Masuk Apoteker & OSCE, dan
                Tryout UKMPPAI.
              </p>
              <p className="font-medium leading-[170%] text-gray">
                Di website ini kalian dapat mengakses berbagai program. Mari
                raih gelar sarjana dan apotekermu bersama Ruang Obat.
                <br />
                #bimbelfarmasi #cukupdisiniaja
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

          <Image
            priority
            src="/img/default/homepage-img.png"
            alt="home img"
            width={396}
            height={512}
            className="h-auto w-full justify-self-center xl:justify-self-end"
          />
        </section>

        {/* reasons */}
        <section className="mx-auto grid max-w-[600px] gap-8 [padding:200px_0_100px] lg:max-w-[700px] xl:max-w-none">
          <h1 className="text-center text-[32px] font-black leading-[120%] -tracking-wide text-black">
            Kenapa Harus Pilih Ruang Obat?
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-12">
            {siteConfigHomePage.reasons.map((item, index) => {
              const { cardWrapper, cardIcon, cardTitle, cardText } =
                getCardStyles(item, "reasons");

              return (
                <IconContext.Provider
                  key={index}
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

        {/* classes/products */}
        <section id="list-class" className="grid gap-16 py-[100px]">
          <div className="mx-auto grid max-w-[600px] items-center gap-10 lg:max-w-[700px] xl:max-w-none xl:grid-cols-[500px_1fr]">
            <Image
              priority
              src="/img/default/homepage-class-img.png"
              alt="home img"
              width={415}
              height={567}
              className="h-auto w-full justify-self-center"
            />

            <div className="grid max-w-[600px] gap-4 justify-self-end">
              <h1 className="text-[36px] font-black capitalize leading-[120%] -tracking-wide text-black xs:text-[42px]">
                Kelas Farmasi No. 1 di Indonesia |{" "}
                <span className="bg-purple px-2 py-0 text-white">
                  Fasilitasi 10.000+
                </span>{" "}
                Mahasiswa Farmasi Seluruh Indonesia
              </h1>
              <p className="font-medium leading-[170%] text-gray">
                Dapatkan{" "}
                <strong className="font-extrabold text-purple">
                  Akses Video Mata Kuliah, Persiapan Skripsi & Riset, Masuk
                  Apoteker, dan Tryout UKMPPAI
                </strong>{" "}
                untuk membantu kamu meraih gelar Sarjana Farmasi & Apoteker
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <h2 className="max-w-[350px] text-center text-[28px] font-black leading-[120%] -tracking-wide text-black xs:max-w-none xl:text-left">
              Daftar Kelas di Ruang Obat 🔥
            </h2>

            <div className="mx-auto grid max-w-[600px] gap-4 sm:grid-cols-2 sm:items-start lg:max-w-[700px] xl:mx-0 xl:max-w-none xl:grid-cols-3 xl:gap-8">
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
                    <h1 className="text-lg font-black leading-[120%] text-black group-hover:text-purple">
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

        {/* mentors */}
        <section className="grid gap-4 py-[100px]">
          <div className="grid gap-2">
            <h1 className="text-center text-[32px] font-black leading-[120%] -tracking-wide text-black">
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
                  className="max-w-[300px] xs:max-w-[330px] lg:max-w-[360px]"
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
                      <h4 className="line-clamp-1 text-[20px] font-black leading-[120%] text-black group-hover:text-purple">
                        {mentor.fullname}
                      </h4>
                      <p className="text-sm font-medium capitalize leading-[170%] text-gray">
                        {mentor.mentor_title}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* faqs */}
        <section className="mx-auto grid max-w-[600px] gap-8 py-[100px] lg:max-w-[700px] xl:max-w-full">
          <h1 className="text-center text-[32px] font-black leading-[120%] -tracking-wide text-black">
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
        error,
      },
    };
  }
};
