import ModalForgotPassword from "@/components/modal/ModalForgotPassword";
import { authImages } from "@/data/authImages";
import { quotes } from "@/data/quotes";
import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { validateEmail, validatePassword } from "@/utils/formValidators";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { Button, Input } from "@nextui-org/react";
import {
  EnvelopeSimple,
  Eye,
  EyeSlash,
  IconContext,
  LockKey,
  Microscope,
  Pill,
  Sparkle,
  Stethoscope,
} from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const quote = quotes[Math.floor(Math.random() * quotes.length)];
const authImage = authImages[Math.floor(Math.random() * authImages.length)];

type InputState = {
  email: string;
  password: string;
};

type ErrorsState = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const currentUrl = `https://ruangobat.id${router.asPath}`;

  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsState>({});
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );
  const [input, setInput] = useState<InputState>({ email: "", password: "" });

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement>,
    customValidator?: (value: string) => string | null,
  ) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));

    if (customValidator) {
      const error = customValidator(value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }

  async function handleLogin() {
    setLoading(true);

    const response = await signIn("credentials", {
      ...input,
      redirect: false,
      user_agent: navigator.userAgent,
    });

    if (response?.error) {
      setLoading(false);
      const { error } = JSON.parse(response?.error);

      toast.error(error.message);
    }

    if (response?.ok) {
      toast.success("Yeay, kamu berhasil login!");
      return router.push(
        `/unverified${router.query.callback ? `?callback=${router.query.callback}` : ""}`,
      );
    }
  }

  function isFormEmpty() {
    return Object.values(input).every((value) => value.trim() !== "");
  }

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Login Untuk Mulai Belajar | RuangObat"
        description="Masuk ke akun RuangObat dan lanjutkan perjalanan belajarmu di dunia farmasi. Akses video pembelajaran, kelas interaktif, dan tanya langsung ke Apoteker ROSA. Satu langkah lagi menuju belajar yang lebih pintar!"
        canonical={currentUrl}
        openGraph={{
          url: currentUrl,
          title: "Login Untuk Mulai Belajar | RuangObat",
          description:
            "Masuk ke akun RuangObat dan lanjutkan perjalanan belajarmu di dunia farmasi. Akses video pembelajaran, kelas interaktif, dan tanya langsung ke Apoteker ROSA. Satu langkah lagi menuju belajar yang lebih pintar!",
          site_name: "RuangObat",
        }}
      />

      <Head>
        <title>Login Untuk Mulai Belajar | RuangObat</title>
      </Head>

      <main className="grid max-h-screen w-full xl:grid-cols-[580px_1fr]">
        <div className="relative isolate hidden h-full xl:block">
          <Image
            src={authImage.image}
            alt="auth image"
            width={1080}
            height={1920}
            className="h-full max-h-screen object-cover object-center grayscale"
          />

          <div className="absolute left-0 top-0 flex h-full w-full items-end bg-gradient-to-t from-purple via-purple/50 to-transparent p-8">
            <div className="grid gap-8">
              <h2 className="text-xl font-bold leading-[125%] -tracking-wide text-white md:text-2xl">
                "{quote.quote}"
              </h2>

              <div className="flex items-center gap-4">
                <Image
                  src={quote.image}
                  alt={quote.figure + " Img"}
                  width={100}
                  height={100}
                  className="size-12 rounded-full object-cover object-center"
                />

                <h3 className="text-lg font-bold text-white">{quote.figure}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="relative isolate h-full xl:h-auto">
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            <Sparkle
              className="absolute left-10 top-20 animate-pulse text-3xl text-purple/40 xl:left-20 xl:top-40 xl:text-4xl"
              weight="duotone"
            />
            <Pill
              className="absolute right-6 top-32 animate-bounce text-3xl text-purple/40 xl:right-32 xl:top-40 xl:text-4xl"
              weight="duotone"
            />
            <Microscope
              className="absolute bottom-24 right-10 animate-pulse text-3xl text-purple/40 xl:bottom-32 xl:right-16 xl:text-4xl"
              weight="duotone"
            />
            <Stethoscope
              className="absolute bottom-6 left-16 animate-bounce text-3xl text-purple/40 xl:bottom-20 xl:left-20 xl:text-4xl"
              weight="duotone"
            />
          </div>

          <div className="grid h-full grid-rows-[max-content_1fr] p-6 xl:[padding:2rem_5rem]">
            <Link href="/" className="inline-flex w-max items-center gap-2">
              <LogoRuangobat className="h-auto w-8 text-gray/20" />
              <h3 className="text-lg font-extrabold -tracking-wide text-black">
                RuangObat<span className="text-purple">.</span>
              </h3>
            </Link>

            <div className="flex w-full flex-col items-center justify-center gap-8 justify-self-center xl:max-w-md">
              <div className="text-center">
                <h1 className="text-2xl font-bold capitalize -tracking-wide text-black md:text-3xl">
                  Selamat Datang Kembali 👋
                </h1>

                <p className="font-medium text-gray">
                  Ayo lanjutkan perjalanan belajar farmasi kamu.
                </p>
              </div>

              <IconContext.Provider
                value={{
                  weight: "duotone",
                  size: 20,
                  className: "text-gray",
                }}
              >
                <div className="grid w-full gap-4">
                  <Input
                    isRequired
                    type="email"
                    autoComplete="off"
                    label="Alamat Email"
                    labelPlacement="outside"
                    placeholder="Contoh: pengguna@gmail.com"
                    name="email"
                    onChange={(e) => handleInputChange(e, validateEmail)}
                    onKeyDown={(e) => handleKeyDown(e, handleLogin)}
                    startContent={<EnvelopeSimple />}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email}
                    classNames={{
                      input: "text-sm font-medium placeholder:text-gray",
                      label: "text-black",
                    }}
                  />

                  <Input
                    isRequired
                    type={passwordType}
                    autoComplete="off"
                    label="Password"
                    labelPlacement="outside"
                    placeholder="Min. 8 karakter"
                    name="password"
                    onChange={(e) => handleInputChange(e, validatePassword)}
                    onKeyDown={(e) => handleKeyDown(e, handleLogin)}
                    startContent={<LockKey />}
                    endContent={
                      <button
                        type="button"
                        onClick={() =>
                          setPasswordType((prevType) =>
                            prevType === "password" ? "text" : "password",
                          )
                        }
                        className="text-gray transition-colors hover:text-purple"
                      >
                        {passwordType === "password" ? <Eye /> : <EyeSlash />}
                      </button>
                    }
                    isInvalid={!!errors.password}
                    errorMessage={errors.password}
                    classNames={{
                      input: "text-sm font-medium placeholder:text-gray",
                      label: "text-black",
                    }}
                  />

                  <div className="-mt-2 flex justify-end">
                    <ModalForgotPassword />
                  </div>
                </div>
              </IconContext.Provider>

              <div className="grid w-full gap-4">
                <Button
                  isLoading={loading}
                  isDisabled={!isFormEmpty() || loading}
                  color="secondary"
                  onClick={handleLogin}
                  className="font-bold"
                >
                  {loading ? "Sedang masuk..." : "Masuk ke Akun"}
                </Button>

                <p className="text-center text-sm font-medium text-gray">
                  Belum punya akun?{" "}
                  <Link
                    href="/auth/register"
                    className="font-bold text-purple transition-all duration-300 hover:underline"
                  >
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
