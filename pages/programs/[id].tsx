import ButtonBack from "@/components/button/ButtonBack";
import CardTest from "@/components/card/CardTest";
import Loading from "@/components/Loading";
import ModalFreeAccess from "@/components/modal/ModalFreeAccess";
import ModalInputAccessKey from "@/components/modal/ModalInputAccessKey";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { ProgramsType } from "@/types/programs.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Chip } from "@nextui-org/react";
import { BookBookmark, Notepad, Tag, Users } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import useSWR from "swr";

export default function DetailsProgram({
  token,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, mutate } = useSWR<SuccessResponse<ProgramResponse>>({
    url: `/programs/${params.id}`,
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

        <div className="grid divide-y-2 divide-dashed divide-gray/20">
          <div className="grid gap-10 pb-8 sm:grid-cols-[1fr_max-content] sm:items-start md:pr-6">
            <div className="flex items-start gap-6">
              <BookBookmark weight="bold" size={48} className="text-purple" />

              <div className="grid flex-1 gap-4">
                <h4 className="max-w-[700px] text-[24px] font-bold leading-[120%] -tracking-wide text-black lg:text-[28px]">
                  {data?.data.title}
                </h4>

                <div className="flex flex-wrap items-center gap-4 lg:gap-10">
                  <Chip
                    variant="flat"
                    color="default"
                    startContent={<Tag weight="bold" size={18} />}
                    classNames={{
                      base: "px-3 gap-1",
                      content: "font-bold",
                    }}
                  >
                    {data?.data.type == "free"
                      ? "Gratis"
                      : formatRupiah(data?.data.price as number)}
                  </Chip>

                  <div className="inline-flex items-center gap-1 text-gray">
                    <Notepad weight="bold" size={18} />
                    <p className="text-sm font-semibold">
                      {data?.data.total_tests} Ujian
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1 text-gray">
                    <Users weight="bold" size={18} />
                    <p className="text-sm font-semibold">
                      {data?.data.total_users} Mahasiswa/i
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!data?.data.participated ? (
              data?.data.type == "free" ? (
                <ModalFreeAccess
                  {...{
                    token,
                    program_id: data.data.program_id,
                    mutate,
                    type: data.data.type,
                  }}
                />
              ) : (
                <ModalInputAccessKey
                  {...{
                    token,
                    program_id: data?.data.program_id as string,
                    mutate,
                    type: data?.data.type as "free" | "paid",
                  }}
                />
              )
            ) : null}
          </div>

          <div className="grid gap-4 pt-8">
            <h4 className="text-[20px] font-bold -tracking-wide text-black">
              Daftar Ujian 📋
            </h4>

            <div className="relative grid gap-2">
              {data?.data.tests.map((test) => (
                <CardTest
                  key={test.test_id}
                  {...{ ...test, participated: data.data.participated }}
                />
              ))}

              {/* <div className="absolute left-0 top-0 z-10 h-full w-full rounded-xl bg-black/10 backdrop-blur-sm" /> */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

type ProgramResponse = ProgramsType & {
  tests: {
    test_id: string;
    title: string;
    start: string;
    end: string;
    duration: number;
    is_active: boolean;
    has_result: boolean;
    status: string;
  }[];
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
