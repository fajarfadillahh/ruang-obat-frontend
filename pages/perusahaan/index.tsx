import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@nextui-org/react";
import {
  ArrowRight,
  ChatCircleDots,
  ClipboardText,
  IconContext,
  LockKey,
  PhoneCall,
  Pill,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";

const data = [
  { label: "Tentang RuangObat", icon: Pill, url: "/perusahaan/tentang-kami" },
  { label: "Kontak Kami", icon: PhoneCall, url: "/perusahaan/kontak-kami" },
  {
    label: "Testimonial",
    icon: ChatCircleDots,
    url: "/perusahaan/testimonial",
  },
  {
    label: "Ketentuan Layanan ",
    icon: ClipboardText,
    url: "/perusahaan/ketentuan-layanan",
  },
  {
    label: "Kebijakan Privasi",
    icon: LockKey,
    url: "/perusahaan/kebijakan-privasi",
  },
];

export default function CompanyPage() {
  const router = useRouter();

  return (
    <>
      <Layout
        title="PT. Pharmacy Cone Group"
        description="Inovasi di bidang farmasi untuk kualitas hidup yang lebih baik. PT. Pharmacy Cone Group hadir sebagai solusi edukasi farmasi yang relevan dan terpercaya."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container gap-24 pb-[100px]">
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
            <h1 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
              Apa Yang Kamu Ingin Tahu?
            </h1>

            <IconContext.Provider
              value={{
                weight: "duotone",
                size: 48,
                className: "text-purple",
              }}
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="grid gap-6 rounded-xl bg-white p-8 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon />

                      <h4 className="text-xl font-extrabold text-black">
                        {item.label}
                      </h4>
                    </div>

                    <Button
                      color="secondary"
                      endContent={
                        <ArrowRight
                          weight="bold"
                          size={18}
                          className="text-white"
                        />
                      }
                      onClick={() => router.push(item.url)}
                      className="w-full font-bold"
                    >
                      Pelajari
                    </Button>
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
