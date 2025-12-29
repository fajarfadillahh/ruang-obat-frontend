import { products } from "@/lib/products";
import { UserDataResponse } from "@/types/profile.type";
import { DetailsPurchaceResponse } from "@/types/purchase.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { Chip } from "@nextui-org/react";
import { forwardRef, Ref } from "react";

type TemplateInvoiceProps = {
  data?: DetailsPurchaceResponse;
  user?: UserDataResponse;
};

function TemplateInvoice(
  { data, user }: TemplateInvoiceProps,
  ref: Ref<HTMLDivElement>,
) {
  const typeProgram = products.find(
    (item) => item.code === data?.items[0].product_type,
  );

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
    <div
      className="grid w-full max-w-[1000px] divide-y-2 divide-gray/10 p-10 font-mulish text-sm"
      ref={ref}
    >
      <div className="flex items-start justify-between gap-8 pb-8">
        <div className="grid gap-4">
          <div className="inline-flex items-center gap-2">
            <img
              src="=https://cdn.ruangobat.id/statics/images/ruangobat-logo/ruangobat-logo.png"
              alt="ruangobat logo"
              className="size-10"
            />

            <h2 className="text-xl font-bold -tracking-wide text-black">
              RuangObat<span className="text-purple">.</span>
              <Chip
                variant="flat"
                color={color}
                className="ml-4"
                classNames={{
                  content: "font-bold capitalize",
                }}
              >
                {label}
              </Chip>
            </h2>
          </div>

          <div className="grid">
            <span className="text-purple">Nama Program:</span>
            <p className="font-bold text-black">
              {data?.items[0].product_name}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            ["No. Invoice:", `${data?.invoice_number}`],
            [
              "Tanggal Pembelian:",
              formatDateWithoutTime(data?.created_at as string),
            ],
          ].map(([label, value], index) => (
            <div key={index} className="grid justify-items-end text-black">
              <span className="text-purple">{label}</span>
              <p className="font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 py-8">
        <div className="flex items-start justify-between gap-8">
          <div className="grid gap-1">
            <span className="text-purple">Invoice Dari:</span>

            <div className="grid text-black">
              <p className="font-bold">PT. Pharmacy Cone Group</p>
              <p>+62895383359491 (WhatsApp)</p>
              <p>ruangobat.id</p>
            </div>
          </div>

          <div className="grid justify-items-end gap-1">
            <span className="text-purple">Invoice Untuk:</span>

            <div className="grid justify-items-end text-black">
              <p className="font-bold">{user?.fullname}</p>
              <p>{user?.email}</p>
              <p>{user?.user_id}</p>
            </div>
          </div>
        </div>

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray/10">
              {["Nama Program", "Tipe", "Harga"].map((item, index) => (
                <th key={index} className="w-1/3 p-4 font-bold text-black">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.items?.map((item, index) => (
              <tr key={index}>
                <td className="w-1/3 p-4 align-top text-black">
                  {item.product_name}
                </td>
                <td className="w-1/3 p-4 align-top text-black">
                  {typeProgram?.label}
                </td>
                <td className="w-1/3 p-4 align-top text-black">
                  {formatRupiah(item.product_price || 0)}
                </td>
              </tr>
            ))}

            {/* Spacer row */}
            <tr>
              <td colSpan={3} className="h-8"></td>
            </tr>

            {[
              {
                label: "Subtotal:",
                value: formatRupiah(data?.final_amount || 0),
              },
              {
                label: "Metode:",
                value: data?.transactions[0].payment_method,
              },
              {
                label: "Jumlah Pembayaran:",
                value: formatRupiah(data?.paid_amount || 0),
                highlight: true,
              },
            ].map((row, index) => (
              <tr
                key={index}
                className={`capitalize ${row.highlight ? "font-bold text-purple" : "text-black"}`}
              >
                <td className="w-1/3 [padding:4px_1rem]"></td>
                <td className="w-1/3 [padding:4px_1rem]">{row.label}</td>
                <td className="w-1/3 [padding:4px_1rem]">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.status == "paid" ? (
        <div className="pt-8 text-center">
          <p className="mx-auto max-w-[450px] text-xs italic text-gray">
            Pembayaran telah berhasil diterima. Terima kasih telah melakukan
            transaksi. Silakan simpan invoice ini sebagai bukti pembayaran.
          </p>
        </div>
      ) : (
        <div className="pt-8 text-center" />
      )}
    </div>
  );
}

export default forwardRef(TemplateInvoice);
