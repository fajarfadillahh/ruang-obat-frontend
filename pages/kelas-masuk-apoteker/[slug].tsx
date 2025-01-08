import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { customInputClassnames } from "@/utils/customInputClassnames";
import { formatRupiah } from "@/utils/formatRupiah";
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
import { Images, MagnifyingGlass, PlayCircle } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function DetailPharmacyEntranceClassPage() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Layout className={`Kelas Masuk Apoteker Nama Univ.`}>
        <ButtonBack />

        <section className="divide-y-2 divide-dashed divide-gray/20 [padding:2rem_0_100px]">
          <h1 className="pb-16 text-[48px] font-black capitalize leading-[110%] -tracking-wide text-black">
            Kelas Masuk Apoteker Universitas Pancasila
          </h1>

          <div className="mx-auto grid max-w-[600px] gap-4 pt-16 lg:max-w-[700px] xl:max-w-none">
            <h2 className="text-center text-[32px] font-black capitalize leading-[120%] -tracking-wide text-black xl:text-left">
              Daftar Video
            </h2>

            <Input
              type="text"
              variant="flat"
              labelPlacement="outside"
              placeholder="Cari Video..."
              startContent={
                <MagnifyingGlass
                  weight="bold"
                  size={18}
                  className="text-gray"
                />
              }
              classNames={customInputClassnames}
              className="max-w-[500px] pt-2"
            />

            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="group relative grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
                >
                  <Chip
                    color="danger"
                    className="absolute right-8 top-8 z-10"
                    classNames={{
                      content: "font-bold px-4",
                    }}
                  >
                    Baru
                  </Chip>

                  <div className="relative aspect-square size-full overflow-hidden rounded-xl">
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-purple/20">
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
                          size={48}
                          className="text-purple"
                        />
                      </Button>
                    </div>

                    <Modal
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
                              <div className="flex aspect-video h-auto w-full items-center justify-center rounded-xl bg-gray/20">
                                <Images
                                  weight="bold"
                                  size={56}
                                  className="text-gray"
                                />
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

                    <div className="flex h-full w-full items-center justify-center bg-purple/10 group-hover:bg-purple/30">
                      <Images weight="bold" size={72} className="text-white" />
                    </div>
                  </div>

                  <div className="grid gap-8">
                    <div className="grid gap-[10px]">
                      <h1 className="line-clamp-2 text-lg font-black leading-[120%] text-black group-hover:text-purple">
                        Judul video pembelajaran
                      </h1>

                      <h2 className="font-bold text-purple">
                        {formatRupiah(500000)},-
                      </h2>
                    </div>

                    <Button
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
