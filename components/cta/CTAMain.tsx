import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function CTAMain() {
  const router = useRouter();

  return (
    <section className="[padding:100px_0_156px]">
      <div className="mx-auto grid max-w-[600px] gap-12 rounded-xl border-2 border-l-[16px] border-black px-4 py-20 sm:px-16 lg:max-w-[700px] xl:max-w-[950px]">
        <div className="grid place-items-center gap-4 text-center">
          <h1 className="text-2xl font-black -tracking-wide text-black xs:text-3xl">
            Siap Mulai Perjalanan Belajar Bersama RuangObat?
          </h1>

          <p className="mx-auto max-w-[700px] font-medium leading-[170%] text-gray">
            Gabung sekarang dan raih kesempatan belajar farmasi dengan materi
            lengkap, mentor berpengalaman, dan akses penuh ke berbagai program
            unggulan. Buka pintu kesuksesan karier farmasi kamu di sini.
          </p>
        </div>

        <Button
          color="secondary"
          onClick={() => router.push("/auth/register")}
          className="w-max justify-self-center px-10 font-bold"
        >
          Daftar Sekarang!
        </Button>
      </div>
    </section>
  );
}
