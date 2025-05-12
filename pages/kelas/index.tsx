import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { siteConfigHomePage } from "@/config/site";
import { scrollToSection } from "@/utils/scrollToSection";
import { handleShareClipboard } from "@/utils/shareClipboard";
import { Button } from "@nextui-org/react";
import { ShareNetwork } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function ListClassPage() {
  const router = useRouter();
  const listClassRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <Layout
        title="Ruang Belajar Farmasi: Semuanya ada dalam satu tempat!"
        description="RuangObat menyajikan program belajar Farmasi yang lengkap dengan berbagai pilihan menarik, mulai dari: Video Pembelajaran, Kelas Private 1 on 1, Kelas Skripsi dan Riset Farmasi, Kelas Masuk Apoteker, serta UKMPPAI & OSCE di mana kamu bisa belajar langsung dengan mentor untuk menguasai materi lebih dalam."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container items-center gap-16 xl:grid-cols-2 xl:gap-2">
          <Image
            priority
            src="/img/base/video-pembelajaran-img.svg"
            alt="class subject img"
            width={493}
            height={619}
            className="order-2 h-[600px] w-full justify-self-center xl:-order-1"
          />

          <div className="grid gap-4">
            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
              Ruang Belajar Farmasi: Semuanya ada dalam satu tempat!
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              RuangObat menyajikan ruang belajar Farmasi yang lengkap dengan
              berbagai pilihan menarik, mulai dari:{" "}
              <strong className="font-bold text-purple">
                video pembelajaran farmasi, bimbingan skripsi & riset, persiapan
                masuk profesi apoteker, OSCE, hingga UKMPPAI
              </strong>{" "}
              di mana kamu bisa belajar langsung untuk menguasai materi lebih
              dalam.
            </p>

            <div className="mt-10 inline-flex items-center gap-4">
              <Button
                color="secondary"
                onClick={() => scrollToSection(listClassRef)}
                className="w-max px-16 font-bold"
              >
                Pilih Kelas
              </Button>

              <Button
                isIconOnly
                aria-label="Share Link"
                variant="bordered"
                onClick={handleShareClipboard}
              >
                <ShareNetwork
                  weight="duotone"
                  size={18}
                  className="text-black"
                />
              </Button>
            </div>
          </div>
        </section>

        <section
          ref={listClassRef}
          className="base-container gap-5 [padding:50px_0_100px]"
        >
          <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
            Daftar Kelas di RuangObat
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {siteConfigHomePage.classes.map((item, index) => (
              <div
                key={index}
                className="group grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
              >
                <Image
                  priority
                  src={item.image as string}
                  alt="product img"
                  width={304}
                  height={304}
                  className="aspect-square h-auto w-full rounded-xl object-cover object-center group-hover:grayscale-[0.5]"
                />

                <div className="grid gap-4">
                  <h1 className="max-w-[250px] text-xl font-black text-black group-hover:text-purple">
                    {item.title}
                  </h1>

                  <Button
                    variant={item.id === 6 ? "solid" : "flat"}
                    color="secondary"
                    onClick={() => router.push(item.path as string)}
                    className="font-bold"
                  >
                    {item.id === 6 ? "Mulai Ujian" : "Detail Kelas"}
                  </Button>
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
