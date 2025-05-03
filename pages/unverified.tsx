import { Button, Input } from "@nextui-org/react";
import { Warning } from "@phosphor-icons/react";
import Head from "next/head";

export default function UnverifiedPage() {
  return (
    <>
      <Head>
        <title>Verifikasi Email Anda! | RuangObat</title>
      </Head>

      <main className="flex h-screen w-full items-center justify-center px-6">
        <section className="grid w-full max-w-[600px] justify-items-center gap-8 rounded-xl p-8 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]">
          <Warning weight="fill" size={72} className="text-danger-600" />

          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-extrabold capitalize -tracking-wide text-black">
              Verifikasi Email Sekarang!
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              Email Anda belum diverifikasi. Klik{" "}
              <span className="font-bold text-purple">Kirim Kode OTP</span> di
              bawah untuk mendapatkan kode OTP. Jika sudah, silakan cek inbox
              atau folder spam pada email anda.
            </p>
          </div>

          <div className="grid w-full gap-2">
            <Input
              type="text"
              inputMode="numeric"
              variant="flat"
              autoComplete="off"
              labelPlacement="outside"
              placeholder="Masukan Kode OTP"
              name="password"
              classNames={{
                input:
                  "text-center font-medium placeholder:font-medium placeholder:text-gray",
              }}
            />

            <Button color="secondary" className="w-full font-bold">
              Verifikasi
            </Button>
          </div>

          <p className="w-full text-center font-medium leading-[170%] text-gray">
            Dapatkan kode OTP sekarang.{" "}
            <span className="font-bold text-purple hover:cursor-pointer hover:underline">
              Kirim Kode OTP
            </span>
          </p>
        </section>
      </main>
    </>
  );
}
