import { AppContext } from "@/context/AppContext";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button } from "@nextui-org/react";
import { CheckCircle } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { MutableRefObject, useContext } from "react";
import { twMerge } from "tailwind-merge";

interface SectionSubscriptionProps {
  className?: string;
  sectionRef?: MutableRefObject<HTMLElement | null>;
  subscriptions?: SubscriptionsProps[];
}

type SubscriptionsProps = {
  package_id: string;
  name: string;
  price: number;
  discount_amount?: number;
  duration: number;
  type: string;
  link_order: string;
  benefits: {
    benefit_id: string;
    description: string;
  }[];
};

export default function SectionSubscription({
  className,
  sectionRef,
  subscriptions,
}: SectionSubscriptionProps) {
  const { status } = useSession();
  const ctx = useContext(AppContext);

  return (
    <section
      className={twMerge("base-container gap-4 py-[100px]", `${className}`)}
      ref={sectionRef}
    >
      <div className="grid gap-1">
        <h2 className="text-2xl font-black -tracking-wide text-black sm:text-3xl">
          Langganan 🌟
        </h2>

        <p className="font-medium leading-[170%] text-gray">
          Tertarik? Ayo, berlangganan untuk mengakses semua video.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
        {subscriptions?.map((item) => (
          <div
            key={item.package_id}
            className={`relative isolate grid gap-8 overflow-hidden rounded-xl [padding:4rem_2rem] ${
              false ? "bg-purple" : "border-2 border-gray/10"
            }`}
          >
            {false && (
              <div className="absolute left-0 top-0 z-50 rounded-br-xl bg-pink-500 text-center font-extrabold text-white [padding:0.5rem_3rem]">
                Populer
              </div>
            )}

            <div className="grid gap-2">
              <h1
                className={`text-center text-xl font-bold ${false ? "text-white" : "text-black"}`}
              >
                {item.name}
              </h1>

              {item.discount_amount ? (
                <div className="grid justify-items-center gap-1">
                  <h1
                    className={`text-center text-4xl font-black ${false ? "text-white" : "text-purple"}`}
                  >
                    {formatRupiah(item.discount_amount)}
                  </h1>

                  <h5 className="relative isolate w-max text-2xl font-black text-gray/40">
                    {formatRupiah(item.price)}
                    <div className="absolute left-0 top-4 z-10 h-1 w-full bg-danger" />
                  </h5>
                </div>
              ) : (
                <h1
                  className={`text-center text-4xl font-black ${false ? "text-white" : "text-purple"}`}
                >
                  {formatRupiah(item.price)}
                </h1>
              )}
            </div>

            <div className="grid gap-2">
              <h4
                className={`text-lg font-bold ${false ? "text-white" : "text-black"}`}
              >
                Keuntungan Berlangganan ✨
              </h4>

              <div className="grid gap-2">
                {item.benefits.map((benefit) => (
                  <div
                    key={benefit.benefit_id}
                    className="grid grid-cols-[35px_1fr]"
                  >
                    <CheckCircle
                      weight="duotone"
                      size={24}
                      className={false ? "text-white" : "text-purple"}
                    />

                    <p
                      className={`text-sm font-medium ${false ? "text-white" : "text-black"}`}
                    >
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => {
                if (status === "unauthenticated") {
                  ctx?.onOpenUnauthenticated();
                } else {
                  window.open(item.link_order, "_blank");
                }
              }}
              className={`font-bold text-white ${item.link_order ? "bg-pink-500" : "bg-purple"}`}
            >
              Mulai Berlangganan
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
