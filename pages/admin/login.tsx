import { Button, Input } from "@nextui-org/react";
import { ArrowLeft, EnvelopeSimple, Lock } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  const customInput =
    "font-semibold text-foreground placeholder:text-[14px] placeholder:text-default placeholder:font-semibold";

  return (
    <>
      <Head>
        <title>Login Admin Page</title>
      </Head>

      <main className="mx-auto grid max-w-[1200px] gap-40 px-6 py-20">
        <Button
          variant="light"
          size="sm"
          startContent={<ArrowLeft weight="bold" size={14} />}
          onClick={() => router.back()}
          className="w-max self-end font-bold text-foreground"
        >
          Kembali
        </Button>

        <div className="grid w-[480px] gap-8 justify-self-center">
          <div className="text-center">
            <h1 className="text-[42px] font-bold -tracking-wide text-foreground">
              Hi, admin Ruangobat 👋
            </h1>
            <p className="font-medium text-default">
              Silakan login dulu untuk bisa mengatur semuanya
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

          <Button variant="solid" className="bg-secondary font-bold text-white">
            Masuk Sekarang
          </Button>
        </div>
      </main>
    </>
  );
}
