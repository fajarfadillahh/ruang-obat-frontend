import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/footer/Footer";
import SearchInput from "@/components/SearchInput";
import Layout from "@/components/wrapper/Layout";
import {
  PreparationClassType,
  PreparationResponse,
} from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { MentorClassType } from "@/types/mentor.type";
import { fetcher } from "@/utils/fetcher";
import { filterData } from "@/utils/filterData";
import { isNewProduct } from "@/utils/isNewProduct";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ExamPreparationVideoClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [search, setSearch] = useState("");

  // for search product/class
  const keysToFilter: (keyof PreparationClassType)[] = ["subject_id", "title"];
  const filteredData = filterData(
    data?.preparation_classes || [],
    search,
    keysToFilter,
  );

  return (
    <>
      <Layout
        title="Video Pembelajaran Mata Kuliah Farmasi"
        description="Solusi praktis untuk membantu kamu belajar kapan saja dan di mana saja dengan video pembelajaran mata kuliah farmasi yang lengkap dan mudah dipahami."
      >
        <BreadcrumbsUrl rootLabel="Home" basePath="/" />

        <section className="base-container items-center gap-16 xl:grid-cols-2 xl:gap-2">
          <div>
            <h1 className="mb-4 text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
              Video Pembelajaran Mata Kuliah Farmasi
            </h1>

            <p className="mb-10 font-medium leading-[170%] text-gray">
              Dikelas ini kami menyediakan video pembelajaran mata kuliah
              farmasi yang lengkap dan mudah dipahami. Solusi praktis untuk
              membantu kamu belajar kapan saja dan di mana saja.
            </p>

            <Button
              color="secondary"
              as={Link}
              href="#list-video"
              className="px-8 font-bold"
            >
              Pilih Video Belajar
            </Button>
          </div>

          <Image
            priority
            src="/img/base/video-pembelajaran-img.svg"
            alt="class subject img"
            width={510}
            height={340}
            className="h-[600px] w-full justify-self-center xl:justify-self-end"
          />
        </section>

        <section
          id="list-video"
          className="base-container gap-4 [padding:110px_0_100px]"
        >
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
            <div className="rounded-xl border-2 border-dashed border-gray/20">
              <EmptyData text="Video Tidak Ditemukan 😥" />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
              {data?.preparation_classes.map((item: PreparationClassType) => (
                <div
                  key={item.subject_id}
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

                  <Image
                    priority
                    src="/img/default-thumbnail.png"
                    alt="thumbnail"
                    width={304}
                    height={304}
                    className="aspect-square h-auto w-full rounded-xl object-cover object-center group-hover:grayscale-[0.5]"
                  />

                  <div className="grid gap-4">
                    <h1 className="line-clamp-2 text-xl font-black text-black group-hover:text-purple">
                      {item.title}
                    </h1>

                    <Button
                      variant="flat"
                      color="secondary"
                      className="font-bold"
                    >
                      Detail Video
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="base-container gap-4 py-[100px]">
          <div className="grid gap-1">
            <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
              Daftar Quiz ✍
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Agar lebih percaya diri lagi, kamu bisa mencoba quiz-quiz menarik!
            </p>
          </div>

          <p className="mt-6 text-xl font-medium text-gray">
            Daftar bonus quiz akan muncul disini!
          </p>
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
                      onPress={onOpen}
                      className="font-bold"
                    >
                      Detail Mentor
                    </Button>

                    <Modal
                      size="lg"
                      scrollBehavior="inside"
                      placement="center"
                      isOpen={isOpen}
                      onOpenChange={onOpenChange}
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold text-black">
                              Deskripsi Mentor
                            </ModalHeader>

                            <ModalBody>
                              <p
                                className="preventive-list preventive-table list-outside text-base font-semibold leading-[170%] text-black"
                                dangerouslySetInnerHTML={{
                                  __html: mentor?.description as string,
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
