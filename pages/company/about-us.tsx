import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { siteConfigAboutUsPage } from "@/config/site";
import { IconContext } from "@phosphor-icons/react";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <>
      <Layout title="Tentang Kami">
        <section className="relative mx-auto grid max-w-[600px] gap-4 text-center [padding:40px_0_100px] lg:max-w-[700px] xl:max-w-none">
          <h1 className="text-[48px] font-black capitalize leading-[110%] -tracking-wide text-black md:text-[56px] md:leading-[100%] lg:text-[72px]">
            Ruang Obat: Ruang Belajar Farmasi Super Lengkap dan Fleksibel
          </h1>
          <p className="font-medium leading-[170%] text-gray xl:mx-52">
            Ruang Obat merupakan platform Bimbel Private Farmasi No. 1 yang
            telah memfasilitasi 10.000+ Mahasiswa Farmasi di seluruh Indonesia.
            Terdapat berbagai kelas menarik untuk semua jenjang pendidikan,
            antara lain: Kelas Mata Kuliah, Kelas Skripsi Farmasi, Kelas Riset
            Farmasi, Kelas Masuk Apoteker & OSCE, dan Tryout UKMPPAI.
          </p>

          <Image
            src="/img/ruangobat-logo.png"
            alt="logo"
            width={500}
            height={500}
            className="hidden xl:absolute xl:bottom-40 xl:right-14 xl:flex xl:size-[100px]"
          />

          <div className="hidden xl:absolute xl:bottom-48 xl:left-16 xl:inline-flex xl:-rotate-[25deg] xl:-space-x-3">
            <Image
              src="/img/home-avatar1.webp"
              alt="avatar mentor img"
              width={100}
              height={100}
              className="size-16 rounded-full"
              priority
            />
            <Image
              src="/img/home-avatar2.webp"
              alt="avatar mentor img"
              width={100}
              height={100}
              className="size-16 rounded-full"
              priority
            />
            <Image
              src="/img/home-avatar3.webp"
              alt="avatar mentor img"
              width={100}
              height={100}
              className="size-16 rounded-full"
              priority
            />
          </div>
        </section>

        <section className="py-[100px]">
          <IconContext.Provider
            value={{
              weight: "bold",
              size: 48,
              className: "text-purple",
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6">
              {siteConfigAboutUsPage.products.map((item, index) => (
                <div
                  key={index}
                  className="grid h-auto max-w-[220px] gap-6 rounded-xl bg-white shadow-[4px_4px_36px_rgba(0,0,0,0.1)] [padding:1rem_1.5rem]"
                >
                  <item.icon />
                  <p className="medium text-[24px] font-extrabold leading-[120%] text-black">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </IconContext.Provider>
        </section>

        <section className="pb-[20px] pt-[100px] xl:pb-0">
          <div className="mx-auto grid max-w-[600px] items-center gap-4 lg:max-w-[700px] xl:max-w-none xl:grid-cols-[max-content_1fr] xl:gap-0">
            <Image
              priority
              src="/img/aboutus/about-img-1.png"
              alt="img"
              width={900}
              height={900}
              className="h-auto w-[650px] justify-self-center"
            />

            <div className="grid max-w-[600px] gap-4">
              <h1 className="text-[36px] font-black capitalize leading-[120%] -tracking-wide text-black xs:text-[42px] xl:text-[52px]">
                Awal dari sebuah petualangan
              </h1>
              <p className="font-medium leading-[170%] text-gray">
                Dari sudut hingga menjadi yang pertama, petualangan kami bermula
                pada tahun 2022 sebagai sebuah inisiatif sederhana bernama{" "}
                <span className="font-black text-purple">Pharmacy Corner</span>.
                Tergerak oleh kesulitan yang dialami banyak mahasiswa farmasi
                dalam menguasai materi yang luas dan kompleks, kami mulai dengan
                langkah kecil dengan membuka kelas untuk beberapa mata kuliah
                terbatas.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-[100px] pt-[20px] xl:pt-0">
          <div className="mx-auto grid max-w-[600px] items-center gap-4 lg:max-w-[700px] xl:max-w-none xl:grid-cols-[max-content_1fr] xl:gap-0">
            <p className="max-w-[600px] font-medium leading-[170%] text-gray">
              Dengan semangat berbagi ilmu dan pengalaman, kami berhasil
              membantu puluhan mahasiswa dalam waktu yang singkat. Melihat
              antusisme dan hasil yang positif, kami terus berkembang dan pada
              tahun 2023 kami melakukan rebranding menjadi{" "}
              <span className="font-black text-purple">Pharmacy Cone</span>.
              Jumlah mahasiswa yang bergabung terus meningkat sekitar 1000+
              menunjukan bahwa kebutuhan akan bimbingan yang lebih terstruktur
              dalam bidang farmasi semakin besar.
            </p>

            <Image
              priority
              src="/img/aboutus/about-img-2.png"
              alt="img"
              width={900}
              height={900}
              className="h-auto w-[650px] justify-self-center"
            />
          </div>
        </section>

        <section className="py-[100px]">
          <div className="mx-auto grid max-w-[600px] gap-4 lg:max-w-[700px] lg:grid-cols-2 lg:items-start lg:gap-8 xl:max-w-none">
            <div className="grid gap-4">
              <h1 className="text-[36px] font-black capitalize leading-[120%] -tracking-wide text-black xs:text-[42px] xl:text-[52px]">
                {siteConfigAboutUsPage.data.vision.title}
              </h1>
              <p className="font-medium leading-[180%] text-gray">
                {siteConfigAboutUsPage.data.vision.text}
              </p>
            </div>

            <div className="grid gap-4">
              <h1 className="text-[36px] font-black capitalize leading-[120%] -tracking-wide text-black xs:text-[42px] xl:text-[52px]">
                {siteConfigAboutUsPage.data.mission.title}
              </h1>
              <ul className="grid list-outside list-decimal pl-4">
                {siteConfigAboutUsPage.data.mission.list.map((item) => (
                  <li
                    key={item.key}
                    className="font-medium leading-[180%] text-gray"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-[100px]">
          <div className="relative mx-auto grid max-w-[600px] items-center gap-10 lg:max-w-[700px] xl:max-w-none xl:grid-cols-[1fr_500px] xl:gap-4">
            <div className="grid gap-4 justify-self-center lg:max-w-[580px] xl:justify-self-start">
              <h1 className="text-[48px] font-black leading-[110%] -tracking-wide text-black md:text-[52px] md:leading-[100%]">
                Sosok Dari Lahirnya Ruangobat.id
              </h1>
              <p className="font-medium leading-[170%] text-gray">
                Kami perkenalkan sosok dari lahirnya tempat belajar farmasi
                terbaik di Indonesia yaitu,{" "}
                <span className="font-black text-purple">
                  apt. Niko Samuel, S. Farm
                </span>
                <br />
                <br />
                Ia adalah seorang apoteker yang inovatif dengan pengalaman yang
                luas di sektor kesehatan. Saat ini, Niko sudah menyelesaikan
                Program Profesi Apoteker di Universitas Pancasila (2023-2024)
                setelah sebelumnya memperoleh gelar Sarjana Farmasi dari
                universitas yang sama pada tahun 2019-2023. Dengan latar
                belakang yang kuat dan dedikasi tinggi, ia terus berkomitmen
                dalam inovasi farmasi dan pelayanan kesehatan di Indonesia.
                <br />
                <br />
                Bukan hanya pendiri dari Ruangobat.id, tapi ia juga pendiri dari
                Pharma Metrocity Group dan Jakarta Pasti Sehat, yang berfokus
                pada pengembangan ekosistem farmasi dan kesehatan di Indonesia.
                Ia juga memiliki beberapa pengalaman lain, yaitu:
              </p>
              <ul className="grid list-outside list-disc pl-4 font-medium leading-[180%] text-gray">
                <li>9+ Internship Experiences in Health Sectors</li>
                <li>8+ Laboratory Assistant Experiences</li>
                <li>4+ Healthcare Organization Experiences</li>
              </ul>
            </div>

            <Image
              priority
              src="/img/aboutus/about-img-3.png"
              alt="home img"
              width={396}
              height={512}
              className="h-auto w-full justify-self-center xl:justify-self-end"
            />
          </div>
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}
