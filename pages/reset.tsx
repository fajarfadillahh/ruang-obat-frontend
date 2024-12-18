import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { Button, Input } from "@nextui-org/react";
import { Lock } from "@phosphor-icons/react";
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
        url: "/general/reset/password",
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
      }, 1000);
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
        <title>Reset Kata Sandi? | Ruangobat.id</title>
      </Head>

      <main className="flex h-screen w-full items-center justify-center bg-gray/5 px-6">
        <div className="grid w-full max-w-[450px] justify-items-center gap-8 rounded-xl bg-white p-8 [box-shadow:4px_2px_16px_rgba(82,82,82,0.1)]">
          <div className="mb-4 inline-flex w-max items-center gap-2 justify-self-center">
            <LogoRuangobat className="h-auto w-8 text-gray/20" />
            <h1 className="text-[20px] font-extrabold -tracking-wide text-black">
              RuangObat<span className="text-purple">.</span>
            </h1>
          </div>

          <div className="grid gap-1 text-center">
            <h1 className="text-[28px] font-extrabold leading-[120%] text-black">
              Kata sandi baru
            </h1>
            <p className="text-sm font-medium leading-[170%] text-gray">
              Pastikan kata sandi baru kuat dan mudah di ingat
            </p>
          </div>

          <div className="grid w-full gap-2">
            <Input
              type={inputType}
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
                  "font-semibold placeholder:font-semibold placeholder:text-gray",
              }}
              autoComplete="off"
            />

            <Button
              isLoading={loading}
              isDisabled={!Boolean(password) || loading}
              color="secondary"
              className="font-bold"
              onClick={handleChangePassword}
            >
              Perbarui Kata Sandi
            </Button>
          </div>
        </div>
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
