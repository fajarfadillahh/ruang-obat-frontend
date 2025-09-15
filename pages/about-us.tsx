import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { siteConfigCompanyPage } from "@/data/site";
import { ArrowRight, IconContext } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <>
      <Layout
        title="Tentang RuangObat: Inspirasi & Edukasi Farmasi untuk Semua"
        description="RuangObat adalah tempat private farmasi No.1 di Indonesia telah memfasilitasi 10.000+ mahasiswa farmasi."
      >
        <section className="base-container gap-4 text-center [padding:50px_0_100px]">
          <h1 className="text-2xl font-black capitalize -tracking-wide text-black sm:text-3xl md:text-5xl lg:text-6xl">
            RuangObat: Ruang Belajar Farmasi Super Lengkap dan Fleksibel
          </h1>

          <p className="font-medium leading-[170%] text-gray xl:mx-36">
            RuangObat merupakan platform bimbel private farmasi No. 1 yang telah
            memfasilitasi 10.000+ mahasiswa Farmasi di seluruh Indonesia.
            Terdapat berbagai kelas menarik untuk semua jenjang pendidikan,
            antara lain: Kelas Mata Kuliah, Kelas Skripsi Farmasi, Kelas Riset
            Farmasi, Kelas Masuk Apoteker & OSCE, dan Tryout UKMPPAI.
          </p>

          <Image
            priority
            src="https://ruangobat.is3.cloudhost.id/statics/images/ruangobat-logo/ruangobat-logo.png"
            alt="logo"
            width={500}
            height={500}
            className="hidden xl:absolute xl:bottom-40 xl:right-14 xl:flex xl:size-[100px]"
          />

          <div className="hidden xl:absolute xl:bottom-48 xl:left-16 xl:inline-flex xl:-rotate-[25deg] xl:-space-x-3">
            <Image
              src="https://ruangobat.is3.cloudhost.id/statics/images/avatar-img/home-avatar1.webp"
              alt="avatar mentor img"
              width={100}
              height={100}
              className="size-16 rounded-full"
              priority
            />
            <Image
              src="https://ruangobat.is3.cloudhost.id/statics/images/avatar-img/home-avatar2.webp"
              alt="avatar mentor img"
              width={100}
              height={100}
              className="size-16 rounded-full"
              priority
            />
            <Image
              src="https://ruangobat.is3.cloudhost.id/statics/images/avatar-img/home-avatar3.webp"
              alt="avatar mentor img"
              width={100}
              height={100}
              className="size-16 rounded-full"
              priority
            />
          </div>
        </section>

        <section className="base-container py-[100px]">
          <IconContext.Provider
            value={{
              weight: "duotone",
              size: 48,
              className: "text-purple",
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              {siteConfigCompanyPage.about.products.map((item, index) => (
                <div
                  key={index}
                  className="grid h-auto w-full max-w-[320px] gap-6 rounded-xl border-2 border-gray/10 p-8"
                >
                  <item.icon />

                  <div className="grid gap-1">
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
        </section>

        <section className="py-[100px]">
          <div className="base-container items-center gap-4 xl:grid-cols-2">
            <Image
              priority
              src="https://ruangobat.is3.cloudhost.id/statics/images/about-page/about-img-1.webp"
              alt="img"
              width={900}
              height={900}
              className="h-auto w-[650px] justify-self-center"
            />

            <div className="grid gap-4">
              <h2 className="text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl sm:text-5xl xl:text-6xl">
                Awal dari sebuah petualangan 🚀
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                Dari sudut hingga menjadi yang pertama, petualangan kami bermula
                pada tahun 2022 sebagai sebuah inisiatif sederhana bernama{" "}
                <span className="font-black text-purple">Pharmacy Corner</span>.
                Tergerak oleh kesulitan yang dialami banyak mahasiswa farmasi
                dalam menguasai materi yang luas dan kompleks, kami mulai dengan
                langkah kecil dengan membuka kelas untuk beberapa mata kuliah
                terbatas.
                <br />
                <br />
                Dengan semangat berbagi ilmu dan pengalaman, kami berhasil
                membantu puluhan mahasiswa dalam waktu yang singkat. Melihat
                antusisme dan hasil yang positif, kami terus berkembang dan pada
                tahun 2023 kami melakukan rebranding menjadi{" "}
                <span className="font-black text-purple">Pharmacy Cone</span>.
                Jumlah mahasiswa yang bergabung terus meningkat sekitar 1000+
                menunjukan bahwa kebutuhan akan bimbingan yang lebih terstruktur
                dalam bidang farmasi semakin besar.
              </p>
            </div>
          </div>
        </section>

        <section className="py-[100px]">
          <div className="base-container gap-8 lg:grid-cols-2 lg:items-start xl:gap-16">
            <div className="grid gap-4">
              <h2 className="text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl sm:text-5xl">
                {siteConfigCompanyPage.about.data.vision.title}
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                {siteConfigCompanyPage.about.data.vision.text}
              </p>
            </div>

            <div className="grid gap-4">
              <h2 className="text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl sm:text-5xl">
                {siteConfigCompanyPage.about.data.mission.title}
              </h2>

              <ul className="grid list-outside list-decimal gap-2 pl-4">
                {siteConfigCompanyPage.about.data.mission.list.map((item) => (
                  <li
                    key={item.key}
                    className="font-medium leading-[170%] text-gray"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}
