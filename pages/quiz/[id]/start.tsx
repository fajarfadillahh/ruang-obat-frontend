import Loading from "@/components/Loading";
import ModalConfirm from "@/components/modal/ModalConfirm";
import VideoComponent from "@/components/VideoComponent";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import { getColorClass } from "@/utils/string.util";
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
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type AssessmentQuestion = {
  number: number;
  assq_id: string;
  text: string;
  url?: string;
  type: "text" | "video" | "image";
  options: {
    asso_id: string;
    text: string;
  }[];
  user_answer: string;
  is_hesitant: boolean;
};

type StartAssessmentResponse = {
  title: string;
  questions: AssessmentQuestion[];
  total_questions: number;
};

export default function StartQuiz({
  token,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading } = useSWR<SuccessResponse<StartAssessmentResponse>>({
    url: `/assessments/${params?.id}/start`,
    method: "GET",
    token,
  });
  const router = useRouter();

  const [number, setNumber] = useState(1);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
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
      const cache = localStorage.getItem(params?.id as string);

      if (cache) {
        setQuestions(JSON.parse(cache) as AssessmentQuestion[]);
      } else {
        setQuestions(data.data.questions);
        localStorage.setItem(
          params?.id as string,
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
        options: [{ asso_id: "", text: "" }],
        is_hesitant: false,
        type: "",
      };

  async function handleSaveTest() {
    setLoading(true);
    try {
      const mappingQuestions = [];

      const cache = localStorage.getItem(params?.id as string);

      if (cache) {
        const parsing = JSON.parse(cache) as AssessmentQuestion[];

        for (const item of parsing) {
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
          ass_id: params?.id,
          questions: mappingQuestions,
        },
        token,
      });

      toast.success("Berhasil mengumpulkan ujian", {
        duration: 3000,
      });
      localStorage.removeItem(params?.id as string);
      setLoading(false);
      return router.back();
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
                          key={question.assq_id}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setNumber(question.number);
                          }}
                          className={`inline-flex aspect-square size-8 items-center justify-center rounded-lg text-xs font-bold ${
                            question.number == number
                              ? !question.user_answer && !question.is_hesitant
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
                    params?.id as string,
                    JSON.stringify(questions),
                  );
                }}
              >
                {question?.options.map((option) => {
                  return (
                    <Radio value={option.asso_id} key={option.asso_id}>
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
                    params?.id as string,
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
                  isDisabled={!questions.some((q) => q.user_answer)}
                >
                  Kumpulkan Jawaban!
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
              <h4 className="font-bold text-black">{data?.data.title}</h4>

              <div className="grid">
                <h4 className="font-bold -tracking-wide text-purple">
                  {status == "authenticated" ? session.user.fullname : ""}
                </h4>

                <p className="text-xs font-medium text-gray">
                  {status == "authenticated" ? session.user.user_id : ""}
                </p>
              </div>
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

export const getServerSideProps: GetServerSideProps<{
  token?: string;
  params?: ParsedUrlQuery;
  error?: any;
}> = async ({ req, res, params }) => {
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
