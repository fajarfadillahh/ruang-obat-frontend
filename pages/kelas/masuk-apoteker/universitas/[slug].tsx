import ButtonBack from "@/components/button/ButtonBack";
import CTAPrivateClass from "@/components/cta/CTAPrivateClass";
import CustomTooltip from "@/components/CustomTooltip";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
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
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HTMLAttributes, useState } from "react";

type UniversitiesDetailResponse = {
  univ_id: string;
  slug: string;
  title: string;
  description: any;
  thumbnail_url: string;
  created_at: string;
  tryouts: {
    ass_id: string;
    title: string;
    description: string;
    total_questions: number;
    has_access: boolean;
  }[];
  histories: {
    assr_id: string;
    score: number;
    created_at: string;
    ass_id: string;
    title: string;
  }[];
  is_login: boolean;
  has_subscription: boolean;
};

export default function DetailTryoutUniversityPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const session = useSession();
  const [selectedTryout, setSelectedTryout] = useState<{
    ass_id: string;
    title: string;
    description: string;
    total_questions: number;
    has_access: boolean;
  } | null>(null);
  const [isOpenModalTryout, setIsOpenModalTryout] = useState<boolean>(false);

  function handleOpenModalTryout(prepTryout: {
    ass_id: string;
    title: string;
    description: string;
    total_questions: number;
    has_access: boolean;
  }) {
    setSelectedTryout(prepTryout);
    setIsOpenModalTryout(true);
  }

  return (
    <>
      <Layout title={`Detail ${data?.title ? data.title : ""}`}>
        <ButtonBack />

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
                        {selectedTryout.title}
                      </h1>

                      <p className="text-sm font-medium leading-[170%] text-gray">
                        {selectedTryout.description}
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
                            <ClipboardText key={selectedTryout.ass_id} />,
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
                      isDisabled={
                        session.status == "unauthenticated" ||
                        !data?.has_subscription ||
                        !selectedTryout.has_access
                      }
                      color="secondary"
                      onClick={() => {
                        if (
                          session.status == "unauthenticated" ||
                          !data?.has_subscription ||
                          !selectedTryout.has_access
                        ) {
                          return;
                        } else {
                          router.push({
                            pathname: `/quiz/${selectedTryout.ass_id}/start`,
                            query: {
                              title: selectedTryout.title,
                              type: `tryout_university`,
                            },
                          });
                        }
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

        <section className="base-container gap-8 pt-8 lg:grid-cols-[max-content_1fr] lg:items-start lg:gap-16 xl:items-center">
          <Image
            src={data?.thumbnail_url as string}
            alt={data?.title as string}
            width={1000}
            height={1000}
            className="w-full max-w-[280px] rounded-xl object-cover object-center"
          />

          <div className="grid gap-4">
            <h1 className="text-4xl font-black capitalize -tracking-wide text-black">
              {data?.title}
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              {data?.description}
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

          {data?.tryouts.length ? (
            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
              {data?.tryouts.map((tryout) => (
                <CardTryout
                  key={tryout.ass_id}
                  type="bonus"
                  title={tryout.title}
                  data={tryout.total_questions}
                  onClick={() => handleOpenModalTryout(tryout)}
                />
              ))}
            </div>
          ) : (
            <div className="grid justify-items-center gap-4 rounded-xl border-2 border-dashed border-gray/20 p-8">
              <Image
                src="https://ruangobat.is3.cloudhost.id/statics/images/main-illustrations/img-no-data-upload.webp"
                alt="no data image"
                width={1000}
                height={1000}
                className="h-[280px] w-auto"
              />

              <h3 className="max-w-[400px] text-center text-xl font-extrabold text-black">
                Tryout masih di input ya guys, mohon tunggu sebentar...
              </h3>
            </div>
          )}
        </section>

        {data?.is_login ? (
          <section className="base-container gap-4 py-[100px]">
            <div className="grid">
              <h2 className="text-3xl font-black -tracking-wide text-black">
                Riwayat Tryout 🕐
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                Pantau semua jawaban tryout kamu untuk bahan belajar.
              </p>
            </div>

            {data.histories.length ? (
              <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
                {data.histories.map((history) => (
                  <CardTryout
                    key={history.assr_id}
                    type="history"
                    title={history.title}
                    data={history.score}
                    onClick={() =>
                      router.push({
                        pathname: `/quiz/${history.assr_id}/result`,
                        query: {
                          title: history.title,
                          type: `tryout_university`,
                        },
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="grid justify-items-center gap-4 rounded-xl border-2 border-dashed border-gray/20 p-8">
                <Image
                  src="https://ruangobat.is3.cloudhost.id/statics/images/main-illustrations/img-no-data-upload.webp"
                  alt="no data image"
                  width={1000}
                  height={1000}
                  className="h-[280px] w-auto"
                />

                <h3 className="max-w-[400px] text-center text-xl font-extrabold text-black">
                  Kamu belum mengerjakan tryout satupun...
                </h3>
              </div>
            )}
          </section>
        ) : null}

        <CTAPrivateClass />
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: UniversitiesDetailResponse;
  error?: any;
}> = async ({ req, res, params }) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    const response: SuccessResponse<UniversitiesDetailResponse> = await fetcher(
      {
        url: `/universities/${params?.slug}/detail`,
        method: "GET",
        token: session?.user.access_token,
      },
    );

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
      className="group relative isolate grid grid-cols-[max-content_1fr] items-center gap-4 overflow-hidden rounded-xl border-2 border-gray/10 p-4 hover:cursor-pointer hover:bg-purple/10"
      {...props}
    >
      <div className="flex aspect-square size-full items-center justify-center rounded-md bg-purple/5 p-2 text-5xl">
        {emoji}
      </div>

      <div className="grid gap-4">
        <CustomTooltip content={title}>
          <h3 className="line-clamp-2 font-black text-black group-hover:text-purple">
            {title}
          </h3>
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
