import ButtonBack from "@/components/button/ButtonBack";
import CTASecondary from "@/components/cta/CTASecondary";
import CustomTooltip from "@/components/CustomTooltip";
import Empty from "@/components/Empty";
import Footer from "@/components/footer/Footer";
import SectionSubscription from "@/components/section/SectionSubscription";
import Layout from "@/components/wrapper/Layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { isNewProduct } from "@/utils/isNewProduct";
import { scrollToSection } from "@/utils/scrollToSection";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import {
  ClipboardText,
  DownloadSimple,
  FileText,
  IconContext,
  Trophy,
  VideoCamera,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

type Quiz = {
  ass_id: string;
  description: string;
  title: string;
  total_questions: number;
};

type ContentResponse = {
  name: string;
  slug: string;
  img_url: string;
  type: string;
  courses: {
    course_id: string;
    title: string;
    slug: string;
    thumbnail_url: string;
    total_videos: number;
    total_tests: number;
    created_at: string;
  }[];
  quizzes: Quiz[];
  histories: {
    assr_id: string;
    score: number;
    created_at: string;
    ass_id: string;
    title: string;
  }[];
  cards: {
    card_id: string;
    text?: string;
    url?: string;
    type: string;
  }[];
  subscriptions: {
    package_id: string;
    name: string;
    price: number;
    duration: number;
    type: string;
    link_order: string;
    benefits: {
      benefit_id: string;
      description: string;
    }[];
  }[];
  is_login: boolean;
};

export default function CoursePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const session = useSession();
  const [client, setClient] = useState<boolean>(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isOpenModalQuiz, setIsOpenModalQuiz] = useState<boolean>(false);

  const subscribeRef = useRef<HTMLElement | null>(null);
  const quizRef = useRef<HTMLElement | null>(null);

  function handleOpenModalQuiz(prepQuiz: Quiz) {
    setSelectedQuiz(prepQuiz);
    setIsOpenModalQuiz(true);
  }

  function getCardsByType(type: string) {
    return data?.cards.filter((card) => card.type == type);
  }

  const getFilenameFromUrl = (url: string) => {
    if (!url) return "File Dokumen Tidak Diketahui";
    return url.split("/").pop();
  };

  const textCards = getCardsByType("text");
  const imageCards = getCardsByType("image");
  const documentCards = getCardsByType("document");

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return;

  return (
    <>
      <Layout title={data?.name as string}>
        <ButtonBack />

        {/* course list section */}
        <section className="base-container gap-16 [padding:50px_0_100px]">
          <div className="flex items-center gap-4">
            <Image
              src={data?.img_url as string}
              alt={data?.name as string}
              width={1000}
              height={1000}
              className="size-28 object-fill"
            />

            <div className="grid gap-4">
              <h1 className="flex-1 text-3xl font-black text-black xl:text-4xl">
                {data?.name as string}
              </h1>

              <div className="grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
                <Button
                  color="secondary"
                  onClick={() => scrollToSection(subscribeRef)}
                  className="px-6 font-bold"
                >
                  Langganan Sekarang!
                </Button>

                <Button
                  variant="bordered"
                  onClick={() => scrollToSection(quizRef)}
                  className="px-6 font-bold"
                >
                  Pilih Bonus Kuis
                </Button>
              </div>
            </div>
          </div>

          {data?.courses.length ? (
            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
              {data?.courses.map((course) => (
                <div
                  key={course.course_id}
                  onClick={() =>
                    router.push(
                      `/materi/${course.slug}/detail?type=${router.query.type}`,
                    )
                  }
                  className="group relative isolate grid overflow-hidden rounded-xl border-2 border-gray/10 hover:cursor-pointer hover:bg-purple/10"
                >
                  {isNewProduct(course.created_at) ? (
                    <Chip
                      color="danger"
                      size="sm"
                      className="absolute right-4 top-4 z-10"
                      classNames={{
                        content: "font-bold px-4",
                      }}
                    >
                      Baru
                    </Chip>
                  ) : null}

                  <Image
                    priority
                    src={course.thumbnail_url}
                    alt="thumbnail"
                    width={304}
                    height={304}
                    className="aspect-square h-auto w-full object-cover object-center group-hover:grayscale-[0.5]"
                  />

                  <div className="grid gap-4 [padding:1.5rem_1rem]">
                    <h1 className="line-clamp-2 text-lg font-black text-black group-hover:text-purple">
                      {course.title}
                    </h1>

                    <IconContext.Provider
                      value={{
                        weight: "duotone",
                        size: 18,
                        className: "text-purple",
                      }}
                    >
                      <div className="flex items-start justify-between gap-1">
                        {[
                          [
                            "Jumlah Video",
                            <VideoCamera key={course.course_id} />,
                            `${course.total_videos} video`,
                          ],
                          [
                            "Jumlah Kuis",
                            <ClipboardText key={course.course_id} />,
                            `${course.total_tests} kuis`,
                          ],
                        ].map(([label, icon, value], index) => (
                          <div key={index} className="grid gap-1">
                            <span className="text-xs font-medium text-gray">
                              {label}:
                            </span>

                            <div className="flex items-center gap-1">
                              {icon}

                              <p className="text-sm font-semibold capitalize text-black">
                                {value}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </IconContext.Provider>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty text="Data video belum tersedia" />
          )}
        </section>

        {/* quiz section */}
        <section ref={quizRef} className="base-container gap-4 py-[100px]">
          <div className="grid">
            <h2 className="text-3xl font-black -tracking-wide text-black">
              Bonus Kuis ✍
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Dapatkan bonus kuis untuk kamu yang telah berlangganan kelas ini.
            </p>
          </div>

          {data?.quizzes.length ? (
            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
              {data.quizzes.map((quiz) => (
                <CardQuiz
                  key={quiz.ass_id}
                  type="bonus"
                  title={quiz.title}
                  data={quiz.total_questions}
                  onClick={() => handleOpenModalQuiz(quiz as Quiz)}
                />
              ))}

              {selectedQuiz && (
                <Modal
                  size="lg"
                  placement="center"
                  scrollBehavior="inside"
                  isOpen={isOpenModalQuiz}
                  onOpenChange={(open) => setIsOpenModalQuiz(open)}
                >
                  <ModalContent>
                    <ModalHeader className="font-bold text-black">
                      Detail Kuis
                    </ModalHeader>

                    <ModalBody>
                      <div className="grid items-start gap-8 sm:flex">
                        <div className="text-5xl">📚</div>

                        <div className="grid gap-6">
                          <div className="grid gap-2">
                            <h1 className="text-xl font-extrabold text-black">
                              {selectedQuiz.title}
                            </h1>

                            {selectedQuiz.description ? (
                              <p className="text-sm font-medium leading-[170%] text-gray">
                                {selectedQuiz.description}
                              </p>
                            ) : null}
                          </div>

                          <IconContext.Provider
                            value={{
                              weight: "duotone",
                              size: 24,
                              className: "text-purple",
                            }}
                          >
                            <div>
                              {[
                                [
                                  "Jumlah Soal",
                                  <ClipboardText key={selectedQuiz.ass_id} />,
                                  `${selectedQuiz.total_questions}`,
                                ],
                              ].map(([label, icon, value], index) => (
                                <div key={index} className="grid gap-1">
                                  <span className="text-sm font-medium text-gray">
                                    {label}:
                                  </span>

                                  <div className="flex items-center gap-1">
                                    {icon}

                                    <p className="text-sm font-semibold capitalize text-black">
                                      {value} butir
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </IconContext.Provider>

                          <Button
                            isDisabled={session.status == "unauthenticated"}
                            color="secondary"
                            onClick={() => {
                              router.push(`/quiz/${selectedQuiz.ass_id}/start`);
                            }}
                            className="font-bold"
                          >
                            Mulai Kuis!
                          </Button>
                        </div>
                      </div>
                    </ModalBody>

                    <ModalFooter />
                  </ModalContent>
                </Modal>
              )}
            </div>
          ) : (
            <Empty text="Data kuis belum tersedia" />
          )}
        </section>

        {/* histories quiz section */}
        {data?.is_login ? (
          <section className="base-container gap-4 py-[100px]">
            <div className="grid">
              <h2 className="text-3xl font-black -tracking-wide text-black">
                Riwayat Kuis 🕐
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                Pantau semua jawaban kuis kamu untuk bahan belajar.
              </p>
            </div>

            {data.histories.length ? (
              <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
                {data.histories.map((history) => (
                  <CardQuiz
                    key={history.assr_id}
                    type="history"
                    title={history.title}
                    data={history.score}
                    onClick={() =>
                      router.push(`/quiz/${history.assr_id}/result`)
                    }
                  />
                ))}
              </div>
            ) : (
              <Empty text="Riwayat masih kosong" />
            )}
          </section>
        ) : null}

        {/* flashcard section */}
        <section className="base-container gap-4 py-[100px]">
          <h2 className="text-3xl font-black -tracking-wide text-black">
            Flashcard ✉️
          </h2>

          {data?.cards.length ? (
            <div className="grid gap-8 xl:grid-cols-[1fr_350px] xl:items-start">
              <div className="grid gap-8">
                {/* image flashcard */}
                <div className="w-full columns-[377px]">
                  {imageCards?.map((item, index) => (
                    <Image
                      key={index}
                      priority
                      src={item.url as string}
                      alt="flashcard image"
                      width={1024}
                      height={768}
                      className="mb-4 h-auto w-full rounded-xl object-cover"
                    />
                  ))}
                </div>

                {/* text flashcard */}
                <div className="grid gap-4 md:grid-cols-2">
                  {textCards?.map((item, index) => (
                    <div
                      key={index}
                      className="group rounded-xl border-l-8 border-purple bg-purple/5 p-8"
                    >
                      <h5 className="mb-2 text-lg font-black text-black">
                        Tulisan Flascard ✏️
                      </h5>

                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.text as string,
                        }}
                        className="preventive-list preventive-table text-sm font-medium leading-[170%] text-gray"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* document flashcard */}
              <div className="grid">
                <h4 className="mb-2 text-lg font-bold text-black">
                  Dokumen yang diunggah
                </h4>

                <div className="grid divide-y-2 divide-dashed divide-gray/20">
                  {documentCards?.length ? (
                    documentCards.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-4 [padding:1rem_0.5rem] hover:bg-purple/10"
                      >
                        <div className="inline-flex items-center gap-2">
                          <FileText
                            weight="duotone"
                            size={32}
                            className="text-purple"
                          />

                          <h5 className="line-clamp-1 text-sm font-bold text-black">
                            {getFilenameFromUrl(item.url as string)}
                          </h5>
                        </div>

                        <a
                          download
                          href={item.url}
                          className="rounded-lg p-2 hover:bg-gray/10"
                        >
                          <CustomTooltip content="Download Flashcard">
                            <DownloadSimple
                              weight="bold"
                              size={18}
                              className="text-purple"
                            />
                          </CustomTooltip>
                        </a>
                      </div>
                    ))
                  ) : (
                    <Empty text="Dokumen tidak tersedia" />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Empty text="Flashcard belum tersedia" />
          )}
        </section>

        {/* subscriptions section */}
        {data?.subscriptions.length ? (
          <SectionSubscription
            sectionRef={subscribeRef}
            subscriptions={data.subscriptions}
          />
        ) : null}

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: ContentResponse;
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

  try {
    const response: SuccessResponse<ContentResponse> = await fetcher({
      url: `/contents/${slug}/${type}`,
      method: "GET",
      token: session?.user.access_token,
    });

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

interface CardQuizProps extends HTMLAttributes<HTMLDivElement> {
  type: "bonus" | "history";
  title: string;
  data: number;
}

function CardQuiz({ type, title, data, ...props }: CardQuizProps) {
  const emoji = type == "bonus" ? "📚" : "🏆";
  const icon = type == "bonus" ? <ClipboardText /> : <Trophy />;
  const label = type == "bonus" ? "Jumlah Soal:" : "Nilai:";
  const labelData = type == "bonus" ? `${data} butir` : `${data} poin`;

  return (
    <div
      className="group relative isolate grid grid-cols-[max-content_1fr] items-center gap-4 overflow-hidden rounded-xl border-2 border-gray/10 p-4 hover:cursor-pointer hover:bg-purple/10"
      {...props}
    >
      <div className="flex aspect-square size-full items-center justify-center rounded-md bg-purple/5 p-2 text-5xl">
        {emoji}
      </div>

      <div className="grid gap-4">
        <CustomTooltip content={title}>
          <h1 className="line-clamp-2 font-black text-black group-hover:text-purple">
            {title}
          </h1>
        </CustomTooltip>

        <div className="grid gap-1">
          <span className="text-xs font-medium text-gray">{label}</span>

          <div className="flex items-center gap-1">
            <IconContext.Provider
              value={{
                weight: "duotone",
                size: 18,
                className: "text-purple",
              }}
            >
              {icon}
            </IconContext.Provider>

            <p className="text-sm font-semibold capitalize text-black">
              {labelData}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
