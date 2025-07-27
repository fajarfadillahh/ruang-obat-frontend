import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import {
  Envelope,
  IconContext,
  InstagramLogo,
  TiktokLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const data = [
  {
    url: "mailto:admin@ruangobat.id",
    title: "Email",
    text: "admin@ruangobat.id",
    icon: Envelope,
  },
  {
    url: "https://instagram.com/ruangobat.id",
    title: "Instagram",
    text: "@ruangobat.id",
    icon: InstagramLogo,
  },
  {
    url: "https://tiktok.com/ruangobat.id",
    title: "Tiktok",
    text: "@ruangobat.id",
    icon: TiktokLogo,
  },
  {
    url: "https://wa.me/6289637015733",
    title: "WhatsApp",
    text: "089637015733",
    icon: WhatsappLogo,
  },
];

export default function ContactUsPage() {
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return;

  return (
    <>
      <Layout
        title="Kontak Kami"
        description="Punya pertanyaan, saran, atau butuh bantuan? Jangan ragu untuk menghubungi kami melalui formulir atau kontak yang tersedia. Tim kami siap membantu kamu."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section className="base-container gap-12 pb-[100px]">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="aspect-square rounded-full bg-purple p-6">
              <Image
                src="/img/logo-ruangobat.svg"
                alt="logo"
                width={500}
                height={500}
                className="size-[96px]"
              />
            </div>

            <h1 className="text-5xl font-black -tracking-wide text-black">
              RuangObat<span className="text-purple">.</span>
            </h1>
          </div>

          <IconContext.Provider
            value={{
              weight: "duotone",
              size: 56,
              className: "text-purple",
            }}
          >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-center gap-4">
              {data.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  target="_blank"
                  className="group flex flex-wrap items-center gap-4 rounded-2xl border-2 border-gray/10 p-8"
                >
                  <item.icon />

                  <div className="grid w-full">
                    <h4 className="text-2xl font-extrabold text-black group-hover:text-purple">
                      {item.title}
                    </h4>

                    <p className="font-medium leading-[170%] text-gray">
                      {item.text}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </IconContext.Provider>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
