import ButtonBack from "@/components/button/ButtonBack";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { MentorDetailsType } from "@/types/mentor.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";

export default function DetailMentorPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout title="Mentor - Nama Mentor Disini">
        <div className="grid gap-8">
          <ButtonBack />

          <section className="mx-auto grid max-w-[600px] gap-8 pb-[40px] lg:max-w-[700px] xl:max-w-none xl:grid-cols-2 xl:items-start">
            <div className="grid gap-8">
              <Image
                priority
                src={data?.img_url as string}
                alt="mentor img"
                width={480}
                height={480}
                className="aspect-square h-auto w-full rounded-xl xl:max-w-[480px]"
              />

              <div className="grid gap-3">
                <h2 className="max-w-[420px] text-xl font-black -tracking-wide text-black xl:text-[28px]">
                  {data?.fullname}
                  <br />
                  &#40;{data?.nickname}&#41;
                </h2>
                <p className="font-medium leading-[170%] text-gray">
                  {data?.mentor_title}
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              <h2 className="max-w-[420px] text-xl font-black -tracking-wide text-black xl:text-[28px]">
                Deskripsi Singkat
              </h2>

              <p
                className="preventive-list preventive-table list-outside text-[16px] font-medium leading-[170%] text-black"
                dangerouslySetInnerHTML={{
                  __html: data?.description as string,
                }}
              />
            </div>
          </section>

          <CTAMain />
        </div>
      </Layout>

      <Footer />
    </>
  );
}

type DataProps = {
  data?: MentorDetailsType;
  error?: ErrorDataType;
};

export const getServerSideProps: GetServerSideProps<DataProps> = async ({
  params,
}) => {
  try {
    const response = (await fetcher({
      method: "GET",
      url: `/general/mentors/${encodeURIComponent(params?.id as string)}`,
    })) as SuccessResponse<MentorDetailsType>;

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
