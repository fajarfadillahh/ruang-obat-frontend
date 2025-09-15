import ButtonBack from "@/components/button/ButtonBack";
import CardCategory from "@/components/card/CardCategory";
import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";

type CategoryDetailResponse = {
  category_id: string;
  name: string;
  slug: string;
  img_url: string;
  type: string;
  sub_categories: {
    sub_category_id: string;
    name: string;
    slug: string;
    img_url: string;
  }[];
};

export default function CategoryPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout title={data?.name as string}>
        <ButtonBack />

        {/* for type: videocourse & videoukmppai */}
        <section className="base-container gap-8 [padding:50px_0_100px]">
          <div className="grid gap-4 xs:flex xs:items-center lg:gap-8">
            <Image
              src={data?.img_url as string}
              alt={data?.name as string}
              width={1000}
              height={1000}
              className="size-28 object-fill"
            />

            <h1 className="flex-1 text-2xl font-black -tracking-wide text-black xs:text-3xl xl:text-4xl">
              {data?.name as string}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
            {data?.sub_categories.map((sub_category) => (
              <CardCategory
                key={sub_category.sub_category_id}
                href={`/material/${sub_category.slug}?type=videocourse`}
                image={sub_category.img_url}
                name={sub_category.name}
              />
            ))}
          </div>
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: CategoryDetailResponse;
  error?: any;
}> = async ({ req, params, query }) => {
  const slug = params?.slug as string;
  const type = query.type as string;

  if (!["apotekerclass", "videocourse", "videoukmppai"].includes(type)) {
    return {
      props: {
        error: {
          message: "Ups sepertinya parameter web tidak valid",
        },
      },
    };
  }

  try {
    const response: SuccessResponse<CategoryDetailResponse> = await fetcher({
      url: `/categories/${slug}/${type}/detail`,
      method: "GET",
    });

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error: any) {
    console.error(error);

    return {
      props: {
        error,
      },
    };
  }
};
