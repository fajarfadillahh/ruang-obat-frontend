import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
            className="text-[20px] font-extrabold -tracking-wide text-black"
          >
            Ruang Obat<span className="text-purple">.</span>
          </Link>

          {router.pathname == "/" ? (
            <div className="inline-flex items-center gap-1">
              <Button
                variant="light"
                startContent={<SignIn weight="bold" size={18} />}
                onClick={() => router.push("/cbt/login")}
                className="px-4 font-bold text-black"
              >
                Masuk
              </Button>

              <Button
                variant="solid"
                color="secondary"
                onClick={() => router.push("/cbt/register")}
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
                    src="/img/avatar.svg"
                    classNames={{
                      base: "ring-purple bg-purple/20",
                    }}
                  />

                  <div>
                    <h6 className="text-sm font-bold text-black">
                      Fajar Fadillah Agustian
                    </h6>
                    <p className="text-gray text-[12px] font-semibold uppercase">
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
                  onClick={() => router.push("/cbt")}
                >
                  Beranda
                </DropdownItem>

                <DropdownItem
                  key="myprogram"
                  color="secondary"
                  startContent={<ClipboardText weight="bold" size={18} />}
                  onClick={() => router.push("/cbt/myprogram")}
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
                        window.location.href = "/";
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

        <main className={`${className} min-h-[calc(100vh-96px)] py-8`}>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}
