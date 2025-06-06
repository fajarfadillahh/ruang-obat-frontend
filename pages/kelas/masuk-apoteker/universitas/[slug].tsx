import ButtonBack from "@/components/button/ButtonBack";
import CTAPrivateClass from "@/components/cta/CTAPrivateClass";
import CustomTooltip from "@/components/CustomTooltip";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { dummyTryout } from "@/config/dummy";
import { handleShareClipboard } from "@/utils/shareClipboard";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import {
  ClipboardText,
  IconContext,
  ShareNetwork,
  Trophy,
} from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HTMLAttributes, useState } from "react";

type TryoutType = {
  tryout_id: number;
  tryout_name: string;
  tryout_description: string;
  created_at: string;
  total_questions: number;
};

export default function DetailTryoutUniversityPage() {
  const router = useRouter();
  const session = useSession();
  const { slug } = router.query;
  const [selectedTryout, setSelectedTryout] = useState<TryoutType | null>(null);
  const [isOpenModalTryout, setIsOpenModalTryout] = useState<boolean>(false);

  function handleOpenModalTryout(prepTryout: TryoutType) {
    setSelectedTryout(prepTryout);
    setIsOpenModalTryout(true);
  }

  const decodedSlug = decodeURIComponent(slug as string)
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Layout title={`Detail ${decodedSlug}`}>
        <ButtonBack />

        <section className="base-container gap-8 pt-8 lg:grid-cols-[max-content_1fr] lg:items-start lg:gap-16 xl:items-center">
          <Image
            src="/img/default-thumbnail.png"
            alt="thumbnail"
            width={1000}
            height={1000}
            className="w-full max-w-[280px] rounded-xl object-cover object-center"
          />

          <div className="grid gap-4">
            <h1 className="text-4xl font-black capitalize -tracking-wide text-black">
              {decodedSlug}
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto atque omnis perspiciatis praesentium et eligendi
              dignissimos! Eveniet, sed enim dolore qui adipisci voluptates
              maiores quos itaque autem odio, est doloribus.
            </p>

            <Button
              aria-label="Share Link"
              variant="bordered"
              startContent={<ShareNetwork weight="duotone" size={18} />}
              onClick={handleShareClipboard}
              className="mt-4 w-max px-6 font-bold"
            >
              Bagikan
            </Button>
          </div>
        </section>

        <section className="base-container gap-4 py-[100px]">
          <div className="grid">
            <h2 className="text-3xl font-black -tracking-wide text-black">
              Daftar Tryout ✍
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Ayo, asah kemampuan kamu dengan mengerjakan tryout di bawah.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
            {dummyTryout.map((item) => (
              <CardTryout
                key={item.tryout_id}
                type="bonus"
                title={item.tryout_name}
                data={item.total_questions}
                onClick={() => handleOpenModalTryout(item)}
              />
            ))}

            {selectedTryout && (
              <Modal
                size="lg"
                placement="center"
                scrollBehavior="inside"
                isOpen={isOpenModalTryout}
                onOpenChange={(open) => setIsOpenModalTryout(open)}
              >
                <ModalContent>
                  <ModalHeader className="font-bold text-black">
                    Detail Tryout
                  </ModalHeader>

                  <ModalBody>
                    <div className="grid items-start gap-8 sm:flex">
                      <div className="text-5xl">📚</div>

                      <div className="grid gap-6">
                        <div className="grid gap-2">
                          <h1 className="text-xl font-extrabold text-black">
                            {selectedTryout.tryout_name}
                          </h1>

                          <p className="text-sm font-medium leading-[170%] text-gray">
                            {selectedTryout.tryout_description}
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
                                `${selectedTryout.total_questions}`,
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
                              `/quiz/${selectedTryout.tryout_id}/start`,
                            );
                          }}
                          className="font-bold"
                        >
                          Mulai Tryout!
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
                Riwayat Tryout 🕐
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                Pantau semua jawaban tryout kamu untuk bahan belajar.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
              {Array.from({ length: 1 }, (_, index) => (
                <CardTryout
                  key={index}
                  type="history"
                  title="Ini Adalah Judul History Bonus Tryout..."
                  data={100}
                  onClick={() => router.push(`/quiz/${index + 1}/result`)}
                />
              ))}
            </div>
          </section>
        )}

        <CTAPrivateClass />
      </Layout>

      <Footer />
    </>
  );
}

interface CardTryoutProps extends HTMLAttributes<HTMLDivElement> {
  type: "bonus" | "history";
  title: string;
  data: number;
}

function CardTryout({ type, title, data, ...props }: CardTryoutProps) {
  const emoji = type == "bonus" ? "📚" : "🏆";
  const icon = type == "bonus" ? <ClipboardText /> : <Trophy />;
  const label = type == "bonus" ? "Jumlah Soal:" : "Nilai:";
  const labelData = type == "bonus" ? `${data} butir` : `${data} poin`;

  return (
    <div
      className="group relative isolate grid grid-cols-[max-content_1fr] items-center gap-4 overflow-hidden rounded-xl border-2 border-gray/10 bg-white p-4 shadow-[4px_4px_36px_rgba(0,0,0,0.1)] hover:cursor-pointer hover:bg-purple/10"
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
