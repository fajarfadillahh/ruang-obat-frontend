import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { FilmSlate, IconContext, Pill } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]";

export type SubscriptionsResponse = {
  access_id: string;
  duration: number;
  started_at: string;
  expired_at: string;
  status: string;
  type: string;
  items: {
    product_id: string;
    product_name: string;
    product_type: string;
  }[];
};

export default function MySubscriptionsPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout title="Langganan Saya">
        <section className="base-container gap-8 [padding:50px_0_100px]">
          <div className="grid gap-1">
            <h1 className="text-2xl font-extrabold -tracking-wide text-black">
              Langganan Saya 💳
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              Lihat detail langganan aktif kamu dan akses ke kelas yang telah
              dibeli.
            </p>
          </div>

          {data.data.length ? (
            <div className="grid grid-cols-2 gap-4">
              {data.data.map((subscription: SubscriptionsResponse) => (
                <div
                  key={subscription.access_id}
                  className="grid gap-8 rounded-xl border-2 border-gray/10 bg-purple/5 [padding:3rem_2rem] hover:bg-purple/10"
                >
                  <IconContext.Provider
                    value={{
                      weight: "duotone",
                      size: 96,
                      className: "text-purple",
                    }}
                  >
                    {subscription.type === "videocourse" ? (
                      <FilmSlate />
                    ) : (
                      <Pill />
                    )}
                  </IconContext.Provider>

                  <h1 className="text-2xl font-extrabold capitalize text-black">
                    🎉 Selamat, anda telah berlangganan:{" "}
                    {subscription.type === "videocourse"
                      ? "Ruang Sarjana & Diploma Farmasi 🎬"
                      : "Ruang Masuk Apoteker 💊"}
                  </h1>

                  <div className="grid gap-2">
                    <h4 className="text-lg font-bold text-black">
                      Data Langganan
                    </h4>

                    <div className="grid gap-2 sm:gap-1">
                      {[
                        ["Status", "Langganan Aktif ✅"],
                        [
                          "Jenis Paket",
                          `${subscription.items[0].product_name}`,
                        ],
                      ].map(([label, value], index) => (
                        <div
                          key={index}
                          className="grid font-medium text-gray sm:grid-cols-[120px_1fr]"
                        >
                          <p>{label} :</p>

                          <p className="font-bold capitalize text-black">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <Button
                  color="secondary"
                  endContent={<ArrowRight weight="bold" size={18} />}
                  className="font-bold"
                >
                  Perpanjang Langganan
                </Button> */}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid justify-items-center gap-4 rounded-xl border-2 border-dashed border-gray/20 p-8">
              <Image
                src="https://cdn.ruangobat.id/statics/images/main-illustrations/img-no-data-upload.webp"
                alt="no data image"
                width={1000}
                height={1000}
                className="h-[280px] w-auto"
              />

              <h3 className="max-w-[500px] text-center text-xl font-extrabold text-black">
                Waduhh, kamu belum berlangganan apapun nih. Ayo, mulai
                berlangganan sekarang...
              </h3>
            </div>
          )}
        </section>
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  const token = session?.user.access_token as string;

  try {
    const response: SuccessResponse<SubscriptionsResponse> = await fetcher({
      url: "/my/subscriptions",
      method: "GET",
      token,
    });

    return {
      props: {
        data: response,
      },
    };
  } catch (error: any) {
    console.error("Error fetch subscription:", error);

    return {
      props: {
        error: error.message ?? "Internal Server Error",
      },
    };
  }
};
