import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { Button, Input } from "@nextui-org/react";
import { Lock, LockKey } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [inputType, setInputType] = useState("password");

  async function handleChangePassword() {
    setLoading(true);
    try {
      await fetcher({
        url: "/reset/password",
        method: "PATCH",
        data: {
          token: query?.token,
          password,
        },
      });

      toast.success("Berhasil memperbarui kata sandi", {
        duration: 1000,
      });

      setInterval(() => {
        window.close();
      }, 2500);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);

      toast.error(getError(error));
    }
  }

  return (
    <>
      <Head>
        <title>Reset Kata Sandi | RuangObat</title>
      </Head>

      <main className="flex h-screen w-full items-center justify-center px-6">
        <section className="grid w-full max-w-[600px] justify-items-center gap-8 rounded-xl p-8 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]">
          <LockKey weight="fill" size={72} className="text-secondary" />

          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-extrabold capitalize -tracking-wide text-black">
              Buat Kata Sandi Baru
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              Pastikan kata sandi baru kamu cukup kuat agar akun tetap aman.
              Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol.
            </p>
          </div>

          <div className="grid w-full gap-2">
            <Input
              type={inputType}
              autoComplete="off"
              variant="flat"
              labelPlacement="outside"
              placeholder="Masukan Kata Sandi Baru"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setInputType("text")}
              onBlur={() => setInputType("password")}
              onKeyDown={(e) => handleKeyDown(e, handleChangePassword)}
              startContent={
                <Lock weight="bold" size={18} className="text-gray" />
              }
              classNames={{
                input:
                  "text-center font-medium placeholder:font-medium placeholder:text-gray",
              }}
            />

            <Button
              isLoading={loading}
              isDisabled={!Boolean(password) || loading}
              color="secondary"
              onClick={handleChangePassword}
              className="w-full font-bold"
            >
              Perbarui Sandi
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  query?: { token: string };
}> = async ({ query }) => {
  if (!query.token) {
    return {
      redirect: {
        destination: "/auth/login",
      },
      props: {},
    };
  }

  return {
    props: {
      query: query as { token: string },
    },
  };
};
