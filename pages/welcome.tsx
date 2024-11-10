import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export default function WelcomePage({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const router = useRouter();

  return (
    <>
      <Head>
        {query.from == "register" ? (
          <title>Yeay, Akun Kamu Berhasil Dibuat 👏 | Ruangobat.id</title>
        ) : (
          <title>Welcome Back 👏 | Ruangobat.id</title>
        )}
      </Head>

      <main className="mx-auto flex min-h-screen w-full max-w-[1200px] items-center justify-center p-8">
        <section className="mx-auto flex max-w-[550px] flex-col gap-16 lg:grid lg:max-w-none lg:grid-cols-[1fr_max-content] lg:items-center lg:gap-10">
          <div className="grid gap-8">
            <div className="inline-flex items-center gap-2">
              <LogoRuangobat className="h-auto w-10 text-gray/20" />
              <h1 className="text-[24px] font-extrabold -tracking-wide text-black">
                RuangObat<span className="text-purple">.</span>
              </h1>
            </div>

            <div className="grid gap-3">
              <h1 className="text-[30px] font-black capitalize leading-[120%] -tracking-wide text-black lg:text-[42px]">
                {query.from == "register"
                  ? "Selamat datang di website RuangObat"
                  : "Welcome Back"}
                ,{" "}
                <span className="text-purple">
                  {session.status == "authenticated"
                    ? session.data?.user.fullname
                    : ""}
                </span>{" "}
                🙌
              </h1>
              <p className="font-medium leading-[170%] text-gray">
                Akun Ruang Ujian kamu sudah siap untuk diakses, selamat
                mengerjakan ujian Try Out UKMPPAI. Semangat meraih gelar
                Apotekermu sudah di depan mata, jangan menyerah ya! 🙌
              </p>
            </div>

            <Button
              variant="solid"
              color="secondary"
              endContent={<ArrowRight weight="bold" size={16} />}
              onClick={() => {
                if (window.location.host == "localhost:3000") {
                  router.push("/dashboard");
                } else {
                  router.push("https://cbt.ruangobat.id/dashboard");
                }
              }}
              className="w-max px-4 font-bold"
            >
              Halaman Dashboard
            </Button>
          </div>

          <Image
            priority
            src="/img/happy-img.svg"
            alt="happy img"
            width={1000}
            height={500}
            className="lg:h-[550px] lg:w-auto lg:justify-self-end"
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
