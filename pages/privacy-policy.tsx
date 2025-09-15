import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PrivacyPage() {
  const router = useRouter();
  const currentUrl = `https://ruangobat.id${router.asPath}`;

  return (
    <>
      <NextSeo
        title="Kebijakan Privasi RuangObat: Perlindungan Data Anda | RuangObat"
        description="Pelajari kebijakan privasi RuangObat mengenai pengelolaan dan perlindungan data pribadi Anda. Keamanan informasi pengguna adalah prioritas kami."
        canonical={currentUrl}
        openGraph={{
          url: currentUrl,
          title:
            "Kebijakan Privasi RuangObat: Perlindungan Data Anda | RuangObat",
          description:
            "Pelajari kebijakan privasi RuangObat mengenai pengelolaan dan perlindungan data pribadi Anda. Keamanan informasi pengguna adalah prioritas kami.",
          site_name: "RuangObat",
        }}
      />

      <Layout
        title="Kebijakan Privasi RuangObat: Perlindungan Data Anda"
        description="Pelajari kebijakan privasi RuangObat mengenai pengelolaan dan perlindungan data pribadi Anda. Keamanan informasi pengguna adalah prioritas kami."
      >
        <ButtonBack />

        <section className="base-container max-w-[700px] gap-8 [padding:50px_0_100px]">
          <h1 className="text-[28px] font-extrabold text-black">
            Kebijakan Privasi 📋
          </h1>

          <div className="grid gap-4">
            <p className="font-medium leading-[180%] text-gray">
              Selamat datang di RuangObat.id, Kami sangat menghargai privasi
              kamu dan berkomitmen untuk melindungi data pribadi yang kamu
              berikan kepada kami. Kebijakan Privasi ini menjelaskan bagaimana
              kami mengumpulkan, menggunakan, dan melindungi informasi kamu saat
              kamu menggunakan layanan kami. Dengan mengakses dan menggunakan
              Ruangobat.id, kamu menyetujui ketentuan yang diuraikan dalam
              Kebijakan Privasi ini.
            </p>

            <ul className="grid list-outside list-decimal gap-4 pl-4 font-medium leading-[180%] text-gray">
              <li>
                <strong className="font-bold text-black">
                  Informasi yang Kami Kumpulkan
                </strong>{" "}
                Kami mengumpulkan berbagai jenis informasi untuk memberikan dan
                meningkatkan layanan kami. Informasi yang kami kumpulkan
                termasuk:
                <ul className="list-outside list-disc pl-4">
                  <li>
                    <strong className="font-bold text-black">
                      Informasi Pribadi:
                    </strong>{" "}
                    Nama lengkap, alamat email, nomor telepon, dan data lain
                    yang kamu berikan saat mendaftar.
                  </li>
                  <li>
                    <strong className="font-bold text-black">
                      Informasi Penggunaan:
                    </strong>{" "}
                    Data tentang bagaimana kamu menggunakan layanan kami,
                    seperti waktu akses, halaman yang dikunjungi, dan preferensi
                    kamu.
                  </li>
                  <li>
                    <strong className="font-bold text-black">
                      Informasi Teknis:
                    </strong>{" "}
                    Alamat IP, jenis perangkat, jenis browser, dan informasi
                    teknis lainnya yang dikirimkan oleh perangkat kamu.
                  </li>
                </ul>
              </li>

              <li>
                <strong className="font-bold text-black">
                  Penggunaan Informasi
                </strong>{" "}
                Kami menggunakan informasi yang kami kumpulkan untuk berbagai
                keperluan, termasuk:
                <ul className="list-outside list-disc pl-4">
                  <li>
                    Menyediakan, memelihara, dan meningkatkan layanan
                    Ruangobat.id.
                  </li>
                  <li>Memproses pendaftaran dan mengelola akun pengguna.</li>
                  <li>
                    Mengirimkan pemberitahuan penting dan pembaruan terkait
                    layanan.
                  </li>
                  <li>
                    Menganalisis dan memahami bagaimana pengguna menggunakan
                    layanan kami untuk meningkatkan pengalaman pengguna.
                  </li>
                  <li>
                    Mencegah aktivitas ilegal atau yang melanggar ketentuan
                    layanan kami.
                  </li>
                </ul>
              </li>

              <li>
                <strong className="font-bold text-black">
                  Pembagian Informasi
                </strong>{" "}
                Kami tidak akan menjual, menukar, atau membagikan informasi
                pribadi kamu kepada pihak ketiga tanpa persetujuan kamu, kecuali
                dalam situasi berikut:
                <ul className="list-outside list-disc pl-4">
                  <li>
                    <strong className="font-bold text-black">
                      Penyedia Layanan:
                    </strong>{" "}
                    Kami dapat membagikan informasi dengan mitra atau penyedia
                    layanan yang membantu kami dalam operasional aplikasi.
                  </li>
                  <li>
                    <strong className="font-bold text-black">
                      Kepatuhan Hukum:
                    </strong>{" "}
                    Kami dapat mengungkapkan informasi jika diwajibkan oleh
                    hukum atau jika diperlukan untuk melindungi hak, properti,
                    atau keselamatan kami dan pengguna lain.
                  </li>
                </ul>
              </li>

              <li>
                <strong className="font-bold text-black">Keamanan Data</strong>{" "}
                Kami menerapkan langkah-langkah keamanan yang wajar untuk
                melindungi informasi pribadi kamu dari akses, pengungkapan,
                perubahan, atau penghancuran yang tidak sah. Namun, tidak ada
                metode transmisi melalui internet atau metode penyimpanan
                elektronik yang sepenuhnya aman. Oleh karena itu, kami tidak
                dapat menjamin keamanan mutlak informasi yang kamu berikan
                kepada kami.
              </li>

              <li>
                <strong className="font-bold text-black">
                  Cookie dan Teknologi Pelacakan
                </strong>{" "}
                Ruangobat.id menggunakan cookie dan teknologi pelacakan serupa
                untuk meningkatkan pengalaman pengguna, menganalisis penggunaan,
                dan menyediakan konten yang relevan. kamu dapat mengatur browser
                kamu untuk menolak semua cookie atau memberi tahu saat cookie
                dikirim. Namun, beberapa fitur layanan kami mungkin tidak
                berfungsi dengan baik jika kamu menonaktifkan cookie.
              </li>

              <li>
                <strong className="font-bold text-black">
                  Hak Akses dan Pembaruan Informasi
                </strong>{" "}
                kamu berhak untuk mengakses, memperbarui, atau menghapus
                informasi pribadi kamu kapan saja. Jika kamu ingin mengubah atau
                menghapus informasi, silakan hubungi kami melalui kontak yang
                tersedia.
              </li>

              <li>
                <strong className="font-bold text-black">
                  Perubahan Kebijakan Privasi
                </strong>{" "}
                Kami berhak untuk memperbarui Kebijakan Privasi ini dari waktu
                ke waktu. Setiap perubahan akan diberitahukan melalui email atau
                pemberitahuan di aplikasi kami. Kami mendorong kamu untuk
                meninjau Kebijakan Privasi ini secara berkala untuk tetap
                mengetahui informasi terbaru tentang bagaimana kami melindungi
                data pribadi kamu.
              </li>

              <li>
                <strong className="font-bold text-black">Kontak</strong> Jika
                kamu memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan
                hubungi kami di:
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
              Dengan menggunakan Ruangobat.id, kamu menyetujui Kebijakan Privasi
              ini dan setuju dengan pengumpulan, penggunaan, dan pembagian
              informasi pribadi kamu seperti yang dijelaskan di atas. Terima
              kasih telah mempercayakan data kamu kepada kami!
            </p>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
