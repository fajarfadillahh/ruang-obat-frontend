import ButtonBack from "@/components/button/ButtonBack";
import CTAPrivateClass from "@/components/cta/CTAPrivateClass";
import CustomTooltip from "@/components/CustomTooltip";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SuccessResponse } from "@/types/global.type";
import { handleShareClipboard } from "@/utils/shareClipboard";
import {
  Accordion,
  AccordionItem,
  Button,
  Progress,
  ScrollShadow,
  Skeleton,
} from "@nextui-org/react";
import {
  ArrowRight,
  BookBookmark,
  Check,
  ClipboardText,
  ClockCountdown,
  Lock,
  Play,
  ShareNetwork,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Key, useEffect, useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

type ContentDetailResponse = {
  course_id: string;
  title: string;
  slug: string;
  thumbnail_url: string;
  preview_url: any;
  description: string;
  segments: {
    segment_id: string;
    number: number;
    title: string;
  }[];
  progress: {
    total_contents: number;
    total_progress: number;
    percentage: number;
  };
  is_login: boolean;
};

type Content = {
  content_id: string;
  content_type: "video" | "test";
  title: string;
  test_type: "pre" | "post" | null;
  duration: string;
  total_questions: number;
};

type Segment = {
  segment_id: string;
  number: number;
  title: string;
};

export default function DetailCoursePage({
  token,
  slug,
  type,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedKeys, setSelectedKeys] = useState<Key>("");
  const [contents, setContents] = useState<Content[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [debouncedSelectedKeys] = useDebounce(selectedKeys, 500);
  const [loadingContents, setLoadingContents] = useState(false);
  const { data, isLoading } = useSWR<SuccessResponse<ContentDetailResponse>>({
    method: "GET",
    url: `/contents/${slug}/${type}/detail`,
    token,
  });

  const { data: dataContents } = useSWR<SuccessResponse<Content[]>>(
    debouncedSelectedKeys
      ? {
          url: `/segments/${debouncedSelectedKeys}`,
          method: "GET",
          token,
        }
      : null,
  );

  useEffect(() => {
    if (!isLoading) {
      setSegments(data?.data.segments || []);
    }
  }, [isLoading, data?.data.segments]);

  useEffect(() => {
    setContents(dataContents?.data as Content[]);
    setLoadingContents(false);
  }, [dataContents]);

  return (
    <>
      <Layout
        title={`Detail Kelas Video ${data?.data.title ? data.data.title : ""}`}
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      >
        <ButtonBack />

        <section className="base-container gap-8 pt-8 lg:grid-cols-[max-content_1fr] lg:items-center lg:gap-16">
          <div className="relative h-[350px] w-[350px] rounded-xl">
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-xl" />
            ) : (
              <Image
                src={data?.data.thumbnail_url as string}
                alt={data?.data.title as string}
                fill
                className="rounded-xl object-cover object-center"
              />
            )}
          </div>

          <div className="grid max-w-[900px] gap-8">
            <div className="grid gap-4">
              {isLoading ? (
                <Skeleton className="h-12 w-full rounded-xl" />
              ) : (
                <h1 className="text-4xl font-black capitalize -tracking-wide text-black xl:text-5xl">
                  {data?.data.title}
                </h1>
              )}

              {isLoading ? (
                <Skeleton className="h-28 w-full rounded-xl" />
              ) : (
                <p className="font-medium leading-[170%] text-gray">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              )}
            </div>

            <div className="grid gap-2 sm:inline-flex sm:items-center sm:gap-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-10 w-48 rounded-xl" />
                  <Skeleton className="h-10 w-36 rounded-xl" />
                </>
              ) : (
                <>
                  {data?.data.preview_url ? (
                    <Button
                      color="secondary"
                      startContent={<Play weight="duotone" size={18} />}
                      className="px-6 font-bold"
                    >
                      Tonton Preview!
                    </Button>
                  ) : null}

                  <Button
                    aria-label="Share Link"
                    variant="bordered"
                    startContent={<ShareNetwork weight="duotone" size={18} />}
                    onClick={handleShareClipboard}
                    className="px-6 font-bold"
                  >
                    Bagikan
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="base-container gap-8 py-[100px] xl:grid-cols-[1fr_350px] xl:items-start">
          <div>
            {isLoading ? (
              <Skeleton className="aspect-video rounded-xl" />
            ) : (
              <div className="aspect-video w-full overflow-hidden rounded-xl border-2 border-gray/10 bg-gray/5">
                <iframe
                  src=""
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full rounded-xl"
                ></iframe>
              </div>
            )}
          </div>

          <div className="grid gap-8">
            <div className="grid gap-2 rounded-xl border-2 border-gray/10 p-4">
              <h5 className="font-bold text-black">
                Track progres belajar kamu!
              </h5>

              <div className="flex items-center gap-2">
                {data?.data.is_login ? (
                  <>
                    <ClockCountdown
                      weight="duotone"
                      size={38}
                      className="text-purple"
                    />

                    <Progress
                      value={data?.data.progress.percentage}
                      color="secondary"
                      label={
                        <p className="text-sm font-medium text-gray">
                          {data?.data.progress.total_progress} dari{" "}
                          {data?.data.progress.total_contents} selesai{" "}
                          <span className="font-black text-purple">
                            ({data?.data.progress.percentage}%)
                          </span>
                        </p>
                      }
                    />
                  </>
                ) : (
                  <>
                    <Lock weight="duotone" size={38} className="text-purple" />
                    <p className="text-sm font-medium text-gray">
                      Mulai berlangganan untuk melihat progress belajar kamu!
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="grid">
              <h2 className="text-xl font-black -tracking-wide text-black">
                Daftar Video
              </h2>

              <ScrollShadow className="max-h-[400px] overflow-hidden overflow-y-scroll">
                {isLoading ? (
                  <div className="grid gap-2">
                    <ThreeSkeletons classname="h-10" />
                  </div>
                ) : (
                  <Accordion
                    selectionMode="single"
                    onSelectionChange={(e) => {
                      setSelectedKeys(e[Symbol.iterator]().next().value as Key);
                      setLoadingContents(true);
                    }}
                  >
                    {segments.map((segment) => (
                      <AccordionItem
                        key={segment.segment_id}
                        title={segment.title}
                        classNames={{
                          title: "text-black font-bold",
                          indicator: "text-black",
                          content: "grid gap-1",
                        }}
                      >
                        {selectedKeys === segment.segment_id
                          ? handleAccordionItemCondition(
                              loadingContents,
                              contents,
                            )
                          : null}
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
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

function handleAccordionItemCondition(
  loadingContents: boolean,
  contents: Content[],
) {
  if (loadingContents) {
    return <ThreeSkeletons classname="h-14" />;
  }

  if (!contents || !contents.length) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray/20 p-12">
        <p className="text-center font-semibold capitalize text-gray">
          Data konten tidak ditemukan
        </p>
      </div>
    );
  }

  return contents.map((content) => handleContentCondition(content));
}

function handleContentCondition(content: Content) {
  if (
    content.content_type === "test" &&
    (content.test_type === "pre" || content.test_type === "post")
  ) {
    return (
      <div
        key={content.content_id}
        className="flex items-start gap-2 rounded-xl border-l-8 border-purple bg-purple/5 [padding:1rem_1.5rem] hover:bg-purple/10"
      >
        <BookBookmark weight="duotone" size={32} className="text-purple" />

        <div className="grid flex-1 gap-2">
          <h4 className="line-clamp-1 text-sm font-bold capitalize text-black">
            {content.title}
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
          {content.total_questions} soal
        </p>
      </div>
    );
  } else {
    return (
      <div className="grid" key={content.content_id}>
        <div className="flex items-start gap-2 rounded-xl [padding:1rem_1.5rem] hover:bg-gray/10">
          <div className="grid flex-1 gap-2">
            <h4 className="line-clamp-1 text-sm font-bold capitalize text-black">
              {content.title}
            </h4>

            <div className="inline-flex items-center gap-2">
              <CustomTooltip content="Play Video">
                <Button isIconOnly size="sm" color="secondary" variant="flat">
                  <Play weight="duotone" size={20} />
                </Button>
              </CustomTooltip>

              <CustomTooltip content="Lihat Catatan">
                <Button isIconOnly size="sm" color="secondary" variant="flat">
                  <ClipboardText weight="duotone" size={20} />
                </Button>
              </CustomTooltip>

              <CustomTooltip content="Video Selesai">
                <Button isIconOnly size="sm" color="secondary" variant="flat">
                  <Check weight="bold" size={20} />
                </Button>
              </CustomTooltip>
            </div>
          </div>

          <p className="text-sm font-semibold text-gray">{content.duration}</p>
        </div>
      </div>
    );
  }
}

function ThreeSkeletons({ classname }: { classname?: string }) {
  return (
    <>
      <Skeleton className={`w-full rounded-xl ${classname}`} />
      <Skeleton className={`w-full rounded-xl ${classname}`} />
      <Skeleton className={`w-full rounded-xl ${classname}`} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token?: string;
  slug?: string;
  type?: string;
  error?: any;
}> = async ({ req, params, query, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const slug = params?.slug as string;
  const type = query.type as string;

  if (!["apotekerclass", "videocourse", "videoukmppai"].includes(type)) {
    return {
      props: {
        error: {
          message: "Ups sepertinya parameter web tidak valid",
        },
      },
    };
  }

  return {
    props: {
      token: session?.user.access_token ?? "",
      slug: slug,
      type: type,
    },
  };
};
