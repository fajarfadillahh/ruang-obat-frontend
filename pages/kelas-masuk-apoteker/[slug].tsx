import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import ButtonBack from "@/components/button/ButtonBack";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/footer/Footer";
import SearchInput from "@/components/SearchInput";
import Layout from "@/components/wrapper/Layout";
import { AppContext } from "@/context/AppContext";
import {
  PharmacistAdmissionDetailsClassType,
  PharmacistAdmissionDetailsResponse,
} from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { MentorClassType } from "@/types/mentor.type";
import { fetcher } from "@/utils/fetcher";
import { filterData } from "@/utils/filterData";
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
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function DetailPharmacyEntranceClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const session = useSession();
  const ctx = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClass, setSelectedClass] =
    useState<PharmacistAdmissionDetailsClassType | null>(null);

  function handleOpenModal(
    prepClass: PharmacistAdmissionDetailsClassType,
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

  // for search product/class
  const keysToFilter: (keyof PharmacistAdmissionDetailsClassType)[] = [
    "pa_id",
    "title",
  ];
  const filteredData = filterData(
    data?.pharmacist_admissions || [],
    search,
    keysToFilter,
  );

  return (
    <>
      <Layout title={`Detail ${data?.name}`}>
        <ButtonBack />

        <div className="mt-4">
          <BreadcrumbsUrl rootLabel="Home" basePath="/" />
        </div>

        <section className="base-container divide-y-2 divide-dashed divide-gray/20 [padding:2rem_0_100px]">
          <div className="grid gap-8 pb-20 lg:grid-cols-[max-content_1fr] lg:items-center">
            <Image
              src={data?.img_url as string}
              alt="logo university"
              width={1000}
              height={1000}
              className="w-full max-w-[300px] rounded-xl object-cover object-center"
            />

            <div className="grid max-w-[900px] gap-4">
              <h1 className="text-4xl font-black capitalize -tracking-wide text-black xl:text-5xl">
                {data?.name}
              </h1>

              <p className="font-medium leading-[170%] text-gray">
                {data?.description}
              </p>
            </div>
          </div>

          <div className="grid gap-4 pt-16">
            <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
              Daftar Video 🔥
            </h2>

            <SearchInput
              placeholder="Cari Video..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
              className="mb-4 max-w-[550px]"
            />

            {filteredData.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-gray/20 p-6">
                <EmptyData text="Video Tidak Ditemukan 😥" />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
                {data?.pharmacist_admissions.map(
                  (item: PharmacistAdmissionDetailsClassType) => (
                    <div
                      key={item.pa_id}
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
                        <div className="grid gap-2">
                          <h1 className="line-clamp-2 text-lg font-black text-black group-hover:text-purple">
                            {item.title}
                          </h1>

                          <p className="font-bold text-purple">
                            {formatRupiah(item.price)},-
                          </p>
                        </div>

                        <div className="grid gap-2">
                          <Button
                            variant="bordered"
                            onPress={() => handleOpenModal(item, "detail")}
                            className="font-bold text-black"
                          >
                            Detail
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
                            Beli Video
                          </Button>

                          {selectedClass && (
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
                                      Deskripsi Video
                                    </ModalHeader>

                                    <ModalBody>
                                      <p className="font-medium leading-[170%] text-gray">
                                        {selectedClass.description}
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
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
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
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="[padding:100px_0_156px]">
          <div className="mx-auto flex max-w-[600px] flex-col flex-wrap gap-8 rounded-xl border-2 border-l-[16px] border-black px-6 py-12 sm:px-16 lg:max-w-[700px] lg:flex-row lg:items-center lg:justify-between xl:max-w-[950px]">
            <div className="flex-1 lg:max-w-[500px]">
              <h2 className="pb-2 text-3xl font-black capitalize -tracking-wide text-black">
                Masih Kesulitan??? Kurang Paham??
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                Kamu bisa booking Kelas Private 1 on 1 Farmasi dengan mentor
                pilihanmu sekarang!!!
              </p>
            </div>

            <Button
              color="secondary"
              onClick={() =>
                router.push("/kelas-matkul-farmasi/kelas-privat-farmasi")
              }
              className="px-4 font-bold"
            >
              Booking Kelas Private
            </Button>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}

type DataProps = {
  data?: PharmacistAdmissionDetailsResponse;
  error?: ErrorDataType;
};

export const getServerSideProps: GetServerSideProps<DataProps> = async ({
  params,
}) => {
  try {
    const response = (await fetcher({
      method: "GET",
      url: `/general/pharmacistadmission/${params?.slug}`,
    })) as SuccessResponse<PharmacistAdmissionDetailsResponse>;

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
