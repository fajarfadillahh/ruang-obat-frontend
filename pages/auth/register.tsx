import { quotes } from "@/utils/quotes";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import {
  Buildings,
  EnvelopeSimple,
  Lock,
  Phone,
  Quotes,
  User,
  Users,
} from "@phosphor-icons/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type InputType = {
  fullname: string;
  email: string;
  no_telp: string;
  gender: string;
  university: string;
  password: string;
};

const quote = quotes[Math.floor(Math.random() * quotes.length)];

export default function RegisterPage() {
  const [input, setInput] = useState<InputType>({
    fullname: "",
    email: "",
    no_telp: "",
    gender: "",
    university: "",
    password: "",
  });
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleRegister() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard";
    }, 3000);
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
        <title>Daftar Akun Untuk Mulai Belajar | Ruangobat.id</title>
        <meta
          name="description"
          content="Ruangobat adalah platform ujian online yang dirancang khusus untuk mahasiswa farmasi. Dapatkan pengalaman belajar dan ujian yang interaktif dengan berbagai soal terupdate sesuai kurikulum terkini. Uji kemampuan, tingkatkan pemahaman, dan siap menghadapi ujian farmasi dengan percaya diri. Belajar farmasi jadi lebih efektif dan terstruktur hanya di Ruangobat!"
        />
        <meta
          name="keywords"
          content="ruangobat, ruangobat.id, ruangobat ujian, ruangobat ujian online, ruangobat farmasi, ruangobat tryout, ruangobat tes, ujian online farmasi, ujian online ruangobat, platform ujian mahasiswa farmasi, belajar farmasi online, tryout farmasi online, tes farmasi online, latihan soal farmasi, simulasi ujian farmasi, platform belajar farmasi, ujian online farmasi terpercaya"
        />
        <meta
          property="og:title"
          content="Daftar Akun Untuk Mulai Belajar | Ruangobat.id"
        />
        <meta
          property="og:description"
          content="Ruangobat adalah platform ujian online yang dirancang khusus untuk mahasiswa farmasi. Dapatkan pengalaman belajar dan ujian yang interaktif dengan berbagai soal terupdate sesuai kurikulum terkini. Uji kemampuan, tingkatkan pemahaman, dan siap menghadapi ujian farmasi dengan percaya diri. Belajar farmasi jadi lebih efektif dan terstruktur hanya di Ruangobat!"
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
                autoComplete="off"
                type="text"
                variant="flat"
                labelPlacement="outside"
                placeholder="Nama Lengkap"
                name="fullname"
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
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
                autoComplete="off"
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
              />

              <Input
                autoComplete="off"
                type="text"
                inputMode="numeric"
                variant="flat"
                labelPlacement="outside"
                placeholder="No. Telpon"
                name="no_telp"
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
                startContent={
                  <Phone weight="bold" size={18} className="text-gray" />
                }
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Select
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
                autoComplete="off"
                type="text"
                variant="flat"
                labelPlacement="outside"
                placeholder="Asal Kampus"
                name="university"
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
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
                autoComplete="off"
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
                startContent={
                  <Lock weight="bold" size={18} className="text-gray" />
                }
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
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

          <p className="mx-auto max-w-[360px] text-center text-[12px] font-medium text-gray">
            Dengan melanjutkan, anda menyetujui{" "}
            <Link
              href="/company/terms"
              className="font-bold text-black underline"
            >
              Ketentuan Layanan
            </Link>{" "}
            dan{" "}
            <Link
              href="/company/privacy"
              className="font-bold text-black underline"
            >
              Kebijakan Privasi
            </Link>{" "}
            Ruangobat
          </p>
        </div>
      </main>
    </>
  );
}
