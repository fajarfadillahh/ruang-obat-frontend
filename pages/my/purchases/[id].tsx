import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { Chip } from "@nextui-org/react";
import { ShoppingBag } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type DetailsPurchaceResponse = {
  order_id: string;
  invoice_number: string;
  status: string;
  total_amount: number;
  final_amount: number;
  paid_amount: number;
  discount_amount: number;
  discount_code: any;
  created_at: string;
  items: {
    product_id: string;
    product_name: string;
    product_price: number;
    product_type: string;
  }[];
  transactions: {
    transaction_id: string;
    status: string;
    payment_method: string;
    normalized_method: string;
    paid_amount: number;
    paid_at: string;
    expired_at: any;
    created_at: string;
  }[];
};

export default function DetailsPurchacePage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

  return (
    <>
      <Layout title="Detail Pembelian Saya">
        <section className="base-container gap-8 pb-[100px]">
          <ButtonBack />

          <h1 className="text-xl font-extrabold text-black sm:text-3xl">
            Detail Transaksi
          </h1>

          <div className="grid gap-4">
            <div className="grid divide-y-2 divide-gray/10 rounded-xl border-2 border-gray/10 p-8">
              <div className="flex items-center gap-2 pb-5">
                <h3 className="text-lg font-bold text-black">
                  Satus Pembelian
                </h3>

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
                  ["No. Pesanan:", data?.invoice_number],
                  [
                    "Tanggal Pembelian:",
                    formatDate(data?.created_at as string),
                  ],
                ].map(([label, value], index) => (
                  <div
                    key={index}
                    className="grid xs:flex xs:items-center xs:justify-between"
                  >
                    <h3 className="font-bold text-black">{label}</h3>

                    <p
                      className={`font-medium leading-[170%] ${index == 0 ? "text-purple" : "text-gray"}`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid divide-y-2 divide-gray/10 rounded-xl border-2 border-gray/10 p-8">
              <div className="flex items-center gap-2 pb-5">
                <h3 className="text-lg font-bold text-black">Detail Program</h3>
              </div>

              <div className="grid gap-4 pt-5 sm:grid-cols-[max-content_1fr] sm:items-center">
                <ShoppingBag
                  weight="duotone"
                  className="text-5xl text-purple sm:text-7xl lg:text-9xl"
                />

                <div className="grid gap-4 xs:gap-1">
                  <h4 className="text-2xl font-extrabold text-black xl:text-3xl">
                    {data?.items[0].product_name}
                  </h4>

                  <div className="flex flex-wrap items-center xs:gap-2">
                    <p className="font-bold leading-[170%] text-purple">
                      {formatRupiah(data?.items[0].product_price || 0)}
                    </p>

                    <div className="hidden text-gray before:text-gray before:content-['|'] xs:flex" />

                    <p className="font-medium leading-[170%] text-gray">
                      {data?.items[0].product_type === "videocourse"
                        ? "Ruang Sarjana & Diploma Farmasi 🎬"
                        : "Ruang Masuk Apoteker 💊"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid divide-y-2 divide-gray/10 rounded-xl border-2 border-gray/10 p-8">
              <div className="flex items-center gap-2 pb-5">
                <h3 className="text-lg font-bold text-black">
                  Rincian Pembayaran
                </h3>
              </div>

              <div className="grid gap-4 pt-5 xs:gap-1">
                {[
                  ["Subtotal Harga:", formatRupiah(data?.total_amount || 0)],
                  [
                    "Diskon Dari RuangObat:",
                    formatRupiah(data?.discount_amount || 0),
                  ],
                ].map(([label, value], index) => (
                  <div
                    key={index}
                    className="grid xs:flex xs:items-center xs:justify-between"
                  >
                    <h3 className="font-bold text-black">{label}</h3>

                    <p className="font-medium leading-[170%] text-gray">
                      {value}
                    </p>
                  </div>
                ))}

                <div className="mt-10 grid xs:flex xs:items-center xs:justify-between">
                  <h3 className="font-bold text-black">Total Pembayaran:</h3>

                  <p className="text-2xl font-extrabold leading-[170%] text-purple sm:text-3xl">
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
  error?: any;
}> = async ({ req, params }) => {
  const token = req.headers["access_token"] as string;

  try {
    const response: SuccessResponse<DetailsPurchaceResponse> = await fetcher({
      url: `/my/orders/${params?.id as string}`,
      method: "GET",
      token,
    });

    return {
      props: {
        data: response.data,
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
