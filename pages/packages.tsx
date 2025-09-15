import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { AppContext } from "@/context/AppContext";
import { ApotekerClassResponse } from "@/types/apotekerclass.type";
import { SuccessResponse } from "@/types/global.type";
import { VideoCourseResponse } from "@/types/videocourse.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button } from "@nextui-org/react";
import { CheckCircle } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function PackagesPage({
  videocourse,
  apotekerclass,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout
        title="Paket Berlangganan RuangObat: Belajar Farmasi Tanpa Batas"
        description="Berlangganan RuangObat untuk nikmati konten belajar farmasi lengkap, praktis, dan interaktif. Pilih paket sesuai kebutuhanmu."
      >
        <section className="base-container gap-1 pt-[50px]">
          <h1 className="text-2xl font-black -tracking-wide text-black md:text-4xl">
            Paket Berlangganan RuangObat:
            <br />
            Belajar Farmasi Tanpa Batas 🚀
          </h1>

          <p className="max-w-[700px] font-medium leading-[170%] text-gray">
            Berlangganan RuangObat untuk nikmati konten belajar farmasi lengkap,
            praktis, dan interaktif. Pilih paket sesuai kebutuhanmu.
          </p>
        </section>

        <SubscriptionSection
          title="Paket Berlangganan Ruang Sarjana & Diploma Farmasi 🎬"
          subscriptions={videocourse?.subscriptions}
        />

        <SubscriptionSection
          title="Paket Berlangganan Ruang Masuk Apoteker 💊"
          subscriptions={apotekerclass?.subscriptions}
        />

        <CTAMain />
      </Layout>

      <Footer />
    </>
  );
}

interface SubscriptionSectionProps {
  title: string;
  subscriptions?: {
    package_id: string;
    name: string;
    price: number;
    discount_amount: number;
    duration: number;
    type: string;
    link_order: string;
    benefits: {
      benefit_id: string;
      description: string;
    }[];
  }[];
}

function SubscriptionSection({
  title,
  subscriptions,
}: SubscriptionSectionProps) {
  const { status, data } = useSession();
  const ctx = useContext(AppContext);

  return (
    <section className="base-container gap-4 py-[100px]">
      <h2 className="flex-1 text-lg font-extrabold -tracking-wide text-black md:text-2xl">
        {title}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
        {subscriptions?.length ? (
          subscriptions?.map((item) => (
            <div
              key={item.package_id}
              className={`relative isolate grid gap-8 overflow-hidden rounded-xl [padding:4rem_2rem] ${
                false ? "bg-purple" : "border-2 border-gray/10"
              }`}
            >
              {false && (
                <div className="absolute left-0 top-0 z-50 rounded-br-xl bg-pink-500 text-center font-extrabold text-white [padding:0.5rem_3rem]">
                  Populer
                </div>
              )}

              <div className="grid gap-2">
                <h3
                  className={`text-center text-xl font-bold ${
                    false ? "text-white" : "text-black"
                  }`}
                >
                  {item.name}
                </h3>

                {item.discount_amount ? (
                  <div className="grid justify-items-center gap-1">
                    <h2
                      className={`text-center text-4xl font-black ${
                        false ? "text-white" : "text-purple"
                      }`}
                    >
                      {formatRupiah(item.discount_amount)}
                    </h2>

                    <h4 className="relative isolate w-max text-2xl font-black text-gray/40">
                      {formatRupiah(item.price)}
                      <div className="absolute left-0 top-4 z-10 h-1 w-full bg-danger" />
                    </h4>
                  </div>
                ) : (
                  <h2
                    className={`text-center text-4xl font-black ${
                      false ? "text-white" : "text-purple"
                    }`}
                  >
                    {formatRupiah(item.price)}
                  </h2>
                )}
              </div>

              <div className="grid gap-2">
                <h4
                  className={`text-lg font-bold ${
                    false ? "text-white" : "text-black"
                  }`}
                >
                  Keuntungan Berlangganan ✨
                </h4>

                <div className="grid gap-2">
                  {item.benefits.map((benefit) => (
                    <div
                      key={benefit.benefit_id}
                      className="grid grid-cols-[35px_1fr]"
                    >
                      <CheckCircle
                        weight="duotone"
                        size={24}
                        className={false ? "text-white" : "text-purple"}
                      />

                      <p
                        className={`text-sm font-medium ${
                          false ? "text-white" : "text-black"
                        }`}
                      >
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  if (status === "unauthenticated") {
                    ctx?.onOpenUnauthenticated();
                  } else {
                    fetcher({
                      url: `/activities/products`,
                      method: "POST",
                      data: {
                        action: "click",
                        product_id: item.package_id,
                        product_type: item.type,
                        product_name: item.name,
                        user_id: data?.user.user_id,
                      },
                      token: data?.user.access_token,
                    });
                    window.open(item.link_order, "_blank");
                  }
                }}
                className={`font-bold text-white ${
                  item.link_order ? "bg-pink-500" : "bg-purple"
                }`}
              >
                Mulai Berlangganan
              </Button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-gray/20 p-8 text-center sm:col-span-2 xl:col-span-3">
            <span className="text-3xl md:text-6xl">🎉</span>
            <h3 className="text-lg font-extrabold capitalize -tracking-wide text-black md:text-left">
              Kamu sudah berlangganan di program ini
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<{
  videocourse?: VideoCourseResponse;
  apotekerclass?: ApotekerClassResponse;
  error?: any;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    const [videoRes, apotekerRes]: [
      SuccessResponse<VideoCourseResponse>,
      SuccessResponse<ApotekerClassResponse>,
    ] = await Promise.all([
      fetcher({
        url: "/videocourse",
        method: "GET",
        token: session?.user.access_token,
      }),
      fetcher({
        url: "/apotekerclass",
        method: "GET",
        token: session?.user.access_token,
      }),
    ]);

    return {
      props: {
        videocourse: videoRes.data,
        apotekerclass: apotekerRes.data,
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
