import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CardProduct from "@/components/card/CardProduct";
import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import TextHighlight from "@/components/text/TextHighlight";
import Layout from "@/components/wrapper/Layout";
import { siteConfigHomePage } from "@/data/site";
import { scrollToSection } from "@/utils/scrollToSection";
import { handleShareClipboard } from "@/utils/shareClipboard";
import { Button, Chip } from "@nextui-org/react";
import { Lightning, ShareNetwork, Sparkle } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ListClassPage() {
  const [client, setClient] = useState<boolean>(false);
  const listClassRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return;

  return (
    <>
      <Layout
        title="Ruang Belajar Farmasi: Semuanya ada dalam satu tempat!"
        description="RuangObat menyajikan program belajar Farmasi yang lengkap dengan berbagai pilihan menarik, mulai dari: Video Pembelajaran, Kelas Private 1 on 1, Kelas Skripsi dan Riset Farmasi, Kelas Masuk Apoteker, serta UKMPPAI & OSCE di mana kamu bisa belajar langsung dengan mentor untuk menguasai materi lebih dalam."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container items-center gap-6 xl:grid-cols-[550px_1fr]">
          <Image
            priority
            src="/img/new-illustration/img-4.svg"
            alt="class subject img"
            width={1000}
            height={1000}
            className="w-full justify-self-center"
          />

          <div className="grid gap-4">
            <Chip
              color="danger"
              variant="flat"
              size="lg"
              classNames={{
                content: "font-bold",
              }}
              className="mb-2"
            >
              🔥 Bimbel Private Farmasi No.1 di Indonesia
            </Chip>

            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl">
              Ruang Belajar Farmasi:{" "}
              <TextHighlight
                text="Semuanya ada dalam satu tempat!"
                className="font-black"
              />
            </h1>

            <p className="mb-6 font-medium leading-[170%] text-gray">
              RuangObat menyajikan ruang belajar Farmasi yang lengkap dengan
              berbagai pilihan menarik, mulai dari:{" "}
              <strong className="font-bold text-purple">
                Video Pembelajaran Farmasi, Bimbingan Skripsi & Riset, Persiapan
                Masuk Profesi Apoteker, OSCE, hingga UKMPPAI
              </strong>{" "}
              di mana kamu bisa belajar langsung untuk menguasai materi lebih
              dalam.
            </p>

            <div className="grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                color="secondary"
                endContent={<Sparkle weight="duotone" size={18} />}
                onClick={() => scrollToSection(listClassRef)}
                className="px-6 font-bold"
              >
                Pilih Program Sekarang!
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
        </section>

        <section
          ref={listClassRef}
          className="base-container gap-5 [padding:50px_0_100px]"
        >
          <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
            Daftar Program RuangObat
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
            {siteConfigHomePage.classes.map((item, index) => (
              <CardProduct
                key={index}
                title={item.title}
                icon={
                  <Image
                    src={item.icon as string}
                    alt="icon program"
                    width={500}
                    height={500}
                    loading="lazy"
                    className="size-[calc(100%-6rem)] justify-self-end"
                  />
                }
                path={item.path}
                tagline={item.tagline}
              />
            ))}

            <div className="group relative isolate col-span-2 hidden h-full items-center justify-center overflow-hidden rounded-xl bg-purple-100 xl:flex">
              <h2 className="z-10 text-6xl font-black -tracking-wide text-purple">
                RuangObat.
              </h2>

              <Lightning
                weight="fill"
                size={400}
                className="absolute -right-12 top-0 text-purple-200"
              />
            </div>
          </div>
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}
