import { Button } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function WelcomePage({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const router = useRouter();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // clear event listener
    return window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        {query.from == "register" ? (
          <title>Yeay, Akun Kamu Berhasil Dibuat 👏 | RuangObat</title>
        ) : (
          <title>Welcome Back 👏 | RuangObat</title>
        )}
      </Head>

      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        tweenDuration={5000}
      />

      <main className="mx-auto flex min-h-screen w-full max-w-[1200px] items-center justify-center overflow-hidden p-8">
        <section className="mx-auto flex max-w-[550px] flex-col items-center gap-16 lg:grid lg:max-w-none lg:grid-cols-[1fr_max-content] lg:items-center">
          <div className="grid gap-8">
            <div className="grid gap-4">
              <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
                {query.from == "register"
                  ? "Selamat datang di website RuangObat,"
                  : "Welcome back,"}{" "}
                <span className="text-purple">
                  {session.status == "authenticated"
                    ? session.data?.user.fullname
                    : ""}
                </span>
              </h1>

              <p className="font-medium leading-[170%] text-gray">
                Akun Ruang Ujian kamu sudah siap untuk diakses, sekarang kamu
                bisa membeli produk yang tersedia dan juga menegerjakan ujian
                TryOut UKMPPAI. Semangat meraih gelar Apotekermu sudah di depan
                mata, jangan menyerah ya! 🙌
              </p>
            </div>

            <div className="grid gap-2 sm:inline-flex sm:items-center sm:gap-4">
              <Button
                color="secondary"
                onClick={() => router.push("/dashboard")}
                className="px-6 font-bold"
              >
                Halaman Dashboard
              </Button>

              <Button
                variant="bordered"
                onClick={() => router.push("/")}
                className="px-6 font-bold"
              >
                Kembali Ke Beranda
              </Button>
            </div>
          </div>

          <Image
            priority
            src="/img/happy-img.svg"
            alt="happy img"
            className="lg:h-[550px] lg:w-auto"
            width="0"
            height="0"
          />
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  query: ParsedUrlQuery;
}> = async ({ query }) => {
  return {
    props: {
      query,
    },
  };
};
