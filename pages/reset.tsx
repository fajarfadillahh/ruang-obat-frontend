import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { Button, Input } from "@nextui-org/react";
import { Lock } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
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

      setPassword("");
      toast.success("Berhasil memperbarui kata sandi 🎉", {
        duration: 1000,
      });

      router.push("/auth/login");

      // setInterval(() => {
      //   window.location.href = "/auth/login";
      // }, 2500);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);

      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Buat Password Baru | RuangObat</title>
      </Head>

      <main className="flex h-screen w-full items-center justify-center">
        <section className="grid w-full max-w-lg gap-12 p-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-extrabold capitalize -tracking-wide text-black">
              Buat Password Baru 🔑
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              Pastikan password baru kamu cukup kuat agar akun tetap aman.
              Gunakan kombinasi huruf besar, kecil, angka, dan simbol untuk
              keamanan extra.
            </p>
          </div>

          <div className="grid w-full gap-4">
            <Input
              isRequired
              type={inputType}
              autoComplete="off"
              variant="flat"
              label="Password"
              labelPlacement="outside"
              placeholder="Min. 8 karakter"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setInputType("text")}
              onBlur={() => setInputType("password")}
              onKeyDown={(e) => handleKeyDown(e, handleChangePassword)}
              startContent={
                <Lock weight="bold" size={18} className="text-gray" />
              }
              classNames={{
                input: "text-sm font-medium placeholder:text-gray",
                label: "text-black",
              }}
            />

            <Button
              isLoading={loading}
              isDisabled={!Boolean(password) || loading}
              color="secondary"
              onClick={handleChangePassword}
              className="font-bold"
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
