import CustomTooltip from "@/components/CustomTooltip";
import Loading from "@/components/Loading";
import TemplateExportTest from "@/components/template/TemplateExportTest";
import VideoComponent from "@/components/VideoComponent";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SuccessResponse } from "@/types/global.type";
import { ResultType } from "@/types/results.type";
import {
  Accordion,
  AccordionItem,
  Button,
  Radio,
  RadioGroup,
  ScrollShadow,
} from "@nextui-org/react";
import {
  ArrowDown,
  ArrowLeft,
  CheckCircle,
  Export,
  Sidebar,
  XCircle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Suspense, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";

export default function ResultQuiz({
  token,
  params,
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const templateRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useSWR<SuccessResponse<ResultType>>({
    url: `/assessments/${params?.id}/result`,
    method: "GET",
    token,
  });
  const [number, setNumber] = useState(1);
  const [contentOpen, setContentOpen] = useState<{
    left: boolean;
    right: boolean;
  }>({
    left: false,
    right: false,
  });

  const handlePrint = useReactToPrint({
    content: () => templateRef.current,
    documentTitle: `Hasil ${query?.title}`,
  });

  function toggleContentOpen(id: "left" | "right") {
    setContentOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }

  if (isLoading) {
    return <Loading />;
  }

  const question = data?.data.questions.find(
    (question) => question.number == number,
  );

  return (
    <>
      <Head>
        <title>Hasil Ujian {router.query.title} | RuangObat</title>
      </Head>

      <main className="relative h-screen w-full gap-4 p-6">
        <section className="flex h-full w-full gap-4">
          {/* === left content === */}
          <div
            className={`fixed top-0 z-30 h-screen w-[280px] rounded-xl border-2 border-gray/20 bg-white p-5 shadow-[8px_0_8px_rgba(0,0,0,0.05)] transition-all xl:static xl:block xl:h-auto xl:shadow-none ${contentOpen.left ? "left-0 xl:w-[85px]" : "-left-full xl:w-[280px]"}`}
          >
            <div
              className={`flex flex-col divide-y-2 divide-dashed divide-gray/20`}
            >
              <div className="flex justify-end pb-6">
                <Button
                  isIconOnly
                  variant="light"
                  color="secondary"
                  onClick={() => toggleContentOpen("left")}
                >
                  <Sidebar weight="duotone" size={24} className="rotate-180" />
                </Button>
              </div>

              {(!contentOpen.left || window.innerWidth <= 1280) && (
                <div className="grid gap-6 pt-6">
                  <Button
                    color="secondary"
                    startContent={<ArrowLeft weight="bold" size={18} />}
                    onClick={() => router.back()}
                    className="font-bold"
                  >
                    {`Halaman ${router.query.type == "tryout_university" ? "Universitas" : "Materi"}`}
                  </Button>

                  <div className="grid gap-4 py-6">
                    <h2 className="font-bold text-black">Hasil Ujian:</h2>

                    <div className="grid gap-4">
                      <div className="grid gap-1">
                        <p className="text-sm font-medium text-gray">
                          Kategori Nilai
                        </p>

                        <h2 className="text-4xl font-extrabold text-black">
                          🏅 {data?.data.score_category}
                        </h2>
                      </div>

                      <div className="grid gap-1">
                        <p className="text-sm font-medium text-gray">
                          Nilai Kamu
                        </p>

                        <h2 className="text-4xl font-extrabold text-black">
                          🏆 {data?.data.score}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <h2 className="font-bold text-black">Hasil Jawaban:</h2>

                    <div className="grid gap-4">
                      <div className="grid gap-1">
                        <p className="text-sm font-medium text-gray">
                          Jawaban Benar
                        </p>

                        <div className="inline-flex items-center gap-2">
                          <CheckCircle
                            weight="fill"
                            size={32}
                            className="text-success"
                          />

                          <h2 className="text-2xl font-extrabold text-black">
                            {data?.data.total_correct}
                          </h2>
                        </div>
                      </div>

                      <div className="grid gap-1">
                        <p className="text-sm font-medium text-gray">
                          Jawaban Salah
                        </p>

                        <div className="inline-flex items-center gap-2">
                          <XCircle
                            weight="fill"
                            size={32}
                            className="text-danger"
                          />

                          <h2 className="text-2xl font-extrabold text-black">
                            {data?.data.total_incorrect}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* === center content === */}
          <div className="grid flex-1 grid-rows-[max-content_1fr] gap-4">
            <div className="relative isolate flex h-auto items-start justify-between rounded-xl border-2 border-gray/20 p-5">
              <div className="hidden gap-1 xl:grid">
                <h2 className="font-bold text-black">Data Peserta:</h2>

                <div className="grid">
                  <h2 className="line-clamp-1 max-w-[200px] font-bold -tracking-wide text-purple">
                    {status == "authenticated" ? session.user.fullname : ""}
                  </h2>

                  <p className="text-xs font-medium text-gray">
                    {status == "authenticated" ? session.user.user_id : ""}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-between gap-2 xl:hidden">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="secondary"
                  className="xl:hidden"
                  onClick={() => toggleContentOpen("left")}
                >
                  <Sidebar weight="duotone" size={20} className="rotate-180" />
                </Button>

                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="secondary"
                  className="justify-self-end xl:hidden"
                  onClick={() => toggleContentOpen("right")}
                >
                  <Sidebar weight="duotone" size={20} />
                </Button>
              </div>

              <div className="absolute left-1/2 top-6 grid -translate-x-1/2 gap-1 xl:static xl:left-0 xl:top-0 xl:-translate-x-0">
                <h2 className="hidden font-bold text-black xl:block">
                  Nama Ujian:
                </h2>

                <CustomTooltip content={router.query.title as string}>
                  <h2 className="line-clamp-1 max-w-[200px] font-bold -tracking-wide text-purple hover:cursor-pointer">
                    {router.query.title}
                  </h2>
                </CustomTooltip>
              </div>
            </div>

            <div className="grid h-full grid-rows-[max-content_1fr] overflow-hidden overflow-y-scroll rounded-xl border-2 border-gray/20 font-serif">
              <div className="sticky left-0 top-0 z-20 flex items-end justify-between gap-4 bg-white p-5">
                <span className="font-semibold text-black">
                  Nomor: {number}
                </span>

                <Button
                  size="sm"
                  color="secondary"
                  startContent={<Export weight="duotone" size={18} />}
                  onClick={() => {
                    handlePrint();
                  }}
                  className="w-max font-sans font-bold"
                >
                  Export PDF
                </Button>

                {/* template test/exam export pdf */}
                <div className="hidden">
                  <TemplateExportTest ref={templateRef} data={data?.data} />
                </div>
              </div>

              <div className="flex flex-col gap-8 [padding:0_1.25rem_8rem]">
                {question?.type == "video" ? (
                  <Suspense fallback={<p>Loading video...</p>}>
                    <VideoComponent url={question.text} />
                  </Suspense>
                ) : (
                  <p
                    className="preventive-list preventive-table list-outside text-sm leading-[170%] tracking-wide text-black"
                    dangerouslySetInnerHTML={{
                      __html: question?.text as string,
                    }}
                  />
                )}

                <RadioGroup
                  aria-label="select the answer"
                  defaultValue="fase-s"
                  className="z-10"
                  classNames={{
                    base: "text-black",
                  }}
                  value={question?.user_answer}
                >
                  {question?.options.map((option) => {
                    return (
                      <Radio
                        key={option.asso_id}
                        isDisabled={false}
                        value={option.asso_id as string}
                        color={
                          (question.is_correct &&
                            question.user_answer == option.asso_id) ||
                          question.correct_option == option.asso_id
                            ? "success"
                            : "danger"
                        }
                        classNames={{
                          label: `${
                            (question.is_correct &&
                              question.user_answer == option.asso_id) ||
                            question.correct_option == option.asso_id
                              ? "text-success"
                              : question.user_answer == option.asso_id
                                ? "text-danger"
                                : "text-gray/80"
                          } text-sm tracking-wide`,
                        }}
                      >
                        {option.text}
                      </Radio>
                    );
                  })}
                </RadioGroup>

                <Accordion variant="bordered">
                  <AccordionItem
                    aria-label="accordion answer"
                    key="answer"
                    title="Penjelasan:"
                    classNames={{
                      title: "text-black text-base font-semibold tracking-wide",
                      content: "font-medium text-black leading-[170%] pb-4",
                    }}
                  >
                    <p
                      className="preventive-list preventive-table list-outside text-sm leading-[170%] tracking-wide text-black"
                      dangerouslySetInnerHTML={{
                        __html: question?.explanation as string,
                      }}
                    />
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* === right content === */}
          <div
            className={`fixed top-0 z-30 h-screen w-[280px] rounded-xl border-2 border-gray/20 bg-white p-5 shadow-[-8px_0_8px_rgba(0,0,0,0.05)] transition-all xl:static xl:block xl:h-auto xl:shadow-none ${contentOpen.right ? "right-0 xl:w-[85px]" : "-right-full xl:w-[280px]"}`}
          >
            <div className="flex flex-col divide-y-2 divide-dashed divide-gray/20">
              <div className="flex justify-start pb-6">
                <Button
                  isIconOnly
                  variant="light"
                  color="secondary"
                  onClick={() => toggleContentOpen("right")}
                >
                  <Sidebar weight="duotone" size={24} />
                </Button>
              </div>

              {(!contentOpen.right || window.innerWidth <= 1280) && (
                <div className="grid gap-2 overflow-hidden pt-6 transition-all">
                  <h2 className="font-bold text-black">Daftar Pertanyaan:</h2>

                  <ScrollShadow
                    hideScrollBar
                    size={0}
                    className="grid h-full max-h-[350px] grid-cols-5 justify-items-center gap-2"
                  >
                    {data?.data.questions.map((question) => {
                      let answerClass = "";

                      if (question.is_correct) {
                        if (question.number == number) {
                          answerClass = "bg-green-700 text-white";
                        } else {
                          answerClass = "bg-success text-white";
                        }
                      } else {
                        if (question.number == number) {
                          answerClass = "bg-red-700 text-white";
                        } else {
                          answerClass = "bg-danger text-white";
                        }
                      }

                      return (
                        <Link
                          key={question.question_id}
                          href={"#"}
                          className={`inline-flex aspect-square size-full items-center justify-center rounded-lg p-1 text-sm font-bold ${answerClass}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setNumber(question.number);
                          }}
                        >
                          {question.number}
                        </Link>
                      );
                    })}
                  </ScrollShadow>

                  <div className="inline-flex items-center gap-2 pt-2 text-xs italic text-gray/80">
                    <p className="font-semibold">Scroll ke bawah pada nomor</p>

                    <ArrowDown
                      weight="bold"
                      size={12}
                      className="animate-bounce italic"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token?: string;
  params?: ParsedUrlQuery;
  query?: ParsedUrlQuery;
  error?: any;
}> = async ({ req, params, query, res }) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user.user_id) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    return {
      props: {
        token: session?.user.access_token,
        params,
        query,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        error,
      },
    };
  }
};
