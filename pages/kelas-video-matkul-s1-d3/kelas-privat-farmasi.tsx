import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { siteConfigPhamacyPrivteClassPage } from "@/config/site";
import { AppContext } from "@/context/AppContext";
import {
  PrivateClassType,
  PrivateResponse,
  PrivateSubClassType,
} from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { MentorClassType } from "@/types/mentor.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button } from "@nextui-org/react";
import { IconContext } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function PhamacyPrivteClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const ctx = useContext(AppContext);

  return (
    <>
      <Layout title="Kelas Privat Farmasi">
        <section className="mx-auto grid max-w-[600px] items-center gap-16 lg:max-w-[700px] xl:max-w-none xl:grid-cols-2">
          <div>
            <h1 className="pb-2 text-[48px] font-black capitalize leading-[80%] -tracking-wide text-black">
              Kelas Private Farmasi <br />
              <span className="text-2xl font-bold text-purple">
                by Ruang Obat
              </span>
            </h1>
            <p className="pb-8 font-medium leading-[170%] text-gray">
              Khusus kalian mahasiswa farmasi dan mahasiswa profesi apoteker
              yang masih bingung terkait materi kuliah, tugas, skill, praktikum,
              OSCE dan lain-lain. Tidak perlu khawatir, karena kami menyediakan
              kelas private mata kuliah 🤩. Di kelas ini kalian bisa request
              materi apapun dan sepuasnya, selain itu bisa request mentor juga
              lho!!. Materi yang diajarkan dikemas dengan menarik menggunakan
              bahasa yang mudah dipahami.
            </p>
            <Button
              color="secondary"
              as={Link}
              href="#list-package"
              className="px-16 font-bold"
            >
              Pilih Paket
            </Button>
          </div>

          <Image
            priority
            src="/img/default/subject-private-class-img.png"
            alt="class subject private img"
            width={418}
            height={434}
            className="h-auto w-full justify-self-center"
          />
        </section>

        <section className="mx-auto grid max-w-[600px] gap-6 [padding:110px_0_100px] lg:max-w-[700px] xl:max-w-none">
          <h2 className="text-center text-[32px] font-black capitalize leading-[120%] -tracking-wide text-black xl:text-left">
            Yang Bisa Kamu Konsultasikan <br /> di Kelas Private Farmasi
          </h2>

          <IconContext.Provider
            value={{
              weight: "bold",
              size: 48,
              className: "text-purple",
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6">
              {siteConfigPhamacyPrivteClassPage.consultation_list.map(
                (item, index) => (
                  <div
                    key={index}
                    className="grid h-auto max-w-[220px] gap-6 rounded-xl bg-white shadow-[4px_4px_36px_rgba(0,0,0,0.1)] [padding:2rem_1rem]"
                  >
                    <item.icon />
                    <p className="font-medium leading-[170%] text-gray">
                      {item.text}
                    </p>
                  </div>
                ),
              )}
            </div>
          </IconContext.Provider>
        </section>

        <section id="list-package" className="grid gap-6 py-[100px]">
          <h2 className="text-center text-[32px] font-black capitalize leading-[120%] -tracking-wide text-black">
            Daftar Harga Kelas Private Farmasi
          </h2>

          <div className="grid justify-center gap-4">
            {data?.private_classes.map((item: PrivateClassType) => (
              <div
                key={item.subject_id}
                className="grid max-w-[600px] gap-6 rounded-xl border-l-8 border-purple bg-white shadow-[4px_4px_36px_rgba(0,0,0,0.1)] [padding:4rem_3rem] lg:max-w-[700px] xl:max-w-[950px]"
              >
                <div>
                  <h3 className="mb-4 text-2xl font-black leading-[120%] text-purple">
                    {item.title}
                  </h3>
                  <p className="font-medium leading-[170%] text-gray">
                    {item.description}
                  </p>
                </div>

                <div className="grid gap-4 xs:gap-1 md:mx-10 lg:mx-20">
                  {item.private_sub_classes.map(
                    (subitem: PrivateSubClassType) => (
                      <div
                        key={subitem.subject_part_id}
                        className="flex items-center gap-2 xl:gap-6"
                      >
                        <div className="inline-flex flex-wrap items-end xs:gap-1">
                          <h4 className="inline-flex text-lg font-extrabold text-purple">
                            {formatRupiah(subitem.price)}
                          </h4>
                          <span className="text-sm font-medium text-gray md:text-base">
                            {subitem.description}
                          </span>
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
  data?: PrivateResponse;
  error?: ErrorDataType;
};

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  try {
    const response = (await fetcher({
      method: "GET",
      url: "/general/subjects/private",
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
