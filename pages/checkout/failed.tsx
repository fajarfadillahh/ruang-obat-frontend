import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CheckoutFailedPage() {
  const router = useRouter();

  return (
    <>
      <Layout title="Pembayaran Gagal!">
        <section className="base-container relative isolate [padding:50px_0_100px]">
          <div className="z-20 grid justify-items-center gap-8">
            <Image
              src="https://ruangobat.is3.cloudhost.id/statics/images/checkout-img/img-checkout-failed.webp"
              alt="success checkout img"
              width={1000}
              height={1000}
              className="max-h-[300px] w-auto"
              priority
            />

            <div className="grid max-w-[650px] justify-items-center gap-2 text-center">
              <h2 className="text-2xl font-black -tracking-wide text-black md:text-3xl">
                Oops! Pembayaran Gagal 🚫
              </h2>
              <p className="font-medium leading-[170%] text-gray">
                Sayang sekali, pembayaran kamu gagal diproses. Jangan khawatir,
                silakan coba kembali beberapa saat lagi atau klik tombol di
                bawah untuk melihat detail transaksi.
              </p>

              <Button
                color="secondary"
                endContent={<ArrowRight weight="bold" size={18} />}
                onClick={() => router.push("/my/transactions")}
                className="mt-6 w-max font-bold"
              >
                Detail Transaksi
              </Button>
            </div>
          </div>

          <span className="absolute top-12 z-10 hidden justify-self-center text-[250px] font-black -tracking-wide text-danger/5 xl:block">
            Gagal !
          </span>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
