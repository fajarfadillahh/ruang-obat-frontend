import ModalForgotPassword from "@/components/modal/ModalForgotPassword";
import { quotes } from "@/data/quotes";
import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { validateEmail, validatePassword } from "@/utils/formValidators";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import {
  EnvelopeSimple,
  Eye,
  EyeSlash,
  IconContext,
  Lock,
  Microscope,
  Pill,
  Sparkle,
  TestTube,
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

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple/5 via-white to-purple/10">
        <div className="pointer-events-none absolute inset-0">
          <Sparkle
            className="absolute left-20 top-16 animate-pulse text-purple/30"
            size={32}
            weight="duotone"
          />
          <Pill
            className="absolute right-32 top-40 animate-bounce text-purple/20"
            size={24}
            weight="duotone"
          />
          <Microscope
            className="absolute bottom-32 left-16 animate-pulse text-purple/25"
            size={28}
            weight="duotone"
          />
          <TestTube
            className="absolute bottom-20 right-20 animate-bounce text-purple/20"
            size={20}
            weight="duotone"
          />
        </div>

        <div className="grid min-h-screen xl:grid-cols-[1.2fr_1fr]">
          <div className="relative hidden items-center justify-center p-20 xl:flex">
            <div className="relative grid max-w-2xl gap-12">
              <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-purple/5 to-purple/10 blur-xl" />

              <Card className="relative border-0 bg-white/80 shadow-xl backdrop-blur-sm">
                <CardBody className="p-12">
                  <blockquote className="relative z-10 mb-8 text-2xl font-bold leading-[125%] -tracking-wide text-black">
                    {quote.quote}
                  </blockquote>

                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Image
                        src={quote.image}
                        alt={quote.figure + " Img"}
                        width={80}
                        height={80}
                        className="rounded-full object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple/20 to-transparent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-black">
                        {quote.figure}
                      </h4>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="relative flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center gap-3">
                  <LogoRuangobat className="h-auto w-10 text-gray/20" />
                  <h1 className="text-2xl font-extrabold -tracking-wide text-black">
                    RuangObat<span className="text-purple">.</span>
                  </h1>
                </div>
                <h2 className="text-2xl font-bold text-black">
                  Selamat Datang Kembali 👋
                </h2>
                <p className="font-medium text-gray">
                  Ayo lanjutkan perjalanan belajar farmasi kamu.
                </p>
              </div>

              <Card className="border-0 bg-white/90 shadow-xl backdrop-blur-sm">
                <CardBody className="p-6">
                  <IconContext.Provider
                    value={{
                      weight: "duotone",
                      size: 20,
                      className: "text-gray",
                    }}
                  >
                    <div className="grid gap-4">
                      <Input
                        type="email"
                        autoComplete="off"
                        variant="bordered"
                        labelPlacement="outside"
                        placeholder="Masukkan email kamu"
                        label="Email"
                        name="email"
                        onChange={(e) => handleInputChange(e, validateEmail)}
                        onKeyDown={(e) => handleKeyDown(e, handleLogin)}
                        startContent={<EnvelopeSimple />}
                        classNames={{
                          input: "text-sm font-medium placeholder:text-gray",
                          inputWrapper:
                            "border-gray/20 hover:border-purple/50 focus-within:!border-purple group-data-[focus=true]:border-purple bg-gray-50/50",
                        }}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email}
                      />

                      <Input
                        type={passwordType}
                        autoComplete="off"
                        variant="bordered"
                        labelPlacement="outside"
                        placeholder="Masukkan kata sandi"
                        label="Password"
                        name="password"
                        onChange={(e) => handleInputChange(e, validatePassword)}
                        onKeyDown={(e) => handleKeyDown(e, handleLogin)}
                        startContent={<Lock />}
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
                            {passwordType === "password" ? (
                              <Eye />
                            ) : (
                              <EyeSlash />
                            )}
                          </button>
                        }
                        classNames={{
                          input: "text-sm font-medium placeholder:text-gray",
                          inputWrapper:
                            "border-gray/20 hover:border-purple/50 focus-within:!border-purple group-data-[focus=true]:border-purple bg-gray-50/50",
                        }}
                        isInvalid={!!errors.password}
                        errorMessage={errors.password}
                      />

                      <div className="flex justify-end">
                        <ModalForgotPassword />
                      </div>
                    </div>
                  </IconContext.Provider>

                  <div className="mt-4 space-y-2">
                    <Button
                      isLoading={loading}
                      isDisabled={!isFormEmpty() || loading}
                      className="w-full bg-purple py-6 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                      size="md"
                      onClick={handleLogin}
                    >
                      {loading ? "Sedang masuk..." : "Masuk ke Akun"}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm font-medium text-gray">
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
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
