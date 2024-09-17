import { quotes } from "@/utils/quotes";
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
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [client, setClient] = useState(false);
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return;
  }

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
              className="absolute -left-12 -top-12 rotate-180 text-purple/40"
            />

            <h1 className="z-10 max-w-[680px] text-[32px] font-bold leading-[125%] -tracking-wide text-black">
              {quote.quote}
            </h1>

            <div className="inline-flex items-center gap-4">
              <Image
                src={quote.image}
                alt={quote.figure + " Img"}
                width={100}
                height={100}
                className="h-[64px] w-[64px] rounded-full object-cover object-center"
              />

              <h4 className="text-[22px] font-bold text-black">
                {quote.figure}
              </h4>
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
              <p className="font-medium text-gray">Buat akunmu sekarang</p>
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

              <p className="text-center text-sm font-medium text-gray">
                Sudah punya akun?{" "}
                <Link href="/login" className="font-extrabold text-purple">
                  Masuk disini
                </Link>
              </p>
            </div>
          </div>

          <p className="mx-auto max-w-[360px] text-center text-[12px] font-medium text-gray">
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
