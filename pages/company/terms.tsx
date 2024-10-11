import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/Footer";
import Head from "next/head";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Ketentuan Layanan | Ruangobat.id</title>
        <meta
          name="description"
          content="Ruangobat adalah platform ujian online yang dirancang khusus untuk mahasiswa farmasi. Dapatkan pengalaman belajar dan ujian yang interaktif dengan berbagai soal terupdate sesuai kurikulum terkini. Uji kemampuan, tingkatkan pemahaman, dan siap menghadapi ujian farmasi dengan percaya diri. Belajar farmasi jadi lebih efektif dan terstruktur hanya di Ruangobat!"
        />
        <meta
          name="keywords"
          content="ruangobat, ruangobat.id, ruangobat ujian, ruangobat ujian online, ruangobat farmasi, ruangobat tryout, ruangobat tes, ujian online farmasi, ujian online ruangobat, platform ujian mahasiswa farmasi, belajar farmasi online, tryout farmasi online, tes farmasi online, latihan soal farmasi, simulasi ujian farmasi, platform belajar farmasi, ujian online farmasi terpercaya"
        />
        <meta property="og:title" content="Ketentuan Layanan | Ruangobat.id" />
        <meta
          property="og:description"
          content="Ruangobat adalah platform ujian online yang dirancang khusus untuk mahasiswa farmasi. Dapatkan pengalaman belajar dan ujian yang interaktif dengan berbagai soal terupdate sesuai kurikulum terkini. Uji kemampuan, tingkatkan pemahaman, dan siap menghadapi ujian farmasi dengan percaya diri. Belajar farmasi jadi lebih efektif dan terstruktur hanya di Ruangobat!"
        />
      </Head>

      <main className="mx-auto grid w-full max-w-[1200px] px-6 xl:px-0">
        <div className="grid min-h-screen gap-4 pb-24 pt-12">
          <ButtonBack />

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

              <ul className="grid list-inside list-decimal gap-4 font-medium leading-[180%] text-gray">
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
                  <ul className="list-inside list-disc pl-4">
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
                  kami disediakan "apa adanya" tanpa jaminan apa pun.
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
                  <ul className="list-inside list-disc pl-4">
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
