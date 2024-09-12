import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
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
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="wfull mx-auto grid max-w-[1200px] gap-11">
        <Navbar className="items-center justify-between">
          <div>logo</div>

          <div>dropdown account</div>
        </Navbar>

        <main className={`${className}`}>
          {children}

          <Footer />
        </main>
      </div>
    </>
  );
}
