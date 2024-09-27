import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { ClipboardText, House, SignIn, SignOut } from "@phosphor-icons/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface LayoutProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Layout({ title, children, className }: LayoutProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${title} | Ruangobat.id`}</title>
        <meta
          name="description"
          content="Ruangobat adalah platform ujian online yang dirancang khusus untuk mahasiswa farmasi. Dapatkan pengalaman belajar dan ujian yang interaktif dengan berbagai soal terupdate sesuai kurikulum terkini. Uji kemampuan, tingkatkan pemahaman, dan siap menghadapi ujian farmasi dengan percaya diri. Belajar farmasi jadi lebih efektif dan terstruktur hanya di Ruangobat!"
        />
        <meta
          name="keywords"
          content="ruangobat, ruangobat.id, ruangobat ujian, ruangobat ujian online, ruangobat farmasi, ruangobat tryout, ruangobat tes, ujian online farmasi, ujian online ruangobat, platform ujian mahasiswa farmasi, belajar farmasi online, tryout farmasi online, tes farmasi online, latihan soal farmasi, simulasi ujian farmasi, platform belajar farmasi, ujian online farmasi terpercaya"
        />
        <meta property="og:title" content={`${title} | Ruangobat.id`} />
        <meta
          property="og:description"
          content="Ruangobat adalah platform ujian online yang dirancang khusus untuk mahasiswa farmasi. Dapatkan pengalaman belajar dan ujian yang interaktif dengan berbagai soal terupdate sesuai kurikulum terkini. Uji kemampuan, tingkatkan pemahaman, dan siap menghadapi ujian farmasi dengan percaya diri. Belajar farmasi jadi lebih efektif dan terstruktur hanya di Ruangobat!"
        />
      </Head>

      <div className="mx-auto grid w-full max-w-[1200px] px-6">
        <Navbar className="items-center justify-between">
          <Link
            href={router.pathname == "/" ? "/" : "/dashboard"}
            className="inline-flex items-center gap-2"
          >
            <LogoRuangobat className="h-auto w-8 text-gray/20" />
            <h1 className="hidden text-[20px] font-extrabold -tracking-wide text-black sm:inline-flex">
              Ruang Obat<span className="text-purple">.</span>
            </h1>
          </Link>

          {router.pathname == "/" ? (
            <div className="inline-flex items-center gap-1">
              <Button
                variant="light"
                startContent={<SignIn weight="bold" size={18} />}
                onClick={() => {
                  if (window.location.host == "localhost:3000") {
                    router.push("/auth/login");
                  } else {
                    window.open(
                      "https://cbt.ruangobat.id/auth/login",
                      "_blank",
                    );
                  }
                }}
                className="px-4 font-bold text-black"
              >
                Masuk
              </Button>

              <Button
                variant="solid"
                color="secondary"
                onClick={() => {
                  if (window.location.host == "localhost:3000") {
                    router.push("/auth/register");
                  } else {
                    window.open(
                      "https://cbt.ruangobat.id/auth/register",
                      "_blank",
                    );
                  }
                }}
                className="px-8 font-bold"
              >
                Register
              </Button>
            </div>
          ) : (
            <Dropdown>
              <DropdownTrigger>
                <div className="inline-flex items-center gap-[10px] hover:cursor-pointer">
                  <Avatar
                    isBordered
                    showFallback
                    size="sm"
                    src="/img/avatar-male.svg"
                    classNames={{
                      base: "ring-purple bg-purple/20",
                      icon: "text-purple",
                    }}
                  />

                  <div>
                    <h6 className="text-sm font-bold text-black">
                      Fajar Fadillah Agustian
                    </h6>
                    <p className="text-[12px] font-semibold uppercase text-gray">
                      ROUFFA125638
                    </p>
                  </div>
                </div>
              </DropdownTrigger>

              <DropdownMenu
                aria-label="profile actions"
                itemClasses={{
                  base: "text-black",
                }}
              >
                <DropdownItem
                  key="dashboard"
                  color="secondary"
                  startContent={<House weight="bold" size={18} />}
                  onClick={() => router.push("/dashboard")}
                >
                  Beranda
                </DropdownItem>

                <DropdownItem
                  key="myprogram"
                  color="secondary"
                  startContent={<ClipboardText weight="bold" size={18} />}
                  onClick={() => router.push("/my/programs")}
                >
                  Program Saya
                </DropdownItem>

                <DropdownSection
                  aria-label="danger zone section"
                  title="Anda Yakin?"
                >
                  <DropdownItem
                    key="logout"
                    color="danger"
                    startContent={<SignOut weight="bold" size={18} />}
                    onClick={() => {
                      if (confirm("apakah anda yakin?")) {
                        window.location.href = "/auth/login";
                      }
                    }}
                    className="text-danger-600"
                  >
                    Keluar
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          )}
        </Navbar>

        <main className={`${className} min-h-[calc(100vh-96px)] py-6`}>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}
