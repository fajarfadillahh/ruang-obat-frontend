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

export default function PharmacistEntranceClassPage() {
  const subscribeRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <Layout
        title="Kelas Siap Masuk Apoteker: Upgrade Skill, Raih Mimpi"
        description="Bersiaplah menghadapi seleksi masuk program profesi apoteker. Kami menyediakan program khusus yang disesuaikan dengan kebutuhan menjadi seorang Apoteker yang handal dan profesional. Kelas ini pula dirancang untuk membantu kamu memahami materi secara mendalam dan terarah."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container items-center gap-4 xl:grid-cols-2 xl:gap-2">
          <div className="grid gap-4">
            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
              Kelas Siap Masuk Apoteker: Upgrade Skill, Raih Mimpi
            </h1>

            <p className="mb-10 font-medium leading-[170%] text-gray">
              Bersiaplah menghadapi seleksi masuk program profesi apoteker. Kami
              menyediakan program khusus yang disesuaikan dengan kebutuhan
              menjadi seorang Apoteker yang handal dan profesional. Kelas ini
              pula dirancang untuk membantu kamu memahami materi secara mendalam
              dan terarah.
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
            src="/img/base/apoteker-img.svg"
            alt="class subject img"
            width={493}
            height={619}
            className="h-[600px] w-full justify-self-center"
          />
        </section>

        <SectionCategory type="apotekerclass" />

        <section ref={subscribeRef}>
          <SectionSubscription />
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}
