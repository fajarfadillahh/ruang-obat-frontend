import { Button } from "@nextui-org/react";
import {
  ArrowRight,
  Globe,
  IconContext,
  InstagramLogo,
  TiktokLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const sosmed = [
  {
    label: "instagram",
    href: "https://www.instagram.com/ruangobat.id/",
    icon: InstagramLogo,
  },
  {
    label: "whatsapp",
    href: "https://api.whatsapp.com/send?phone=6289637015733",
    icon: WhatsappLogo,
  },
  {
    label: "website",
    href: "https://ruangobat.id/",
    icon: Globe,
  },
  {
    label: "tiktok",
    href: "https://www.tiktok.com/@ruangobat.id",
    icon: TiktokLogo,
  },
];

export default function Maintenance() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6 py-[100px]">
      <div className="grid w-full max-w-[600px] items-center gap-4 lg:max-w-[1200px] lg:grid-cols-2">
        <div className="grid gap-4">
          <h2 className="text-2xl font-black -tracking-wide text-black sm:text-3xl md:text-4xl">
            Apoteker ROSA Sedang Dalam Pemeliharaan 🚧
          </h2>

          <p className="font-medium leading-[170%] text-gray">
            Maaf yaa, aku lagi ada maintenance dulu nih ✨ Lagi nambahin fitur
            baru biar makin kece. Prosesnya kira-kira makan waktu 5-7 hari
            kerja. Makasih banget udah sabar nungguin, kalian semua the best! 🤗
          </p>

          <Button
            color="secondary"
            endContent={<ArrowRight weight="bold" size={16} />}
            onClick={() => router.push("/")}
            className="mt-4 w-max px-6 font-bold"
          >
            Ke Halaman Utama
          </Button>

          <IconContext.Provider
            value={{
              weight: "duotone",
              size: 24,
              className: "text-purple",
            }}
          >
            <div className="mt-8 inline-flex items-center gap-4">
              {sosmed.map((item, index) => (
                <Link
                  key={index}
                  href={item.href as string}
                  target="_blank"
                  className="rounded-md p-1 hover:bg-purple/10"
                >
                  <item.icon />
                </Link>
              ))}
            </div>
          </IconContext.Provider>
        </div>

        <Image
          src="https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-7.webp"
          alt="apoteker rosa image"
          width={1000}
          height={1000}
          className="w-full max-w-[500px] justify-self-center"
          priority
        />
      </div>
    </main>
  );
}
