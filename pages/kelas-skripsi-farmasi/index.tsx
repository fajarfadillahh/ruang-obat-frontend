import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Images } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function PharmacyThesisClassPage() {
  const {
    isOpen: isOpenClass,
    onOpen: onOpenClass,
    onOpenChange: onOpenChangeClass,
  } = useDisclosure();
  const {
    isOpen: isOpenMentor,
    onOpen: onOpenMentor,
    onOpenChange: onOpenChangeMentor,
  } = useDisclosure();

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

          <div className="mx-auto grid max-w-[600px] gap-4 sm:grid-cols-2 sm:items-start lg:max-w-[700px] xl:mx-0 xl:max-w-none xl:grid-cols-3 xl:gap-8">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="group grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
              >
                <div className="flex aspect-square size-full items-center justify-center rounded-xl bg-purple object-cover object-center group-hover:grayscale-[0.5]">
                  <Images weight="bold" size={64} className="text-white/50" />
                </div>

                <div className="grid gap-8">
                  <div className="grid gap-[10px]">
                    <h1 className="line-clamp-2 text-lg font-black leading-[120%] text-black group-hover:text-purple">
                      Kelas Bimbingan Judul dan Pengenalan Penelitian
                    </h1>

                    <h2 className="font-bold text-purple">
                      {formatRupiah(200000)},-
                    </h2>
                  </div>

                  <div className="grid gap-[10px]">
                    <Button
                      variant="bordered"
                      onPress={onOpenClass}
                      className="font-bold text-black"
                    >
                      Detail Kelas
                    </Button>

                    <Button
                      variant="flat"
                      color="secondary"
                      className="font-bold"
                    >
                      Booking Kelas
                    </Button>

                    <Modal
                      size="lg"
                      scrollBehavior="inside"
                      placement="center"
                      isOpen={isOpenClass}
                      onOpenChange={onOpenChangeClass}
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold text-black">
                              Deskripsi Kelas
                            </ModalHeader>

                            <ModalBody>
                              <p className="font-medium leading-[170%] text-gray">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Alias, officiis pariatur. Eius
                                atque, sit ducimus consequatur natus saepe quis,
                                error, rem nam veritatis quam. Iusto animi
                                doloremque quisquam vitae vero?
                                <br />
                                <br />
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Tempore doloribus aliquam vero
                                commodi iure libero exercitationem sapiente
                                obcaecati et, error soluta, illum, laudantium
                                rerum. Reprehenderit perferendis laudantium
                                libero maiores error.
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
        </section>

        <section className="grid gap-4 py-[100px]">
          <h2 className="max-w-[350px] text-center text-[28px] font-black leading-[120%] -tracking-wide text-black xs:max-w-none xl:text-left">
            Daftar Mentor
          </h2>

          <div className="mx-auto grid max-w-[600px] gap-4 sm:grid-cols-2 sm:items-start lg:max-w-[700px] xl:mx-0 xl:max-w-none xl:grid-cols-3 xl:gap-8">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="group grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
              >
                <Image
                  priority
                  src="/img/mentors/kak-dhea-spss.webp"
                  alt="product img"
                  width={304}
                  height={304}
                  className="aspect-square h-auto w-full rounded-xl object-cover object-center group-hover:grayscale-[0.5]"
                />

                <div className="grid gap-4">
                  <h1 className="text-lg font-black leading-[120%] text-black group-hover:text-purple">
                    Kak Dhea
                  </h1>

                  <Button
                    variant="flat"
                    color="secondary"
                    onPress={onOpenMentor}
                    className="font-bold"
                  >
                    Detail Mentor
                  </Button>

                  <Modal
                    size="lg"
                    scrollBehavior="inside"
                    placement="center"
                    isOpen={isOpenMentor}
                    onOpenChange={onOpenChangeMentor}
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1 font-extrabold text-black">
                            Detail Mentor
                          </ModalHeader>

                          <ModalBody>
                            <p className="font-medium leading-[170%] text-gray">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Alias, officiis pariatur. Eius atque, sit
                              ducimus consequatur natus saepe quis, error, rem
                              nam veritatis quam. Iusto animi doloremque
                              quisquam vitae vero?
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
            ))}
          </div>
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}
