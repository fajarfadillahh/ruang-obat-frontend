import ButtonBack from "@/components/button/ButtonBack";
import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";

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
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16">
              <Image
                src={data?.img_url as string}
                alt={data?.name as string}
                className="object-cover"
                fill
              />
            </div>

            <h1 className="flex-1 text-3xl font-black text-black xl:text-4xl">
              {data?.name as string}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
            {data?.sub_categories.map((sub_category) => (
              <Link
                key={sub_category.sub_category_id}
                href={`/materi/${sub_category.slug}?type=videocourse`}
                className="group grid justify-items-center gap-4 overflow-hidden rounded-xl border-2 border-gray/10 text-sm [padding:2rem_1rem] hover:cursor-pointer hover:bg-purple/10 sm:text-base"
              >
                <div className="relative h-20 w-20">
                  <Image
                    src={sub_category.img_url}
                    alt={sub_category.name}
                    className="object-cover"
                    fill
                  />
                </div>

                <h4 className="line-clamp-2 text-center font-extrabold text-black group-hover:line-clamp-none">
                  {sub_category.name}
                </h4>
              </Link>
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
