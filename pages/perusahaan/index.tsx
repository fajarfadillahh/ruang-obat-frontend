import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { siteConfigCompanyPage } from "@/data/site";
import { ArrowRight, IconContext } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CompanyPage() {
  const router = useRouter();

  return (
    <>
      <Layout
        title="PT. Pharmacy Cone Group"
        description="Inovasi di bidang farmasi untuk kualitas hidup yang lebih baik. PT. Pharmacy Cone Group hadir sebagai solusi edukasi farmasi yang relevan dan terpercaya."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container gap-24 [padding:50px_0_100px]">
          <div className="grid gap-4 text-center">
            <h1 className="text-4xl font-black capitalize -tracking-wide text-black md:text-6xl lg:text-7xl">
              PT. Pharmacy Cone Group
            </h1>

            <p className="font-medium leading-[170%] text-gray xl:mx-36">
              PT. Pharmacy Cone Group adalah perusahaan yang bergerak di bidang
              pengembangan solusi pendidikan digital khusus untuk mahasiswa
              farmasi di Indonesia. Kami menyediakan platform e-learning dan
              sistem ujian daring (online test) yang dirancang untuk mendukung
              proses pembelajaran yang efektif, terstruktur, dan sesuai dengan
              kebutuhan akademik dan profesi farmasi. Dengan teknologi yang
              terus diperbarui dan konten yang disusun oleh tenaga ahli, kami
              berkomitmen untuk menjadi mitra terpercaya dalam mencetak tenaga
              farmasi yang unggul dan kompeten.
            </p>
          </div>

          <div className="grid gap-8">
            <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
              Apa Yang Kamu Ingin Tahu?
            </h2>

            <IconContext.Provider
              value={{
                weight: "duotone",
                size: 48,
                className: "text-purple",
              }}
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {siteConfigCompanyPage.data.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border-2 border-gray/10 p-8"
                  >
                    <item.icon />

                    <div className="grid gap-2">
                      <h3 className="text-xl font-extrabold text-black">
                        {item.label}
                      </h3>

                      <Link
                        href={item.url}
                        className="inline-flex w-max items-center gap-1 text-sm font-bold text-purple hover:underline"
                      >
                        Lihat Selengkapnya
                        <ArrowRight weight="bold" size={16} className="mt-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </IconContext.Provider>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
