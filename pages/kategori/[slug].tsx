import ButtonBack from "@/components/button/ButtonBack";
import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { dummySubCategories } from "@/data/dummy";
import { Asclepius, Heartbeat } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const decodedSlug = decodeURIComponent(slug as string)
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Layout title={decodedSlug}>
        <ButtonBack />

        {/* for type: videocourse & videoukmppai */}
        <section className="base-container gap-8 [padding:50px_0_100px]">
          <div className="flex items-center gap-4">
            <Heartbeat
              weight="duotone"
              className="text-5xl text-purple xl:text-7xl"
            />

            <h1 className="flex-1 text-3xl font-black text-black xl:text-4xl">
              {decodedSlug}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
            {dummySubCategories.map((item, index) => (
              <Link
                key={index}
                href={`/subkategori/${item.subcategory_slug}?type=${item.subcategory_type}`}
                className="group grid justify-items-center gap-4 overflow-hidden rounded-xl bg-white text-sm shadow-[4px_4px_36px_rgba(0,0,0,0.1)] ring-2 ring-gray/5 [padding:2rem_1rem] hover:cursor-pointer hover:bg-purple/10 sm:text-base"
              >
                <Asclepius
                  weight="duotone"
                  className="text-5xl text-purple sm:text-6xl"
                />

                <h4 className="line-clamp-2 text-center font-extrabold text-black group-hover:line-clamp-none">
                  {item.subcategory_name}
                </h4>
              </Link>
            ))}
          </div>
        </section>

        {/* for type: apotekerclass */}

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}
