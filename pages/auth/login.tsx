import { handleKeyDown } from "@/utils/handleKeyDown";
import { quotes } from "@/utils/quotes";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { EnvelopeSimple, Lock, Quotes } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type InputType = {
  email: string;
  password: string;
};

const quote = quotes[Math.floor(Math.random() * quotes.length)];

export default function LoginPage() {
  const [input, setInput] = useState<InputType>({
    email: "",
    password: "",
  });
  const [inputForget, setInputForget] = useState<{
    email: string;
    otp: number;
  }>({
    email: "",
    otp: 0,
  });
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    isOpen: isForgotPasswordOpen,
    onOpen: onForgotPasswordOpen,
    onClose: onForgotPasswordClose,
  } = useDisclosure();

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
      const now = new Date();
      const soon = new Date(1730394000000);

      if (now < soon) {
        return router.push("/comingsoon?from=login");
      }

      return router.push("/dashboard");
    }
  }

  function handleGetOTP() {
    toast.success("Email Anda Terdaftar, Cek Email Untuk Melihat Kode OTP!", {
      duration: 6000,
    });
  }

  function handleForgetPassword() {
    console.log(inputForget);
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
      <Head>
        <title>Login Untuk Mulai Belajar | Ruangobat.id</title>
        <meta
          name="description"
          content="RuangObat merupakan platform belajar farmasi private No.1 di Indonesia untuk seluruh mahasiswa di Indonesia. Terdapat banyak program menarik, mulai dari Kelas Mata Kuliah & Praktikum, Kelas Skripsi & Riset, Kelas Masuk Apoteker & OSCE, Serta TryOut UKMPPAI."
        />
        <meta
          name="description"
          content="Di website RuangObat kalian akan dapat mengakses berbagai program. Mari raih gelar sarjana dan apotekermu bersama RuangObat #bimbelfarmasi #cukupdisiniaja."
        />
        <meta
          name="keywords"
          content="ruangobat, ruangobat.id, ruangobat id, ruang obat id, ruangobat ujian, ruangobat ujian online, ruangobat farmasi, ruangobat tryout, ruangobat tes, ujian online ruangobat, platform ujian mahasiswa farmasi, belajar farmasi online, tryout farmasi online, tes farmasi online, latihan soal farmasi, simulasi ujian farmasi, platform belajar farmasi, ujian online farmasi terpercaya kelas apoteker, kelas masuk apoteker, program apoteker, praktikum apoteker, ujian tryout apoteker, ujian praktikum apoteker, ujian praktikum farmasi, ujian praktikum jurusan farmasi, tryout juruan apoteker, ujian juruan apoteker, kelas masuk apoteker, kelas apoteker, kelas farmasi, kelas jurusan apoteker, kelas jurusan farmasi, kelas skripsi dan riset apoteker, kelas skripsi dan riset farmasi, ujian UKMPPAI, tryout UKMPPAI, skripsi apoteker, skripsi farmasi, ujian online apoteker, kelas online apoteker, kelas online farmasi"
        />
        <meta
          property="og:title"
          content="Login Untuk Mulai Belajar | Ruangobat.id"
        />
        <meta
          property="og:description"
          content="RuangObat merupakan platform belajar farmasi private No.1 di Indonesia untuk seluruh mahasiswa di Indonesia. Terdapat banyak program menarik, mulai dari Kelas Mata Kuliah & Praktikum, Kelas Skripsi & Riset, Kelas Masuk Apoteker & OSCE, Serta TryOut UKMPPAI."
        />
        <meta
          property="og:description"
          content="Di website RuangObat kalian akan dapat mengakses berbagai program. Mari raih gelar sarjana dan apotekermu bersama RuangObat #bimbelfarmasi #cukupdisiniaja."
        />
      </Head>

      <main className="grid h-screen xl:grid-cols-[1fr_550px]">
        <div className="hidden items-center justify-center bg-default-100 px-20 xl:flex">
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

        <div className="mx-auto flex max-w-[400px] flex-col justify-center gap-4 px-6 py-10 xl:max-w-none xl:px-16">
          <div className="grid gap-8">
            <div className="text-center xl:text-left">
              <h1 className="text-[32px] font-bold -tracking-wide text-black">
                Selamat datang lagi 🙌
              </h1>
              <p className="font-medium text-gray">Silakan masuk ke akunmu</p>
            </div>

            <div className="grid gap-2">
              <Input
                type="email"
                variant="flat"
                labelPlacement="outside"
                placeholder="Alamat Email"
                name="email"
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
                startContent={
                  <EnvelopeSimple
                    weight="bold"
                    size={18}
                    className="text-gray"
                  />
                }
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
                autoComplete="off"
              />

              <Input
                type="password"
                variant="flat"
                labelPlacement="outside"
                placeholder="Kata Sandi"
                name="password"
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
                onKeyDown={(e) => handleKeyDown(e, handleLogin)}
                startContent={
                  <Lock weight="bold" size={18} className="text-gray" />
                }
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
                autoComplete="off"
              />

              <div
                className="justify-self-end text-sm font-semibold text-purple hover:cursor-pointer hover:underline"
                onClick={onForgotPasswordOpen}
              >
                Lupa Sandi?
              </div>

              <Modal
                isDismissable={false}
                isOpen={isForgotPasswordOpen}
                onOpenChange={onForgotPasswordClose}
                size="lg"
                placement="center"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 font-bold text-black">
                        Lupa Sandi?
                      </ModalHeader>

                      <ModalBody>
                        <div className="grid gap-6">
                          <p className="text-sm font-medium leading-[170%] text-gray">
                            Masukan alamat email yang sebelumnya anda gunakan
                            untuk membuat akun di RuangObat.id
                          </p>

                          <div className="grid gap-2">
                            <div className="flex gap-2">
                              <Input
                                type="email"
                                variant="flat"
                                labelPlacement="outside"
                                placeholder="Alamat Email"
                                startContent={
                                  <EnvelopeSimple
                                    weight="bold"
                                    size={18}
                                    className="text-gray"
                                  />
                                }
                                name="email"
                                onChange={(e) =>
                                  setInputForget({
                                    ...inputForget,
                                    email: e.target.value,
                                  })
                                }
                                classNames={{
                                  input:
                                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                                }}
                                className="flex-1"
                                autoComplete="off"
                              />

                              <Button
                                color="secondary"
                                variant="flat"
                                onClick={handleGetOTP}
                                className="font-semibold"
                              >
                                Dapatkan OTP
                              </Button>
                            </div>

                            <Input
                              type="number"
                              variant="flat"
                              labelPlacement="outside"
                              placeholder="Kode OTP"
                              startContent={
                                <Lock
                                  weight="bold"
                                  size={18}
                                  className="text-gray"
                                />
                              }
                              name="otp"
                              onChange={(e) =>
                                setInputForget({
                                  ...inputForget,
                                  otp: Number(e.target.value),
                                })
                              }
                              classNames={{
                                input:
                                  "font-semibold placeholder:font-semibold placeholder:text-gray",
                              }}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onClick={onClose}
                          className="font-bold"
                        >
                          Tutup
                        </Button>

                        <Button
                          color="secondary"
                          variant="solid"
                          onClick={handleForgetPassword}
                          className="font-bold"
                        >
                          Verifikasi Email
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>

            <div className="grid gap-4">
              <Button
                isLoading={loading}
                isDisabled={!isFormEmpty() || loading}
                variant="solid"
                color="secondary"
                onClick={handleLogin}
                className="font-bold"
              >
                {loading ? "Tunggu Sebentar..." : "Masuk Sekarang"}
              </Button>

              <p className="text-center text-sm font-medium text-gray">
                Belum punya akun?{" "}
                <Link
                  href="/auth/register"
                  className="font-extrabold text-purple"
                >
                  Daftar disini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
