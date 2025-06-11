import { dummyOfferSubscriptions } from "@/data/dummy";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button } from "@nextui-org/react";
import { CheckCircle } from "@phosphor-icons/react";

export default function SectionSubscription() {
  return (
    <section className="base-container gap-4 py-[100px]">
      <div className="grid">
        <h2 className="text-3xl font-black -tracking-wide text-black">
          Langganan 🌟
        </h2>

        <p className="font-medium leading-[170%] text-gray">
          Tertarik? Ayo, berlangganan untuk mengakses semua video.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
        {dummyOfferSubscriptions.map((item) => (
          <div
            key={item.id}
            className={`relative isolate grid gap-8 overflow-hidden rounded-xl shadow-[4px_4px_36px_rgba(0,0,0,0.1)] [padding:4rem_2rem] ${
              item.highlight ? "bg-purple" : "bg-white"
            }`}
          >
            {item.highlight && (
              <div className="absolute left-0 top-0 z-50 rounded-br-xl bg-pink-500 text-center font-extrabold text-white [padding:0.5rem_3rem]">
                Populer
              </div>
            )}

            <div className="grid gap-2">
              <h1
                className={`text-center text-xl font-bold ${item.highlight ? "text-white" : "text-black"}`}
              >
                {item.name}
              </h1>

              <h1
                className={`text-center text-4xl font-black ${item.highlight ? "text-white" : "text-purple"}`}
              >
                {formatRupiah(item.price)}
              </h1>
            </div>

            <div className="grid gap-2">
              <h4
                className={`text-lg font-bold ${item.highlight ? "text-white" : "text-black"}`}
              >
                Keuntungan Berlangganan ✨
              </h4>

              <div className="grid gap-2">
                {item.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle
                      weight="duotone"
                      size={24}
                      className={item.highlight ? "text-white" : "text-purple"}
                    />

                    <p
                      className={`text-sm font-medium ${item.highlight ? "text-white" : "text-black"}`}
                    >
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => window.open(item.order_link, "_blank")}
              className={`font-bold text-white ${item.highlight ? "bg-pink-500" : "bg-purple"}`}
            >
              Mulai Berlangganan
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
