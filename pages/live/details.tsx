import ButtonBack from "@/components/button/ButtonBack";
import CardLiveTeaching from "@/components/card/CardLiveTeaching";
import CTAPrivateClass from "@/components/cta/CTAPrivateClass";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { products } from "@/lib/products";
import { useRouter } from "next/router";

export default function DetailsLiveTeachingPage() {
  const router = useRouter();

  const product = products.find((item) => item.code === router.query.type);

  const title =
    "Meet The Expert Explore Your Future: Pengenalan Bidang dan Profesi di Dunia Farmasi";

  function toSlug(str: string) {
    return decodeURIComponent(str)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  return (
    <>
      <Layout
        title={`Live ${product?.label}`}
        description="Ikuti sesi belajar interaktif langsung dengan pengajar berpengalaman. Dapatkan penjelasan mendalam, diskusi dua arah, dan pembelajaran efektif."
      >
        <ButtonBack href="/live" />

        <section className="base-container gap-1 py-[50px]">
          <h1 className="text-2xl font-black capitalize -tracking-wide text-black md:text-3xl">
            Live {product?.label}
          </h1>

          <p className="max-w-[500px] font-medium leading-[170%] text-gray">
            Ikuti sesi pembelajaran interaktif secara langsung bersama pengajar
            berpengalaman 🔥
          </p>
        </section>

        <section className="base-container gap-4 pb-[100px]">
          <h2 className="font-extrabold text-black md:text-xl">
            Daftar Live Teaching
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <CardLiveTeaching
                key={index}
                livestream={`/live/${toSlug(title)}?from=detail&type=${product?.code}`}
              />
            ))}
          </div>
        </section>

        <CTAPrivateClass />
      </Layout>

      <Footer />
    </>
  );
}
