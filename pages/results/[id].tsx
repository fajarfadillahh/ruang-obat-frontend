import ButtonBack from "@/components/button/ButtonBack";
import Loading from "@/components/Loading";
import TemplateExportTest from "@/components/template/TemplateExportTest";
import VideoComponent from "@/components/VideoComponent";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { ResultType } from "@/types/results.type";
import {
  Accordion,
  AccordionItem,
  Button,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import {
  ArrowDown,
  CaretDoubleLeft,
  CaretDoubleRight,
  Export,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { Suspense, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";

export default function ResultTest({
  token,
  params,
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const templateRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useSWR<SuccessResponse<ResultType>>({
    url: `/tests/${params.id}/result`,
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
    documentTitle: `Hasil ${query.title}`,
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
    <Layout title="Hasil Ujian">
      <section className="relative grid gap-8">
        <div className="flex items-center justify-between gap-2">
          <ButtonBack href="/my/tests" />

          <Button
            color="secondary"
            startContent={<Export weight="bold" size={18} />}
            onClick={() => {
              handlePrint();
            }}
            className="w-max font-bold"
          >
            Export PDF
          </Button>
        </div>

        <div className="hidden">
          <TemplateExportTest ref={templateRef} data={data?.data} />
        </div>

        {/* <div className="grid grid-cols-[1fr_max-content] xl:gap-4">
          <div className="h-[550px] overflow-hidden overflow-y-scroll rounded-xl border-2 border-gray/20 p-6">
            <TemplateExportTest ref={templateRef} data={data?.data} />
          </div>

          <div
            className={`fixed top-0 z-50 h-screen w-[260px] rounded-r-xl border-gray/20 bg-white p-6 shadow-[-4px_0_8px_rgba(0,0,0,0.1)] transition-all duration-300 xl:static xl:h-[550px] xl:rounded-xl xl:border-2 xl:shadow-none ${
              contentOpen.right ? "right-0" : "-right-[260px]"
            }`}
          >
            <div className="grid w-full gap-4">
              <h4 className="text-[18px] font-bold text-black">Hasil Ujian:</h4>

              <div className="grid gap-4">
                <div className="grid gap-1">
                  <p className="text-[14px] font-medium text-gray">
                    Kategori Nilai
                  </p>
                  <h4 className="text-[36px] font-extrabold text-black">
                    🏅 {data?.data.score_category}
                  </h4>
                </div>

                <div className="grid gap-1">
                  <p className="text-[14px] font-medium text-gray">
                    Nilai Anda
                  </p>
                  <h4 className="text-[36px] font-extrabold text-black">
                    🏆 {data?.data.score}
                  </h4>
                </div>

                <div className="grid gap-6 pt-6">
                  <div className="grid gap-1">
                    <p className="text-[14px] font-medium text-gray">
                      Jawaban Benar
                    </p>
                    <h4 className="text-[24px] font-extrabold text-black">
                      ✅ {data?.data.total_correct}
                    </h4>
                  </div>

                  <div className="grid gap-1">
                    <p className="text-[14px] font-medium text-gray">
                      Jawaban Salah
                    </p>
                    <h4 className="text-[24px] font-extrabold text-black">
                      ❌ {data?.data.total_incorrect}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-12 top-44 flex size-12 items-center justify-end rounded-l-full bg-white p-2 shadow-[-4px_0_8px_rgba(0,0,0,0.1)] xl:hidden">
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
        </div> */}

        <div className="xl:flex xl:items-start xl:gap-4">
          <div
            className={`fixed top-0 z-50 h-screen w-[260px] rounded-r-xl border-gray/20 bg-white p-6 shadow-[4px_0_8px_rgba(0,0,0,0.1)] transition-all duration-300 xl:static xl:flex xl:h-[550px] xl:rounded-xl xl:border-2 xl:shadow-none ${
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
                    <div className="size-6 rounded-full bg-success" />
                    <p className="text-[12px] font-semibold text-black">
                      Jawaban Benar
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <div className="size-6 rounded-full bg-danger" />
                    <p className="text-[12px] font-semibold text-black">
                      Jawaban Salah
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 overflow-hidden pt-8">
                <h4 className="text-sm font-semibold text-black">
                  Daftar Pertanyaan:
                </h4>

                <div className="grid h-full max-h-[450px] grid-cols-5 justify-items-center gap-2 overflow-y-scroll scrollbar-hide xl:max-h-[230px]">
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
                        className={`inline-flex size-[34px] items-center justify-center rounded-lg text-[12px] font-bold ${answerClass}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setNumber(question.number);
                        }}
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

            <div className="absolute -right-12 top-44 flex size-12 items-center justify-end rounded-r-full bg-white p-2 shadow-[4px_0_8px_rgba(0,0,0,0.1)] xl:hidden">
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

          <div className="mx-auto h-[550px] max-w-[700px] overflow-y-scroll rounded-xl border-2 border-gray/20 scrollbar-hide xl:max-w-none xl:flex-1">
            <div className="sticky left-0 top-0 z-10 bg-white p-6 text-[18px] font-extrabold text-purple">
              No. {question?.number}
            </div>

            <div className="grid gap-6 overflow-hidden p-[0_1.5rem_1.5rem]">
              {question?.type == "video" ? (
                <Suspense fallback={<p>Loading video...</p>}>
                  <VideoComponent url={question.text} />
                </Suspense>
              ) : (
                <p
                  className="preventive-list preventive-table list-outside text-[16px] font-semibold leading-[170%] text-black"
                  dangerouslySetInnerHTML={{
                    __html: question?.text as string,
                  }}
                />
              )}

              <RadioGroup
                aria-label="select the answer"
                defaultValue="fase-s"
                classNames={{
                  base: "font-semibold text-black",
                }}
                value={question?.user_answer}
              >
                {question?.options.map((option) => {
                  return (
                    <Radio
                      key={option.option_id}
                      isDisabled={false}
                      value={option.option_id}
                      color={
                        (question.is_correct &&
                          question.user_answer == option.option_id) ||
                        question.correct_option == option.option_id
                          ? "success"
                          : "danger"
                      }
                      classNames={{
                        label: `${
                          (question.is_correct &&
                            question.user_answer == option.option_id) ||
                          question.correct_option == option.option_id
                            ? "text-success"
                            : question.user_answer == option.option_id
                              ? "text-danger"
                              : "text-gray/80"
                        } font-semibold`,
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
                    title: "font-semibold text-black",
                    content: "font-medium text-black leading-[170%] pb-4",
                  }}
                >
                  <div
                    className="preventive-list preventive-table list-outside text-[16px] leading-[170%] text-black"
                    dangerouslySetInnerHTML={{
                      __html: question?.explanation as string,
                    }}
                  />
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div
            className={`fixed top-0 z-50 h-screen w-[260px] rounded-r-xl border-gray/20 bg-white p-6 shadow-[-4px_0_8px_rgba(0,0,0,0.1)] transition-all duration-300 xl:static xl:h-[550px] xl:rounded-xl xl:border-2 xl:shadow-none ${
              contentOpen.right ? "right-0" : "-right-[260px]"
            }`}
          >
            <div className="grid w-full gap-4">
              <h4 className="text-[18px] font-bold text-black">Hasil Ujian:</h4>

              <div className="grid gap-4">
                <div className="grid gap-1">
                  <p className="text-[14px] font-medium text-gray">
                    Kategori Nilai
                  </p>
                  <h4 className="text-[36px] font-extrabold text-black">
                    🏅 {data?.data.score_category}
                  </h4>
                </div>

                <div className="grid gap-1">
                  <p className="text-[14px] font-medium text-gray">
                    Nilai Anda
                  </p>
                  <h4 className="text-[36px] font-extrabold text-black">
                    🏆 {data?.data.score}
                  </h4>
                </div>

                <div className="grid gap-6 pt-6">
                  <div className="grid gap-1">
                    <p className="text-[14px] font-medium text-gray">
                      Jawaban Benar
                    </p>
                    <h4 className="text-[24px] font-extrabold text-black">
                      ✅ {data?.data.total_correct}
                    </h4>
                  </div>

                  <div className="grid gap-1">
                    <p className="text-[14px] font-medium text-gray">
                      Jawaban Salah
                    </p>
                    <h4 className="text-[24px] font-extrabold text-black">
                      ❌ {data?.data.total_incorrect}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-12 top-44 flex size-12 items-center justify-end rounded-l-full bg-white p-2 shadow-[-4px_0_8px_rgba(0,0,0,0.1)] xl:hidden">
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
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
  params: ParsedUrlQuery;
  query: ParsedUrlQuery;
}> = async ({ req, params, query }) => {
  return {
    props: {
      token: req.headers["access_token"] as string,
      params: params as ParsedUrlQuery,
      query: query as ParsedUrlQuery,
    },
  };
};
