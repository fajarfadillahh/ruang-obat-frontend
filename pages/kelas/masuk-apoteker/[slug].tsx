import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { dummyOfferSubscriptions, dummyVideoCourse } from "@/config/dummy";
import { PharmacistAdmissionDetailsResponse } from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { scrollToSection } from "@/utils/scrollToSection";
import { handleShareClipboard } from "@/utils/shareClipboard";
import { Accordion, AccordionItem, Button, Progress } from "@nextui-org/react";
import { Check, CheckCircle, Play, ShareNetwork } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function DetailPharmacyEntranceClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const subscribeRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <Layout title={`Detail ${data?.name}`}>
        <ButtonBack />

        <div className="mt-4">
          <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />
        </div>

        <section className="base-container gap-20 [padding:2rem_0_100px]">
          <div className="grid gap-8 lg:grid-cols-[max-content_1fr] lg:items-center lg:gap-16">
            <Image
              src={data?.img_url as string}
              alt="logo university"
              width={1000}
              height={1000}
              className="w-full max-w-[350px] rounded-xl object-cover object-center"
            />

            <div className="grid max-w-[900px] gap-8">
              <div className="grid gap-4">
                <h1 className="text-4xl font-black capitalize -tracking-wide text-black xl:text-5xl">
                  {data?.name}
                </h1>

                <div className="grid gap-2 sm:inline-flex sm:items-center sm:gap-4">
                  <Button
                    color="secondary"
                    onClick={() => scrollToSection(subscribeRef)}
                    className="px-10 font-bold"
                  >
                    Akses Sekarang
                  </Button>

                  <Button variant="bordered" className="px-10 font-bold">
                    Tonton Preview
                  </Button>
                </div>
              </div>

              <p className="font-medium leading-[170%] text-gray">
                {data?.description}
              </p>

              <Button
                aria-label="Share Link"
                variant="bordered"
                size="sm"
                startContent={
                  <ShareNetwork
                    weight="duotone"
                    size={16}
                    className="text-black"
                  />
                }
                onClick={handleShareClipboard}
                className="w-max font-bold"
              >
                Bagikan
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {/* progress bar */}
            <div className="grid rounded-xl p-8 ring-2 ring-gray/10">
              <h5 className="mb-4 text-lg font-bold text-black">
                Track progres belajar kamu!
              </h5>

              <Progress
                value={10}
                color="secondary"
                label={
                  <p className="text-sm font-medium text-gray">
                    5 dari 25 selesai{" "}
                    <span className="font-black text-purple">(9%)</span>
                  </p>
                }
              />
            </div>

            {/* videos */}
            <div className="grid gap-8 xl:grid-cols-[1fr_400px] xl:items-start">
              <div className="grid gap-4">
                <div className="flex aspect-video items-center justify-center rounded-xl bg-gray/5 p-8 ring-2 ring-gray/10">
                  <span className="font-semibold capitalize text-gray">
                    video here
                  </span>
                </div>

                <Button
                  size="sm"
                  color="secondary"
                  endContent={<Check weight="bold" size={14} />}
                  className="w-max font-bold"
                >
                  Video Selesai
                </Button>
              </div>

              <div className="grid">
                <h2 className="text-xl font-black -tracking-wide text-black">
                  Daftar Video 🔥
                </h2>

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
                  {dummyVideoCourse.map((item) => (
                    <AccordionItem
                      key={item.segment_id}
                      title={item.segment_name}
                      classNames={{
                        title: "text-black font-extrabold",
                        indicator: "text-black",
                      }}
                    >
                      <div className="grid">
                        {item.segment_videos.map((video) => (
                          <div
                            key={video.video_id}
                            className="flex items-center justify-between gap-2 rounded-xl p-4 hover:bg-gray/10"
                          >
                            <div className="flex items-center gap-2">
                              <Button
                                isIconOnly
                                size="sm"
                                radius="full"
                                variant="solid"
                                color="secondary"
                                className="flex items-center justify-center"
                              >
                                <Play weight="fill" size={14} />
                              </Button>

                              <h4 className="line-clamp-2 text-sm font-bold text-black">
                                {video.video_name}
                              </h4>
                            </div>

                            <p className="text-sm font-semibold text-gray">
                              {video.video_duration}
                            </p>
                          </div>
                        ))}
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <section ref={subscribeRef} className="base-container gap-8 py-[100px]">
          <div className="grid gap-1">
            <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
              Langganan 🌟
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Tertarik? Ayo, berlangganan untuk mengakses semua video.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
            {dummyOfferSubscriptions.map((item) => (
              <div
                key={item.id}
                className={`relative isolate grid gap-8 overflow-hidden rounded-xl shadow-[4px_4px_36px_rgba(0,0,0,0.1)] [padding:4rem_2rem] ${
                  item.highlight ? "bg-purple" : "bg-white"
                }`}
              >
                {item.highlight && (
                  <div className="absolute left-0 top-0 z-50 rounded-br-xl bg-pink-500 text-center font-extrabold text-white [padding:0.5rem_3rem]">
                    Populer
                  </div>
                )}

                <div className="grid gap-2">
                  <h1
                    className={`text-center text-xl font-bold ${item.highlight ? "text-white" : "text-black"}`}
                  >
                    {item.name}
                  </h1>

                  <h1
                    className={`text-center text-4xl font-black ${item.highlight ? "text-white" : "text-purple"}`}
                  >
                    {formatRupiah(item.price)}
                  </h1>
                </div>

                <div className="grid gap-2">
                  <h4
                    className={`text-lg font-bold ${item.highlight ? "text-white" : "text-black"}`}
                  >
                    Keuntungan Berlangganan ✨
                  </h4>

                  <div className="grid gap-2">
                    {item.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle
                          weight="duotone"
                          size={24}
                          className={
                            item.highlight ? "text-white" : "text-purple"
                          }
                        />

                        <p
                          className={`text-sm font-medium ${item.highlight ? "text-white" : "text-black"}`}
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => window.open(item.order_link, "_blank")}
                  className={`font-bold text-white ${item.highlight ? "bg-pink-500" : "bg-purple"}`}
                >
                  Mulai Berlangganan
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="[padding:100px_0_156px]">
          <div className="mx-auto flex max-w-[600px] flex-col flex-wrap gap-8 rounded-xl border-2 border-l-[16px] border-black px-6 py-12 sm:px-16 lg:max-w-[700px] lg:flex-row lg:items-center lg:justify-between xl:max-w-[950px]">
            <div className="flex-1 lg:max-w-[500px]">
              <h2 className="pb-2 text-3xl font-black capitalize -tracking-wide text-black">
                Masih Kesulitan??? Kurang Paham??
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                Kamu bisa booking Kelas Private 1 on 1 Farmasi dengan mentor
                pilihanmu sekarang!!!
              </p>
            </div>

            <Button
              color="secondary"
              onClick={() =>
                router.push("/kelas-matkul-farmasi/kelas-privat-farmasi")
              }
              className="px-4 font-bold"
            >
              Booking Kelas Private
            </Button>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}

type DataProps = {
  data?: PharmacistAdmissionDetailsResponse;
  error?: ErrorDataType;
};

export const getServerSideProps: GetServerSideProps<DataProps> = async ({
  params,
}) => {
  try {
    const response = (await fetcher({
      method: "GET",
      url: `/general/pharmacistadmission/${params?.slug}`,
    })) as SuccessResponse<PharmacistAdmissionDetailsResponse>;

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
