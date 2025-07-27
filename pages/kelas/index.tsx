import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CardProduct from "@/components/card/CardProduct";
import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { siteConfigHomePage } from "@/data/site";
import { scrollToSection } from "@/utils/scrollToSection";
import { handleShareClipboard } from "@/utils/shareClipboard";
import { Button } from "@nextui-org/react";
import { ShareNetwork } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef } from "react";

export default function ListClassPage() {
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
                Video Pembelajaran Farmasi, Bimbingan Skripsi & Riset, Persiapan
                Masuk Profesi Apoteker, OSCE, hingga UKMPPAI
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

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
            {siteConfigHomePage.classes.map((item, index) => (
              <CardProduct
                key={index}
                title={item.title}
                icon={
                  <item.icon
                    weight="duotone"
                    className="size-[calc(100%-7rem)] justify-self-end text-white/30"
                  />
                }
                path={item.path}
                tagline={item.tagline}
              />
            ))}
          </div>
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}
