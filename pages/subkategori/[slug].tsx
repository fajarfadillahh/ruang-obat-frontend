import ButtonBack from "@/components/button/ButtonBack";
import CTASecondary from "@/components/cta/CTASecondary";
import CustomTooltip from "@/components/CustomTooltip";
import Footer from "@/components/footer/Footer";
import SectionSubscription from "@/components/section/SectionSubscription";
import Layout from "@/components/wrapper/Layout";
import { dummyListVideo, dummyQuiz } from "@/data/dummy";
import { scrollToSection } from "@/utils/scrollToSection";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import {
  Asclepius,
  ClipboardText,
  IconContext,
  Trophy,
  VideoCamera,
} from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { HTMLAttributes, useRef, useState } from "react";

type QuizType = {
  quiz_id: number;
  quiz_name: string;
  quiz_description: string;
  created_at: string;
  total_questions: number;
};

export default function SubCategoryPage() {
  const router = useRouter();
  const session = useSession();
  const { slug } = router.query;
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [isOpenModalQuiz, setIsOpenModalQuiz] = useState<boolean>(false);

  const subscribeRef = useRef<HTMLElement | null>(null);
  const quizRef = useRef<HTMLElement | null>(null);

  function handleOpenModalQuiz(prepQuiz: QuizType) {
    setSelectedQuiz(prepQuiz);
    setIsOpenModalQuiz(true);
  }

  const decodedSlug = decodeURIComponent(slug as string)
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Layout title={decodedSlug}>
        <ButtonBack />

        <section className="base-container gap-16 [padding:50px_0_100px]">
          <div className="flex items-start gap-4">
            <Asclepius weight="duotone" size={72} className="text-purple" />

            <div className="grid gap-6">
              <h1 className="flex-1 text-3xl font-black text-black xl:text-4xl">
                {decodedSlug}
              </h1>

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
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
            {dummyListVideo.map((item, index) => (
              <Link
                key={index}
                href={`/video/${item.slug}`}
                className="base-card group relative isolate"
              >
                {/* {isNewProduct(item.created_at) ? (
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
                ) : null} */}

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
              </Link>
            ))}
          </div>
        </section>

        <section ref={quizRef} className="base-container gap-4 py-[100px]">
          <div className="grid">
            <h2 className="text-3xl font-black -tracking-wide text-black">
              Bonus Kuis ✍
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Dapatkan bonus kuis untuk kamu yang telah berlangganan kelas ini.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
            {dummyQuiz.map((item) => (
              <CardQuiz
                key={item.quiz_id}
                type="bonus"
                title={item.quiz_name}
                data={item.total_questions}
                onClick={() => handleOpenModalQuiz(item as QuizType)}
              />
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
                            router.push(`/quiz/${selectedQuiz.quiz_id}/start`);
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

        {session.status == "authenticated" && (
          <section className="base-container gap-4 py-[100px]">
            <div className="grid">
              <h2 className="text-3xl font-black -tracking-wide text-black">
                Riwayat Kuis 🕐
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                Pantau semua jawaban kuis kamu untuk bahan belajar.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
              {Array.from({ length: 1 }, (_, index) => (
                <CardQuiz
                  key={index}
                  type="history"
                  title="Ini Adalah Judul History Bonus Kuis..."
                  data={100}
                  onClick={() => router.push(`/quiz/${index + 1}/result`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* flash card / summary card */}
        <SectionSubscription sectionRef={subscribeRef} />

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}

interface CardQuizProps extends HTMLAttributes<HTMLDivElement> {
  type: "bonus" | "history";
  title: string;
  data: number;
}

function CardQuiz({ type, title, data, ...props }: CardQuizProps) {
  const emoji = type == "bonus" ? "📚" : "🏆";
  const icon = type == "bonus" ? <ClipboardText /> : <Trophy />;
  const label = type == "bonus" ? "Jumlah Soal:" : "Nilai:";
  const labelData = type == "bonus" ? `${data} butir` : `${data} poin`;

  return (
    <div
      className="group relative isolate grid grid-cols-[max-content_1fr] items-center gap-4 overflow-hidden rounded-xl border-2 border-gray/10 p-4 hover:cursor-pointer hover:bg-purple/10"
      {...props}
    >
      <div className="flex aspect-square size-full items-center justify-center rounded-md bg-purple/5 p-2 text-5xl">
        {emoji}
      </div>

      <div className="grid gap-4">
        <CustomTooltip content={title}>
          <h1 className="line-clamp-2 font-black text-black group-hover:text-purple">
            {title}
          </h1>
        </CustomTooltip>

        <div className="grid gap-1">
          <span className="text-xs font-medium text-gray">{label}</span>

          <div className="flex items-center gap-1">
            <IconContext.Provider
              value={{
                weight: "duotone",
                size: 18,
                className: "text-purple",
              }}
            >
              {icon}
            </IconContext.Provider>

            <p className="text-sm font-semibold capitalize text-black">
              {labelData}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
