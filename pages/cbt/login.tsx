import { Button, Input } from "@nextui-org/react";
import { EnvelopeSimple, Lock, Quotes, User } from "@phosphor-icons/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const customInput =
    "font-semibold text-foreground placeholder:text-[14px] placeholder:text-default placeholder:font-semibold";

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>

      <main className="grid h-screen grid-cols-[1fr_550px]">
        <div className="flex items-center justify-center bg-default-100 px-20">
          <div className="relative grid gap-16">
            <Quotes
              weight="fill"
              size={64}
              className="absolute -left-12 -top-12 rotate-180 text-secondary/40"
            />

            <h1 className="z-10 max-w-[680px] text-[32px] font-bold leading-[125%] -tracking-wide text-foreground">
              Hanya pendidikan yang bisa menyelamatkan masa depan, tanpa
              pendidikan Indonesia tak mungkin bertahan.
            </h1>

            <div className="inline-flex items-center gap-4">
              <Image
                src="/img/najwa-shihab.jpg"
                alt="img"
                width={100}
                height={100}
                className="h-[64px] w-[64px] rounded-full object-cover object-center"
              />

              <h4 className="text-[22px] font-bold text-foreground">
                Najwa Shihab
              </h4>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 px-16 py-10">
          <Button
            variant="bordered"
            size="sm"
            startContent={<User weight="bold" size={14} />}
            className="w-max self-end border-1 border-foreground font-bold text-foreground"
          >
            Login Admin
          </Button>

          <div className="grid gap-8">
            <div>
              <h1 className="text-[28px] font-bold -tracking-wide text-foreground">
                Selamat datang lagi 🙌
              </h1>
              <p className="font-medium text-default">
                Silakan masuk ke akunmu
              </p>
            </div>

            <div className="grid gap-2">
              <Input
                type="email"
                variant="flat"
                startContent={
                  <EnvelopeSimple
                    weight="bold"
                    size={16}
                    className="text-default"
                  />
                }
                labelPlacement="outside"
                placeholder="Alamat Email"
                classNames={{
                  input: customInput,
                }}
              />

              <Input
                type="password"
                variant="flat"
                startContent={
                  <Lock weight="bold" size={16} className="text-default" />
                }
                labelPlacement="outside"
                placeholder="Kata Sandi"
                classNames={{
                  input: customInput,
                }}
              />
            </div>

            <div className="grid gap-4">
              <Button
                variant="solid"
                className="bg-secondary font-bold text-white"
              >
                Masuk Sekarang
              </Button>

              <p className="text-center text-sm font-medium text-default">
                Belum punya akun?{" "}
                <Link
                  href="/cbt/register"
                  className="font-extrabold text-secondary"
                >
                  Daftar disini
                </Link>
              </p>
            </div>
          </div>

          <p className="mx-auto max-w-[360px] text-center text-[12px] font-medium text-default">
            Dengan melanjutkan, anda menyetujui{" "}
            <span className="text-foreground underline">Ketentuan Layanan</span>{" "}
            dan{" "}
            <span className="text-foreground underline">Kebijakan Privasi</span>{" "}
            Ruangobat
          </p>
        </div>
      </main>
    </>
  );
}
