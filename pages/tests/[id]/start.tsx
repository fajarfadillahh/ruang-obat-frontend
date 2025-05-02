import Loading from "@/components/Loading";
import ModalConfirm from "@/components/modal/ModalConfirm";
import VideoComponent from "@/components/VideoComponent";
import { SuccessResponse } from "@/types/global.type";
import { Question } from "@/types/questions.type";
import { TestResponse } from "@/types/tests.type";
import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import useNetworkStatus from "@/utils/useNetworkStatus";
import {
  Button,
  Checkbox,
  Chip,
  cn,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CaretDoubleLeft,
  CaretDoubleRight,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
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

function getColor({
  user_answer,
  is_hesitant,
}: {
  user_answer: string;
  is_hesitant: boolean;
}) {
  if (user_answer) {
    if (is_hesitant) {
      return "bg-yellow-500 text-white";
    } else {
      return "bg-purple text-white";
    }
  } else {
    if (is_hesitant) {
      return "bg-yellow-500 text-white";
    } else {
      return "bg-gray/10 text-gray hover:bg-gray/20";
    }
  }
}

export default function StartTest({
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
  const isOnline = useNetworkStatus();

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
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

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

      toast.success("Berhasil mengumpulkan ujian", {
        duration: 3000,
      });
      localStorage.removeItem(params.id as string);
      window.location.href = `/results/${response.data.result_id}`;
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
      toast.error(getError(error));
    }
  }

  return (
    <main className="relative mx-auto h-screen w-full max-w-[1440px] px-6">
      <section className="py-12 xl:flex xl:items-start xl:gap-4">
        {/* left content */}
        <div
          className={`fixed top-0 z-20 h-screen w-[260px] rounded-r-xl border-gray/20 bg-white p-6 shadow-[4px_0_8px_rgba(0,0,0,0.1)] transition-all duration-300 xl:static xl:flex xl:h-[600px] xl:rounded-xl xl:border-2 xl:shadow-none ${
            contentOpen.left ? "left-0" : "-left-[260px]"
          }`}
        >
          <div className="grid max-w-full grid-rows-[max-content_1fr] items-start divide-y-2 divide-dashed divide-gray/20">
            <div className="grid gap-2 pb-8">
              <h4 className="font-bold text-black">Keterangan Warna:</h4>

              <div className="grid gap-2">
                <div className="inline-flex items-center gap-2">
                  <div className="size-6 rounded-full bg-purple" />

                  <p className="text-sm font-semibold text-black">
                    Sudah dijawab
                  </p>
                </div>

                <div className="inline-flex items-center gap-2">
                  <div className="size-6 rounded-full bg-yellow-500" />

                  <p className="text-sm font-semibold text-black">Ragu-ragu</p>
                </div>

                <div className="inline-flex items-center gap-2">
                  <div className="size-6 rounded-full bg-gray/20" />

                  <p className="text-sm font-semibold text-black">
                    Belum dijawab
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-2 overflow-hidden pt-8">
              <h4 className="font-bold text-black">Daftar Pertanyaan:</h4>

              <div className="grid h-full max-h-[450px] grid-cols-5 justify-items-center gap-2 overflow-y-scroll scrollbar-hide xl:max-h-[230px]">
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
                          className={`inline-flex aspect-square size-8 items-center justify-center rounded-lg text-xs font-bold ${
                            question.number == number
                              ? !question.user_answer && !question.is_hesitant
                                ? "bg-gray/30 text-gray"
                                : getColor(question)
                              : getColor(question)
                          }`}
                        >
                          {question.number}
                        </Link>
                      );
                    })
                  : null}
              </div>

              <div className="inline-flex items-center gap-2 pt-2 italic text-gray/80">
                <p className="text-xs font-semibold">
                  Scroll ke bawah pada nomor
                </p>

                <ArrowDown
                  weight="bold"
                  size={12}
                  className="animate-bounce italic"
                />
              </div>
            </div>
          </div>

          <div className="absolute -right-12 top-8 flex size-12 items-center justify-end rounded-r-full bg-white p-2 shadow-[4px_0_8px_rgba(0,0,0,0.1)] xl:hidden">
            <Button
              isIconOnly
              variant="flat"
              color="secondary"
              size="sm"
              radius="full"
              onClick={() => toggleContentOpen("left")}
              className={`transition-all duration-300 ${contentOpen.left ? "rotate-180" : "rotate-0"}`}
            >
              <CaretDoubleRight weight="bold" size={18} />
            </Button>
          </div>
        </div>

        {/* center content */}
        <div className="mx-auto grid max-w-[700px] gap-6 xl:max-w-none xl:flex-1">
          <div className="h-[600px] overflow-y-scroll rounded-xl border-2 border-gray/20 scrollbar-hide">
            <div className="sticky left-0 top-0 z-10 bg-white p-6 text-lg font-extrabold text-purple">
              No. {number}
            </div>

            <div className="grid gap-6 overflow-hidden p-[0_1.5rem_1.5rem]">
              {question?.type == "video" ? (
                <Suspense fallback={<p>Loading video...</p>}>
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
                    params.id as string,
                    JSON.stringify(questions),
                  );
                }}
              >
                {question?.options.map((option) => {
                  return (
                    <Radio value={option.option_id} key={option.option_id}>
                      {option.text}
                    </Radio>
                  );
                })}
              </RadioGroup>

              <Checkbox
                isSelected={question?.is_hesitant}
                color="warning"
                classNames={{
                  base: cn(
                    "inline-flex w-max m-[2px_0_2px_2px] text-black font-semibold",
                    "border-2 border-gray/20 rounded-lg hover:bg-gray/10 px-3",
                    "data-[selected=true]:border-warning data-[selected=true]:bg-warning/20",
                  ),
                }}
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
              >
                Ragu-ragu
              </Checkbox>
            </div>
          </div>

          <div className="inline-flex items-center gap-4 justify-self-center">
            {number - 1 === questions.length - 1 ? (
              <>
                <Button
                  color="secondary"
                  onClick={onSaveTestOpen}
                  className="font-bold"
                  isDisabled={Boolean(
                    questions.filter((question) => !question.user_answer)
                      .length,
                  )}
                >
                  Kumpulkan Jawaban!
                </Button>

                <ModalConfirm
                  btnText="Kumpulkan Sekarang"
                  header="Pemberitahuan"
                  text="Yakin Dengan Semua Jawaban Anda? Aksi tidak dapat dibatalkan jika anda telah mengumpulkan jawaban."
                  loading={loading}
                  isOpen={isSaveTestOpen}
                  onClose={onSaveTestClose}
                  handleAction={handleSaveTest}
                />
              </>
            ) : (
              <>
                <Button
                  color="default"
                  startContent={<ArrowLeft weight="bold" size={16} />}
                  className="font-bold"
                  onClick={() => {
                    setNumber((prev) => prev - 1);
                  }}
                  isDisabled={number <= 1}
                >
                  Sebelumnya
                </Button>

                <Button
                  color="secondary"
                  endContent={<ArrowRight weight="bold" size={16} />}
                  className="font-bold"
                  isDisabled={number >= questions.length}
                  onClick={() => {
                    setNumber((prev) => prev + 1);
                  }}
                >
                  Selanjutnya
                </Button>
              </>
            )}
          </div>
        </div>

        {/* right content */}
        <div
          className={`fixed top-0 z-20 h-screen w-[260px] rounded-r-xl border-gray/20 bg-white p-6 shadow-[-4px_0_8px_rgba(0,0,0,0.1)] transition-all duration-300 xl:static xl:flex xl:h-[600px] xl:rounded-xl xl:border-2 xl:shadow-none ${
            contentOpen.right ? "right-0" : "-right-[260px]"
          }`}
        >
          <div className="grid w-full divide-y-2 divide-dashed divide-gray/20">
            <div className="grid gap-2 pb-8">
              <h4 className="font-bold text-black">Data Peserta:</h4>

              <div className="grid">
                <h4 className="font-bold -tracking-wide text-purple">
                  {status == "authenticated" ? session.user.fullname : ""}
                </h4>

                <p className="text-xs font-medium text-gray">
                  {status == "authenticated" ? session.user.user_id : ""}
                </p>
              </div>
            </div>

            <div className="grid py-8">
              <h4 className="font-bold text-black">Sisa Waktu:</h4>

              <h4 className="text-3xl font-extrabold -tracking-wide text-purple">
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
              </h4>
            </div>

            <div className="grid gap-2 py-8">
              <h4 className="font-bold text-black">Penyelesaian Soal:</h4>

              <ul className="space-y-1 text-sm font-semibold text-black">
                {[
                  ["Jumlah Soal", data?.data.total_questions],
                  [
                    "Sudah dijawab",
                    questions.length
                      ? questions.filter((question) => question.user_answer)
                          .length
                      : null,
                  ],
                  [
                    "Ragu-ragu",
                    questions.length
                      ? questions.filter((question) => question.is_hesitant)
                          .length
                      : null,
                  ],
                  [
                    "Belum dijawab",
                    questions.length
                      ? questions.filter((question) => !question.user_answer)
                          .length
                      : null,
                  ],
                ].map(([label, value], index) => (
                  <li key={index} className="flex items-center gap-2">
                    <p className="w-[120px]">{label}</p>
                    <div>:</div>
                    <p className="font-extrabold text-purple">{value}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-2 pt-8">
              <h4 className="font-bold text-black">Status Jaringan:</h4>

              <Chip
                variant="flat"
                color={isOnline ? "success" : "danger"}
                startContent={
                  isOnline ? (
                    <CheckCircle weight="duotone" size={16} />
                  ) : (
                    <WarningCircle weight="duotone" size={16} />
                  )
                }
                classNames={{
                  base: "gap-1 px-2",
                  content: "font-bold",
                }}
              >
                {isOnline ? "Aktif" : "Mati"}
              </Chip>
            </div>
          </div>

          <div className="absolute -left-12 top-8 flex size-12 items-center justify-end rounded-l-full bg-white p-2 shadow-[-4px_0_8px_rgba(0,0,0,0.1)] xl:hidden">
            <Button
              isIconOnly
              variant="flat"
              color="secondary"
              size="sm"
              radius="full"
              onClick={() => toggleContentOpen("right")}
              className={`transition-all duration-300 ${contentOpen.right ? "rotate-180" : "rotate-0"}`}
            >
              <CaretDoubleLeft weight="bold" size={18} />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps = async ({
  req,
  params,
}: GetServerSidePropsContext) => {
  const token = req.headers["access_token"] as string;

  try {
    const response: SuccessResponse<TestResponse> = await fetcher({
      url: `/tests/${params?.id}`,
      method: "GET",
      token,
    });

    if (
      response.data.status == "Belum dimulai" ||
      response.data.status == "Berakhir"
    ) {
      return {
        redirect: {
          destination: `/dashboard`,
        },
      };
    }

    if (response.data.remaining_tests === 0) {
      return {
        redirect: {
          destination: `/my/tests`,
        },
      };
    }

    return {
      props: {
        token,
        params: params as ParsedUrlQuery,
      },
    };
  } catch (error: any) {
    if (error.status_code >= 500) {
      return {
        redirect: {
          destination: "/500",
        },
      };
    }

    if (error.status_code == 404) {
      return {
        redirect: {
          destination: "/404",
        },
      };
    }
  }
};
