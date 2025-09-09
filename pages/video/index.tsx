import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import SectionCategory from "@/components/section/SectionCategory";
import SectionSubscription from "@/components/section/SectionSubscription";
import TextHighlight from "@/components/text/TextHighlight";
import Layout from "@/components/wrapper/Layout";
import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { scrollToSection } from "@/utils/scrollToSection";
import { handleShareClipboard } from "@/utils/shareClipboard";
import { Button, Chip } from "@nextui-org/react";
import {
  BookBookmark,
  GraduationCap,
  Planet,
  RocketLaunch,
  Shapes,
  ShareNetwork,
  Sparkle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { useRef } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

type VideoCourseResponse = {
  categories: {
    category_id: string;
    name: string;
    slug: string;
    img_url: string;
  }[];
  subscriptions: {
    package_id: string;
    name: string;
    price: number;
    duration: number;
    type: string;
    link_order: string;
    benefits: {
      benefit_id: string;
      description: string;
    }[];
  }[];
  is_login: boolean;
};

const headlines = [
  {
    icon: BookBookmark,
    description: "Materi sesuai standar kurikulum farmasi Indonesia.",
  },
  {
    icon: GraduationCap,
    description: "Cocok untuk kamu yang semester awal hingga akhir.",
  },
  {
    icon: RocketLaunch,
    description: "Akses fleksibel bisa kapan saja dan di mana saja.",
  },
  {
    icon: Shapes,
    description: "Pembelajaran visual interaktif yang seru & keren.",
  },
  {
    icon: Planet,
    description: "Digunakan ribuan mahasiswa di seluruh Indonesia.",
  },
];

export default function VideoLearningClassPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const subscribeRef = useRef<HTMLElement | null>(null);
  const hasSubscribeRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <Layout
        title="Ruang Sarjana & Diploma Farmasi: Video Belajar Farmasi Terlengkap untuk Mahasiswa Sarjana & Diploma, Siap Temani Perjalananmu Jadi Apoteker Hebat!"
        description="Dikelas ini kami menyediakan video pembelajaran mata kuliah farmasi yang lengkap dan mudah dipahami. Solusi praktis untuk membantu kamu belajar kapan saja dan di mana saja."
      >
        {data?.subscriptions.length ? null : (
          <div className="mb-4 flex items-center justify-center rounded-xl border-2 border-success bg-success/10 p-3 text-sm sm:text-base">
            <h4 className="font-medium text-success-800">
              🎉 Yeay, anda telah berlangganan pada:{" "}
              <strong className="font-bold">
                Ruang Sarjana & Diploma Farmasi 🎬
              </strong>
            </h4>
          </div>
        )}

        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container items-center gap-6 xl:grid-cols-[1fr_550px]">
          <div className="grid gap-4">
            <Chip
              color="secondary"
              variant="flat"
              classNames={{
                content: "font-bold",
              }}
              className="mb-2"
            >
              🎬 Ruang Sarjana & Diploma Farmasi
            </Chip>

            <h1 className="text-2xl font-black capitalize -tracking-wide text-black sm:text-3xl lg:text-[40px] lg:leading-[105%]">
              Video Belajar Farmasi Terlengkap untuk Mahasiswa Sarjana &
              Diploma, Siap Temani Perjalananmu Jadi{" "}
              <TextHighlight text="Apoteker Hebat!" className="font-black" />
            </h1>

            <p className="mb-6 font-medium leading-[170%] text-gray">
              Dikelas ini kami menyediakan video pembelajaran mata kuliah
              farmasi yang lengkap dan mudah dipahami. Solusi praktis untuk
              membantu kamu belajar kapan saja dan di mana saja.
            </p>

            <div className="grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                color="secondary"
                endContent={<Sparkle weight="duotone" size={18} />}
                onClick={() =>
                  scrollToSection(
                    data?.subscriptions.length ? subscribeRef : hasSubscribeRef,
                  )
                }
                className="px-6 font-bold"
              >
                {data?.subscriptions.length
                  ? "Langganan Sekarang!"
                  : "Lihat Video Belajar!"}
              </Button>

              <Button
                aria-label="Share Link"
                variant="bordered"
                startContent={<ShareNetwork weight="duotone" size={18} />}
                onClick={handleShareClipboard}
                className="px-6 font-bold"
              >
                Bagikan
              </Button>
            </div>
          </div>

          <Image
            priority
            src="https://ruangobat.is3.cloudhost.id/statics/images/new-illustration-program/img-sarjana.webp"
            alt="class subject img"
            width={1000}
            height={1000}
            className="w-full justify-self-center"
          />
        </section>

        <section className="base-container items-center gap-12 [padding:100px_0_2rem] xl:grid-cols-[max-content_1fr]">
          <Image
            src="https://ruangobat.is3.cloudhost.id/statics/images/new-logo-program/logo/logo-ruang-sarjana.webp"
            alt="logo program"
            width={1000}
            height={1000}
            className="h-auto w-full max-w-[200px] justify-self-center sm:max-w-[300px] xl:max-w-[360px]"
            loading="lazy"
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {headlines.map((headline, index) => (
              <div
                key={index}
                className="grid gap-4 rounded-xl border-2 border-gray/10 p-8"
              >
                <headline.icon
                  weight="duotone"
                  size={48}
                  className="text-purple"
                />

                <p className="font-medium leading-[170%] text-gray">
                  {headline.description}
                </p>
              </div>
            ))}

            <div className="group relative isolate hidden h-full items-center justify-center overflow-hidden rounded-xl bg-purple-100 xl:flex">
              <span className="z-10 text-2xl font-black -tracking-wide text-purple">
                RuangObat.
              </span>

              <LogoRuangobat className="absolute right-3 top-1/2 h-auto w-[140px] -translate-y-1/2 text-purple opacity-15" />
            </div>
          </div>
        </section>

        <SectionCategory
          sectionRef={hasSubscribeRef}
          type="videocourse"
          categories={data?.categories}
        />

        {data?.subscriptions.length ? (
          <SectionSubscription
            subscriptions={data.subscriptions}
            sectionRef={subscribeRef}
          />
        ) : null}

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: VideoCourseResponse;
  error?: any;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    const response: SuccessResponse<VideoCourseResponse> = await fetcher({
      url: "/videocourse",
      method: "GET",
      token: session?.user.access_token,
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
