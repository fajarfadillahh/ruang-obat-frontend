import Loading from "@/components/Loading";
import ModalCodeVerification from "@/components/modal/ModalCodeVerification";
import ModalTermsPrivacy from "@/components/modal/ModalTermsPrivacy";
import { quotes } from "@/data/quotes";
import { SuccessResponse } from "@/types/global.type";
import { customInputClassnames } from "@/utils/customInputClassnames";
import { fetcher } from "@/utils/fetcher";
import {
  validateEmail,
  validateFullname,
  validatePassword,
  validatePhoneNumber,
  validateUniversity,
} from "@/utils/formValidators";
import { getError } from "@/utils/getError";
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import {
  Buildings,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  IconContext,
  Lock,
  Phone,
  Quotes,
  User,
  Users,
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
  fullname: string;
  email: string;
  phone_number: string;
  gender: string;
  university: string;
  password: string;
};

type ErrorsState = {
  fullname?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
  university?: string;
  password?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const currentUrl = `https://ruangobat.id${router.asPath}`;
  const {
    isOpen: isTermsPrivacyOpen,
    onOpen: onTermsPrivacyOpen,
    onClose: onTermsPrivacyClose,
  } = useDisclosure();
  const {
    isOpen: isCodeVerificationOpen,
    onOpen: onCodeVerificationOpen,
    onClose: onCodeVerificationClose,
  } = useDisclosure();
  const [time, setTime] = useState(0);
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [errors, setErrors] = useState<ErrorsState>({});
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );
  const [input, setInput] = useState<InputState>({
    fullname: "",
    email: "",
    phone_number: "",
    gender: "",
    university: "",
    password: "",
  });
  const [loadingScreen, setLoadingScreen] = useState(false);

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

  async function handleCodeVerification() {
    try {
      const response: SuccessResponse<{ user_id: string; message: string }> =
        await fetcher({
          url: "/general/email/register",
          method: "POST",
          data: {
            email: input.email,
          },
        });

      toast.success("OTP terkirim, cek inbox atau spam", {
        duration: 3000,
      });

      setUserId(response.data.user_id);
    } catch (error: any) {
      console.log(error);
      setUserId("");
      toast.error(getError(error));
    } finally {
      setLoadingScreen(false);
    }
  }

  async function handleVerifyOtp() {
    setLoading(true);

    try {
      const response: SuccessResponse<{ token: string }> = await fetcher({
        url: "/general/otp/verify",
        method: "POST",
        data: {
          user_id: userId,
          otp_code: code,
        },
      });

      handleRegister(response.data.token);
      setUserId("");
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(getError(error));
    }
  }

  async function handleRegister(token?: string) {
    try {
      await fetcher({
        url: "/auth/register/users",
        method: "POST",
        data: {
          ...input,
          token,
        },
      });

      const response = await signIn("credentials", {
        email: input.email,
        password: input.password,
        user_agent: navigator.userAgent,
        redirect: false,
      });

      if (response?.error) {
        setLoading(false);
        const { error } = JSON.parse(response?.error);

        toast.error(error.message);
      }

      if (response?.ok) {
        setLoading(false);
        setInput({
          fullname: "",
          email: "",
          phone_number: "",
          gender: "",
          university: "",
          password: "",
        });
        onCodeVerificationClose();
        setCode("");

        toast.success("Registrasi berhasil");
        return (window.location.href = "/welcome?from=register");
      }
    } catch (error: any) {
      setLoading(false);
      onCodeVerificationClose();
      setCode("");
      console.log(error);

      if (error.status_code >= 500) {
        toast.error(getError(error));
      } else if (error.status_code >= 400 && error.status_code <= 499) {
        if (error.error.name === "ZodError") {
          setErrors(getError(error));
        } else {
          toast.error(getError(error));
        }
      } else {
        toast.error(getError(error));
      }
    }
  }

  function isFormEmpty() {
    return (
      Object.values(input).every((value) => value.trim() !== "") && isSelected
    );
  }

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (time) {
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [time]);

  if (!client) {
    return;
  }

  if (loadingScreen) {
    return <Loading />;
  }

  return (
    <>
      <NextSeo
        title="Daftar Akun Untuk Mulai Belajar | RuangObat"
        description="Daftar sekarang di RuangObat dan mulai perjalanan belajarmu di dunia farmasi. Akses video pembelajaran, kelas interaktif, dan bantuan dari Apoteker ROSA. Belajar farmasi jadi lebih mudah dan efisien!"
        canonical={currentUrl}
        openGraph={{
          url: currentUrl,
          title: "Daftar Akun Untuk Mulai Belajar | RuangObat",
          description:
            "Daftar sekarang di RuangObat dan mulai perjalanan belajarmu di dunia farmasi. Akses video pembelajaran, kelas interaktif, dan bantuan dari Apoteker ROSA. Belajar farmasi jadi lebih mudah dan efisien!",
          site_name: "RuangObat",
        }}
      />

      <Head>
        <title>Daftar Akun Untuk Mulai Belajar | RuangObat</title>
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
                Daftarkan akunmu 🚀
              </h1>
              <p className="font-medium text-gray">
                Ayo, bergabung dengan kita di sini.
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
                  value={input.fullname}
                  autoComplete="off"
                  type="text"
                  variant="flat"
                  labelPlacement="outside"
                  placeholder="Nama Lengkap"
                  name="fullname"
                  onChange={(e) => handleInputChange(e, validateFullname)}
                  startContent={<User />}
                  classNames={customInputClassnames}
                  isInvalid={!!errors.fullname}
                  errorMessage={errors.fullname}
                />

                <Input
                  value={input.email}
                  autoComplete="off"
                  type="email"
                  variant="flat"
                  labelPlacement="outside"
                  placeholder="Alamat Email"
                  name="email"
                  onChange={(e) => handleInputChange(e, validateEmail)}
                  startContent={<EnvelopeSimple />}
                  classNames={customInputClassnames}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email}
                />

                <Input
                  value={input.phone_number}
                  autoComplete="off"
                  type="text"
                  inputMode="numeric"
                  variant="flat"
                  labelPlacement="outside"
                  placeholder="Nomor Telpon"
                  name="phone_number"
                  onChange={(e) => handleInputChange(e, validatePhoneNumber)}
                  startContent={<Phone />}
                  classNames={customInputClassnames}
                  isInvalid={!!errors.phone_number}
                  errorMessage={errors.phone_number}
                />

                <Select
                  selectedKeys={[input.gender]}
                  aria-label="select gender"
                  variant="flat"
                  labelPlacement="outside"
                  placeholder="Jenis Kelamin"
                  name="gender"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                  startContent={<Users />}
                  classNames={{
                    value: "font-semibold text-gray",
                  }}
                >
                  <SelectItem key="M">Laki-Laki</SelectItem>
                  <SelectItem key="F">Perempuan</SelectItem>
                </Select>

                <Input
                  value={input.university}
                  autoComplete="off"
                  type="text"
                  variant="flat"
                  labelPlacement="outside"
                  placeholder="Asal Kampus"
                  name="university"
                  onChange={(e) => handleInputChange(e, validateUniversity)}
                  startContent={<Buildings />}
                  classNames={customInputClassnames}
                  isInvalid={!!errors.university}
                  errorMessage={errors.university}
                />

                <Input
                  value={input.password}
                  autoComplete="off"
                  type={passwordType}
                  variant="flat"
                  labelPlacement="outside"
                  placeholder="Kata Sandi"
                  name="password"
                  onChange={(e) => handleInputChange(e, validatePassword)}
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

                <div className="mt-1 flex items-start gap-1">
                  <Checkbox
                    size="md"
                    color="secondary"
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                  />

                  <p className="max-w-[300px] text-[12px] font-medium text-gray">
                    Ya, saya menyetujui{" "}
                    <span
                      onClick={onTermsPrivacyOpen}
                      className="font-bold text-black underline hover:cursor-pointer hover:text-purple"
                    >
                      Ketentuan Layanan dan Kebijakan Privasi
                    </span>{" "}
                    Ruangobat
                  </p>
                </div>

                <ModalCodeVerification
                  {...{
                    isOpen: isCodeVerificationOpen,
                    email: input.email,
                    handleCodeVerification,
                    handleVerifyOtp,
                    loading,
                    onClose: onCodeVerificationClose,
                    code,
                    setCode,
                    time,
                    setTime,
                  }}
                />

                <ModalTermsPrivacy
                  isOpen={isTermsPrivacyOpen}
                  onClose={onTermsPrivacyClose}
                />
              </div>
            </IconContext.Provider>

            <div className="grid gap-4">
              <Button
                isDisabled={!isFormEmpty()}
                color="secondary"
                onClick={() => {
                  setLoadingScreen(true);
                  handleCodeVerification();
                  setTime(60);
                  onCodeVerificationOpen();
                }}
                className="font-bold"
              >
                Daftar Akun
              </Button>

              <p className="text-center text-sm font-medium text-gray">
                Sudah punya akun?{" "}
                <Link
                  href="/auth/login"
                  className="font-extrabold text-purple hover:underline"
                >
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
