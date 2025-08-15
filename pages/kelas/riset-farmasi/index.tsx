import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CTASecondary from "@/components/cta/CTASecondary";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/footer/Footer";
import TextHighlight from "@/components/text/TextHighlight";
import Layout from "@/components/wrapper/Layout";
import { AppContext } from "@/context/AppContext";
import { ResearchClassType, ResearchResponse } from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { MentorClassType } from "@/types/mentor.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
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
  ArrowRight,
  ClipboardText,
  HandWaving,
  MagnifyingGlass,
  Microscope,
  ShareNetwork,
  Sparkle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useRef, useState } from "react";

const benefits = [
  {
    icon: Microscope,
    description:
      "Mempelajari berbagai aspek dan hal-hal teknikal di laboratorium",
  },
  {
    icon: ClipboardText,
    description: "Mempelajari berbagai aspek dan hal-hal teknikal dalam teori",
  },
  {
    icon: HandWaving,
    description: "Cara meminimalisir terjadinya trial error saat penelitian",
  },
  {
    icon: MagnifyingGlass,
    description: "Mempelajari prinsip-prinsip penting saat memulai penelitian",
  },
];

export default function PharmacyResearchClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const ctx = useContext(AppContext);
  const listClassRef = useRef<HTMLElement | null>(null);
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenDetailMentor, setIsOpenDetailMentor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ResearchClassType | null>(
    null,
  );
  const [selectedMentor, setSelectedMentor] = useState<MentorClassType | null>(
    null,
  );

  function handleOpenModal(
    prepClass: ResearchClassType,
    type: "video" | "detail",
  ) {
    setSelectedClass(prepClass);

    if (type === "video") {
      setIsLoading(true);
      setIsOpenVideo(true);
    } else {
      setIsOpenDetail(true);
    }
  }

  function handleOpenModalDetailMentor(prepClass: MentorClassType) {
    setSelectedMentor(prepClass);
    setIsOpenDetailMentor(true);
  }

  function handleVideoLoad() {
    setIsLoading(false);
  }

  function PreviewVideo(url: string) {
    const videoID = new URL(url).searchParams.get("v");
    const embedURL = `https://www.youtube.com/embed/${videoID}`;

    return (
      <iframe
        allowFullScreen
        src={embedURL}
        title="Preview Video Player"
        onLoad={handleVideoLoad}
        className="h-full w-full rounded-xl"
      />
    );
  }

  return (
    <>
      <Layout
        title="Ruang Riset Farmasi: Kunci Sukses Memahami dan Menerapkan Metode Penelitian"
        description="Kelas ini dirancang untuk membekali kamu dengan keterampilan riset farmasi, mulai dari perencanaan penelitian hingga analisis data, dengan panduan dari para ahli berpengalaman."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container items-center gap-6 xl:grid-cols-[1fr_550px]">
          <div className="grid gap-4">
            <Chip
              color="primary"
              variant="flat"
              classNames={{
                content: "font-bold",
              }}
              className="mb-2"
            >
              🔍 Ruang Riset Farmasi
            </Chip>

            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl">
              Kunci Sukses{" "}
              <TextHighlight
                text="Memahami dan Menerapkan"
                className="font-black"
              />{" "}
              Metode Penelitian
            </h1>

            <p className="mb-6 font-medium leading-[170%] text-gray">
              Untuk mahasiswa S1 ataupun S2 yang membutuhkan bimbingan terkait
              riset secara teknikal, kelas ini akan sangat membantu kalian,
              dikarenakan mentor-mentor yang mengajar berasal dari praktisi
              Researcher, Formulator, dan lain-lain yang sudah berpengalaman di
              masing - masing bidang terkait.
            </p>

            <div className="grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                color="secondary"
                endContent={<Sparkle weight="duotone" size={18} />}
                onClick={() => scrollToSection(listClassRef)}
                className="px-6 font-bold"
              >
                Pilih Kelas Sekarang!
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
            src="https://ruangobat.is3.cloudhost.id/statics/images/main-illustrations/img-5.webp"
            alt="class subject img"
            width={1000}
            height={1000}
            className="w-full justify-self-center"
          />
        </section>

        <section className="base-container gap-4 [margin:4rem_auto_100px] xs:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-xl border-2 border-gray/10 p-8"
            >
              <benefit.icon
                weight="duotone"
                size={48}
                className="text-purple"
              />

              <p className="font-medium leading-[170%] text-gray">
                {benefit.description}
              </p>
            </div>
          ))}
        </section>

        <section
          ref={listClassRef}
          className="base-container gap-4 [padding:110px_0_100px]"
        >
          <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
            Daftar Kelas Riset 📚
          </h2>

          {data?.research.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray/20 p-6">
              <EmptyData text="Kelas Riset Farmasi Tidak Ditemukan 😥" />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
              {data?.research.map((item: ResearchClassType) => (
                <div
                  key={item.research_id}
                  className="base-card group relative"
                >
                  {/* {isNewProduct(item.created_at) ? (
                    <Chip
                      color="danger"
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
                    src={item.thumbnail_url as string}
                    alt="thumbnail"
                    width={304}
                    height={304}
                    className="aspect-square h-auto w-full object-cover object-center group-hover:grayscale-[0.5]"
                  />

                  <div className="grid gap-6 [padding:1.5rem_1rem]">
                    <div className="grid gap-1">
                      <h1 className="line-clamp-2 text-lg font-black text-black group-hover:text-purple">
                        {item.title}
                      </h1>

                      <p className="font-bold text-purple">
                        {formatRupiah(item.price)},-
                      </p>
                    </div>

                    <Button
                      variant="light"
                      color="secondary"
                      endContent={<ArrowRight weight="bold" size={16} />}
                      onClick={() => {
                        if (session.status == "unauthenticated") {
                          ctx?.onOpenUnauthenticated();
                        } else {
                          window.open(item.link_order, "_blank");
                        }
                      }}
                      className="font-bold"
                    >
                      Booking Kelas
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {data?.mentors.length ? (
          <section className="base-container gap-4 py-[100px]">
            <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
              Daftar Mentor 📢
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
              {data?.mentors.map((mentor: MentorClassType) => (
                <div
                  key={mentor.class_mentor_id}
                  className="group grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
                >
                  <Image
                    priority
                    src={mentor.img_url as string}
                    alt="mentor img"
                    width={304}
                    height={304}
                    className="aspect-square h-auto w-full rounded-xl object-cover object-center group-hover:grayscale-[0.5]"
                  />

                  <div className="grid flex-1 gap-1">
                    <h4 className="line-clamp-2 text-2xl font-black text-black group-hover:text-purple">
                      {mentor.fullname}
                    </h4>

                    <p className="text-sm font-medium capitalize leading-[170%] text-gray">
                      {mentor.mentor_title}
                    </p>
                  </div>

                  <>
                    <Button
                      variant="flat"
                      color="secondary"
                      onPress={() => handleOpenModalDetailMentor(mentor)}
                      className="font-bold"
                    >
                      Detail Mentor
                    </Button>

                    <Modal
                      size="lg"
                      scrollBehavior="inside"
                      placement="center"
                      isOpen={isOpenDetailMentor}
                      onOpenChange={(open) => setIsOpenDetailMentor(open)}
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold text-black">
                              Deskripsi Mentor
                            </ModalHeader>

                            <ModalBody>
                              <p
                                className="preventive-list preventive-table list-outside text-[16px] font-semibold leading-[170%] text-black"
                                dangerouslySetInnerHTML={{
                                  __html: selectedMentor?.description as string,
                                }}
                              />
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                                className="font-bold"
                              >
                                Tutup
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}

type DataProps = {
  data?: ResearchResponse;
  error?: ErrorDataType;
};

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  try {
    const response = (await fetcher({
      method: "GET",
      url: "/research",
    })) as SuccessResponse<ResearchResponse>;

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
