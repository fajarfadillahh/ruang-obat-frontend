import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { PreparationResponse } from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { customInputClassnames } from "@/utils/customInputClassnames";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { isNewProduct } from "@/utils/isNewProduct";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { MagnifyingGlass, PlayCircle } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ExamPreparationVideoClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function PreviewVideo(url: string) {
    const videoID = new URL(url).searchParams.get("v");
    const embedURL = `https://www.youtube.com/embed/${videoID}`;

    return (
      <iframe
        allowFullScreen
        src={embedURL}
        title="Preview Video Player"
        className="h-full w-full rounded-xl"
      />
    );
  }

  return (
    <>
      <Layout title="Kelas Video Persiapan UTS/UAS">
        <section className="mx-auto grid max-w-[600px] items-center gap-16 lg:max-w-[700px] xl:max-w-none xl:grid-cols-2">
          <Image
            priority
            src="/img/class-subject-exam-prepration-img.png"
            alt="class subject img"
            width={510}
            height={340}
            className="justify-self-center"
          />

          <div>
            <h1 className="pb-2 text-[48px] font-black capitalize leading-[110%] -tracking-wide text-black">
              Kelas Video Persiapan UTS/UAS
            </h1>
            <p className="pb-8 font-medium leading-[170%] text-gray">
              Dikelas ini kami menyediakan video pembelajaran Mata Kuliah S1 &
              D3 yang lengkap dan mudah dipahami. Solusi praktis untuk membantu
              kamu belajar kapan saja dan di mana saja.
            </p>
            <Button
              color="secondary"
              as={Link}
              href="#list-video"
              className="font-bold"
            >
              Pilih Video Pembelajaran
            </Button>
          </div>
        </section>

        <section
          id="list-video"
          className="mx-auto grid max-w-[600px] gap-4 [padding:110px_0_100px] lg:max-w-[700px] xl:max-w-none"
        >
          <h2 className="text-center text-[32px] font-black capitalize leading-[120%] -tracking-wide text-black xl:text-left">
            Daftar Video
          </h2>

          <Input
            type="text"
            variant="flat"
            labelPlacement="outside"
            placeholder="Cari Video..."
            startContent={
              <MagnifyingGlass weight="bold" size={18} className="text-gray" />
            }
            classNames={customInputClassnames}
            className="max-w-[500px] pt-2"
          />

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
            {data?.preparation_classes.map((preparation) => (
              <div
                key={preparation.subject_id}
                className="group relative grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
              >
                {isNewProduct(preparation.created_at) ? (
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

                <div className="relative aspect-square size-full overflow-hidden rounded-xl">
                  {preparation.thumbnail_type === "video" ? (
                    <>
                      <Image
                        src="/img/default-thumbnail-product-digital.png"
                        alt="thumbnail img"
                        width={500}
                        height={500}
                        className="h-full w-full object-cover object-center group-hover:grayscale-[0.5]"
                      />

                      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                        <Button
                          isIconOnly
                          color="secondary"
                          variant="light"
                          radius="full"
                          size="lg"
                          onPress={onOpen}
                        >
                          <PlayCircle
                            weight="fill"
                            size={56}
                            className="text-white"
                          />
                        </Button>
                      </div>

                      <Modal
                        isDismissable={false}
                        size="xl"
                        placement="center"
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                      >
                        <ModalContent>
                          {(onClose) => (
                            <>
                              <ModalHeader className="flex flex-col gap-1 font-extrabold text-black">
                                Cuplikan Video
                              </ModalHeader>

                              <ModalBody>
                                <div className="aspect-video h-full w-full">
                                  {PreviewVideo(
                                    preparation.thumbnail_url as string,
                                  )}
                                </div>
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
                  ) : (
                    <>
                      <Image
                        src={preparation.thumbnail_url as string}
                        alt="thumbnail img"
                        width={500}
                        height={500}
                        className="h-full w-full object-cover object-center group-hover:grayscale-[0.5]"
                      />

                      <div className="absolute left-0 top-0 h-full w-full" />
                    </>
                  )}
                </div>

                <div className="grid gap-8">
                  <div className="grid gap-[10px]">
                    <h1 className="line-clamp-2 text-lg font-black leading-[120%] text-black group-hover:text-purple">
                      {preparation.title}
                    </h1>

                    <h2 className="font-bold text-purple">
                      {formatRupiah(preparation.price)},-
                    </h2>
                  </div>

                  <Button
                    as={Link}
                    href={preparation.link_order}
                    target="_blank"
                    variant="flat"
                    color="secondary"
                    className="font-bold"
                  >
                    Beli Video
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="[padding:100px_0_156px]">
          <div className="mx-auto flex max-w-[600px] flex-col flex-wrap gap-8 rounded-xl border-2 border-l-[16px] border-black px-6 py-12 sm:px-16 lg:max-w-[700px] lg:flex-row lg:items-center lg:justify-between xl:max-w-[950px]">
            <div className="flex-1 lg:max-w-[500px]">
              <h2 className="pb-2 text-2xl font-black capitalize leading-[120%] -tracking-wide text-black">
                Masih Kesulitan??? Kurang Paham??
              </h2>
              <p className="font-medium leading-[170%] text-gray">
                Kamu bisa booking Kelas Private One-by-One dengan mentor
                pilihanmu sekarang!!!
              </p>
            </div>

            <Button
              color="secondary"
              onClick={() =>
                router.push("/kelas-video-matkul-s1-d3/kelas-privat-farmasi")
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
