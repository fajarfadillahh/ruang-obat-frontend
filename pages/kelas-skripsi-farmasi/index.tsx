import CTASecondary from "@/components/cta/CTASecondary";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { AppContext } from "@/context/AppContext";
import { ThesisClassType, ThesisResponse } from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { MentorClassType } from "@/types/mentor.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { isNewProduct } from "@/utils/isNewProduct";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { PlayCircle } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

export default function PharmacyThesisClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const ctx = useContext(AppContext);
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenDetailMentor, setIsOpenDetailMentor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ThesisClassType | null>(
    null,
  );
  const [selectedMentor, setSelectedMentor] = useState<MentorClassType | null>(
    null,
  );

  function handleOpenModal(
    prepClass: ThesisClassType,
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
      <Layout title="Kelas Skripsi Farmasi">
        <section className="mx-auto grid max-w-[600px] items-center gap-8 lg:max-w-[700px] xl:max-w-none">
          <div className="grid max-w-[850px] gap-[10px]">
            <h1 className="text-[48px] font-black capitalize leading-[110%] -tracking-wide text-black">
              Kelas Skripsi Farmasi
            </h1>
            <p className="font-medium leading-[170%] text-gray">
              Kelas Bimbingan Skripsi super lengkap, Ruang Obat solusinya😍 !!.
              Tidak hanya sebatas kelas saja, tapi kamu juga akan dibimbing dari
              nol hingga meraih sarjana. Bahkan, kelas skripsi ini sudah
              termasuk free konsultasi via Wathsapp dan free video recording
              yang bisa kamu tonton kembali sepuasnya. Kelas skripsi bersifat
              private one-by-one dengan mentor, sehingga akan membuatmu lebih
              fokus dalam mengerjakan skripsi.
              <br />
              <br />
              Paket bootcamp 30 hari akan membantu proses skripsimu lebih cepat
              selesai. Terdapat berbagai macam jenis kelas, meliputi Kelas Judul
              dan Pengenalan Penelitian, Kelas Bab 1-3, Kelas Simulasi Sempro,
              Kelas Revisian, Kelas Analisa data SPSS, Kelas Kompre dan Kelas
              Simulasi Sidang Hasil.
            </p>
          </div>

          <Button
            color="secondary"
            as={Link}
            href="#list-class"
            className="w-max px-16 font-bold"
          >
            Pilih Kelas
          </Button>
        </section>

        <section id="list-class" className="grid gap-4 [padding:110px_0_100px]">
          <h2 className="max-w-[350px] text-center text-[28px] font-black leading-[120%] -tracking-wide text-black xs:max-w-none xl:text-left">
            Daftar Kelas Skripsi 🔥
          </h2>

          {data?.theses.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray/20">
              <EmptyData text="Kelas Skripsi Farmasi Tidak Ditemukan 😥" />
            </div>
          ) : (
            <div className="mx-auto grid max-w-[600px] gap-4 sm:grid-cols-2 sm:items-start lg:max-w-[700px] xl:mx-0 xl:max-w-none xl:grid-cols-3 xl:gap-8">
              {data?.theses.map((item: ThesisClassType) => (
                <div
                  key={item.thesis_id}
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

                  {item.thumbnail_type === "video" ? (
                    <>
                      <div className="relative aspect-square size-full overflow-hidden rounded-xl">
                        <Image
                          src="/img/default-thumbnail.png"
                          alt="thumbnail img"
                          width={500}
                          height={500}
                          className="h-full w-full object-cover object-center group-hover:grayscale-[0.5]"
                        />

                        <div
                          onClick={() => handleOpenModal(item, "video")}
                          className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
                        >
                          <div className="flex size-14 items-center justify-center rounded-full bg-white/10 p-[2px] backdrop-blur-md hover:cursor-pointer hover:bg-white/30">
                            <PlayCircle
                              weight="fill"
                              size={56}
                              className="text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {selectedClass && (
                        <Modal
                          isDismissable={false}
                          size="xl"
                          placement="center"
                          hideCloseButton={true}
                          isOpen={isOpenVideo}
                          onOpenChange={(open) => setIsOpenVideo(open)}
                        >
                          <ModalContent>
                            {(onClose) => (
                              <>
                                <ModalHeader className="flex flex-col gap-1 font-extrabold text-black">
                                  Cuplikan Video
                                </ModalHeader>

                                <ModalBody>
                                  <div className="aspect-video h-full w-full">
                                    {isLoading && (
                                      <div className="flex h-full w-full items-center justify-center">
                                        <h1 className="font-semibold text-black">
                                          Loading video...
                                        </h1>
                                      </div>
                                    )}

                                    {PreviewVideo(
                                      selectedClass.thumbnail_url as string,
                                    )}
                                  </div>
                                </ModalBody>

                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    variant="light"
                                    onPress={() => {
                                      onClose(), setIsLoading(false);
                                    }}
                                    className="font-bold"
                                  >
                                    Tutup
                                  </Button>
                                </ModalFooter>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
                      )}
                    </>
                  ) : (
                    <div className="aspect-square size-full overflow-hidden rounded-xl bg-purple group-hover:grayscale-[0.5]">
                      <Image
                        src={item.thumbnail_url as string}
                        alt="thumbnail img"
                        width={500}
                        height={500}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  )}

                  <div className="grid gap-8">
                    <div className="grid gap-[10px]">
                      <h1 className="line-clamp-2 text-lg font-black leading-[120%] text-black group-hover:text-purple">
                        {item.title}
                      </h1>

                      <h2 className="font-bold text-purple">
                        {formatRupiah(item.price)},-
                      </h2>
                    </div>

                    <div className="grid gap-[10px]">
                      <Button
                        variant="bordered"
                        onPress={() => handleOpenModal(item, "detail")}
                        className="font-bold text-black"
                      >
                        Detail Kelas
                      </Button>

                      <Button
                        variant="flat"
                        color="secondary"
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

                      <Modal
                        size="lg"
                        scrollBehavior="inside"
                        placement="center"
                        isOpen={isOpenDetail}
                        onOpenChange={(open) => setIsOpenDetail(open)}
                      >
                        <ModalContent>
                          {(onClose) => (
                            <>
                              <ModalHeader className="flex flex-col gap-1 font-extrabold text-black">
                                Deskripsi Kelas
                              </ModalHeader>

                              <ModalBody>
                                <p className="font-medium leading-[170%] text-gray">
                                  {selectedClass?.description}
                                </p>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {data?.mentors.length ? (
          <section className="grid gap-4 py-[100px]">
            <h2 className="max-w-[350px] text-center text-[28px] font-black leading-[120%] -tracking-wide text-black xs:max-w-none xl:text-left">
              Daftar Mentor 📢
            </h2>

            <div className="mx-auto grid max-w-[600px] gap-4 sm:grid-cols-2 sm:items-start lg:max-w-[700px] xl:mx-0 xl:max-w-none xl:grid-cols-3 xl:gap-8">
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
                    <h4 className="line-clamp-2 text-[20px] font-black leading-[120%] text-black group-hover:text-purple">
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
  data?: ThesisResponse;
  error?: ErrorDataType;
};

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  try {
    const response = (await fetcher({
      method: "GET",
      url: "/general/theses",
    })) as SuccessResponse<ThesisResponse>;

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
