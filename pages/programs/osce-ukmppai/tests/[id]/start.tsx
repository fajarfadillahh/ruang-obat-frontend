import Loading from "@/components/Loading";
import ModalCalculator from "@/components/modal/ModalCalculator";
import ModalConfirm from "@/components/modal/ModalConfirm";
import VideoComponent from "@/components/VideoComponent";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { SuccessResponse } from "@/types/global.type";
import { Question } from "@/types/questions.type";
import { TestResponse } from "@/types/tests.type";
import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import { getColorClass } from "@/utils/string.util";
import {
  Button,
  Checkbox,
  cn,
  Radio,
  RadioGroup,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import {
  ArrowDown,
  ArrowLeft,
  CaretDoubleLeft,
  CaretDoubleRight,
  PaperPlaneTilt,
  Sidebar,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Suspense, useEffect, useState } from "react";
import Countdown from "react-countdown";
import toast from "react-hot-toast";
import useSWR from "swr";

type StartTestResponse = {
  questions: Question[];
  total_questions: number;
  end_time: string;
};

export default function StartTestPage({
  token,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { data, isLoading } = useSWR<SuccessResponse<StartTestResponse>>({
    url: `/tests/${params.id}/start`,
    method: "GET",
    token,
  });
  const [number, setNumber] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const {
    isOpen: isSaveTestOpen,
    onOpen: onSaveTestOpen,
    onClose: onSaveTestClose,
  } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const [contentOpen, setContentOpen] = useState<{
    left: boolean;
    right: boolean;
  }>({
    left: false,
    right: false,
  });
  const { data: session, status } = useSession();

  const toggleContentOpen = (id: "left" | "right") => {
    setContentOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    if (data) {
      const cache = localStorage.getItem(params.id as string);

      if (cache) {
        setQuestions(JSON.parse(cache) as Question[]);
      } else {
        setQuestions(data.data.questions);
        localStorage.setItem(
          params.id as string,
          JSON.stringify(data.data.questions),
        );
      }
    }
  }, [data, params.id]);

  const question = questions.length
    ? questions.find((question) => question.number == number)
    : {
        text: "",
        user_answer: "",
        options: [{ option_id: "", text: "" }],
        is_hesitant: false,
        type: "",
      };

  async function handleSaveTest() {
    setLoading(true);
    try {
      const mappingQuestions = [];

      const cache = localStorage.getItem(params.id as string);

      if (cache) {
        const parsing = JSON.parse(cache) as Question[];

        for (const item of parsing) {
          mappingQuestions.push({
            number: item.number,
            question_id: item.question_id,
            user_answer: item.user_answer,
          });
        }
      }

      const response: SuccessResponse<{ result_id: string }> = await fetcher({
        url: "/tests/finish",
        method: "POST",
        data: {
          test_id: params.id,
          questions: mappingQuestions,
        },
        token,
      });

      setLoading(false);
      localStorage.removeItem(params.id as string);

      toast.success("Berhasil mengumpulkan ujian!", {
        duration: 3000,
      });

      return router.push({
        pathname: `/programs/osce-ukmppai/results/${response.data.result_id}`,
        query: { ...router.query },
      });
    } catch (error) {
      setLoading(false);

      console.log(error);
      toast.error(getError(error));
    }
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>Mulai Ujian | RuangObat</title>
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
                    onClick={() =>
                      router.push(
                        `/programs/osce-ukmppai/tests/${router.query.id}/details`,
                      )
                    }
                    className="font-bold"
                  >
                    Halaman Detail Ujian
                  </Button>

                  <div className="itemce relative isolate flex h-[calc(100vh-260px)] justify-center overflow-hidden rounded-xl bg-gray-50">
                    <div className="inline-flex -rotate-90 scale-[1.40] items-center gap-2 opacity-50 grayscale">
                      <LogoRuangobat className="h-auto w-10 text-gray/20" />
                      <h1 className="text-2xl font-extrabold -tracking-wide text-black">
                        RuangObat<span className="text-purple">.</span>
                      </h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* === center content === */}
          <div className="grid flex-1 grid-rows-[max-content_1fr_max-content] gap-4">
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

              <div className="absolute left-1/2 top-5 grid -translate-x-1/2 gap-1 xl:static xl:left-0 xl:top-0 xl:-translate-x-0">
                <h2 className="hidden font-bold text-black xl:block">
                  Sisa Waktu:
                </h2>

                <h2 className="text-2xl font-extrabold -tracking-wide text-purple">
                  <Countdown
                    date={new Date(data?.data.end_time as string)}
                    renderer={(props) => {
                      return (
                        <span>
                          {props.hours < 10 ? `0${props.hours}` : props.hours}:
                          {props.minutes < 10
                            ? `0${props.minutes}`
                            : props.minutes}
                          :
                          {props.seconds < 10
                            ? `0${props.seconds}`
                            : props.seconds}
                        </span>
                      );
                    }}
                    onComplete={() => {
                      toast.success("Waktu telah habis", {
                        duration: 1000,
                      });
                      handleSaveTest();
                    }}
                  />
                </h2>
              </div>
            </div>

            <div
              className={`grid h-full grid-rows-[max-content_1fr] overflow-hidden overflow-y-scroll rounded-xl border-2 font-serif ${question?.is_hesitant ? "border-warning/50 bg-warning-100" : "border-gray/20"}`}
            >
              <div
                className={`sticky left-0 top-0 z-20 grid gap-4 p-5 ${question?.is_hesitant ? "bg-warning-100" : "bg-white"}`}
              >
                <span className="font-semibold text-black">
                  Nomor: {number}
                </span>

                <Checkbox
                  color="warning"
                  size="sm"
                  isSelected={question?.is_hesitant}
                  onValueChange={(e) => {
                    setQuestions((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (question) => question.number == number,
                        );

                        if (index != -1) {
                          prev[index] = {
                            ...prev[index],
                            is_hesitant: e,
                          };

                          return [...prev];
                        }
                      }

                      return [...prev];
                    });
                    localStorage.setItem(
                      params.id as string,
                      JSON.stringify(questions),
                    );
                  }}
                  classNames={{
                    base: cn(
                      "inline-flex w-max m-[2px_0_2px_2px] text-black",
                      "border-2 border-gray/20 rounded-lg hover:bg-gray/10 px-3",
                      "data-[selected=true]:border-warning data-[selected=true]:bg-warning/20",
                    ),
                  }}
                >
                  Ragu-ragu
                </Checkbox>
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
                  value={question?.user_answer}
                  aria-label="select the answer"
                  color={question?.is_hesitant ? "warning" : "secondary"}
                  classNames={{
                    base: "text-black",
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
                      params.id as string,
                      JSON.stringify(questions),
                    );
                  }}
                >
                  {question?.options.map((option) => {
                    return (
                      <Radio
                        value={option.option_id}
                        key={option.option_id}
                        classNames={{
                          label: "text-sm tracking-wide",
                        }}
                      >
                        {option.text}
                      </Radio>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>

            <div className="grid gap-2 sm:flex sm:items-center sm:justify-between sm:gap-4">
              <ModalCalculator />

              <div className="grid grid-cols-2 gap-2">
                <Button
                  isDisabled={number <= 1}
                  color="default"
                  startContent={<CaretDoubleLeft weight="bold" size={16} />}
                  onClick={() => {
                    setNumber((prev) => prev - 1);
                  }}
                  className="font-bold"
                >
                  Sebelumnya
                </Button>

                {number - 1 === questions.length - 1 ? (
                  <>
                    <Button
                      isDisabled={!questions.some((q) => q.user_answer)}
                      color="secondary"
                      endContent={<PaperPlaneTilt weight="duotone" size={18} />}
                      onClick={onSaveTestOpen}
                      className="font-bold"
                    >
                      Kumpulkan
                    </Button>

                    <ModalConfirm
                      btnText="Kumpulkan Sekarang"
                      header="Pemberitahuan"
                      text="Yakin dengan semua jawaban kamu? Aksi tidak dapat dibatalkan jika kamu telah mengumpulkan jawaban."
                      loading={loading}
                      isOpen={isSaveTestOpen}
                      onClose={onSaveTestClose}
                      handleAction={handleSaveTest}
                    />
                  </>
                ) : (
                  <Button
                    isDisabled={number >= questions.length}
                    color={question?.is_hesitant ? "warning" : "secondary"}
                    endContent={<CaretDoubleRight weight="bold" size={18} />}
                    onClick={() => {
                      setNumber((prev) => prev + 1);
                    }}
                    className="font-bold"
                  >
                    Selanjutnya
                  </Button>
                )}
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
                    {questions.length
                      ? questions.map((question) => {
                          return (
                            <Link
                              key={question.question_id}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setNumber(question.number);
                              }}
                              className={`inline-flex aspect-square size-full items-center justify-center rounded-lg p-1 text-sm font-bold ${
                                question.number == number
                                  ? !question.user_answer &&
                                    !question.is_hesitant
                                    ? "bg-gray/30 text-gray"
                                    : getColorClass(question)
                                  : getColorClass(question)
                              }`}
                            >
                              {question.number}
                            </Link>
                          );
                        })
                      : null}
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
  token: string;
  params: ParsedUrlQuery;
}> = async ({ req, params, res }) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    const response: SuccessResponse<TestResponse> = await fetcher({
      url: `/tests/${params?.id}`,
      method: "GET",
      token: session ? (session?.user.access_token as string) : "",
    });

    if (
      response.data.status === "Belum dimulai" ||
      response.data.status === "Berakhir"
    ) {
      return {
        redirect: {
          destination: "/programs/osce-ukmppai",
          permanent: false,
        },
      };
    }

    if (response.data.remaining_tests === 0) {
      return {
        redirect: {
          destination: "/my/tests",
          permanent: false,
        },
      };
    }

    return {
      props: {
        token: session ? (session?.user.access_token as string) : "",
        params: params as ParsedUrlQuery,
      },
    };
  } catch (error: any) {
    if (error.status_code >= 500) {
      return {
        redirect: {
          destination: "/500",
          permanent: false,
        },
      };
    }

    if (error.status_code == 404) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};
