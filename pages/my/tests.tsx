import CardMyTest from "@/components/card/CardMyTest";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { MyTestType } from "@/types/tests.type";
import { Button, Skeleton } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { authOptions } from "../api/auth/[...nextauth]";

export default function MyTestsPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { data, isLoading } = useSWR<SuccessResponse<MyTestType[]>>({
    url: "/my/tests",
    method: "GET",
    token,
  });

  return (
    <Layout title="Ujian Saya">
      <section className="mx-auto grid gap-6 [padding:50px_0_100px] md:max-w-[770px] xl:max-w-none">
        <h1 className="text-2xl font-extrabold -tracking-wide text-black">
          Ujian Saya 📋
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start justify-center gap-4 xl:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-36 w-full rounded-xl" />
            ))
          ) : data?.data.length ? (
            data?.data.map((test, index) => (
              <CardMyTest key={index} {...test} />
            ))
          ) : (
            <div className="grid gap-8 pt-12 sm:col-span-2 xl:col-span-3">
              <Image
                priority
                src="=https://cdn.ruangobat.id/statics/images/second-illustrations/no-data-img.svg"
                alt="no data img"
                width={1000}
                height={500}
                className="h-[120px] w-auto justify-self-center"
              />

              <div className="grid justify-items-center gap-4 text-center">
                <p className="font-medium leading-[170%] text-gray">
                  Oops! Daftar ujian kamu masih kosong,
                  <br />
                  ayo ikuti ujian yang tersedia.
                </p>

                <Button
                  color="secondary"
                  onClick={() => {
                    router.push("/programs/osce-ukmppai");
                  }}
                  className="w-max font-bold"
                >
                  Halaman OSCE & UKMPPAI
                </Button>
              </div>
            </div>
          )}
        </div>

        {data?.data.length ? (
          <Button
            color="secondary"
            endContent={<ArrowRight weight="bold" size={18} />}
            onClick={() => router.push("/programs/osce-ukmppai")}
            className="mt-6 w-max justify-self-center font-bold"
          >
            Halaman OSCE & UKMPPAI
          </Button>
        ) : null}
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      token: session?.user.access_token as string,
    },
  };
};
