import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function CTAPrivateClass() {
  const router = useRouter();

  return (
    <section className="[padding:100px_0_156px]">
      <div className="mx-auto flex max-w-[600px] flex-col flex-wrap gap-8 rounded-xl border-2 border-l-[16px] border-black px-6 py-12 sm:px-16 lg:max-w-[700px] lg:flex-row lg:items-center lg:justify-between xl:max-w-[950px]">
        <div className="flex-1 lg:max-w-[500px]">
          <h2 className="pb-2 text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl">
            Masih Kesulitan??? Kurang Paham??
          </h2>

          <p className="font-medium leading-[170%] text-gray">
            Kamu bisa booking Kelas Private 1 on 1 Farmasi dengan mentor
            pilihanmu sekarang!!!
          </p>
        </div>

        <Button
          color="secondary"
          onClick={() => router.push("/kelas/private-1-on-1")}
          className="px-4 font-bold"
        >
          Booking Kelas Private
        </Button>
      </div>
    </section>
  );
}
