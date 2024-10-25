import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { Button, Input } from "@nextui-org/react";
import { ArrowLeft, Lock } from "@phosphor-icons/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [input, setInput] = useState<{ password: string }>({
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  function handleChangePassword() {
    console.log(input);

    toast.success("Kata Sandi Berhasil Diperbatui");
  }

  function isFormEmpty() {
    return Object.values(input).every((value) => value.trim() !== "");
  }

  return (
    <>
      <Head>
        <title>Reset Kata Sandi? | Ruangobat.id</title>
      </Head>

      <main className="mx-auto flex min-h-screen w-full max-w-[1200px] items-center justify-center p-8">
        <div className="grid w-[450px] gap-8">
          <Link
            href="/auth/login"
            className="mb-4 inline-flex w-max items-center gap-2 justify-self-center"
          >
            <LogoRuangobat className="h-auto w-8 text-gray/20" />
            <h1 className="text-[20px] font-extrabold -tracking-wide text-black">
              RuangObat<span className="text-purple">.</span>
            </h1>
          </Link>

          <div className="grid text-center">
            <h1 className="text-[30px] font-black capitalize leading-[120%] -tracking-wide text-black md:text-[38px]">
              Kata sandi baru
            </h1>
            <p className="font-medium leading-[170%] text-gray">
              Pastikan kata sandi baru anda kuat dan mudah di ingat
            </p>
          </div>

          <div className="grid gap-2">
            <Input
              type="text"
              variant="flat"
              labelPlacement="outside"
              placeholder="Masukan Kata Sandi Baru"
              name="password"
              onChange={(e) =>
                setInput({
                  ...input,
                  password: e.target.value,
                })
              }
              startContent={
                <Lock weight="bold" size={18} className="text-gray" />
              }
              classNames={{
                input:
                  "font-semibold placeholder:font-semibold placeholder:text-gray",
              }}
              autoComplete="off"
            />

            <Button
              isDisabled={!isFormEmpty()}
              variant="solid"
              color="secondary"
              className="font-bold"
              onClick={handleChangePassword}
            >
              Perbarui Kata Sandi
            </Button>

            <Button
              variant="light"
              startContent={<ArrowLeft weight="bold" size={18} />}
              onClick={() => router.push("/auth/login")}
              className="font-bold text-black"
            >
              Halaman Login
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
