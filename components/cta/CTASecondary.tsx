import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function CTASecondary() {
  const router = useRouter();

  return (
    <section className="[padding:100px_0_156px]">
      <div className="mx-auto flex max-w-[600px] flex-col flex-wrap gap-8 rounded-xl border-2 border-l-[16px] border-black px-6 py-12 sm:px-16 lg:max-w-[700px] lg:flex-row lg:items-center lg:justify-between xl:max-w-[950px]">
        <h2 className="max-w-[420px] text-3xl font-black capitalize leading-[120%] -tracking-wide text-black">
          Bagaimana Tertarik Belajar Bersama Ruang Obat?
        </h2>

        <Button
          color="secondary"
          onClick={() => router.push("/auth/register")}
          className="px-4 font-bold"
        >
          Daftar Sekarang
        </Button>
      </div>
    </section>
  );
}
