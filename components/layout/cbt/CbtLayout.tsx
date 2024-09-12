import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@nextui-org/react";
import { SignIn } from "@phosphor-icons/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface CbtLayoutProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function CbtLayout({
  title,
  children,
  className,
}: CbtLayoutProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="wfull mx-auto grid max-w-[1200px]">
        <Navbar className="items-center justify-between">
          <Link
            href="/"
            className="text-[20px] font-extrabold -tracking-wide text-foreground"
          >
            Ruang Obat<span className="text-secondary">.</span>
          </Link>

          <div className="inline-flex items-center gap-1">
            <Button
              variant="light"
              startContent={<SignIn weight="bold" size={16} />}
              onClick={() => router.push("/cbt/login")}
              className="px-4 font-bold text-foreground"
            >
              Masuk
            </Button>

            <Button
              variant="solid"
              className="bg-secondary px-8 font-bold text-white"
            >
              Register
            </Button>
          </div>
        </Navbar>

        <main className={`${className}`}>{children}</main>

        <Footer />
      </div>
    </>
  );
}
