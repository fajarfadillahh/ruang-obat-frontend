import ButtonBack from "@/components/button/ButtonBack";
import Loading from "@/components/Loading";
import ModalConfirmTest from "@/components/modal/ModalConfirmTest";
import SectionForbidden from "@/components/section/SectionForbidden";
import Layout from "@/components/wrapper/Layout";
import { warningTextModal } from "@/data/text";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SuccessResponse } from "@/types/global.type";
import { Question } from "@/types/questions.type";
import { TestResponse } from "@/types/tests.type";
import { fetcher } from "@/utils/fetcher";
import { formatDate, formatDateWithoutTime } from "@/utils/formatDate";
import { getError } from "@/utils/getError";
import { Button, Chip } from "@nextui-org/react";
import {
  CheckCircle,
  ClockCountdown,
  HourglassLow,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function DetailsTestPage({
  params,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const { data, isLoading } = useSWR<SuccessResponse<TestResponse>>(
    {
      url: `/tests/${params.id}`,
      method: "GET",
      token,
    },
    {
      refreshInterval: 4000,
      revalidateOnFocus: true,
    },
  );

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.data.end_time) {
        const now = new Date();
        const end_time = new Date(`${data?.data.end_time as string}`);

        if (now < end_time) {
          setExpired(false);
        } else {
          setExpired(true);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  useEffect(() => {
    if (data?.data.remaining_tests === 0) {
      router.push("/my/tests");
    }
  }, [data, router]);

  if ((data?.data.status as string) === "Belum dimulai") {
    return (
      <>
        <Head>
          <title>Akses Kamu Tolak!</title>
        </Head>

        <SectionForbidden />
      </>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <Layout title={data?.data.title}>
      <section className="grid">
        <ButtonBack />

        <div className="grid items-end justify-center gap-10 pt-[50px] lg:grid-cols-[1fr_300px] lg:justify-between lg:gap-4">
          <div className="grid max-w-[750px] divide-y-2 divide-dashed divide-gray/20">
            <div className="grid gap-4 pb-8">
              <h1 className="text-3xl font-bold capitalize -tracking-wide text-black">
                {data?.data.title}
              </h1>

              <p className="font-medium leading-[170%] text-gray">
                {data?.data.description}
              </p>
            </div>

            <div className="grid gap-4 pt-8 xs:grid-cols-2 sm:grid-cols-3 md:flex md:items-start md:justify-between">
              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray">
                  Tanggal Mulai:
                </span>

                <h1 className="font-semibold text-black">
                  {formatDateWithoutTime(data?.data.start as string)}
                </h1>
              </div>

              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray">
                  Tanggal Selesai:
                </span>

                <h1 className="font-semibold text-black">
                  {formatDateWithoutTime(data?.data.end as string)}
                </h1>
              </div>

              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray">
                  Durasi Pengerjaan:
                </span>

                <h1 className="font-semibold text-black">
                  {data?.data.duration} Menit
                </h1>
              </div>

              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray">
                  Sisa Pengerjaan:
                </span>

                <h1 className="font-semibold text-black">
                  {data?.data.remaining_tests === 0 ? (
                    <Chip
                      variant="flat"
                      color="danger"
                      classNames={{
                        base: "px-2 gap-1",
                        content: "font-semibold capitalize",
                      }}
                    >
                      Habis
                    </Chip>
                  ) : (
                    `${data?.data.remaining_tests} kali`
                  )}
                </h1>
              </div>

              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray">
                  Jumlah Soal:
                </span>

                <h1 className="font-semibold text-black">
                  {data?.data.total_questions} Butir
                </h1>
              </div>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="grid gap-2">
              <span className="text-sm font-medium text-gray">
                Status Ujian:
              </span>

              <Chip
                variant="flat"
                color={
                  data?.data.status === "Belum dimulai"
                    ? "danger"
                    : data?.data.status === "Berlangsung"
                      ? "warning"
                      : "success"
                }
                startContent={
                  data?.data.status === "Belum dimulai" ? (
                    <ClockCountdown weight="bold" size={16} />
                  ) : data?.data.status === "Berlangsung" ? (
                    <HourglassLow weight="duotone" size={16} />
                  ) : (
                    <CheckCircle weight="duotone" size={16} />
                  )
                }
                classNames={{
                  base: "px-2 gap-1",
                  content: "font-bold capitalize",
                }}
              >
                {data?.data.status}
              </Chip>
            </div>

            {!data?.data.has_start && !data?.data.has_result ? (
              <ModalConfirmTest
                trigger={
                  <Button color="secondary" className="px-4 font-bold">
                    Mulai Ujian
                  </Button>
                }
                header={
                  <h2 className="text-xl font-bold text-black">Peringatan!</h2>
                }
                body={
                  <div className="grid gap-4 pb-8">
                    <h1 className="text-xl font-extrabold capitalize text-black">
                      Harap baca poin penting berikut ini:
                    </h1>

                    <ol className="ml-6 grid list-outside list-decimal gap-1 font-medium leading-[170%] text-gray">
                      {warningTextModal.has_start.map((item, index) => (
                        <li key={index}>{item.text}</li>
                      ))}
                    </ol>
                  </div>
                }
                footer={(onClose: any) => (
                  <>
                    <Button
                      color="danger"
                      variant="light"
                      onClick={onClose}
                      className="font-bold"
                    >
                      Tutup
                    </Button>

                    <Button
                      color="secondary"
                      className="font-bold"
                      onClick={() => {
                        router.push({
                          pathname: `/programs/osce-ukmppai/tests/${data?.data.test_id}/start`,
                          query: {
                            title: data?.data.title,
                          },
                        });
                        onClose();
                      }}
                    >
                      Mulai Sekarang!
                    </Button>
                  </>
                )}
              />
            ) : null}

            {!data?.data.has_start &&
            data?.data.has_result &&
            data?.data.status === "Berlangsung" &&
            data?.data.remaining_tests < 3 ? (
              <Button
                variant="bordered"
                className="px-4 font-bold text-black"
                onClick={() => {
                  router.push({
                    pathname: `/programs/osce-ukmppai/tests/${data?.data.test_id}/start`,
                    query: {
                      title: data?.data.title,
                    },
                  });
                }}
              >
                Ulangi Ujian
              </Button>
            ) : null}

            {localStorage.getItem(data?.data.test_id as string) ? (
              <ModalConfirmTest
                trigger={
                  <Button color="secondary" className="px-4 font-bold">
                    Lanjutkan Ujian
                  </Button>
                }
                header={
                  <h2 className="text-xl font-bold text-black">Peringatan!</h2>
                }
                body={
                  <>
                    {!expired ? (
                      <p className="font-medium leading-[170%] text-gray">
                        {warningTextModal.has_result.expired}{" "}
                        <strong className="font-extrabold text-purple">
                          {formatDate(data?.data.end_time as string)}{" "}
                        </strong>
                      </p>
                    ) : (
                      <p className="font-medium leading-[170%] text-gray">
                        {warningTextModal.has_result.continue}
                      </p>
                    )}
                  </>
                }
                footer={(onClose: any) => (
                  <>
                    <Button
                      color="danger"
                      variant="light"
                      onClick={onClose}
                      className="font-bold"
                    >
                      Tutup
                    </Button>

                    {!expired ? (
                      <Button
                        color="secondary"
                        className="font-bold"
                        onClick={() => {
                          router.push({
                            pathname: `/programs/osce-ukmppai/tests/${data?.data.test_id}/start`,
                            query: {
                              title: data?.data.title,
                            },
                          });
                          onClose();
                        }}
                      >
                        Lanjutkan Sekarang!
                      </Button>
                    ) : (
                      <Button
                        isDisabled={loading}
                        isLoading={loading}
                        color="secondary"
                        className="font-bold"
                        onClick={handleSaveTest}
                      >
                        Kumpulkan Jawaban!
                      </Button>
                    )}
                  </>
                )}
              />
            ) : null}

            {data?.data.has_start &&
            !localStorage.getItem(data?.data.test_id as string) ? (
              <ModalConfirmTest
                trigger={
                  <Button color="secondary" className="px-4 font-bold">
                    Lanjutkan Ujian
                  </Button>
                }
                header={
                  <h2 className="text-xl font-bold text-black">Peringatan!</h2>
                }
                body={
                  <p className="font-medium leading-[170%] text-gray">
                    {warningTextModal.change_device}{" "}
                    <strong className="font-extrabold text-purple">
                      {formatDate(data?.data.end_time as string)}
                    </strong>
                    .
                  </p>
                }
                footer={(onClose: any) => (
                  <>
                    <Button
                      color="danger"
                      variant="light"
                      onClick={onClose}
                      className="font-bold"
                    >
                      Tutup
                    </Button>

                    <Button
                      color="secondary"
                      className="font-bold"
                      onClick={() => {
                        localStorage.removeItem(params.id as string);
                        router.push({
                          pathname: `/programs/osce-ukmppai/tests/${data?.data.test_id}/start`,
                          query: {
                            title: data?.data.title,
                          },
                        });
                        onClose();
                      }}
                    >
                      Lanjutkan Sekarang!
                    </Button>
                  </>
                )}
              />
            ) : null}

            {data?.data.remaining_tests === 0 ||
            data?.data.status === "Berakhir" ? (
              <Button
                color="secondary"
                className="px-4 font-bold"
                onClick={() => {
                  localStorage.removeItem(params.id as string);
                  router.push(`/my/tests`);
                }}
              >
                Jawaban Saya
              </Button>
            ) : null}
          </div>
        </div>
      </section>
    </Layout>
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

    if (response.data.status === "Berakhir") {
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
