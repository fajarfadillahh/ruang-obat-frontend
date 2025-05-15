import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import SearchInput from "@/components/SearchInput";
import Layout from "@/components/wrapper/Layout";
import {
  dummyOfferSubscriptions,
  dummyTryoutPerUniversity,
} from "@/config/dummy";
import { PharmacistAdmissionClassType } from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { isNewProduct } from "@/utils/isNewProduct";
import { scrollToSection } from "@/utils/scrollToSection";
import { handleShareClipboard } from "@/utils/shareClipboard";
import { Button, Chip } from "@nextui-org/react";
import {
  CheckCircle,
  ClipboardText,
  IconContext,
  ShareNetwork,
  VideoCamera,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function PharmacistEntranceClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const subscribeRef = useRef<HTMLElement | null>(null);
  const tryoutRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <Layout
        title="Kelas Siap Masuk Apoteker: Upgrade Skill, Raih Mimpi"
        description="Bersiaplah menghadapi seleksi masuk program profesi apoteker. Kami menyediakan program khusus yang disesuaikan dengan kebutuhan menjadi seorang Apoteker yang handal dan profesional. Kelas ini pula dirancang untuk membantu kamu memahami materi secara mendalam dan terarah."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container items-center gap-4 xl:grid-cols-2 xl:gap-2">
          <div className="grid gap-4">
            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
              Kelas Siap Masuk Apoteker: Upgrade Skill, Raih Mimpi
            </h1>

            <p className="mb-10 font-medium leading-[170%] text-gray">
              Bersiaplah menghadapi seleksi masuk program profesi apoteker. Kami
              menyediakan program khusus yang disesuaikan dengan kebutuhan
              menjadi seorang Apoteker yang handal dan profesional. Kelas ini
              pula dirancang untuk membantu kamu memahami materi secara mendalam
              dan terarah.
            </p>

            <div className="grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                color="secondary"
                onClick={() => scrollToSection(subscribeRef)}
                className="px-6 font-bold"
              >
                Langganan Sekarang!
              </Button>

              <Button
                variant="bordered"
                onClick={() => scrollToSection(tryoutRef)}
                className="px-6 font-bold"
              >
                Pilih Bonus Tryout
              </Button>

              <Button
                isIconOnly
                aria-label="Share Link"
                variant="bordered"
                onClick={handleShareClipboard}
              >
                <ShareNetwork
                  weight="duotone"
                  size={18}
                  className="text-black"
                />
              </Button>
            </div>
          </div>

          <Image
            priority
            src="/img/base/apoteker-img.svg"
            alt="class subject img"
            width={493}
            height={619}
            className="h-[600px] w-full justify-self-center"
          />
        </section>

        <section className="base-container gap-8 [padding:50px_0_100px] xl:gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-3xl font-black -tracking-wide text-black">
              Daftar Video 🔥
            </h2>

            <SearchInput
              placeholder="Cari Video..."
              className="w-full xl:max-w-[350px]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
            {data?.map((item: PharmacistAdmissionClassType) => (
              <div
                key={item.university_id}
                onClick={() =>
                  router.push(`/kelas/masuk-apoteker/${item.slug}`)
                }
                className="group relative isolate grid overflow-hidden rounded-xl bg-white shadow-[4px_4px_36px_rgba(0,0,0,0.1)] ring-2 ring-gray/5 hover:cursor-pointer hover:bg-purple/10"
              >
                {isNewProduct(item.created_at) ? (
                  <Chip
                    color="danger"
                    size="sm"
                    className="absolute right-4 top-4 z-10"
                    classNames={{
                      content: "font-bold px-4",
                    }}
                  >
                    Baru
                  </Chip>
                ) : null}

                <Image
                  priority
                  src={item.img_url as string}
                  alt="thumbnail"
                  width={304}
                  height={304}
                  className="aspect-square h-auto w-full object-cover object-center group-hover:grayscale-[0.5]"
                />

                <div className="grid gap-4 [padding:1.5rem_1rem]">
                  <h1 className="line-clamp-2 text-lg font-black text-black group-hover:text-purple">
                    {item.name}
                  </h1>

                  <IconContext.Provider
                    value={{
                      weight: "duotone",
                      size: 18,
                      className: "text-purple",
                    }}
                  >
                    <div className="grid gap-1">
                      {[
                        [<VideoCamera />, "30 video"],
                        [<ClipboardText />, "15 quiz"],
                      ].map(([icon, label], index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-2"
                        >
                          {icon}

                          <p className="text-sm font-semibold capitalize text-gray">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </IconContext.Provider>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={tryoutRef} className="base-container gap-8 py-[100px]">
          <div className="grid gap-1 text-center xl:text-left">
            <h2 className="text-3xl font-black -tracking-wide text-black">
              Bonus Tryout ✍
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Kamu bisa memilih bonus tryout minimal 1 Univesitas.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
            {dummyTryoutPerUniversity.map((item) => (
              <div
                key={item.tryout_id}
                className="group relative isolate grid grid-cols-[max-content_1fr] items-center gap-4 overflow-hidden rounded-xl bg-white p-4 shadow-[4px_4px_36px_rgba(0,0,0,0.1)] ring-2 ring-gray/5 hover:cursor-pointer hover:bg-purple/10"
              >
                <Image
                  priority
                  src="/img/default-thumbnail.png"
                  alt="thumbnail"
                  width={304}
                  height={304}
                  className="aspect-square size-[100px] rounded-md object-cover object-center group-hover:grayscale-[0.5]"
                />

                <div className="grid gap-4">
                  <h1 className="line-clamp-2 font-black text-black group-hover:text-purple">
                    {item.tryout_name}
                  </h1>

                  <div className="inline-flex items-center gap-2">
                    <ClipboardText
                      weight="duotone"
                      size={18}
                      className="text-purple"
                    />

                    <p className="text-sm font-semibold capitalize text-gray">
                      10 ujian
                    </p>
                  </div>
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

type DataProps = {
  data?: PharmacistAdmissionClassType[];
  error?: ErrorDataType;
};

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  try {
    const response = (await fetcher({
      method: "GET",
      url: "/general/pharmacistadmission",
    })) as SuccessResponse<PharmacistAdmissionClassType[]>;

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
