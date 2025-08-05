import ModalUnauthenticated from "@/components/modal/ModalUnauthenticated";
import NavbarMenu from "@/components/navbar/NavbarMenu";
import { AppContext } from "@/context/AppContext";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";

interface LayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function Layout({
  title,
  description,
  children,
  className,
}: LayoutProps) {
  const router = useRouter();
  const ctx = useContext(AppContext);
  const currentUrl = `https://ruangobat.id${router.asPath}`;

  return (
    <>
      <NextSeo
        title={title ? `${title} | RuangObat` : "RuangObat"}
        description={
          description ||
          "Bimbel Private Farmasi No. 1 di Indonesia Yang Memfasilitasi 10.000+ Mahasiswa Farmasi"
        }
        canonical={currentUrl}
        openGraph={{
          url: currentUrl,
          title: title ? `${title} | RuangObat` : "RuangObat",
          description:
            description ||
            "Bimbel Private Farmasi No. 1 di Indonesia Yang Memfasilitasi 10.000+ Mahasiswa Farmasi",
          site_name: "RuangObat",
        }}
      />

      <Head>
        <title>{`${title} | RuangObat`}</title>
      </Head>

      <NavbarMenu />

      <div className="mx-auto grid w-full max-w-[1200px] px-6">
        <main className={`${className} min-h-[calc(100vh-96px)] pb-16 pt-6`}>
          <ModalUnauthenticated
            isOpen={ctx?.isOpenUnauthenticated as boolean}
            onClose={ctx?.onCloseUnauthenticated as () => void}
          />

          {children}
        </main>
      </div>
    </>
  );
}
