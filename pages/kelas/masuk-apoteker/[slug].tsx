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
import {
  Accordion,
  AccordionItem,
  Button,
  Progress,
  ScrollShadow,
} from "@nextui-org/react";
import {
  ArrowRight,
  BookBookmark,
  Check,
  ClipboardText,
  ClockCountdown,
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

        <section className="base-container gap-8 pt-8 lg:grid-cols-[max-content_1fr] lg:items-center lg:gap-16">
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
                className="px-6 font-bold"
              >
                Bagikan
              </Button>
            </div>
          </div>
        </section>

        <section className="base-container gap-8 py-[100px] xl:grid-cols-[1fr_350px] xl:items-start">
          {/* video card */}
          <div className="flex aspect-video items-center justify-center rounded-xl border-2 border-gray/10 bg-gray/5 p-8 font-semibold capitalize text-gray">
            video here
          </div>

          {/* data video */}
          <div className="grid gap-8">
            <div className="grid gap-2 rounded-xl border-2 border-gray/10 p-4">
              <h5 className="font-bold text-black">
                Track progres belajar kamu!
              </h5>

              <div className="flex items-center gap-2">
                <ClockCountdown
                  weight="duotone"
                  size={38}
                  className="text-purple"
                />

                <Progress
                  value={50}
                  color="secondary"
                  label={
                    <p className="text-sm font-medium text-gray">
                      5 dari 25 selesai{" "}
                      <span className="font-black text-purple">(50%)</span>
                    </p>
                  }
                />
              </div>
            </div>

            <div className="grid">
              <h2 className="text-xl font-black -tracking-wide text-black">
                Daftar Video
              </h2>

              <ScrollShadow className="max-h-[400px] overflow-hidden overflow-y-scroll">
                <Accordion selectionMode="multiple">
                  {dummyVideoCourse.map((item) => (
                    <AccordionItem
                      key={item.segment_id}
                      title={item.segment_name}
                      classNames={{
                        title: "text-black font-bold",
                        indicator: "text-black",
                        content: "grid gap-1",
                      }}
                    >
                      <div className="flex items-start gap-2 rounded-xl border-l-8 border-purple bg-purple/5 [padding:1rem_1.5rem] hover:bg-purple/10">
                        <BookBookmark
                          weight="duotone"
                          size={32}
                          className="text-purple"
                        />

                        <div className="grid flex-1 gap-2">
                          <h4 className="line-clamp-1 text-sm font-bold capitalize text-black">
                            Pre Test: {item.segment_name}
                          </h4>

                          <Button
                            size="sm"
                            color="secondary"
                            endContent={<ArrowRight weight="bold" />}
                            className="w-max font-bold"
                          >
                            Mulai
                          </Button>
                        </div>

                        <p className="text-sm font-semibold text-gray">
                          10 soal
                        </p>
                      </div>

                      <div className="grid">
                        {item.segment_videos.map((video) => (
                          <div
                            key={video.video_id}
                            className="flex items-start gap-2 rounded-xl [padding:1rem_1.5rem] hover:bg-gray/10"
                          >
                            <div className="grid flex-1 gap-2">
                              <h4 className="line-clamp-1 text-sm font-bold capitalize text-black">
                                {video.video_name}
                              </h4>

                              <div className="inline-flex items-center gap-2">
                                <CustomTooltip content="Play Video">
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    color="secondary"
                                    variant="flat"
                                  >
                                    <Play weight="duotone" size={20} />
                                  </Button>
                                </CustomTooltip>

                                <CustomTooltip content="Lihat Catatan">
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    color="secondary"
                                    variant="flat"
                                  >
                                    <ClipboardText weight="duotone" size={20} />
                                  </Button>
                                </CustomTooltip>

                                <CustomTooltip content="Video Selesai">
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    color="secondary"
                                    variant="flat"
                                  >
                                    <Check weight="bold" size={20} />
                                  </Button>
                                </CustomTooltip>
                              </div>
                            </div>

                            <p className="text-sm font-semibold text-gray">
                              {video.video_duration}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-start gap-2 rounded-xl border-l-8 border-purple bg-purple/5 [padding:1rem_1.5rem] hover:bg-purple/10">
                        <BookBookmark
                          weight="duotone"
                          size={32}
                          className="text-purple"
                        />

                        <div className="grid flex-1 gap-2">
                          <h4 className="line-clamp-1 text-sm font-bold capitalize text-black">
                            Post Test: {item.segment_name}
                          </h4>

                          <Button
                            size="sm"
                            color="secondary"
                            endContent={<ArrowRight weight="bold" />}
                            className="w-max font-bold"
                          >
                            Mulai
                          </Button>
                        </div>

                        <p className="text-sm font-semibold text-gray">
                          10 soal
                        </p>
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollShadow>
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
