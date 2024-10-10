import CardMyTest from "@/components/card/CardMyTest";
import Loading from "@/components/Loading";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { MyTestType } from "@/types/tests.type";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import useSWR from "swr";

export default function MyTestsPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading } = useSWR<SuccessResponse<MyTestType[]>>({
    url: "/my/tests",
    method: "GET",
    token,
  });

  if (isLoading) {
    return <Loading />;
  }

  console.log(data);

  return (
    <Layout title="Ujian Saya">
      <section className="mx-auto grid gap-6 md:max-w-[770px] xl:max-w-none">
        <h1 className="text-[24px] font-extrabold -tracking-wide text-black">
          Ujian Saya 📋
        </h1>

        <div className="grid items-start justify-center gap-2 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {data?.data.map((test) => (
            <CardMyTest key={test.test_id} {...test} />
          ))}
        </div>
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
