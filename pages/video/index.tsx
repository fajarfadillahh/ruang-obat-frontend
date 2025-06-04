import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CTASecondary from "@/components/cta/CTASecondary";
import CustomTooltip from "@/components/CustomTooltip";
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
import { handleShareClipboard } from "@/utils/shareClipboard";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import {
  CheckCircle,
  ClipboardText,
  IconContext,
  ShareNetwork,
  VideoCamera,
} from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

type QuizType = {
  quiz_id: number;
  quiz_name: string;
  quiz_description: string;
  created_at: string;
  total_questions: number;
};

export default function VideoLearningClassPage() {
  const router = useRouter();
  const session = useSession();
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [isOpenModalQuiz, setIsOpenModalQuiz] = useState<boolean>(false);

  const subscribeRef = useRef<HTMLElement | null>(null);
  const quizRef = useRef<HTMLElement | null>(null);

  function handleOpenModalQuiz(prepQuiz: QuizType) {
    setSelectedQuiz(prepQuiz);
    setIsOpenModalQuiz(true);
  }

  return (
    <>
      <Layout
        title="Video Pembelajaran Lengkap untuk Mahasiswa Farmasi"
        description="Dikelas ini kami menyediakan video pembelajaran mata kuliah farmasi yang lengkap dan mudah dipahami. Solusi praktis untuk membantu kamu belajar kapan saja dan di mana saja."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container items-center gap-16 xl:grid-cols-[1fr_500px] xl:gap-16">
          <div className="grid gap-4">
            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
              Video Pembelajaran Lengkap untuk Mahasiswa Farmasi
            </h1>

            <p className="mb-10 font-medium leading-[170%] text-gray">
              Dikelas ini kami menyediakan video pembelajaran mata kuliah
              farmasi yang lengkap dan mudah dipahami. Solusi praktis untuk
              membantu kamu belajar kapan saja dan di mana saja.
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
                onClick={() => scrollToSection(quizRef)}
                className="px-6 font-bold"
              >
                Pilih Bonus Kuis
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
            src="/img/base/video-pembelajaran-img.svg"
            alt="class subject img"
            width={510}
            height={340}
            className="h-[600px] w-full justify-self-center"
          />
        </section>

        <section className="base-container gap-4 [padding:50px_0_100px]">
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
            {dummyListVideo.map((item) => (
              <div
                key={item.video_id}
                onClick={() => router.push(`/video/${item.slug}`)}
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
                  src="/img/default-thumbnail.png"
                  alt="thumbnail"
                  width={304}
                  height={304}
                  className="aspect-square h-auto w-full object-cover object-center group-hover:grayscale-[0.5]"
                />

                <div className="grid gap-4 [padding:1.5rem_1rem]">
                  <h1 className="line-clamp-2 text-lg font-black text-black group-hover:text-purple">
                    {item.video_title}
                  </h1>

                  <IconContext.Provider
                    value={{
                      weight: "duotone",
                      size: 18,
                      className: "text-purple",
                    }}
                  >
                    <div className="flex items-start justify-between gap-1">
                      {[
                        ["Jumlah Video", <VideoCamera />, "30 video"],
                        ["Jumlah Kuis", <ClipboardText />, "15 kuis"],
                      ].map(([label, icon, value], index) => (
                        <div key={index} className="grid gap-1">
                          <span className="text-xs font-medium text-gray">
                            {label}:
                          </span>

                          <div className="flex items-center gap-1">
                            {icon}

                            <p className="text-sm font-semibold capitalize text-black">
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </IconContext.Provider>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={quizRef} className="base-container gap-8 py-[100px]">
          <div className="grid gap-1 text-center xl:text-left">
            <h2 className="text-3xl font-black -tracking-wide text-black">
              Bonus Kuis ✍
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Dapatkan bonus kuis untuk kamu yang telah berlangganan kelas ini.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
            {dummyQuiz.map((item) => (
              <div
                key={item.quiz_id}
                className="group relative isolate grid grid-cols-[max-content_1fr] items-center gap-4 overflow-hidden rounded-xl bg-white p-4 shadow-[4px_4px_36px_rgba(0,0,0,0.1)] ring-2 ring-gray/5 hover:cursor-pointer hover:bg-purple/10"
                onClick={() => handleOpenModalQuiz(item as QuizType)}
              >
                <div className="flex aspect-square size-full items-center justify-center rounded-md bg-purple/5 p-2 text-6xl">
                  📚
                </div>

                <div className="grid gap-4">
                  <CustomTooltip content={item.quiz_name}>
                    <h1 className="line-clamp-2 font-black text-black group-hover:text-purple">
                      {item.quiz_name}
                    </h1>
                  </CustomTooltip>

                  <div className="grid gap-1">
                    <span className="text-xs font-medium text-gray">
                      Jumlah Soal:
                    </span>

                    <div className="flex items-center gap-1">
                      <ClipboardText
                        weight="duotone"
                        size={18}
                        className="text-purple"
                      />

                      <p className="text-sm font-semibold capitalize text-black">
                        {item.total_questions} butir
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {selectedQuiz && (
              <Modal
                size="lg"
                placement="center"
                scrollBehavior="inside"
                isOpen={isOpenModalQuiz}
                onOpenChange={(open) => setIsOpenModalQuiz(open)}
              >
                <ModalContent>
                  <ModalHeader className="font-bold text-black">
                    Detail Kuis
                  </ModalHeader>

                  <ModalBody>
                    <div className="grid items-start gap-8 sm:flex">
                      <div className="text-5xl">📚</div>

                      <div className="grid gap-6">
                        <div className="grid gap-2">
                          <h1 className="text-xl font-extrabold text-black">
                            {selectedQuiz.quiz_name}
                          </h1>

                          <p className="text-sm font-medium leading-[170%] text-gray">
                            {selectedQuiz.quiz_description}
                          </p>
                        </div>

                        <IconContext.Provider
                          value={{
                            weight: "duotone",
                            size: 24,
                            className: "text-purple",
                          }}
                        >
                          <div>
                            {[
                              [
                                "Jumlah Soal",
                                <ClipboardText />,
                                `${selectedQuiz.total_questions}`,
                              ],
                            ].map(([label, icon, value], index) => (
                              <div key={index} className="grid gap-1">
                                <span className="text-sm font-medium text-gray">
                                  {label}:
                                </span>

                                <div className="flex items-center gap-1">
                                  {icon}

                                  <p className="text-sm font-semibold capitalize text-black">
                                    {value} butir
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </IconContext.Provider>

                        <Button
                          isDisabled={session.status == "unauthenticated"}
                          color="secondary"
                          onClick={() => {
                            router.push(
                              `/video/kuis/${selectedQuiz.quiz_name}/start`,
                            );
                          }}
                          className="font-bold"
                        >
                          Mulai Kuis!
                        </Button>
                      </div>
                    </div>
                  </ModalBody>

                  <ModalFooter />
                </ModalContent>
              </Modal>
            )}
          </div>
        </section>

        {/* <section className="base-container gap-8 py-[100px]">
          <div className="grid gap-1 text-center xl:text-left">
            <h2 className="text-3xl font-black -tracking-wide text-black">
              Riwayat Kuis 🕐
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Pantau semua jawaban kuis kamu untuk bahan belajar.
            </p>
          </div>

          <div>list quiz card</div>
        </section> */}

        <section ref={subscribeRef} className="base-container gap-8 py-[100px]">
          <div className="grid gap-1 text-center xl:text-left">
            <h2 className="text-3xl font-black -tracking-wide text-black">
              Langganan 🌟
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Tertarik? Ayo, berlangganan untuk mengakses semua video.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
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
