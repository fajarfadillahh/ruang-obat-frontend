import Loading from "@/components/Loading";
import ModalConfirm from "@/components/modal/ModalConfirm";
import { SuccessResponse } from "@/types/global.type";
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
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import { CaretDoubleRight } from "@phosphor-icons/react/dist/ssr";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import toast from "react-hot-toast";
import useSWR from "swr";

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

  const question = questions.find((question) => question.number == number);

  async function handleSaveTest() {
    setLoading(true);
    try {
      const mappingQuestions = questions.map((item) => {
        return {
          number: item.number,
          question_id: item.question_id,
          user_answer: item.user_answer,
        };
      });

      await fetcher({
        url: "/tests/finish",
        method: "POST",
        data: {
          test_id: params.id,
          questions: mappingQuestions,
        },
        token,
      });

      toast.success("Berhasil mengumpulkan ujian");
      router.push("/my/tests");
      localStorage.removeItem(params.id as string);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
      toast.error(getError(error));
    }
  }

  return (
    <>
      <Head>
        <title>Mulai Ujian | Ruangobat.id</title>
        <meta
          name="description"
          content="RuangObat merupakan platform belajar farmasi private No.1 di Indonesia untuk seluruh mahasiswa di Indonesia. Terdapat banyak program menarik, mulai dari Kelas Mata Kuliah & Praktikum, Kelas Skripsi & Riset, Kelas Masuk Apoteker & OSCE, Serta TryOut UKMPPAI."
        />
        <meta
          name="description"
          content="Di website RuangObat kalian akan dapat mengakses berbagai program. Mari raih gelar sarjana dan apotekermu bersama RuangObat #bimbelfarmasi #cukupdisiniaja."
        />
        <meta
          name="keywords"
          content="ruangobat, ruangobat.id, ruangobat id, ruang obat id, ruangobat ujian, ruangobat ujian online, ruangobat farmasi, ruangobat tryout, ruangobat tes, ujian online ruangobat, platform ujian mahasiswa farmasi, belajar farmasi online, tryout farmasi online, tes farmasi online, latihan soal farmasi, simulasi ujian farmasi, platform belajar farmasi, ujian online farmasi terpercaya kelas apoteker, kelas masuk apoteker, program apoteker, praktikum apoteker, ujian tryout apoteker, ujian praktikum apoteker, ujian praktikum farmasi, ujian praktikum jurusan farmasi, tryout juruan apoteker, ujian juruan apoteker, kelas masuk apoteker, kelas apoteker, kelas farmasi, kelas jurusan apoteker, kelas jurusan farmasi, kelas skripsi dan riset apoteker, kelas skripsi dan riset farmasi, ujian UKMPPAI, tryout UKMPPAI, skripsi apoteker, skripsi farmasi, ujian online apoteker, kelas online apoteker, kelas online farmasi"
        />
        <meta property="og:title" content="Mulai Ujian | Ruangobat.id" />
        <meta
          property="og:description"
          content="RuangObat merupakan platform belajar farmasi private No.1 di Indonesia untuk seluruh mahasiswa di Indonesia. Terdapat banyak program menarik, mulai dari Kelas Mata Kuliah & Praktikum, Kelas Skripsi & Riset, Kelas Masuk Apoteker & OSCE, Serta TryOut UKMPPAI."
        />
        <meta
          property="og:description"
          content="Di website RuangObat kalian akan dapat mengakses berbagai program. Mari raih gelar sarjana dan apotekermu bersama RuangObat #bimbelfarmasi #cukupdisiniaja."
        />
      </Head>

      <main className="relative mx-auto h-screen w-full max-w-[1440px] px-6">
        <section className="py-12 xl:flex xl:items-start xl:gap-4">
          <div
            className={`fixed top-0 z-20 h-screen w-[260px] rounded-r-xl border-gray/20 bg-white p-6 shadow-[4px_0_8px_rgba(0,0,0,0.1)] transition-all duration-300 xl:static xl:flex xl:h-[600px] xl:rounded-xl xl:border-2 xl:shadow-none ${
              contentOpen.left ? "left-0" : "-left-[260px]"
            }`}
          >
            <div className="grid max-w-full grid-rows-[max-content_1fr] items-start divide-y-2 divide-dashed divide-gray/20">
              <div className="grid gap-4 pb-8">
                <h4 className="text-sm font-semibold text-black">
                  Keterangan Warna:
                </h4>

                <div className="grid gap-2">
                  <div className="inline-flex items-center gap-2">
                    <div className="size-6 rounded-full bg-purple" />
                    <p className="text-[12px] font-semibold text-black">
                      Sudah dijawab
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <div className="size-6 rounded-full bg-yellow-500" />
                    <p className="text-[12px] font-semibold text-black">
                      Ragu-ragu
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <div className="size-6 rounded-full bg-gray/20" />
                    <p className="text-[12px] font-semibold text-black">
                      Belum dijawab
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 overflow-hidden pt-8">
                <h4 className="text-sm font-semibold text-black">
                  Daftar Pertanyaan:
                </h4>

                <div className="grid h-full max-h-[450px] grid-cols-5 justify-items-center gap-2 overflow-y-scroll scrollbar-hide xl:max-h-[230px]">
                  {questions.map((question) => {
                    return (
                      <Link
                        key={question.question_id}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setNumber(question.number);
                        }}
                        className={`inline-flex size-[34px] items-center justify-center rounded-lg text-[12px] font-bold ${
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
                  })}
                </div>

                <div className="inline-flex items-center gap-1 pt-2 italic text-gray/80">
                  <p className="text-[12px] font-semibold">
                    Scroll ke bawah pada nomor
                  </p>
                  <ArrowDown
                    weight="bold"
                    size={10}
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

          <div className="mx-auto grid max-w-[700px] gap-6 xl:max-w-none xl:flex-1">
            <div className="h-[600px] overflow-y-scroll rounded-xl border-2 border-gray/20">
              <div className="sticky left-0 top-0 z-10 bg-white p-6 text-[18px] font-extrabold text-purple">
                No. {number}
              </div>

              <div className="grid gap-6 overflow-hidden p-[0_1.5rem_1.5rem]">
                <p
                  className="preventive-list list-outside text-[16px] font-semibold leading-[170%] text-black"
                  dangerouslySetInnerHTML={{ __html: question?.text as string }}
                />

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
                    variant="solid"
                    color="secondary"
                    onClick={onSaveTestOpen}
                    className="font-bold"
                    isDisabled={Boolean(
                      questions.filter((question) => !question.user_answer)
                        .length,
                    )}
                  >
                    Kumpulkan Jawaban 🌟
                  </Button>

                  <ModalConfirm
                    btnText="Kumpulkan Sekarang"
                    header="Pemberitahuan"
                    text="Yakin Dengan Semua Jawaban Anda?"
                    loading={loading}
                    isOpen={isSaveTestOpen}
                    onClose={onSaveTestClose}
                    handleAction={handleSaveTest}
                  />
                </>
              ) : (
                <>
                  <Button
                    variant="solid"
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
                    variant="solid"
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

          <div
            className={`fixed top-0 z-20 h-screen w-[260px] rounded-r-xl border-gray/20 bg-white p-6 shadow-[-4px_0_8px_rgba(0,0,0,0.1)] transition-all duration-300 xl:static xl:flex xl:h-[600px] xl:rounded-xl xl:border-2 xl:shadow-none ${
              contentOpen.right ? "right-0" : "-right-[260px]"
            }`}
          >
            <div className="grid w-full divide-y-2 divide-dashed divide-gray/20">
              <div className="grid gap-2 pb-8">
                <h4 className="text-sm font-semibold text-black">
                  Data Peserta:
                </h4>

                <div className="grid">
                  <h4 className="font-bold -tracking-wide text-purple">
                    {status == "authenticated" ? session.user.fullname : ""}
                  </h4>
                  <p className="text-[12px] font-semibold text-gray">
                    {status == "authenticated" ? session.user.user_id : ""}
                  </p>
                </div>
              </div>

              <div className="grid py-8">
                <h4 className="text-sm font-semibold text-black">
                  Sisa Waktu:
                </h4>

                <h4 className="text-[28px] font-extrabold -tracking-wide text-purple">
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
                    // onComplete={handleSaveTest}
                  />
                </h4>
              </div>

              <div className="grid gap-4 py-8">
                <h4 className="text-sm font-semibold text-black">
                  Penyelesaian Soal:
                </h4>

                <ul className="space-y-1 text-[12px] font-semibold text-black">
                  <li className="flex items-center gap-2">
                    <p className="w-[100px]">Jumlah Soal</p>
                    <div>:</div>
                    <p className="font-extrabold text-purple">
                      {data?.data.total_questions}
                    </p>
                  </li>
                  <li className="flex items-center gap-2">
                    <p className="w-[100px]">Sudah dijawab</p>
                    <div>:</div>
                    <p className="font-extrabold text-purple">
                      {
                        questions.filter((question) => question.user_answer)
                          .length
                      }
                    </p>
                  </li>
                  <li className="flex items-center gap-2">
                    <p className="w-[100px]">Ragu-ragu</p>
                    <div>:</div>
                    <p className="font-extrabold text-purple">
                      {
                        questions.filter((question) => question.is_hesitant)
                          .length
                      }
                    </p>
                  </li>
                  <li className="flex items-center gap-2">
                    <p className="w-[100px]">Belum dijawab</p>
                    <div>:</div>
                    <p className="font-extrabold text-purple">
                      {
                        questions.filter((question) => !question.user_answer)
                          .length
                      }
                    </p>
                  </li>
                </ul>
              </div>

              <div className="grid gap-3 pt-8">
                <h4 className="text-sm font-semibold text-black">
                  Status Jaringan:
                </h4>

                <Chip
                  variant="flat"
                  color={isOnline ? "success" : "danger"}
                  size="sm"
                  startContent={
                    isOnline ? (
                      <CheckCircle weight="fill" size={16} />
                    ) : (
                      <WarningCircle weight="fill" size={16} />
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
    </>
  );
}

type Question = {
  number: number;
  question_id: string;
  text: string;
  url?: string;
  type?: "text" | "video" | "image";
  options: {
    text: string;
    option_id: string;
  }[];
  user_answer: string;
  is_hesitant: boolean;
};

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

export const getServerSideProps: GetServerSideProps<{
  token: string;
  params: ParsedUrlQuery;
}> = async ({ req, params }) => {
  return {
    props: {
      token: req.headers["access_token"] as string,
      params: params as ParsedUrlQuery,
    },
  };
};
