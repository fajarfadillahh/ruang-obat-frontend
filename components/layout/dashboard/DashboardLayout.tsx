import Footer from "@/components/Footer";
import Head from "next/head";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  title?: string;
  children: ReactNode;
}

export default function DashboardLayout({
  title,
  children,
}: DashboardLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex h-screen">
        <div>sidebar</div>

        <div className="grid w-full">
          <div>navbar</div>

          <div className="scrollbar-hide overflow-y-scroll">
            <div className="mx-auto w-full max-w-[1200px] p-6">{children}</div>

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
