import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/footer/FooterSimple";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TermsPage() {
  const router = useRouter();
  const currentUrl = `https://ruangobat.id${router.asPath}`;

  return (
    <>
      <NextSeo
        title="Ketentuan Layanan | RuangObat"
        description="Dengan menggunakan layanan kami, Anda menyetujui persyaratan yang mengatur hak dan kewajiban kedua belah pihak, termasuk batasan penggunaan, tanggung jawab pengguna, dan hak kekayaan intelektual yang berlaku dalam platform kami."
        canonical={currentUrl}
        openGraph={{
          url: currentUrl,
          title: "Ketentuan Layanan | RuangObat",
          description:
            "Dengan menggunakan layanan kami, Anda menyetujui persyaratan yang mengatur hak dan kewajiban kedua belah pihak, termasuk batasan penggunaan, tanggung jawab pengguna, dan hak kekayaan intelektual yang berlaku dalam platform kami.",
          site_name: "RuangObat",
        }}
      />

      <Head>
        <title>Ketentuan Layanan | Ruangobat.id</title>
      </Head>

      <main className="mx-auto grid w-full max-w-[1200px] px-6 xl:px-0">
        <div className="grid min-h-screen gap-4 pb-24 pt-12">
          <ButtonBack />

          <BreadcrumbsUrl rootLabel="Home" basePath="/" />

          <section className="mx-auto grid max-w-[700px] gap-6">
            <h1 className="text-[28px] font-extrabold text-black">
              Ketentuan Layanan 📋
            </h1>

            <div className="grid gap-4">
              <p className="font-medium leading-[180%] text-gray">
                Selamat datang di Ruangobat.id, aplikasi ujian online yang
                dikelola oleh PT. Pharmacy Cone Group. Dengan menggunakan
                layanan kami, Anda setuju untuk mematuhi dan terikat oleh
                ketentuan layanan berikut ini. Mohon baca dengan seksama sebelum
                menggunakan layanan kami.
              </p>

              <ul className="grid list-outside list-decimal gap-4 pl-4 font-medium leading-[180%] text-gray">
                <li>
                  <strong className="font-bold text-black">
                    Penerimaan Ketentuan
                  </strong>{" "}
                  Dengan mengakses atau menggunakan Ruangobat.id, Anda
                  menyetujui untuk terikat dengan Ketentuan Layanan ini. Jika
                  Anda tidak setuju dengan salah satu ketentuan ini, Anda tidak
                  diperkenankan menggunakan layanan kami.
                </li>

                <li>
                  <strong className="font-bold text-black">
                    Lingkup Layanan
                  </strong>{" "}
                  Ruangobat.id menyediakan platform untuk mahasiswa farmasi
                  dalam melakukan ujian online dan tryout. Kami berhak menambah,
                  mengubah, atau menghapus fitur layanan kapan saja tanpa
                  pemberitahuan sebelumnya.
                </li>

                <li>
                  <strong className="font-bold text-black">
                    Akun Pengguna
                  </strong>{" "}
                  Untuk mengakses layanan kami, Anda harus membuat akun
                  pengguna. Anda bertanggung jawab untuk menjaga kerahasiaan
                  informasi akun Anda, termasuk kata sandi, dan bertanggung
                  jawab atas semua aktivitas yang terjadi di akun Anda.
                </li>

                <li>
                  <strong className="font-bold text-black">
                    Penggunaan yang Dilarang
                  </strong>{" "}
                  Anda setuju untuk tidak menggunakan layanan kami untuk tujuan
                  yang melanggar hukum, tidak sah, atau merugikan pihak lain.
                  Anda juga dilarang untuk:
                  <ul className="list-outside list-disc pl-4">
                    <li>Mengakses sistem kami secara ilegal.</li>
                    <li>Menyebarkan virus atau kode berbahaya lainnya.</li>
                    <li>
                      Menggunakan layanan kami untuk penipuan atau aktivitas
                      ilegal lainnya.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong className="font-bold text-black">
                    Pembayaran dan Langganan
                  </strong>{" "}
                  Beberapa fitur di Ruangobat.id mungkin memerlukan pembayaran
                  atau langganan. Anda setuju untuk memberikan informasi
                  pembayaran yang akurat dan membayar semua biaya yang berlaku
                  sesuai dengan ketentuan yang berlaku pada saat pembelian.
                </li>

                <li>
                  <strong className="font-bold text-black">
                    Kebijakan Privasi
                  </strong>{" "}
                  Penggunaan informasi pribadi Anda diatur oleh Kebijakan
                  Privasi kami, yang merupakan bagian dari Ketentuan Layanan
                  ini. Silakan baca Kebijakan Privasi kami untuk informasi lebih
                  lanjut.
                </li>

                <li>
                  <strong className="font-bold text-black">
                    Pembatasan Tanggung Jawab
                  </strong>{" "}
                  Ruangobat.id tidak bertanggung jawab atas segala kerugian atau
                  kerusakan yang timbul akibat penggunaan layanan kami. Layanan
                  kami disediakan {`"apa adanya"`} tanpa jaminan apa pun.
                </li>

                <li>
                  <strong className="font-bold text-black">
                    Perubahan Ketentuan Layanan
                  </strong>{" "}
                  Kami berhak mengubah Ketentuan Layanan ini kapan saja.
                  Perubahan akan diberitahukan melalui aplikasi atau email. Anda
                  diharapkan untuk meninjau Ketentuan Layanan secara berkala.
                  Penggunaan layanan setelah perubahan berarti Anda setuju
                  dengan ketentuan yang telah diubah.
                </li>

                <li>
                  <strong className="font-bold text-black">
                    Hukum yang Berlaku
                  </strong>{" "}
                  Ketentuan Layanan ini diatur oleh hukum yang berlaku di
                  Indonesia. Setiap perselisihan yang timbul dari atau terkait
                  dengan Ketentuan Layanan ini akan diselesaikan melalui
                  pengadilan yang berwenang di Indonesia.
                </li>

                <li>
                  <strong className="font-bold text-black">Kontak</strong> Jika
                  Anda memiliki pertanyaan mengenai Ketentuan Layanan ini,
                  silakan hubungi kami di:
                  <ul className="list-outside list-disc pl-4">
                    <li>
                      <strong className="font-bold text-black">Website:</strong>{" "}
                      <Link
                        href="https://ruangobat.id"
                        target="_blank"
                        className="text-purple hover:underline"
                      >
                        https://ruangobat.id
                      </Link>
                    </li>
                    <li>
                      <strong className="font-bold text-black">Alamat:</strong>{" "}
                      PT. Pharmacy Cone Group, [Alamat Kantor]
                    </li>
                  </ul>
                </li>
              </ul>

              <p className="font-medium leading-[180%] text-gray">
                Dengan menggunakan layanan Ruangobat.id, Anda dianggap telah
                memahami dan menyetujui seluruh ketentuan yang tercantum di
                atas. Terima kasih telah menggunakan layanan kami!
              </p>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
