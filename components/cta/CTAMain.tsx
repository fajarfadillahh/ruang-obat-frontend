import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function CTAMain() {
  const router = useRouter();

  return (
    <section className="py-[100px]">
      <div className="mx-auto grid max-w-[600px] gap-12 rounded-xl border-2 border-l-[16px] border-black px-4 py-20 sm:px-16 lg:max-w-[700px] xl:max-w-[950px]">
        <div className="grid gap-2">
          <h1 className="text-center text-[28px] font-black -tracking-wide text-black">
            Siap Mulai Perjalanan Belajar Bersama Ruang Obat?
          </h1>
          <p className="mx-auto max-w-[800px] text-center font-medium leading-[170%] text-gray">
            Gabung sekarang dan raih kesempatan belajar farmasi dengan materi
            lengkap, mentor berpengalaman, dan akses penuh ke berbagai program
            unggulan. Buka pintu kesuksesan karier farmasi kamu di sini.
          </p>
        </div>

        <Button
          color="secondary"
          onClick={() => {
            if (window.location.host == "localhost:3000") {
              router.push("/dashboard");
            } else {
              window.open("https://cbt.ruangobat.id/auth/register", "_blank");
            }
          }}
          className="w-max justify-self-center px-4 font-bold"
        >
          Daftar Sekarang!
        </Button>
      </div>
    </section>
  );
}
