import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { AppContext } from "@/context/AppContext";
import { ResearchClassType, ResearchResponse } from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { MentorClassType } from "@/types/mentor.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

export default function PharmacyResearchClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const ctx = useContext(AppContext);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ResearchClassType | null>(
    null,
  );

  function handleOpenModal(prepClass: ResearchClassType) {
    setSelectedClass(prepClass);
    setIsOpenDetail(true);
  }

  return (
    <>
      <Layout title="Kelas Riset Farmasi">
        <section className="mx-auto grid max-w-[600px] items-center gap-8 lg:max-w-[700px] xl:max-w-none">
          <div className="grid max-w-[850px] gap-[10px]">
            <h1 className="text-[48px] font-black capitalize leading-[110%] -tracking-wide text-black">
              Kelas Riset Farmasi
            </h1>
            <p className="font-medium leading-[170%] text-gray">
              Untuk mahasiswa S1 ataupun S2 yang membutuhkan bimbingan terkait
              riset secara teknikal, kelas ini akan sangat membantu kalian,
              dikarenakan mentor-mentor yang mengajar berasal dari praktisi
              Researcher, Formulator, dan lain-lain yang sudah berpengalaman di
              masing - masing bidang terkait.
              <br />
              <br />
              Di Kelas ini kamu akan diajarkan terkait hal-hal yang berkaitan
              dengan teknikal lab, tentunya kamu tidak hanya diajarkan teori
              saja tapi akan diajarkan secara teknikal. Kelas ini akan membantu
              kamu dalam meminimalisir terjadinya trial error saat penelitian.
              Dan kamu akan memiliki prinsip-prinsip penting yang dapat kamu
              perhatikan saat akan memulai penelitian 🤩 !
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
            Daftar Kelas Riset Farmasi 📚
          </h2>

          <div className="mx-auto grid max-w-[600px] gap-4 sm:grid-cols-2 sm:items-start lg:max-w-[700px] xl:mx-0 xl:max-w-none xl:grid-cols-3 xl:gap-8">
            {data?.research.map((item: ResearchClassType) => (
              <div
                key={item.research_id}
                className="group grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
              >
                <div className="aspect-square size-full overflow-hidden rounded-xl bg-purple group-hover:grayscale-[0.5]">
                  <Image
                    src="/img/default-thumbnail.png"
                    alt="thumbnail img"
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

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
                      onPress={() => handleOpenModal(item)}
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
        </section>

        {data?.mentors.length ? (
          <section className="grid gap-4 py-[100px]">
            <h2 className="max-w-[350px] text-center text-[28px] font-black leading-[120%] -tracking-wide text-black xs:max-w-none xl:text-left">
              Daftar Mentor
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
      url: "/general/research",
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
