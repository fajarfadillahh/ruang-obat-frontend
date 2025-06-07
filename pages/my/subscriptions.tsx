import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@nextui-org/react";
import { ArrowRight, IconContext, Video } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function MySubscriptionsPage() {
  return (
    <>
      <Layout title="Langganan Saya">
        <section className="base-container gap-8 pb-[100px]">
          <div className="grid gap-1">
            <h1 className="text-2xl font-extrabold -tracking-wide text-black">
              Langganan Saya 💳
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              Lihat detail langganan aktif kamu dan akses ke kelas yang telah
              dibeli.
            </p>
          </div>

          <div className="flex min-h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-gray/20 p-8 text-center font-medium text-gray sm:text-left">
            Kamu belum berlangganan apapun...
          </div>

          {/* <div className="grid items-start gap-4 xl:grid-cols-2">
            <CardHasSubscription />
          </div> */}
        </section>
      </Layout>

      <Footer />
    </>
  );
}

function CardHasSubscription() {
  const router = useRouter();

  return (
    <div className="grid gap-8 rounded-xl border-l-8 border-pink-500 bg-white p-8 shadow-[4px_4px_36px_rgba(0,0,0,0.1)] xl:p-12">
      <IconContext.Provider
        value={{
          weight: "duotone",
          size: 96,
          className: "text-purple",
        }}
      >
        <Video />
      </IconContext.Provider>

      <h1 className="text-2xl font-bold capitalize text-black">
        Selamat anda telah berlangganan Video Pembelajaran 🎉 🎊
      </h1>

      <div className="grid gap-2">
        <h4 className="text-lg font-bold text-black">Data Langganan</h4>

        <div className="grid gap-2 sm:gap-1">
          {[
            ["Status", "Langganan Aktif ✅"],
            ["Masa Berlaku", "Sampai 14 Oktober 2025"],
            ["Jenis Paket", "Paket 6 Bulan"],
          ].map(([label, value], index) => (
            <div
              key={index}
              className="grid font-medium text-gray sm:grid-cols-[120px_1fr]"
            >
              <p>{label} :</p>

              <p className="font-bold capitalize text-black">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <Button
        color="secondary"
        endContent={<ArrowRight weight="bold" size={18} />}
        className="font-bold"
      >
        Detail Kelas
      </Button>
    </div>
  );
}
