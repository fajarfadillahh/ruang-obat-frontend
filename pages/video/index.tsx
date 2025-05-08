import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import SearchInput from "@/components/SearchInput";
import Layout from "@/components/wrapper/Layout";
import {
  dummyListVideo,
  dummyOfferSubscriptions,
  dummyQuiz,
} from "@/config/dummy";
import { PreparationResponse } from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { isNewProduct } from "@/utils/isNewProduct";
import { scrollToSection } from "@/utils/scrollToSection";
import { Button, Chip } from "@nextui-org/react";
import { CheckCircle } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function LearningVideosPage() {
  const router = useRouter();
  const subscribeRef = useRef<HTMLElement | null>(null);
  const quizRef = useRef<HTMLElement | null>(null);
  const [search, setSearch] = useState("");

  return (
    <>
      <Layout
        title="Video Pembelajaran Farmasi"
        description="Akses seluruh video pembelajaran eksklusif dari RuangObat untuk mendukung proses belajarmu. Solusi praktis untuk membantu kamu belajar kapan saja dan di mana saja dengan sangat lengkap dan mudah dipahami."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container gap-6 border-b-2 border-dashed border-gray/20 pb-[50px] xl:flex xl:flex-wrap xl:items-center xl:justify-between xl:gap-4">
          <div className="grid gap-2">
            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl">
              Video Pembelajaran Farmasi
            </h1>

            <p className="text-lg font-medium text-gray">
              Ayo, akses semua video pembelajaran yang tersedia sekarang!
            </p>
          </div>

          <div className="grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
            <Button
              color="secondary"
              onClick={() => scrollToSection(subscribeRef)}
              className="px-6 font-bold"
            >
              Langganan Sekarang
            </Button>

            <Button
              variant="bordered"
              onClick={() => scrollToSection(quizRef)}
              className="px-6 font-bold"
            >
              Pilih Bonus Quiz
            </Button>
          </div>
        </section>

        <section className="base-container gap-4 [padding:50px_0_100px]">
          <div className="grid gap-2">
            <h2 className="text-3xl font-black -tracking-wide text-black">
              Daftar Video 🔥
            </h2>

            <SearchInput
              placeholder="Cari Video..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
              className="mb-4 max-w-[550px]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
            {dummyListVideo.map((item) => (
              <div
                key={item.video_id}
                className="group relative grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
              >
                {isNewProduct(item.created_at) ? (
                  <Chip
                    color="danger"
                    className="absolute right-8 top-8 z-10"
                    classNames={{
                      content: "font-bold px-4",
                    }}
                  >
                    Baru
                  </Chip>
                ) : null}

                <Image
                  priority
                  src="/img/default-thumbnail.png"
                  alt="thumbnail"
                  width={304}
                  height={304}
                  className="aspect-square h-auto w-full rounded-xl object-cover object-center group-hover:grayscale-[0.5]"
                />

                <div className="grid gap-4">
                  <h1 className="line-clamp-2 text-xl font-black text-black group-hover:text-purple">
                    {item.video_title}
                  </h1>

                  <Button
                    variant="flat"
                    color="secondary"
                    onClick={() => router.push(`/video/${item.slug}`)}
                    className="font-bold"
                  >
                    Detail Video
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={quizRef} className="base-container gap-8 py-[100px]">
          <div className="grid gap-1 text-center xl:text-left">
            <h2 className="text-3xl font-black -tracking-wide text-black">
              Bonus Quiz ✍
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Dapatkan bonus quiz untuk kamu yang telah berlangganan kelas ini.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
            {dummyQuiz.map((item) => (
              <div
                key={item.quiz_id}
                className="group relative grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
              >
                {isNewProduct(item.created_at) ? (
                  <Chip
                    color="danger"
                    className="absolute right-8 top-8 z-10"
                    classNames={{
                      content: "font-bold px-4",
                    }}
                  >
                    Baru
                  </Chip>
                ) : null}

                <Image
                  priority
                  src="/img/default-thumbnail.png"
                  alt="thumbnail"
                  width={304}
                  height={304}
                  className="aspect-square h-auto w-full rounded-xl object-cover object-center group-hover:grayscale-[0.5]"
                />

                <div className="grid gap-4">
                  <h1 className="line-clamp-2 text-xl font-black text-black group-hover:text-purple">
                    {item.quiz_name}
                  </h1>

                  <Button
                    variant={item.quiz_accessed ? "solid" : "flat"}
                    color="secondary"
                    className="font-bold"
                  >
                    {item.quiz_accessed ? "Detail Quiz" : "Akses Quiz"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={subscribeRef} className="base-container gap-8 py-[100px]">
          <div className="grid gap-1 text-center xl:text-left">
            <h2 className="text-3xl font-black -tracking-wide text-black">
              Langganan 🌟
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Tertarik? Ayo, berlangganan untuk mengakses semua video.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
            {dummyOfferSubscriptions.map((item) => (
              <div
                key={item.id}
                className={`relative isolate grid gap-8 overflow-hidden rounded-xl shadow-[4px_4px_36px_rgba(0,0,0,0.1)] [padding:4rem_2rem] ${
                  item.highlight ? "bg-purple" : "bg-white"
                }`}
              >
                {item.highlight && (
                  <div className="absolute left-0 top-0 z-50 rounded-br-xl bg-pink-500 text-center font-extrabold text-white [padding:0.5rem_3rem]">
                    Populer
                  </div>
                )}

                <div className="grid gap-2">
                  <h1
                    className={`text-center text-xl font-bold ${item.highlight ? "text-white" : "text-black"}`}
                  >
                    {item.name}
                  </h1>

                  <h1
                    className={`text-center text-4xl font-black ${item.highlight ? "text-white" : "text-purple"}`}
                  >
                    {formatRupiah(item.price)}
                  </h1>
                </div>

                <div className="grid gap-2">
                  <h4
                    className={`text-lg font-bold ${item.highlight ? "text-white" : "text-black"}`}
                  >
                    Keuntungan Berlangganan ✨
                  </h4>

                  <div className="grid gap-2">
                    {item.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle
                          weight="duotone"
                          size={24}
                          className={
                            item.highlight ? "text-white" : "text-purple"
                          }
                        />

                        <p
                          className={`text-sm font-medium ${item.highlight ? "text-white" : "text-black"}`}
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => window.open(item.order_link, "_blank")}
                  className={`font-bold text-white ${item.highlight ? "bg-pink-500" : "bg-purple"}`}
                >
                  Mulai Berlangganan
                </Button>
              </div>
            ))}
          </div>
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}

export type DataProps = {
  data?: PreparationResponse;
  error?: ErrorDataType;
};

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  try {
    const response = (await fetcher({
      method: "GET",
      url: "/general/subjects/preparation",
    })) as SuccessResponse<PreparationResponse>;

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
