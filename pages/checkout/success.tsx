import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number>(10);

  // useEffect(() => {
  //   if (!router.query.tx) {
  //     router.replace("/");
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     setCountdown((prev) => {
  //       if (prev === 1) {
  //         clearInterval(interval);
  //         router.push("/my/purchases");
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [router]);

  // if (!router.query.tx) return null;

  return (
    <>
      <Layout title="Pembayaran Berhasil!">
        <section className="base-container relative isolate [padding:50px_0_100px]">
          <div className="z-20 grid justify-items-center gap-8">
            <Image
              src="https://ruangobat.is3.cloudhost.id/statics/images/checkout-img/img-checkout-success.webp"
              alt="success checkout img"
              width={1000}
              height={1000}
              className="max-h-[300px] w-auto"
              priority
            />

            <div className="grid max-w-[650px] justify-items-center gap-2 text-center">
              <h2 className="text-2xl font-black -tracking-wide text-black md:text-3xl">
                Yeay! Pembayaran Berhasil 🎉
              </h2>
              <p className="font-medium leading-[170%] text-gray">
                Terima kasih sudah melakukan pembayaran. Transaksi kamu sudah
                kami terima, silakan klik tombol di bawah untuk melihat riwayat
                transaksi lebih lanjut.
              </p>
              <p className="my-2 text-sm font-medium italic leading-[170%] text-gray">
                Beralih ke halaman detail transaksi dalam{" "}
                <span className="font-black text-purple">{countdown}</span>{" "}
                detik...
              </p>

              <Button
                color="secondary"
                endContent={<ArrowRight weight="bold" size={18} />}
                className="mt-6 w-max font-bold"
              >
                Detail Transaksi
              </Button>
            </div>
          </div>

          <span className="absolute top-12 z-10 hidden justify-self-center text-[250px] font-black -tracking-wide text-success/5 xl:block">
            Berhasil !
          </span>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
