import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import SectionCategory from "@/components/section/SectionCategory";
import SectionSubscription from "@/components/section/SectionSubscription";
import Layout from "@/components/wrapper/Layout";
import { scrollToSection } from "@/utils/scrollToSection";
import { handleShareClipboard } from "@/utils/shareClipboard";
import { Button } from "@nextui-org/react";
import { ShareNetwork } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef } from "react";

export default function VideoLearningClassPage() {
  const subscribeRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <Layout
        title="Video Pembelajaran Lengkap untuk Mahasiswa Farmasi"
        description="Dikelas ini kami menyediakan video pembelajaran mata kuliah farmasi yang lengkap dan mudah dipahami. Solusi praktis untuk membantu kamu belajar kapan saja dan di mana saja."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container items-center gap-6 xl:grid-cols-[1fr_500px] xl:gap-16">
          <div className="grid gap-4">
            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
              Video Pembelajaran Lengkap untuk Mahasiswa Farmasi
            </h1>

            <p className="mb-10 font-medium leading-[170%] text-gray">
              Dikelas ini kami menyediakan video pembelajaran mata kuliah
              farmasi yang lengkap dan mudah dipahami. Solusi praktis untuk
              membantu kamu belajar kapan saja dan di mana saja.
            </p>

            <div className="grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                color="secondary"
                onClick={() => scrollToSection(subscribeRef)}
                className="px-6 font-bold"
              >
                Langganan Sekarang!
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
            src="/img/base/video-pembelajaran-img.svg"
            alt="class subject img"
            width={510}
            height={340}
            className="h-[600px] w-full justify-self-center"
          />
        </section>

        <SectionCategory type="videocourse" />

        <section ref={subscribeRef}>
          <SectionSubscription />
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}
