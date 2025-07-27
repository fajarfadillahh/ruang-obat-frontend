import { Button } from "@nextui-org/react";
import { SealCheck } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function VerifiedPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Verifikasi Email Berhasil | RuangObat</title>
      </Head>

      <main className="flex h-screen w-full items-center justify-center px-6">
        <section className="grid w-full max-w-[600px] justify-items-center gap-8 rounded-xl p-8 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]">
          <SealCheck weight="fill" size={72} className="text-secondary" />

          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-extrabold capitalize -tracking-wide text-black">
              Email Berhasil Diverifikasi
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              Email kamu telah berhasil diverifikasi. Klik tombol di bawah untuk
              kembali dan mulai jelajahi website kami.
            </p>
          </div>

          <Button
            color="secondary"
            onClick={() =>
              router.push(
                router.query.callback ? (router.query.callback as string) : "/",
              )
            }
            className="w-full font-bold"
          >
            Kembali
          </Button>
        </section>
      </main>
    </>
  );
}
