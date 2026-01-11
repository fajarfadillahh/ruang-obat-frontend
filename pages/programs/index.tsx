import CardProduct from "@/components/card/CardProduct";
import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import TextHighlight from "@/components/text/TextHighlight";
import Layout from "@/components/wrapper/Layout";
import { siteConfigHomePage } from "@/data/site";
import { scrollToSection } from "@/utils/scrollToSection";
import { Button, Chip } from "@nextui-org/react";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function ListProgramsPage() {
  const router = useRouter();
  const [client, setClient] = useState<boolean>(false);
  const listProgramsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return;

  return (
    <>
      <Layout
        title="Ruang Belajar Farmasi: Semuanya Ada Aalam Satu Tempat!"
        description="RuangObat adalah tempat private farmasi No.1 di Indonesia telah memfasilitasi 10.000+ mahasiswa farmasi."
      >
        <section className="base-container items-center gap-6 [padding:50px_0_100px] xl:grid-cols-[550px_1fr]">
          <Image
            priority
            src="https://s3.nevaobjects.id/ruang-obat-assets/statics/images/new-illustration-program/img-osce-ukmppai.webp"
            alt="class subject img"
            width={1000}
            height={1000}
            className="w-full justify-self-center"
          />

          <div className="grid gap-4">
            <Chip
              color="secondary"
              variant="flat"
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
                onClick={() => scrollToSection(listProgramsRef)}
                className="px-6 font-bold"
              >
                Lihat Daftar Program
              </Button>

              <Button
                variant="bordered"
                endContent={<ArrowRight weight="bold" size={18} />}
                onClick={() => router.push("/kelas/masuk-apoteker")}
                className="px-6 font-bold"
              >
                Beli Paket Belajar
              </Button>
            </div>
          </div>
        </section>

        <section
          ref={listProgramsRef}
          className="base-container gap-5 [padding:100px_0_100px]"
        >
          <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
            Daftar Program RuangObat
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
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
                    className="size-[calc(100%-8rem)] justify-self-end"
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
