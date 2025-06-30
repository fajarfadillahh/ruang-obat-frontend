import ModalForgotPassword from "@/components/modal/ModalForgotPassword";
import { quotes } from "@/data/quotes";
import { customInputClassnames } from "@/utils/customInputClassnames";
import { validateEmail, validatePassword } from "@/utils/formValidators";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { Button, Input } from "@nextui-org/react";
import {
  EnvelopeSimple,
  Eye,
  EyeSlash,
  IconContext,
  Lock,
  Quotes,
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
      toast.success("Yeay, kamu berhasil login");
      return (window.location.href = `/unverified${router.query.callback ? `?callback=${router.query.callback}` : ""}`);
    }
  }

  function isFormEmpty() {
    return Object.values(input).every((value) => value.trim() !== "");
  }

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return;
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

      <main className="grid h-screen xl:grid-cols-[1fr_550px]">
        <div className="hidden items-center justify-center bg-gray/10 px-20 xl:flex">
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

        <div className="mx-auto flex max-w-[400px] items-center justify-center px-6 xl:max-w-none">
          <div className="grid gap-8">
            <div className="text-center xl:text-left">
              <h1 className="text-[32px] font-bold capitalize -tracking-wide text-black">
                Login ke akunmu 🙌
              </h1>
              <p className="font-medium text-gray">
                Sebelum belajar, silakan login dulu
              </p>
            </div>

            <IconContext.Provider
              value={{
                weight: "duotone",
                size: 18,
                className: "text-gray",
              }}
            >
              <div className="grid gap-2">
                <Input
                  type="email"
                  autoComplete="off"
                  variant="flat"
                  labelPlacement="outside"
                  placeholder="Alamat Email"
                  name="email"
                  onChange={(e) => handleInputChange(e, validateEmail)}
                  onKeyDown={(e) => handleKeyDown(e, handleLogin)}
                  startContent={<EnvelopeSimple />}
                  classNames={customInputClassnames}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email}
                />

                <Input
                  type={passwordType}
                  autoComplete="off"
                  variant="flat"
                  labelPlacement="outside"
                  placeholder="Kata Sandi"
                  name="password"
                  onChange={(e) => handleInputChange(e, validatePassword)}
                  onKeyDown={(e) => handleKeyDown(e, handleLogin)}
                  startContent={<Lock />}
                  endContent={
                    <button
                      onClick={() =>
                        setPasswordType((prevType) =>
                          prevType === "password" ? "text" : "password",
                        )
                      }
                    >
                      {passwordType === "password" ? <Eye /> : <EyeSlash />}
                    </button>
                  }
                  classNames={customInputClassnames}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password}
                />

                <ModalForgotPassword />
              </div>
            </IconContext.Provider>

            <div className="grid gap-4">
              <Button
                isLoading={loading}
                isDisabled={!isFormEmpty() || loading}
                color="secondary"
                onClick={handleLogin}
                className="font-bold"
              >
                {loading ? "Tunggu Sebentar..." : "Masuk Akun"}
              </Button>

              <p className="text-center text-sm font-medium text-gray">
                Belum punya akun?{" "}
                <Link
                  href="/auth/register"
                  className="font-extrabold text-purple hover:underline"
                >
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
