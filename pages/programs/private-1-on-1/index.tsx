import CTASecondary from "@/components/cta/CTASecondary";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/footer/Footer";
import TextHighlight from "@/components/text/TextHighlight";
import Layout from "@/components/wrapper/Layout";
import { AppContext } from "@/context/AppContext";
import { siteConfigPhamacyPrivteClassPage } from "@/data/site";
import {
  PrivateClassType,
  PrivateResponse,
  PrivateSubClassType,
} from "@/types/classes.type";
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
import { ShareNetwork, Sparkle } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useRef, useState } from "react";

export default function Private1on1Page({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const ctx = useContext(AppContext);
  const packagesRef = useRef<HTMLElement | null>(null);
  const [isOpenDetailMentor, setIsOpenDetailMentor] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorClassType | null>(
    null,
  );

  function handleOpenModalDetailMentor(prepClass: MentorClassType) {
    setSelectedMentor(prepClass);
    setIsOpenDetailMentor(true);
  }

  return (
    <>
      <Layout
        title="Ruang Private 1 on 1: Mentor Pribadi untuk Mahasiswa Farmasi"
        description="Sesi pembelajaran private satu-satu bersama tutor profesional di bidang farmasi, dirancang khusus untuk kebutuhan dan gaya belajar kamu."
      >
        <section className="base-container items-center gap-6 [padding:50px_0_100px] xl:grid-cols-[1fr_550px]">
          <div className="grid gap-4">
            <Chip
              color="secondary"
              variant="flat"
              classNames={{
                content: "font-bold",
              }}
              className="mb-2"
            >
              📋 Ruang Private 1 on 1 Farmasi
            </Chip>

            <h1 className="text-2xl font-black capitalize -tracking-wide text-black sm:text-3xl lg:text-[40px] lg:leading-[105%]">
              Mentor Pribadi untuk Mahasiswa Farmasi:{" "}
              <TextHighlight
                text="Fokus, Intensif, dan 100%
              Relevan!"
                className="font-black"
              />
            </h1>

            <p className="mb-6 font-medium leading-[170%] text-gray">
              Sesi bimbel private 1-on-1 untuk bantu kamu pahami materi kuliah
              dan siap ujian. Tidak perlu khawatir, karena kami menyediakan
              kelas private mata kuliah 🤩. Di kelas ini kalian bisa request
              materi apapun dan sepuasnya, selain itu bisa request mentor juga
              lho!!.
            </p>

            <div className="grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                color="secondary"
                endContent={<Sparkle weight="duotone" size={18} />}
                onClick={() => scrollToSection(packagesRef)}
                className="px-6 font-bold"
              >
                Pilih Paket Sekarang!
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
            src="=https://cdn.ruangobat.id/statics/images/new-illustration-program/img-private.webp"
            alt="private img"
            width={1000}
            height={1000}
            className="w-full justify-self-center"
          />
        </section>

        <section className="base-container items-center gap-12 [padding:100px_0_2rem] xl:grid-cols-[max-content_1fr]">
          <Image
            src="=https://cdn.ruangobat.id/statics/images/new-logo-program/logo/logo-ruang-private.webp"
            alt="logo program"
            width={1000}
            height={1000}
            className="h-auto w-full max-w-[200px] justify-self-center sm:max-w-[300px] xl:max-w-[360px]"
            loading="lazy"
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
            {siteConfigPhamacyPrivteClassPage.consultation_list.map(
              (item, index) => (
                <div
                  key={index}
                  className={`grid gap-4 rounded-xl border-2 border-gray/10 p-8 ${
                    index < 3 ? "xl:col-span-2" : "xl:col-span-3"
                  }`}
                >
                  <item.icon
                    weight="duotone"
                    size={48}
                    className="text-purple"
                  />

                  <p className="font-medium leading-[170%] text-gray">
                    {item.text}
                  </p>
                </div>
              ),
            )}
          </div>
        </section>

        <section
          ref={packagesRef}
          className="base-container grid gap-6 py-[100px]"
        >
          <h2 className="text-center text-3xl font-black -tracking-wide text-black">
            Daftar Harga Kelas Private Farmasi
          </h2>

          {data?.private_classes.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray/20">
              <EmptyData text="Paket Kelas Tidak Ditemukan 😥" />
            </div>
          ) : (
            <div className="grid items-start justify-center gap-4 xl:grid-cols-2">
              {data?.private_classes.map((item: PrivateClassType) => (
                <div
                  key={item.subject_id}
                  className="base-card max-w-[600px] gap-8 [padding:4rem_3rem] lg:max-w-[700px]"
                >
                  <div className="grid gap-2">
                    <h3 className="text-2xl font-black text-purple">
                      {item.title}
                    </h3>

                    <p className="font-medium leading-[170%] text-gray">
                      {item.description}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {item.private_sub_classes.map(
                      (subitem: PrivateSubClassType) => (
                        <div
                          key={subitem.subject_part_id}
                          className="flex items-center gap-4"
                        >
                          <div className="grid">
                            <h4 className="text-lg font-extrabold text-purple">
                              {formatRupiah(subitem.price)}
                            </h4>

                            <p className="text-xs font-medium leading-[170%] text-gray">
                              {subitem.description}
                            </p>
                          </div>

                          <div className="h-2 w-full flex-1 border-b-2 border-dashed border-gray/20" />

                          <Button
                            size="sm"
                            variant="light"
                            color="secondary"
                            onClick={() => {
                              if (session.status == "unauthenticated") {
                                ctx?.onOpenUnauthenticated();
                              } else {
                                window.open(subitem.link_order, "_blank");
                              }
                            }}
                            className="font-bold"
                          >
                            Pilih
                          </Button>
                        </div>
                      ),
                    )}
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
  data?: PrivateResponse;
  error?: ErrorDataType;
};

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  try {
    const response = (await fetcher({
      method: "GET",
      url: "/subjects/private",
    })) as SuccessResponse<PrivateResponse>;

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
