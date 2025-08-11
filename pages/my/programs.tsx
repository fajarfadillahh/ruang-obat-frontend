import CardProgram from "@/components/card/CardProgram";
import Loading from "@/components/Loading";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { ProgramsType } from "@/types/programs.type";
import { Button } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import useSWR from "swr";

export default function MyProgramsPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { data, isLoading } = useSWR<SuccessResponse<ProgramsType[]>>({
    url: "/my/programs",
    method: "GET",
    token,
  });

  if (isLoading) return <Loading />;

  return (
    <Layout title="Program Saya">
      <section className="mx-auto grid gap-6 md:max-w-[770px] xl:max-w-none">
        <h1 className="text-2xl font-extrabold -tracking-wide text-black">
          Program Saya 📋
        </h1>

        {data?.data.length === 0 ? (
          <div className="grid gap-8 pt-12">
            <Image
              priority
              src="https://ruangobat.is3.cloudhost.id/statics/images/second-illustrations/no-data-img.svg"
              alt="no data img"
              width={1000}
              height={500}
              className="h-[120px] w-auto justify-self-center"
            />

            <div className="grid justify-items-center gap-4 text-center">
              <p className="font-medium leading-[170%] text-gray">
                Oops! Daftar program kamu masih kosong,
                <br />
                ayo ikuti program yang tersedia.
              </p>

              <Button
                color="secondary"
                onClick={() => {
                  router.push("/osce-ukmppai");
                }}
                className="w-max font-bold"
              >
                Halaman OSCE & UKMPPAI
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start justify-center gap-2 lg:gap-6 xl:grid-cols-3">
            {data?.data.map((program) => (
              <CardProgram key={program.program_id} {...program} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
  query: ParsedUrlQuery;
}> = async ({ req, query }) => {
  return {
    props: {
      token: req.headers["access_token"] as string,
      query,
    },
  };
};
