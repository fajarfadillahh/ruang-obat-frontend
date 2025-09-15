import ButtonBack from "@/components/button/ButtonBack";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { ArticleDetails } from "@/types/article.type";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DetailsArtclePage({
  article,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return;

  return (
    <>
      <Layout title={article?.title} description={article?.description}>
        <ButtonBack />

        <section className="base-container [padding:50px_0_100px]">
          <div className="grid max-w-[800px] gap-8 justify-self-center">
            <div className="grid gap-2">
              <h1 className="text-2xl font-black leading-[120%] text-black md:text-4xl">
                {article?.title}
              </h1>

              <p className="font-medium leading-[160%] text-gray md:text-lg">
                {article?.description}
              </p>
            </div>

            <Image
              loading="lazy"
              src={article?.img_url as string}
              alt={`Image ${article?.title}`}
              width={1000}
              height={600}
              className="aspect-video rounded-xl"
            />

            <div className="-mt-4 grid grid-cols-[1fr_max-content] items-start gap-4 md:mt-0 md:text-lg">
              <p className="font-medium leading-[160%] text-purple">
                {article?.topic}
              </p>

              <p className="font-medium leading-[160%] text-gray">
                {formatDateWithoutTime(article?.created_at as string)}
              </p>
            </div>

            <p
              className="ck-content preventive-table preventive-list preventif-overlaps-text mt-8 font-medium leading-[160%] text-black md:text-lg"
              dangerouslySetInnerHTML={{ __html: article?.content as string }}
            />
          </div>
        </section>

        <CTAMain />
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  article?: ArticleDetails;
}> = async ({ params }) => {
  const response: SuccessResponse<ArticleDetails> = await fetcher({
    url: `/articles/${params?.slug}`,
    method: "GET",
  });

  return {
    props: {
      article: response.data,
    },
  };
};
