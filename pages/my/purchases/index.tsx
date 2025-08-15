import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { getUrl } from "@/lib/getUrl";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SuccessResponse } from "@/types/global.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { Chip, Pagination, Skeleton } from "@nextui-org/react";
import { ShoppingCart } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQueryState } from "nuqs";
import { useRef } from "react";
import useSWR from "swr";

type OrderResponse = {
  orders: Order[];
  page: number;
  total_orders: number;
  total_pages: number;
};

type Order = {
  order_id: string;
  final_amount: number;
  status: string;
  created_at: string;
  items: {
    product_id: string;
    product_name: string;
    product_price: number;
    product_type: string;
  }[];
};

export default function MyPurchasesPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [page, setPage] = useQueryState("page", { defaultValue: "" });

  const divRef = useRef<HTMLDivElement | null>(null);
  const { data, error, isLoading } = useSWR<SuccessResponse<OrderResponse>>({
    url: getUrl("/my/orders", {
      page,
    }),
    method: "GET",
    token,
  });

  return (
    <>
      <Layout title="Langganan Saya">
        <section className="base-container gap-8 pb-[100px]">
          <div className="grid gap-1">
            <h1 className="text-2xl font-extrabold -tracking-wide text-black">
              Pembelian Saya 🛒
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              Lihat detail history pembelian/transaksi kamu di masa sebelumnya.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {isLoading ? (
              Array.from({ length: data?.data.orders.length || 6 }).map(
                (_, index) => (
                  <Skeleton key={index} className="h-32 w-full rounded-xl" />
                ),
              )
            ) : data?.data.orders.length ? (
              data?.data.orders.map((order) => {
                type Status =
                  | "paid"
                  | "pending"
                  | "failed"
                  | "expired"
                  | "cancelled";

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

                const { label, color } = statusMap[order.status as Status] ?? {
                  label: "Diubah",
                  color: "default",
                };

                const orderItem = order.items[0];
                const infoList = [
                  {
                    label: "Tanggal Order:",
                    value: formatDateWithoutTime(order.created_at),
                  },
                  {
                    label: "Tipe Paket:",
                    value:
                      orderItem.product_type === "videocourse"
                        ? "Ruang Sarjana & Diploma Farmasi 🎬"
                        : "Ruang Masuk Apoteker 💊",
                  },
                ];

                return (
                  <div
                    key={order.order_id}
                    className="grid divide-y-2 divide-gray/10 rounded-xl border-2 border-gray/10 p-4 hover:cursor-pointer hover:bg-purple/10"
                    onClick={() =>
                      router.push(`/my/purchases/${order.order_id}`)
                    }
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
                      <div className="inline-flex items-center gap-2">
                        <ShoppingCart
                          weight="duotone"
                          size={20}
                          className="text-purple"
                        />

                        <p className="text-sm font-medium leading-[170%] text-gray">
                          {order.order_id}
                        </p>
                      </div>

                      <Chip
                        variant="flat"
                        size="sm"
                        color={color}
                        classNames={{
                          content: "font-bold capitalize",
                        }}
                      >
                        {label}
                      </Chip>
                    </div>

                    <div className="grid gap-4 pt-6">
                      <h4 className="text-lg font-bold text-black">
                        {orderItem.product_name}
                      </h4>

                      <div className="flex flex-wrap items-start gap-4 xs:gap-8">
                        {infoList.map(({ label, value }, i) => (
                          <div key={i} className="grid gap-1">
                            <span className="text-xs font-medium text-gray">
                              {label}
                            </span>

                            <p className="text-sm font-semibold text-gray">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="grid justify-items-center gap-4 rounded-xl border-2 border-dashed border-gray/20 p-8 xl:col-span-2">
                <Image
                  src="https://ruangobat.is3.cloudhost.id/statics/images/main-illustrations/img-no-data-upload.webp"
                  alt="no data image"
                  width={1000}
                  height={1000}
                  className="h-[280px] w-auto"
                />

                <h3 className="max-w-[500px] text-center text-xl font-extrabold text-black">
                  Waduhh, kamu belum ada pembelian apapun nihh. Ayo, lakukan
                  pembelian sekarang...
                </h3>
              </div>
            )}
          </div>

          {!isLoading && data?.data.orders.length ? (
            <Pagination
              isCompact
              showControls
              page={data?.data.page as number}
              total={data?.data.total_pages as number}
              onChange={(e) => {
                divRef.current?.scrollIntoView({ behavior: "smooth" });
                setPage(`${e}`);
              }}
              className="justify-self-center"
              classNames={{
                cursor: "bg-purple text-white",
              }}
            />
          ) : null}
        </section>
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      token: session ? (session?.user.access_token as string) : "",
    },
  };
};
