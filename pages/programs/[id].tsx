import ButtonBack from "@/components/button/ButtonBack";
import CardTest from "@/components/card/CardTest";
import Loading from "@/components/Loading";
import ModalFreeAccess from "@/components/modal/ModalFreeAccess";
import ModalInputAccessKey from "@/components/modal/ModalInputAccessKey";
import ModalJoinGroup from "@/components/modal/ModalJoinGroup";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { DetailsProgramResponse } from "@/types/programs.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Chip } from "@nextui-org/react";
import {
  BookBookmark,
  IconContext,
  Notepad,
  SealCheck,
  Tag,
  Users,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import useSWR from "swr";

export default function DetailsProgram({
  token,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading, mutate } = useSWR<
    SuccessResponse<DetailsProgramResponse>
  >({
    url: `/programs/${params.id}`,
    method: "GET",
    token,
  });

  if (isLoading) return <Loading />;

  return (
    <Layout title={data?.data.title}>
      <section className="grid gap-8 pb-16">
        <ButtonBack />

        <div className="grid divide-y-2 divide-dashed divide-gray/20">
          <div className="grid gap-10 pb-8 sm:grid-cols-[1fr_max-content] sm:items-start md:pr-6">
            <div className="flex items-start gap-6">
              <BookBookmark weight="bold" size={48} className="text-purple" />

              <div className="grid flex-1 gap-4">
                <h1 className="max-w-[700px] text-[24px] font-bold leading-[120%] -tracking-wide text-black lg:text-[28px]">
                  {data?.data.title}
                </h1>

                <IconContext.Provider
                  value={{
                    weight: "bold",
                    size: 18,
                  }}
                >
                  <div className="flex flex-wrap items-center gap-4 lg:gap-10">
                    {data?.data.type == "free" ? (
                      <Chip
                        variant="flat"
                        color="default"
                        startContent={<Tag className="text-black" />}
                        classNames={{
                          base: "px-3 gap-1",
                          content: "font-bold text-black",
                        }}
                      >
                        Gratis
                      </Chip>
                    ) : (
                      <h2 className="text-xl font-extrabold text-purple">
                        {formatRupiah(data?.data.price as number)}
                      </h2>
                    )}

                    <h2 className="text-sm font-bold text-gray">
                      <Notepad className="mr-1 inline-flex" />
                      {data?.data.total_tests} Ujian
                    </h2>

                    <h2 className="text-sm font-bold text-gray">
                      <Users className="mr-1 inline-flex" />
                      {data?.data.total_users} Mahasiswa/i
                    </h2>
                  </div>
                </IconContext.Provider>
              </div>
            </div>

            {data?.data.is_approved == null &&
              (data?.data.type == "free" ? (
                <ModalFreeAccess
                  {...{
                    token,
                    program_id: data.data.program_id,
                    mutate,
                  }}
                />
              ) : (
                <ModalInputAccessKey
                  {...{
                    token,
                    program_id: data?.data.program_id as string,
                    mutate,
                  }}
                />
              ))}

            {data?.data.is_approved === false && (
              <Button
                color="secondary"
                size="sm"
                className="w-full font-bold sm:w-max sm:px-6"
                isDisabled={true}
              >
                Menunggu Approve
              </Button>
            )}

            {data?.data.is_approved && (
              <div className="inline-flex items-center gap-1">
                <SealCheck weight="fill" size={20} className="text-success" />
                <p className="text-sm font-semibold capitalize text-black">
                  Program telah diikuti
                </p>
              </div>
            )}
          </div>

          <div className="grid gap-4 pt-8">
            <h1 className="text-[20px] font-bold -tracking-wide text-black">
              Daftar Ujian 📋
            </h1>

            <div className="relative grid gap-2">
              {data?.data.tests.map((test) => (
                <CardTest
                  key={test.test_id}
                  {...{ ...test, is_approved: data.data.is_approved }}
                />
              ))}
            </div>
          </div>
        </div>

        {data?.data.is_approved && <ModalJoinGroup {...data} />}
      </section>
    </Layout>
  );
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
