import ButtonBack from "@/components/button/ButtonBack";
import CardTest from "@/components/card/CardTest";
import Loading from "@/components/Loading";
import ModalBuy from "@/components/modal/ModalBuy";
import ModalFreeAccess from "@/components/modal/ModalFreeAccess";
import ModalJoinGroup from "@/components/modal/ModalJoinGroup";
import Layout from "@/components/wrapper/Layout";
import { AppContext } from "@/context/AppContext";
import { SuccessResponse } from "@/types/global.type";
import { DetailsProgramResponse } from "@/types/programs.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Chip } from "@nextui-org/react";
import {
  BookBookmark,
  ClipboardText,
  IconContext,
  SealCheck,
  Tag,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useContext, useEffect } from "react";
import useSWR from "swr";
import { authOptions } from "../api/auth/[...nextauth]";

export default function DetailsProgram({
  token,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { data, isLoading, mutate, error } = useSWR<
    SuccessResponse<DetailsProgramResponse>
  >({
    url: `/programs/${params.id}`,
    method: "GET",
    token,
  });
  const ctx = useContext(AppContext);

  useEffect(() => {
    if (error?.status_code == 404) {
      router.push("/404");
    }
  }, [error, router]);

  if (isLoading) return <Loading />;

  return (
    <Layout title={data?.data.title}>
      <section className="grid gap-8 pb-16">
        <ButtonBack />

        <div className="grid divide-y-2 divide-dashed divide-gray/20">
          <div className="grid gap-10 pb-10 sm:grid-cols-[1fr_max-content] sm:items-start md:pr-6">
            <div className="flex items-start gap-6">
              <BookBookmark
                weight="duotone"
                size={48}
                className="text-purple"
              />

              <div className="grid flex-1 gap-6">
                <h1 className="max-w-[700px] text-2xl font-bold -tracking-wide text-black lg:text-[28px]">
                  {data?.data.title}
                </h1>

                <IconContext.Provider
                  value={{
                    weight: "duotone",
                    size: 20,
                  }}
                >
                  <div className="flex flex-wrap items-start gap-4 lg:gap-10">
                    <div className="grid gap-2">
                      <span className="text-sm font-medium text-gray">
                        Harga Program:
                      </span>

                      {data?.data.type == "free" ? (
                        <Chip
                          variant="flat"
                          color="default"
                          startContent={<Tag className="text-black" />}
                          classNames={{
                            base: "px-2 gap-1",
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
                    </div>

                    <div className="grid gap-2">
                      <span className="text-sm font-medium text-gray">
                        Jumlah Ujian:
                      </span>

                      <div className="inline-flex items-center gap-1 text-black">
                        <ClipboardText />

                        <p className="font-semibold">
                          {data?.data.total_tests} Ujian
                        </p>
                      </div>
                    </div>
                  </div>
                </IconContext.Provider>
              </div>
            </div>

            {!data?.data.is_login && (
              <Button
                color="secondary"
                size="sm"
                className="w-full font-bold sm:w-max sm:px-6"
                onClick={() => ctx?.onOpenUnauthenticated()}
              >
                Ikuti Program
              </Button>
            )}

            {data?.data.is_login && data.data.is_approved && (
              <div className="inline-flex items-center gap-1">
                <SealCheck weight="fill" size={24} className="text-success" />

                <p className="font-semibold capitalize text-black">
                  Program telah diikuti
                </p>
              </div>
            )}

            {data?.data.is_login &&
              !data.data.is_approved &&
              (data.data.type === "free" ? (
                <ModalFreeAccess
                  token={token}
                  program_id={data.data.program_id}
                  mutate={mutate}
                />
              ) : (
                <ModalBuy
                  buttonText="Ikuti Program"
                  productName={data.data.title as string}
                />
              ))}
          </div>

          <div className="grid gap-4 pt-10">
            <h1 className="text-2xl font-bold -tracking-wide text-black">
              Daftar Ujian 📋
            </h1>

            <div className="grid gap-2">
              {data?.data.tests.map((test) => (
                <CardTest
                  key={test.test_id}
                  {...{ ...test, is_approved: data.data.is_approved }}
                />
              ))}
            </div>
          </div>
        </div>

        {data?.data.is_login && data?.data.is_approved && (
          <ModalJoinGroup {...data} />
        )}
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
  params: ParsedUrlQuery;
}> = async ({ req, params, res }) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      token: session ? (session?.user.access_token as string) : "",
      params: params as ParsedUrlQuery,
    },
  };
};
