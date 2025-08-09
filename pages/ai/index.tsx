import ChatInput from "@/components/rosa-ai/chat/ChatInput";
import NavbarRosa from "@/components/rosa-ai/Navbar";
import SidebarRosa from "@/components/rosa-ai/Sidebar";
import WrapperChats from "@/components/rosa-ai/wrapper/WrapperChats";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ApotekerRosaAiPage() {
  const router = useRouter();
  const currentUrl = `https://ruangobat.id${router.asPath}`;

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLaptop, setIsLaptop] = useState<boolean>(false);

  useEffect(() => {
    const checkWidth = () => setIsLaptop(window.innerWidth >= 1024);
    checkWidth();

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  function handleToggleSidebar() {
    setIsSidebarOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <>
      <NextSeo
        title="Ruang Obat Smart Assistant (ROSA)"
        description="Ruang Obat Smart Assistant dirancang untuk meningkatkan efektivitas proses belajar mahasiswa serta mempersiapkan mereka menghadapi tantangan profesional di dunia farmasi."
        canonical={currentUrl}
        openGraph={{
          url: currentUrl,
          title: "Ruang Obat Smart Assistant (ROSA)",
          description:
            "Ruang Obat Smart Assistant dirancang untuk meningkatkan efektivitas proses belajar mahasiswa serta mempersiapkan mereka menghadapi tantangan profesional di dunia farmasi.",
          site_name: "RuangObat",
        }}
      />

      <Head>
        <title>Ruang Obat Smart Assistant (ROSA)</title>
      </Head>

      <main className="flex h-dvh w-full items-start bg-gray-50">
        <SidebarRosa isSidebarOpen={isSidebarOpen} isLaptop={isLaptop} />

        {/* === overlay sidebar === */}
        <div
          className={
            isLaptop
              ? ""
              : `absolute right-0 top-0 z-40 h-screen w-full bg-black/50 backdrop-blur-[2px] ${isSidebarOpen ? "flex" : "hidden"}`
          }
          onClick={() => {
            !isLaptop && handleToggleSidebar();
          }}
        />

        <div className="relative isolate grid w-full grid-rows-[4rem_1fr]">
          <NavbarRosa handleToggleSidebar={handleToggleSidebar} />

          <WrapperChats />

          <ChatInput />
        </div>
      </main>
    </>
  );
}
