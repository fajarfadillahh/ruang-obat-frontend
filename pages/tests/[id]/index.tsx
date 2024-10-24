import ButtonBack from "@/components/button/ButtonBack";
import Loading from "@/components/Loading";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { Button, Chip } from "@nextui-org/react";
import {
  ArrowRight,
  CheckCircle,
  ClockCountdown,
  HourglassLow,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import useSWR from "swr";

export default function DetailsTest({
  token,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { data, isLoading } = useSWR<SuccessResponse<TestResponse>>({
    url: `/tests/${params.id}`,
    method: "GET",
    token,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout title={data?.data.title}>
      <section className="grid gap-8">
        <ButtonBack />

        <div className="grid items-end justify-center gap-10 lg:grid-cols-[1fr_300px] lg:justify-between lg:gap-4">
          <div className="grid max-w-[750px] divide-y-2 divide-dashed divide-gray/20">
            <div className="grid gap-4 pb-8">
              <h4 className="text-[28px] font-bold capitalize leading-[120%] -tracking-wide text-black">
                {data?.data.title}
              </h4>
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
                  Jumlah Soal:
                </span>
                <h1 className="font-semibold text-black">
                  {data?.data.total_questions} Butir
                </h1>
              </div>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="grid gap-1">
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
                    <HourglassLow weight="fill" size={16} />
                  ) : (
                    <CheckCircle weight="fill" size={16} />
                  )
                }
                classNames={{
                  base: "px-2 gap-1",
                  content: "font-semibold capitalize",
                }}
              >
                {data?.data.status}
              </Chip>
            </div>

            <Button
              variant="solid"
              color="secondary"
              endContent={<ArrowRight weight="bold" size={18} />}
              onClick={() => {
                document.documentElement.requestFullscreen();
                router.push(`/tests/${data?.data.test_id}/start`);
              }}
              className="px-4 font-bold"
            >
              Mulai Ujian
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

type TestResponse = {
  test_id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  duration: number;
  is_active: boolean;
  total_questions: number;
  status: string;
};

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
