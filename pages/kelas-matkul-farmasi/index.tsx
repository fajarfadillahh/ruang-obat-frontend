import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@nextui-org/react";
import { ArrowRight, GraduationCap, PencilRuler } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SubjectVideoClassPage() {
  const router = useRouter();

  return (
    <>
      <Layout
        title="Kelas Pembelajaran Mata Kuliah Farmasi"
        description="Video Pembelajaran Mata Kuliah Farmasi, dan Kelas Private 1 on 1 Farmasi, di mana kamu bisa belajar langsung dengan mentor untuk menguasai materi lebih dalam."
      >
        <BreadcrumbsUrl rootLabel="Home" basePath="/" />

        <section className="base-container items-center gap-16 xl:grid-cols-2 xl:gap-2">
          <Image
            priority
            src="/img/base/video-pembelajaran-img.svg"
            alt="class subject img"
            width={493}
            height={619}
            className="order-2 h-[600px] w-full justify-self-center xl:-order-1"
          />

          <div>
            <h1 className="mb-4 text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
              Kelas Digital untuk Mata Kuliah Farmasi Terpilih
            </h1>

            <p className="pb-10 font-medium leading-[170%] text-gray">
              RuangObat menyajikan program belajar Farmasi yang lengkap dengan
              dua pilihan menarik: Video Pembelajaran Mata Kuliah Farmasi, dan
              Kelas Private 1 on 1 Farmasi, di mana kamu bisa belajar langsung
              dengan mentor untuk menguasai materi lebih dalam.
            </p>

            <Button
              color="secondary"
              as={Link}
              href="#list-class"
              className="px-16 font-bold"
            >
              Pilih Kelas
            </Button>
          </div>
        </section>

        <section
          id="list-class"
          className="mx-auto grid max-w-[600px] gap-5 [padding:110px_0_100px] lg:max-w-[700px] xl:max-w-none"
        >
          <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
            Fasilitas yang tersedia 😉
          </h2>

          <div className="grid gap-8 xl:grid-cols-2">
            <div className="grid gap-8 rounded-xl bg-white p-10 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]">
              <div className="grid gap-4">
                <GraduationCap
                  weight="bold"
                  size={72}
                  className="text-purple"
                />

                <div className="grid gap-2">
                  <h3 className="text-2xl font-black capitalize -tracking-wide text-black">
                    Video Pembelajaran Mata Kuliah Farmasi
                  </h3>

                  <p className="font-medium leading-[170%] text-gray">
                    Pada kelas ini kami menyediakan video pembelajaran digital
                    yang dirancang khusus untuk membantu kamu memahami materi
                    mata kuliah dengan efektif.
                  </p>
                </div>
              </div>

              <Button
                color="secondary"
                endContent={<ArrowRight weight="bold" size={18} />}
                onClick={() =>
                  router.push("/kelas-matkul-farmasi/video-matkul-farmasi")
                }
                className="w-max font-bold"
              >
                Lihat Video Pembelajaran
              </Button>
            </div>

            <div className="grid gap-8 rounded-xl bg-white p-10 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]">
              <div className="grid gap-4">
                <PencilRuler weight="bold" size={72} className="text-purple" />

                <div className="grid gap-2">
                  <h3 className="text-2xl font-black capitalize -tracking-wide text-black">
                    Kelas Private 1 on 1 Farmasi
                  </h3>

                  <p className="font-medium leading-[170%] text-gray">
                    Kelas ini menawarkan pembelajaran personal yang fleksibel,
                    mendalam, dan fokus sesuai kebutuhan kamu untuk mencapai
                    hasil belajar terbaik.
                  </p>
                </div>
              </div>

              <Button
                color="secondary"
                endContent={<ArrowRight weight="bold" size={18} />}
                onClick={() =>
                  router.push("/kelas-matkul-farmasi/kelas-privat-farmasi")
                }
                className="w-max font-bold"
              >
                Booking Kelas Sekarang
              </Button>
            </div>
          </div>
        </section>

        <CTAMain />
      </Layout>

      <Footer />
    </>
  );
}
