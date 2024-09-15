import { Button, Input } from "@nextui-org/react";
import {
  Buildings,
  EnvelopeSimple,
  Lock,
  Phone,
  Quotes,
  User,
} from "@phosphor-icons/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Register Page</title>
      </Head>

      <main className="grid h-screen grid-cols-[1fr_550px]">
        <div className="flex items-center justify-center bg-default-100 px-20">
          <div className="relative grid gap-16">
            <Quotes
              weight="fill"
              size={64}
              className="text-purple/40 absolute -left-12 -top-12 rotate-180"
            />

            <h1 className="z-10 max-w-[680px] text-[32px] font-bold leading-[125%] -tracking-wide text-black">
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

              <h4 className="text-[22px] font-bold text-black">Najwa Shihab</h4>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 px-16 py-10">
          <div></div>

          <div className="grid gap-8">
            <div>
              <h1 className="text-[32px] font-bold -tracking-wide text-black">
                Ayo kita mulai 🚀
              </h1>
              <p className="text-gray font-medium">Buat akunmu sekarang</p>
            </div>

            <div className="grid gap-2">
              <Input
                type="text"
                variant="flat"
                startContent={
                  <User weight="bold" size={18} className="text-gray" />
                }
                labelPlacement="outside"
                placeholder="Nama Lengkap"
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                type="email"
                variant="flat"
                color="default"
                labelPlacement="outside"
                placeholder="Alamat Email"
                startContent={
                  <EnvelopeSimple
                    weight="bold"
                    size={18}
                    className="text-gray"
                  />
                }
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                type="text"
                inputMode="numeric"
                variant="flat"
                startContent={
                  <Phone weight="bold" size={18} className="text-gray" />
                }
                labelPlacement="outside"
                placeholder="No. Telpon"
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                type="text"
                variant="flat"
                startContent={
                  <Buildings weight="bold" size={18} className="text-gray" />
                }
                labelPlacement="outside"
                placeholder="Asal Kampus"
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                type="password"
                variant="flat"
                startContent={
                  <Lock weight="bold" size={18} className="text-gray" />
                }
                labelPlacement="outside"
                placeholder="Kata Sandi"
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />
            </div>

            <div className="grid gap-4">
              <Button variant="solid" color="secondary" className="font-bold">
                Daftar Sekarang
              </Button>

              <p className="text-gray text-center text-sm font-medium">
                Sudah punya akun?{" "}
                <Link href="/cbt/login" className="text-purple font-extrabold">
                  Masuk disini
                </Link>
              </p>
            </div>
          </div>

          <p className="text-gray mx-auto max-w-[360px] text-center text-[12px] font-medium">
            Dengan melanjutkan, anda menyetujui{" "}
            <span className="text-black underline">Ketentuan Layanan</span> dan{" "}
            <span className="text-black underline">Kebijakan Privasi</span>{" "}
            Ruangobat
          </p>
        </div>
      </main>
    </>
  );
}
