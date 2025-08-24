import CardLiveTeaching from "@/components/card/CardLiveTeaching";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { products } from "@/lib/products";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function LiveTeachingPage() {
  return (
    <>
      <Layout
        title="Live Teaching: Belajar Interaktif Secara Langsung"
        description="Ikuti sesi pembelajaran interaktif secara langsung bersama pengajar berpengalaman. Dapatkan penjelasan materi yang mendalam, kesempatan untuk bertanya, serta diskusi dua arah yang membuat proses belajar menjadi lebih efektif."
      >
        <section className="base-container gap-1 py-[50px]">
          <h1 className="text-2xl font-black -tracking-wide text-black md:text-4xl">
            Live Teaching:
            <br />
            Belajar Interaktif Secara Langsung
            <span className="text-purple">.</span>
          </h1>

          <p className="max-w-[700px] font-medium leading-[170%] text-gray">
            Ikuti sesi pembelajaran interaktif secara langsung bersama pengajar
            berpengalaman. Dapatkan penjelasan materi yang mendalam, kesempatan
            untuk bertanya, serta diskusi dua arah yang membuat proses belajar
            menjadi lebih efektif.
          </p>
        </section>

        <section className="base-container gap-24 pb-[100px]">
          {products.map((item) => (
            <LiveTeachingCardSection
              key={item.code}
              title={`Live ${item.label}`}
              liveSectionPath={`/live/detail?type=${item.code}`}
              cardPath="/live/slug-content"
            />
          ))}
        </section>

        <CTAMain />
      </Layout>

      <Footer />
    </>
  );
}

type LiveTeachingCardSectionProps = {
  title?: string;
  liveSectionPath?: string;
  cardPath?: string;
};

function LiveTeachingCardSection({
  title,
  liveSectionPath,
  cardPath,
}: LiveTeachingCardSectionProps) {
  const router = useRouter();

  return (
    <div className="grid gap-4">
      <div className="flex items-end justify-between gap-2 xs:items-center xs:gap-4">
        <h2 className="flex-1 text-lg font-extrabold -tracking-wide text-black md:text-2xl">
          {title}
        </h2>

        <Button
          size="sm"
          variant="light"
          endContent={<ArrowRight weight="bold" size={16} />}
          onClick={() => router.push(liveSectionPath as string)}
          className="w-max font-bold"
        >
          Lihat Semua
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardLiveTeaching key={index} livestream={cardPath} />
        ))}
      </div>
    </div>
  );
}
