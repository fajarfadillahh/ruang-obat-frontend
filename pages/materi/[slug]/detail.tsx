import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";

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
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Radio,
  RadioGroup,
  Skeleton,
  Spinner,
  useDisclosure,
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
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import ModalConfirm from "@/components/modal/ModalConfirm";
import VideoComponent from "@/components/VideoComponent";
import {
  AssessmentQuestion,
  StartAssessmentResponse,
} from "@/types/assessment.type";
import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import { scrollToSection } from "@/utils/scrollToSection";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import {
  Dispatch,
  Key,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import useSWR, { KeyedMutator } from "swr";
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
  test_type?: "pre" | "post";
  is_locked: boolean;
  is_completed: boolean;
  result_id?: string | null;
  score?: number;
  total_questions?: number;
  duration?: string;
  has_note?: boolean;
  token?: string | null;
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

  const modalAssessment = useDisclosure();
  const {
    isOpen: isSaveTestOpen,
    onOpen: onSaveTestOpen,
    onClose: onSaveTestClose,
  } = useDisclosure();
  const [number, setNumber] = useState(1);
  const [assessment, setAssessment] = useState<
    ({ content_id: string } & StartAssessmentResponse) | null
  >(null);
  const [loadingAssessment, setLoadingAssessment] = useState(false);
  const [loadingSaveTest, setLoadingSaveTest] = useState(false);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);

  const [debouncedSelectedKeys] = useDebounce(selectedKeys, 500);
  const [loadingContents, setLoadingContents] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    url: string;
    autoplay: boolean;
  }>({
    title: "",
    url: "",
    autoplay: false,
  });
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [progress, setProgress] = useState({
    total_contents: 0,
    total_progress: 0,
    percentage: 0,
  });
  const sectionPlayerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useSWR<SuccessResponse<ContentDetailResponse>>({
    method: "GET",
    url: `/contents/${slug}/${type}/detail`,
    token,
  });

  const { data: dataContents, mutate: mutateSegments } = useSWR<
    SuccessResponse<Content[]>
  >(
    debouncedSelectedKeys
      ? {
          url: `/segments/${data?.data.course_id}/${debouncedSelectedKeys}`,
          method: "GET",
          token,
        }
      : null,
    {
      revalidateOnFocus: true,
    },
  );

  useEffect(() => {
    if (!isLoading) {
      setSegments(data?.data.segments || []);

      setSelectedVideo({
        title: data?.data.title || "",
        url: data?.data.preview_url || "",
        autoplay: false,
      });

      setProgress(
        data?.data.progress || {
          total_contents: 0,
          total_progress: 0,
          percentage: 0,
        },
      );
    }
  }, [
    isLoading,
    data?.data.segments,
    data?.data.title,
    data?.data.preview_url,
    data?.data.progress,
  ]);

  useEffect(() => {
    setContents(dataContents?.data as Content[]);
    setLoadingContents(false);
  }, [dataContents]);

  useEffect(() => {
    if (!loadingAssessment && assessment) {
      setQuestions(assessment.questions);
      setNumber(1);
    }
  }, [assessment, loadingAssessment]);

  async function handleSaveTest() {
    setLoadingSaveTest(true);

    try {
      const mappingQuestions = [];

      const cache = localStorage.getItem(assessment?.content_id as string);

      if (cache) {
        const parsing = JSON.parse(cache) as StartAssessmentResponse;

        for (const item of parsing.questions) {
          mappingQuestions.push({
            number: item.number,
            assq_id: item.assq_id,
            user_answer: item.user_answer,
          });
        }
      }

      const response: SuccessResponse<{ assr_id: string }> = await fetcher({
        url: "/assessments/finish",
        method: "POST",
        data: {
          field_id: "content_id",
          value_id: assessment?.content_id,
          questions: mappingQuestions,
        },
        token,
      });

      toast.success("Berhasil mengumpulkan ujian", {
        duration: 3000,
      });

      localStorage.removeItem(assessment?.content_id as string);
      setAssessment(null);
      setQuestions([]);
      setNumber(1);
      mutateSegments();

      return modalAssessment.onClose();
    } catch (error) {
      console.log(error);
      toast.error(getError(error));
    } finally {
      setLoadingSaveTest(false);
    }
  }

  const question = questions.length
    ? questions.find((question) => question.number == number)
    : {
        text: "",
        user_answer: "",
        options: [{ asso_id: "", text: "" }],
        is_hesitant: false,
        type: "",
      };

  return (
    <>
      <Layout
        title={`Detail Kelas Video ${data?.data.title ? data.data.title : ""}`}
        description={data?.data.description || ""}
      >
        <ButtonBack />

        {contents && contents.length ? (
          contents.some((content) => content.content_type === "test") ? (
            <Modal
              isOpen={modalAssessment.isOpen}
              size="4xl"
              onClose={() => {
                modalAssessment.onClose();
                setQuestions([]);
                setNumber(1);
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex justify-center">
                      {assessment?.title ? assessment.title : "-"}
                    </ModalHeader>
                    <ModalBody>
                      {loadingAssessment ? (
                        <Spinner size="lg" color="secondary" />
                      ) : (
                        <>
                          <div className="sticky left-0 top-0 z-10 bg-white text-lg font-extrabold text-purple">
                            No. {number}
                          </div>

                          <div className="grid gap-6 overflow-hidden p-[0_1.5rem_1.5rem]">
                            {question?.type == "video" ? (
                              <Suspense
                                fallback={
                                  <Spinner
                                    size="sm"
                                    color="secondary"
                                    label="loading video..."
                                  />
                                }
                              >
                                <VideoComponent url={question.text} />
                              </Suspense>
                            ) : (
                              <p
                                className="preventive-list preventive-table list-outside text-base font-semibold leading-[170%] text-black"
                                dangerouslySetInnerHTML={{
                                  __html: question?.text as string,
                                }}
                              />
                            )}

                            <RadioGroup
                              value={question?.user_answer}
                              aria-label="select the answer"
                              color="secondary"
                              classNames={{
                                base: "font-semibold text-black",
                              }}
                              onChange={(e) => {
                                setQuestions((prev) => {
                                  if (prev.length) {
                                    const index = prev.findIndex(
                                      (question) => question.number == number,
                                    );

                                    if (index != -1) {
                                      prev[index] = {
                                        ...prev[index],
                                        user_answer: e.target.value,
                                      };

                                      return [...prev];
                                    }
                                  }

                                  return [...prev];
                                });
                                localStorage.setItem(
                                  assessment?.content_id as string,
                                  JSON.stringify({
                                    ...assessment,
                                    questions,
                                  }),
                                );
                              }}
                            >
                              {question?.options.map((option) => {
                                return (
                                  <Radio
                                    value={option.asso_id}
                                    key={option.asso_id}
                                  >
                                    {option.text}
                                  </Radio>
                                );
                              })}
                            </RadioGroup>
                          </div>
                        </>
                      )}
                    </ModalBody>
                    <ModalFooter className="flex flex-col items-center justify-center">
                      {!loadingAssessment ? (
                        <>
                          <ul className="flex items-center gap-2">
                            {Array.from({ length: questions.length }).map(
                              (_, index) => {
                                return (
                                  <li
                                    key={index + 1}
                                    aria-label={`page ${index + 1}`}
                                    className="h-4 w-4"
                                  >
                                    <button
                                      className={cn(
                                        "h-full w-full rounded-full bg-default-300",
                                        number === index + 1 && "bg-secondary",
                                      )}
                                      onClick={() => setNumber(index + 1)}
                                    />
                                  </li>
                                );
                              },
                            )}
                          </ul>

                          {number - 1 === questions.length - 1 ? (
                            <>
                              <Button
                                color="secondary"
                                onClick={onSaveTestOpen}
                                className="font-bold"
                                isDisabled={
                                  !questions.some((q) => q.user_answer)
                                }
                              >
                                Kumpulkan Jawaban!
                              </Button>

                              <ModalConfirm
                                btnText="Kumpulkan Sekarang"
                                header="Pemberitahuan"
                                text="Yakin dengan semua jawaban kamu? Aksi tidak dapat dibatalkan jika kamu telah mengumpulkan jawaban."
                                loading={loadingSaveTest}
                                isOpen={isSaveTestOpen}
                                onClose={onSaveTestClose}
                                handleAction={handleSaveTest}
                              />
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          ) : null
        ) : null}

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
                  {data?.data.description}
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
                      onClick={() => scrollToSection(sectionPlayerRef)}
                    >
                      Tonton Preview
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

        <section
          className="base-container gap-8 py-[100px] xl:grid-cols-[1fr_350px] xl:items-start"
          ref={sectionPlayerRef}
        >
          <div>
            {isLoading || loadingVideo ? (
              <Skeleton className="aspect-video rounded-xl" />
            ) : (
              <MediaPlayer
                title={selectedVideo.title}
                src={selectedVideo.url}
                playsInline
                autoPlay={selectedVideo.autoplay}
                onContextMenu={(e) => e.preventDefault()}
              >
                <MediaProvider />
                <DefaultVideoLayout
                  icons={defaultLayoutIcons}
                  slots={{
                    pipButton: null,
                    googleCastButton: null,
                    settingsMenu: null,
                  }}
                />
              </MediaPlayer>
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
                      value={progress.percentage}
                      color="secondary"
                      label={
                        <p className="text-sm font-medium text-gray">
                          {progress.total_progress} dari{" "}
                          {progress.total_contents} selesai{" "}
                          <span className="font-black text-purple">
                            ({progress.percentage}%)
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

              <div className="max-h-[400px] overflow-hidden overflow-y-scroll">
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
                          ? handleAccordionItemCondition({
                              loadingContents,
                              contents,
                              token,
                              setSelectedVideo,
                              mutateSegments,
                              setLoadingVideo,
                              setProgress,
                              setAssessment,
                              modalAssessment,
                              setLoadingAssessment,
                            })
                          : null}
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
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

type HandleAccordionItemConditionParams = {
  loadingContents: boolean;
  contents: Content[];
  setSelectedVideo: Dispatch<
    SetStateAction<{
      title: string;
      url: string;
      autoplay: boolean;
    }>
  >;
  setLoadingVideo: Dispatch<SetStateAction<boolean>>;
  setProgress: Dispatch<
    SetStateAction<{
      total_contents: number;
      total_progress: number;
      percentage: number;
    }>
  >;
  token?: string;
  mutateSegments: KeyedMutator<SuccessResponse<Content[]>>;
  setAssessment: Dispatch<
    SetStateAction<({ content_id: string } & StartAssessmentResponse) | null>
  >;
  modalAssessment: ReturnType<typeof useDisclosure>;
  setLoadingAssessment: Dispatch<SetStateAction<boolean>>;
};

function handleAccordionItemCondition({
  loadingContents,
  contents,
  setSelectedVideo,
  token,
  setLoadingVideo,
  mutateSegments,
  setProgress,
  setAssessment,
  modalAssessment,
  setLoadingAssessment,
}: HandleAccordionItemConditionParams) {
  async function getVideoUrl(content: Content) {
    if (content.is_locked) return;

    setLoadingVideo(true);
    try {
      const response: SuccessResponse<{ video_url: string }> = await fetcher({
        url: `/urls/${content.content_id}?token=${content.token}`,
        method: "GET",
        token,
      });

      setSelectedVideo({
        title: content.title,
        url: response.data.video_url,
        autoplay: true,
      });
    } catch (error) {
      console.log(error);

      toast.error("Gagal mendapatkan link video");
    } finally {
      setLoadingVideo(false);
    }
  }
  async function getNotesUrl(content: Content) {
    if (content.is_locked) return;

    try {
      const response: SuccessResponse<{
        video_note_url: string;
        video_note: string;
      }> = await fetcher({
        url: `/notes/${content.content_id}?token=${content.token}`,
        method: "GET",
        token,
      });

      if (response.data.video_note_url) {
        window.open(response.data.video_note_url, "_blank");
      }
    } catch (error) {
      console.log(error);

      toast.error("Gagal mendapatkan note video");
    }
  }
  async function markAsCompleted(content: Content) {
    if (content.is_locked || content.is_completed) return;

    try {
      const response: SuccessResponse<{
        total_contents: number;
        total_progress: number;
        percentage: number;
      }> = await toast.promise(
        fetcher({
          url: "/progress",
          method: "POST",
          token,
          data: {
            content_id: content.content_id,
          },
        }),
        {
          loading: "Menyimpan...",
          success: <p>Progres telah disimpan</p>,
          error: <p>Gagal menyimpan progress</p>,
        },
        {
          position: "bottom-right",
        },
      );

      mutateSegments();
      setProgress(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Gagal menyimpan progress", {
        position: "bottom-right",
      });
    }
  }

  async function getStartTest(content: Content) {
    if (content.is_locked) return;

    modalAssessment.onOpen();
    setLoadingAssessment(true);

    const cache = localStorage.getItem(content.content_id as string);

    if (cache) {
      setAssessment({
        content_id: content.content_id,
        ...(JSON.parse(cache) as StartAssessmentResponse),
        title: content.title,
      });
      setLoadingAssessment(false);
      return;
    }

    try {
      const response: SuccessResponse<StartAssessmentResponse> = await fetcher({
        url: `/assessments/${content.content_id}/start`,
        method: "GET",
        token,
      });

      setAssessment({
        content_id: content.content_id,
        ...response.data,
      });

      localStorage.setItem(
        content.content_id as string,
        JSON.stringify(response.data),
      );
    } catch (error) {
      setAssessment(null);
      modalAssessment.onClose();

      console.log(error);
      toast.error("Gagal mendapatkan data test");
    } finally {
      setLoadingAssessment(false);
    }
  }

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

  return contents.map((content) => {
    if (
      content.content_type === "test" &&
      ["pre", "post"].includes(content.test_type as string)
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
              color={content.is_completed ? "success" : "secondary"}
              endContent={
                content.is_locked ? (
                  <Lock weight="bold" />
                ) : content.is_completed ? (
                  <Check weight="bold" />
                ) : (
                  <ArrowRight weight="bold" />
                )
              }
              className={`w-max font-bold ${content.is_completed ? "text-white" : ""}`}
              isDisabled={content.is_locked}
              onClick={() => {
                if (!content.is_completed) {
                  getStartTest(content);
                } else {
                  window.open(`/quiz/${content.result_id}/result`, "_blank");
                }
              }}
            >
              {!content.is_completed ? "Mulai" : "Lihat Hasil"}
            </Button>
          </div>

          <p className="text-sm font-semibold text-gray">
            {!content.is_completed
              ? `${content.total_questions} soal`
              : `🎖️ ${content.score}`}
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
                  <Button
                    isIconOnly
                    size="sm"
                    color="secondary"
                    variant="flat"
                    onClick={() => getVideoUrl(content)}
                    isDisabled={content.is_locked}
                  >
                    <Play weight="duotone" size={20} />
                  </Button>
                </CustomTooltip>

                {content.has_note ? (
                  <CustomTooltip content="Lihat Catatan">
                    <Button
                      isIconOnly
                      size="sm"
                      color="secondary"
                      variant="flat"
                      onClick={() => getNotesUrl(content)}
                      isDisabled={content.is_locked}
                    >
                      <ClipboardText weight="duotone" size={20} />
                    </Button>
                  </CustomTooltip>
                ) : null}

                <CustomTooltip content="Tandai Selesai">
                  <Button
                    isIconOnly
                    size="sm"
                    color={content.is_completed ? "success" : "secondary"}
                    variant="flat"
                    onClick={() => markAsCompleted(content)}
                    isDisabled={content.is_locked || content.is_completed}
                  >
                    <Check weight="bold" size={20} />
                  </Button>
                </CustomTooltip>
              </div>
            </div>

            <p className="text-sm font-semibold text-gray">
              {content.duration}
            </p>
          </div>
        </div>
      );
    }
  });
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
