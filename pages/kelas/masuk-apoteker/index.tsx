import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CTASecondary from "@/components/cta/CTASecondary";
import CustomTooltip from "@/components/CustomTooltip";
import Footer from "@/components/footer/Footer";
import SectionCategory from "@/components/section/SectionCategory";
import SectionSubscription from "@/components/section/SectionSubscription";
import TextHighlight from "@/components/text/TextHighlight";
import Layout from "@/components/wrapper/Layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { scrollToSection } from "@/utils/scrollToSection";
import { handleShareClipboard } from "@/utils/shareClipboard";
import { Button, Chip } from "@nextui-org/react";
import {
  ClipboardText,
  IconContext,
  ShareNetwork,
  Sparkle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

type ApotekerClassResponse = {
  categories: {
    category_id: string;
    name: string;
    slug: string;
    img_url: string;
  }[];
  universities: {
    univ_id: string;
    slug: string;
    title: string;
    thumbnail_url: string;
    total_tests: number;
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

export default function ApotekerClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const subscribeRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  return (
    <>
      <Layout
        title="Kelas Siap Masuk Apoteker: Upgrade Skill, Raih Mimpi"
        description="Bersiaplah menghadapi seleksi masuk program profesi apoteker. Kami menyediakan program khusus yang disesuaikan dengan kebutuhan menjadi seorang Apoteker yang handal dan profesional. Kelas ini pula dirancang untuk membantu kamu memahami materi secara mendalam dan terarah."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container items-center gap-6 xl:grid-cols-[1fr_550px]">
          <div className="grid gap-4">
            <Chip
              color="danger"
              variant="flat"
              classNames={{
                content: "font-bold",
              }}
              className="mb-2"
            >
              💊 Ruang Masuk Apoteker
            </Chip>

            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl">
              Persiapkan Diri dengan{" "}
              <TextHighlight text="Skill Terbaik" className="font-black" />{" "}
              untuk Menjadi Apoteker Andal
            </h1>

            <p className="mb-6 font-medium leading-[170%] text-gray">
              Bersiaplah menghadapi seleksi masuk program profesi apoteker. Kami
              menyediakan program khusus yang disesuaikan dengan kebutuhan
              menjadi seorang Apoteker yang handal dan profesional. Kelas ini
              pula dirancang untuk membantu kamu memahami materi secara mendalam
              dan terarah.
            </p>

            <div className="grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                color="secondary"
                endContent={<Sparkle weight="duotone" size={18} />}
                onClick={() => scrollToSection(subscribeRef)}
                className="px-6 font-bold"
              >
                Langganan Sekarang!
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
            src="/img/new-illustration/img-7.svg"
            alt="class subject img"
            width={1000}
            height={1000}
            className="w-full justify-self-center"
          />
        </section>

        <SectionCategory type="apotekerclass" categories={data?.categories} />

        {data?.universities.length ? (
          <section className="base-container gap-4 py-[100px]">
            <div className="grid">
              <h2 className="text-3xl font-black -tracking-wide text-black">
                Tryout Universitas 🎓
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                Dapatkan bonus tryout dari universitas ternama untuk kamu yang
                telah berlangganan kelas ini.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
              {data.universities.map((university) => (
                <div
                  className="group relative isolate grid grid-cols-[max-content_1fr] items-center gap-4 overflow-hidden rounded-xl border-2 border-gray/10 p-4 hover:cursor-pointer hover:bg-purple/10"
                  key={university.univ_id}
                  onClick={() =>
                    router.push(
                      `/kelas/masuk-apoteker/universitas/${university.slug}`,
                    )
                  }
                >
                  <div className="relative aspect-square size-full items-center justify-center rounded-md bg-purple/5 p-2 text-5xl">
                    <Image
                      src={university.thumbnail_url}
                      alt={university.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>

                  <div className="grid gap-4">
                    <CustomTooltip content={university.title}>
                      <h1 className="line-clamp-2 font-black text-black group-hover:text-purple">
                        {university.title}
                      </h1>
                    </CustomTooltip>

                    <div className="grid gap-1">
                      <span className="text-xs font-medium text-gray">
                        Jumlah Tryout
                      </span>

                      <div className="flex items-center gap-1">
                        <IconContext.Provider
                          value={{
                            weight: "duotone",
                            size: 18,
                            className: "text-purple",
                          }}
                        >
                          <ClipboardText />
                        </IconContext.Provider>

                        <p className="text-sm font-semibold capitalize text-black">
                          {university.total_tests}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {data?.subscriptions.length ? (
          <SectionSubscription subscriptions={data.subscriptions} />
        ) : null}

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: ApotekerClassResponse;
  error?: any;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    const response: SuccessResponse<ApotekerClassResponse> = await fetcher({
      url: "/apotekerclass",
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
