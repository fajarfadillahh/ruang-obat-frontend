import ModalTermsPrivacy from "@/components/modal/ModalTermsPrivacy";
import { capitalize } from "@/utils/capitalize";
import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { quotes } from "@/utils/quotes";
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
  Lock,
  Phone,
  Quotes,
  User,
  Users,
} from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type InputType = {
  fullname: string;
  email: string;
  phone_number: string;
  gender: string;
  university: string;
  password: string;
};

const quote = quotes[Math.floor(Math.random() * quotes.length)];

export default function RegisterPage() {
  const {
    isOpen: isTermsPrivacyOpen,
    onOpen: onTermsPrivacyOpen,
    onClose: onTermsPrivacyClose,
  } = useDisclosure();
  const [isSelected, setIsSelected] = useState(false);
  const [input, setInput] = useState<InputType>({
    fullname: "",
    email: "",
    phone_number: "",
    gender: "",
    university: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>();

  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister() {
    setLoading(true);

    try {
      await fetcher({
        url: "/auth/register/users",
        method: "POST",
        data: input,
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

        toast.success("Registrasi berhasil");

        const now = new Date();
        const soon = new Date(1732985999000);

        if (now < soon) {
          return router.push("/comingsoon?from=register");
        }

        return router.push("/dashboard");
      }
    } catch (error: any) {
      setLoading(false);
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

  if (!client) {
    return;
  }

  return (
    <>
      <Head>
        <title>Daftar Akun Untuk Mulai Belajar | Ruangobat.id</title>
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
          content="Daftar Akun Untuk Mulai Belajar | Ruangobat.id"
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

        <div className="mx-auto flex max-w-[400px] flex-col justify-between gap-4 px-6 py-10 xl:max-w-none xl:px-16">
          <div></div>

          <div className="grid gap-8">
            <div className="text-center xl:text-left">
              <h1 className="text-[32px] font-bold -tracking-wide text-black">
                Ayo kita mulai 🚀
              </h1>
              <p className="font-medium text-gray">Buat akunmu sekarang</p>
            </div>

            <div className="grid gap-2">
              <Input
                value={input.fullname}
                autoComplete="off"
                type="text"
                variant="flat"
                labelPlacement="outside"
                placeholder="Nama Lengkap"
                name="fullname"
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: capitalize(e.target.value),
                  })
                }
                startContent={
                  <User weight="bold" size={18} className="text-gray" />
                }
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                value={input.email}
                autoComplete="off"
                type="email"
                variant="flat"
                labelPlacement="outside"
                placeholder="Alamat Email"
                name="email"
                onChange={(e) => {
                  const email = e.target.value;
                  if (!email) {
                    setErrors({
                      ...errors,
                      email: null,
                    });

                    setInput({
                      ...input,
                      email: email.toLowerCase(),
                    });
                  } else {
                    setInput({
                      ...input,
                      [e.target.name]: email.toLowerCase(),
                    });

                    const emailRegex =
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                    if (emailRegex.test(email.toLowerCase())) {
                      setErrors({
                        ...errors,
                        email: null,
                      });
                    } else {
                      setErrors({
                        ...errors,
                        email: "Email tidak valid",
                      });
                    }
                  }
                }}
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
                isInvalid={errors ? (errors.email ? true : false) : undefined}
                errorMessage={
                  errors ? (errors.email ? errors.email : null) : null
                }
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
                onChange={(e) => {
                  if (!e.target.value) {
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      phone_number: null,
                    });
                  } else {
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    });

                    const phoneNumberRegex = /^(?:\+62|62|0)8[1-9][0-9]{7,11}$/;
                    if (phoneNumberRegex.test(e.target.value)) {
                      setErrors({
                        ...errors,
                        phone_number: null,
                      });
                    } else {
                      setErrors({
                        ...errors,
                        phone_number: "Nomor telepon tidak valid",
                      });
                    }
                  }
                }}
                startContent={
                  <Phone weight="bold" size={18} className="text-gray" />
                }
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
                isInvalid={
                  errors ? (errors.phone_number ? true : false) : undefined
                }
                errorMessage={
                  errors
                    ? errors.phone_number
                      ? errors.phone_number
                      : null
                    : null
                }
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
                startContent={
                  <Users weight="bold" size={18} className="text-gray" />
                }
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
                placeholder="Asal Kampus (nama lengkap)"
                name="university"
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: capitalize(e.target.value),
                  })
                }
                startContent={
                  <Buildings weight="bold" size={18} className="text-gray" />
                }
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                value={input.password}
                autoComplete="off"
                type="password"
                variant="flat"
                labelPlacement="outside"
                placeholder="Kata Sandi"
                name="password"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });

                  if (e.target.value.length < 8) {
                    setErrors({
                      ...errors,
                      password: "Minimal 8 karakter",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      password: null,
                    });
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, handleRegister)}
                startContent={
                  <Lock weight="bold" size={18} className="text-gray" />
                }
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
                isInvalid={
                  errors ? (errors.password ? true : false) : undefined
                }
                errorMessage={
                  errors ? (errors.password ? errors.password : null) : null
                }
              />

              <div className="mt-1 flex items-start gap-1">
                <Checkbox
                  size="md"
                  color="secondary"
                  isSelected={isSelected}
                  onValueChange={setIsSelected}
                  onKeyDown={(e) => handleKeyDown(e, handleRegister)}
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

              <ModalTermsPrivacy
                isOpen={isTermsPrivacyOpen}
                onClose={onTermsPrivacyClose}
              />
            </div>

            <div className="grid gap-4">
              <Button
                isLoading={loading}
                isDisabled={!isFormEmpty() || loading}
                variant="solid"
                color="secondary"
                onClick={handleRegister}
                className="font-bold"
              >
                {loading ? "Tunggu Sebentar..." : "Daftar Sekarang"}
              </Button>

              <p className="text-center text-sm font-medium text-gray">
                Sudah punya akun?{" "}
                <Link href="/auth/login" className="font-extrabold text-purple">
                  Masuk disini
                </Link>
              </p>
            </div>
          </div>

          <div></div>
        </div>
      </main>
    </>
  );
}
