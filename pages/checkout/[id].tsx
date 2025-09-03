import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  Bank,
  ClipboardText,
  IconContext,
  QrCode,
} from "@phosphor-icons/react";
import { ClockCountdown } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/router";

const summary_order = [
  {
    icon: ClipboardText,
    label: "Deskripsi",
    data: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias quibusdam, natus impedit sequi quae expedita.",
  },
  {
    icon: ClockCountdown,
    label: "Bayar Sebelum",
    data: "10 September 2025, Pukul 10:45",
  },
];

export default function CheckoutDetailsPage() {
  const router = useRouter();

  return (
    <>
      <Layout title="Lakukan Pembayaran Sekarang">
        <ButtonBack />

        <section className="base-container items-start gap-12 [padding:1.5rem_0_100px] xl:grid-cols-[1fr_450px] xl:gap-24">
          {/* === mobile view: summary order === */}
          <Accordion className="block xl:hidden">
            <AccordionItem
              title="Ringkasan Pesanan"
              classNames={{
                title: "text-base text-black font-bold",
                indicator: "text-black",
              }}
            >
              <div className="grid divide-y-2 divide-dashed divide-gray/10">
                <div className="grid gap-1 pb-8">
                  <h3 className="font-bold text-black">Ringkasan Pesanan</h3>

                  <p className="text-sm font-medium text-black">
                    Transaksi:{" "}
                    <span className="text-sm font-bold text-purple">
                      {router.query.id}
                    </span>
                  </p>
                </div>

                <div className="grid gap-4 py-8">
                  {summary_order.map((order, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <order.icon
                        weight="duotone"
                        size={24}
                        className="text-purple"
                      />

                      <div className="grid flex-1">
                        <h4 className="font-bold text-black">{order.label}:</h4>

                        <p className="line-clamp-3 text-sm font-medium leading-[170%] text-gray">
                          {order.data}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-start justify-between gap-4 py-8">
                  <div className="grid">
                    <h4 className="line-clamp-2 text-sm font-bold text-black">
                      TRYOUT CBT UKMPPAI FEB 2025
                    </h4>
                    <p className="text-sm font-medium text-gray">
                      1 x Rp350.000
                    </p>
                  </div>

                  <h4 className="text-sm font-bold text-black">Rp350.000</h4>
                </div>

                <div className="flex items-center justify-between gap-4 pt-8">
                  <h4 className="text-sm font-semibold text-black">
                    Jumlah Pembayaran:
                  </h4>

                  <h4 className="text-lg font-black text-purple">Rp350.000</h4>
                </div>
              </div>
            </AccordionItem>
          </Accordion>

          <div className="grid gap-16">
            <div className="grid gap-1 text-center">
              <h3 className="font-bold text-black">
                Bayar Sebelum{" "}
                <span className="font-extrabold text-purple">
                  10 September 2025
                </span>
                , Pukul 10:45
              </h3>

              <h2 className="text-3xl font-black -tracking-wide text-purple xl:text-4xl">
                Rp350.000
              </h2>
            </div>

            <div className="grid gap-1">
              <h3 className="font-bold text-black md:text-lg">
                Metode Pembayaran
              </h3>

              <IconContext.Provider
                value={{
                  weight: "duotone",
                  size: 28,
                  className: "text-purple",
                }}
              >
                <Accordion>
                  <AccordionItem
                    title="Transfer Bank"
                    startContent={<Bank />}
                    classNames={{
                      title: "text-base text-black font-bold",
                      indicator: "text-black",
                      // content: "text-gray leading-[170%] font-medium pb-8",
                    }}
                  >
                    Transfer Bank
                  </AccordionItem>

                  <AccordionItem
                    title="Pembayaran QR"
                    startContent={<QrCode />}
                    classNames={{
                      title: "text-base text-black font-bold",
                      indicator: "text-black",
                      // content: "text-gray leading-[170%] font-medium pb-8",
                    }}
                  >
                    Pembayaran QR
                  </AccordionItem>
                </Accordion>
              </IconContext.Provider>
            </div>
          </div>

          {/* === desktop view: summary order === */}
          <div className="hidden divide-y-2 divide-dashed divide-gray/10 xl:grid">
            <div className="grid gap-1 pb-8">
              <h3 className="text-lg font-bold text-black">
                Ringkasan Pesanan
              </h3>

              <p className="font-medium text-black">
                Transaksi:{" "}
                <span className="font-bold text-purple">{router.query.id}</span>
              </p>
            </div>

            <div className="grid gap-4 py-8">
              {summary_order.map((order, index) => (
                <div key={index} className="flex items-start gap-3">
                  <order.icon
                    weight="duotone"
                    size={28}
                    className="text-purple"
                  />

                  <div className="grid flex-1">
                    <h4 className="font-bold text-black">{order.label}:</h4>

                    <p className="line-clamp-3 font-medium leading-[170%] text-gray">
                      {order.data}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start justify-between gap-4 py-8">
              <div className="grid">
                <h4 className="line-clamp-2 font-bold text-black">
                  TRYOUT CBT UKMPPAI FEB 2025
                </h4>
                <p className="font-medium text-gray">1 x Rp350.000</p>
              </div>

              <h4 className="font-bold text-black">Rp350.000</h4>
            </div>

            <div className="flex items-center justify-between gap-4 pt-8">
              <h4 className="font-semibold text-black">Jumlah Pembayaran:</h4>

              <h4 className="text-xl font-black text-purple">Rp350.000</h4>
            </div>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
