import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
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

      <main className="mx-auto flex min-h-screen w-full max-w-[1200px] items-center justify-center p-8">
        <div className="grid w-[450px] gap-8">
          <div className="mb-4 inline-flex w-max items-center gap-2 justify-self-center">
            <LogoRuangobat className="h-auto w-8 text-gray/20" />
            <h1 className="text-[20px] font-extrabold -tracking-wide text-black">
              RuangObat<span className="text-purple">.</span>
            </h1>
          </div>

          <div className="grid text-center">
            <h1 className="text-[30px] font-black capitalize leading-[120%] -tracking-wide text-black md:text-[38px]">
              Kata sandi baru
            </h1>
            <p className="font-medium leading-[170%] text-gray">
              Pastikan kata sandi baru kuat dan mudah diingat
            </p>
          </div>

          <div className="grid gap-2">
            <Input
              type={inputType}
              variant="flat"
              labelPlacement="outside"
              placeholder="Masukan Kata Sandi Baru"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setInputType("text")}
              onBlur={() => setInputType("password")}
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
              isDisabled={!Boolean(password) || loading}
              variant="solid"
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
