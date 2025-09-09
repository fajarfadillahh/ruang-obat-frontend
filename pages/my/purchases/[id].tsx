import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/footer/Footer";
import TemplateInvoice from "@/components/template/TemplateInvoice";
import Layout from "@/components/wrapper/Layout";
import { products } from "@/lib/products";
import { SuccessResponse } from "@/types/global.type";
import { UserDataResponse } from "@/types/profile.type";
import { DetailsPurchaceResponse } from "@/types/purchase.type";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Chip } from "@nextui-org/react";
import { DownloadSimple, ShoppingBagOpen } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function DetailsPurchacePage({
  data,
  user,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const templateRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const wrapperSection =
    "grid divide-y-2 divide-gray/10 rounded-xl border-2 border-gray/10 p-6";

  type Status = "paid" | "pending" | "failed" | "expired" | "cancelled";
  const statusMap: Record<
    Status,
    { label: string; color: "success" | "warning" | "danger" }
  > = {
    paid: { label: "Sukses", color: "success" },
    pending: { label: "Menunggu", color: "warning" },
    failed: { label: "Gagal", color: "danger" },
    expired: { label: "Kadaluarsa", color: "danger" },
    cancelled: { label: "Dibatalkan", color: "danger" },
  };
  const { label, color } = statusMap[data?.status as Status] ?? {
    label: "Diubah",
    color: "default",
  };

  const typeProgram = products.find(
    (item) => item.code === data?.items[0].product_type,
  );

  const handlePrint = useReactToPrint({
    content: () => templateRef.current,
    documentTitle: `Invoice ${data?.invoice_number} - RuangObat.id`,
    onBeforeGetContent: () => {
      setIsLoading(true);
      return new Promise((resolve) => {
        const images = templateRef.current?.querySelectorAll("img") || [];
        if (images.length === 0) {
          resolve("");
          return;
        }

        let loaded = 0;
        images.forEach((img) => {
          if (img.complete) {
            loaded++;
            if (loaded === images.length) resolve("");
          } else {
            img.onload = () => {
              loaded++;
              if (loaded === images.length) resolve("");
            };
            img.onerror = () => {
              loaded++;
              if (loaded === images.length) resolve("");
            };
          }
        });
      });
    },
    onAfterPrint: () => setIsLoading(false),
    onPrintError: () => setIsLoading(false),
  });

  return (
    <>
      <Layout title="Detail Pembelian Saya">
        <section className="base-container gap-8 pb-[100px]">
          <ButtonBack />

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="grid gap-1">
              <h1 className="text-xl font-extrabold text-black sm:text-3xl">
                Detail Pembelian 🛒
              </h1>

              <p className="font-medium leading-[170%] text-gray">
                Lihat detail pembelian kamu disini.
              </p>
            </div>

            <Button
              isDisabled={isLoading}
              isLoading={isLoading}
              color="secondary"
              startContent={
                !isLoading && <DownloadSimple weight="duotone" size={18} />
              }
              onClick={handlePrint}
              className="font-bold"
            >
              {isLoading ? "Mendowload..." : "Download Invoice"}
            </Button>

            <div style={{ display: "none" }}>
              <TemplateInvoice ref={templateRef} data={data} user={user} />
            </div>
          </div>

          <div className="grid gap-4">
            <div className={wrapperSection}>
              <div className="flex items-center justify-between gap-2 pb-5">
                <h2 className="font-extrabold text-black md:text-lg">
                  Status Pembelian
                </h2>

                <Chip
                  variant="flat"
                  color={color}
                  classNames={{
                    content: "font-bold capitalize",
                  }}
                >
                  {label}
                </Chip>
              </div>

              <div className="grid gap-4 pt-5 xs:gap-1">
                {[
                  ["No. Pembelian:", data?.order_id],
                  ["No. Invoice:", data?.invoice_number],
                  ["Tanggal Pembelian:", formatDate(`${data?.created_at}`)],
                ].map(([label, value], index) => (
                  <div
                    key={index}
                    className="grid text-sm text-black xs:flex xs:items-center xs:justify-between md:text-base"
                  >
                    <h3 className="font-semibold">{label}</h3>
                    <p className="font-medium leading-[170%]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={wrapperSection}>
              <div className="flex items-center gap-2 pb-5">
                <h3 className="font-extrabold text-black md:text-lg">
                  Detail Program
                </h3>
              </div>

              <div className="grid gap-4 pt-5 sm:grid-cols-[max-content_1fr] sm:items-center">
                <ShoppingBagOpen
                  weight="duotone"
                  className="text-5xl text-purple sm:text-7xl lg:text-8xl"
                />

                <div className="grid sm:gap-1">
                  <h4 className="text-lg font-extrabold text-black sm:text-xl md:text-2xl">
                    {data?.items[0].product_name}
                  </h4>

                  <div className="flex items-center gap-2 text-sm md:text-base">
                    <p className="font-bold leading-[170%] text-purple">
                      {formatRupiah(data?.items[0].product_price || 0)}
                    </p>
                    |
                    <p className="line-clamp-1 font-medium leading-[170%] text-gray">
                      {typeProgram?.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={wrapperSection}>
              <div className="flex items-center gap-2 pb-5">
                <h3 className="font-extrabold text-black md:text-lg">
                  Rincian Pembayaran
                </h3>
              </div>

              <div className="grid gap-4 pt-5 xs:gap-1">
                {[
                  ["Subtotal Harga:", formatRupiah(data?.final_amount || 0)],
                  ["Metode Pembayaran:", data?.transactions[0].payment_method],
                  [
                    "Dipesan Pada:",
                    formatDate(`${data?.transactions[0].created_at}`),
                  ],
                  [
                    "Dibayar Pada:",
                    formatDate(`${data?.transactions[0].paid_at}`),
                  ],
                ].map(([label, value], index) => (
                  <div
                    key={index}
                    className="grid text-sm text-black xs:flex xs:items-center xs:justify-between md:text-base"
                  >
                    <h3 className="font-semibold">{label}</h3>
                    <p className="font-medium capitalize leading-[170%]">
                      {value}
                    </p>
                  </div>
                ))}

                <div className="mt-10 grid xs:flex xs:items-center xs:justify-between">
                  <h3 className="text-sm font-semibold text-black md:text-base">
                    Jumlah Pembayaran:
                  </h3>
                  <p className="text-xl font-black leading-[170%] text-purple md:text-2xl">
                    {formatRupiah(data?.paid_amount || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: DetailsPurchaceResponse;
  user?: UserDataResponse;
  error?: any;
}> = async ({ req, params }) => {
  const token = req.headers["access_token"] as string;

  try {
    const [orderRes, userRes]: [
      SuccessResponse<DetailsPurchaceResponse>,
      SuccessResponse<UserDataResponse>,
    ] = await Promise.all([
      fetcher({
        url: `/my/orders/${params?.id as string}`,
        method: "GET",
        token,
      }),
      fetcher({
        url: "/my/profile",
        method: "GET",
        token,
      }),
    ]);

    return {
      props: {
        data: orderRes.data,
        user: userRes.data,
      },
    };
  } catch (error: any) {
    console.error("Error fetch subscription:", error);

    return {
      props: {
        error: error.message ?? "Internal Server Error",
      },
    };
  }
};
