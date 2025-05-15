import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import ButtonBack from "@/components/button/ButtonBack";
import CTAPrivateClass from "@/components/cta/CTAPrivateClass";
import CustomTooltip from "@/components/CustomTooltip";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { dummyVideoCourse } from "@/config/dummy";
import { PharmacistAdmissionDetailsResponse } from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { handleShareClipboard } from "@/utils/shareClipboard";
import { Accordion, AccordionItem, Button, Progress } from "@nextui-org/react";
import {
  ArrowRight,
  Check,
  Notepad,
  Play,
  ShareNetwork,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";

export default function DetailPharmacistEntranceClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout
        title={`Detail Kelas Video ${data?.name}`}
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      >
        <ButtonBack />

        <div className="mt-4">
          <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />
        </div>

        <section className="base-container pt-8">
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

                <p className="font-medium leading-[170%] text-gray">
                  {data?.description}
                </p>
              </div>

              <div className="grid gap-2 sm:inline-flex sm:items-center sm:gap-4">
                <Button
                  color="secondary"
                  startContent={<Play weight="duotone" size={18} />}
                  className="px-6 font-bold"
                >
                  Tonton Preview!
                </Button>

                <Button
                  aria-label="Share Link"
                  variant="bordered"
                  startContent={<ShareNetwork weight="duotone" size={18} />}
                  onClick={handleShareClipboard}
                  className="w-max px-6 font-bold"
                >
                  Bagikan
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="base-container py-[100px]">
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
              <div className="flex aspect-video items-center justify-center rounded-xl bg-gray/5 p-8 ring-2 ring-gray/10">
                <span className="font-semibold capitalize text-gray">
                  video here
                </span>
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
                      <div className="grid gap-2">
                        <div className="grid gap-2 rounded-xl [padding:1rem_1.5rem] hover:bg-gray/10">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="line-clamp-1 text-sm font-bold capitalize text-black">
                              Pre Test: {item.segment_name}
                            </h4>

                            <p className="text-sm font-semibold text-gray">
                              10 soal
                            </p>
                          </div>

                          <CustomTooltip content="Kerjakan Ujian">
                            <Button isIconOnly size="sm" variant="flat">
                              <ArrowRight
                                weight="bold"
                                size={18}
                                className="text-gray"
                              />
                            </Button>
                          </CustomTooltip>
                        </div>

                        <div className="grid">
                          {item.segment_videos.map((video) => (
                            <div
                              key={video.video_id}
                              className="grid gap-2 rounded-xl [padding:1rem_1.5rem] hover:bg-gray/10"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="line-clamp-1 text-sm font-bold capitalize text-black">
                                  {video.video_name}
                                </h4>

                                <p className="text-sm font-semibold text-gray">
                                  {video.video_duration}
                                </p>
                              </div>

                              <div className="inline-flex items-center gap-2">
                                <CustomTooltip content="Play Video">
                                  <Button isIconOnly size="sm" variant="flat">
                                    <Play
                                      weight="duotone"
                                      size={16}
                                      className="text-gray"
                                    />
                                  </Button>
                                </CustomTooltip>

                                <CustomTooltip content="Lihat Catatan">
                                  <Button isIconOnly size="sm" variant="flat">
                                    <Notepad
                                      weight="duotone"
                                      size={20}
                                      className="text-gray"
                                    />
                                  </Button>
                                </CustomTooltip>

                                <CustomTooltip content="Video Selesai">
                                  <Button isIconOnly size="sm" variant="flat">
                                    <Check
                                      weight="bold"
                                      size={18}
                                      className="text-gray"
                                    />
                                  </Button>
                                </CustomTooltip>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="grid gap-2 rounded-xl [padding:1rem_1.5rem] hover:bg-gray/10">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="line-clamp-1 text-sm font-bold capitalize text-black">
                              Post Test: {item.segment_name}
                            </h4>

                            <p className="text-sm font-semibold text-gray">
                              10 soal
                            </p>
                          </div>

                          <CustomTooltip content="Kerjakan Ujian">
                            <Button isIconOnly size="sm" variant="flat">
                              <ArrowRight
                                weight="bold"
                                size={18}
                                className="text-gray"
                              />
                            </Button>
                          </CustomTooltip>
                        </div>
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <CTAPrivateClass />
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
