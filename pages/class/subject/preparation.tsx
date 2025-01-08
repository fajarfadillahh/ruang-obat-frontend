import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { customInputClassnames } from "@/utils/customInputClassnames";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Images, MagnifyingGlass, PlayCircle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function SubjectPreparationPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          <h2 className="text-center text-[32px] font-extrabold capitalize leading-[130%] -tracking-wide text-black xl:text-left">
            Daftar Video Pembelajaran
          </h2>

          <Input
            type="text"
            variant="flat"
            labelPlacement="outside"
            placeholder="Cari Video Pembelajaran..."
            startContent={
              <MagnifyingGlass weight="bold" size={18} className="text-gray" />
            }
            classNames={customInputClassnames}
            className="max-w-[500px] pt-2"
          />

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
              >
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

                  <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1 font-bold text-black">
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

                  <div className="flex h-full w-full items-center justify-center bg-gray/10">
                    <Images weight="bold" size={72} className="text-white" />
                  </div>
                </div>

                <div className="grid gap-8">
                  <div>
                    <h1 className="line-clamp-2 pb-[10px] text-lg font-black text-black">
                      Judul video pembelajaran
                    </h1>

                    <h2 className="font-bold text-purple">Rp 500.000,-</h2>
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
        </section>

        <section className="[padding:100px_0_156px]">
          <div className="mx-auto flex max-w-[600px] flex-col flex-wrap gap-8 rounded-xl border-2 border-l-[16px] border-black px-6 py-12 sm:px-16 lg:max-w-[700px] lg:flex-row lg:items-center lg:justify-between xl:max-w-[950px]">
            <div className="flex-1 lg:max-w-[500px]">
              <h2 className="pb-2 text-2xl font-black capitalize leading-[130%] -tracking-wide text-black">
                Masih Kesulitan??? Kurang Paham??
              </h2>
              <p className="font-medium leading-[170%] text-gray">
                Kamu bisa booking Kelas Private One-by-One dengan mentor
                pilihanmu sekarang!!!
              </p>
            </div>

            <Button color="secondary" className="px-4 font-bold">
              Booking Kelas Private
            </Button>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
