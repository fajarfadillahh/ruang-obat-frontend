import Footer from "@/components/Footer";
import ModalConfirm from "@/components/modal/ModalConfirm";
import ModalRequestHelp from "@/components/modal/ModalRequestHelp";
import ModalSendFeedback from "@/components/modal/ModalSendFeedback";
import Navbar from "@/components/Navbar";
import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import {
  ChatCircleText,
  ClipboardText,
  Headset,
  House,
  Medal,
  SignIn,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";

interface LayoutProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Layout({ title, children, className }: LayoutProps) {
  const router = useRouter();
  const {
    isOpen: isFeedbackOpen,
    onOpen: onFeedbackOpen,
    onClose: onFeedbackClose,
  } = useDisclosure();
  const {
    isOpen: isHelpOpen,
    onOpen: onHelpOpen,
    onClose: onHelpClose,
  } = useDisclosure();
  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose,
  } = useDisclosure();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const formatName = (name: string): string => {
    const parts: string[] = name.split(" ");
    let result: string;

    if (parts.length === 1) {
      result = parts[0];
    } else if (parts.length === 2) {
      result = `${parts[0]} ${parts[1].charAt(0)}.`;
    } else {
      result = `${parts[0]} ${parts[1].charAt(0)}. ${parts[2].charAt(0)}.`;
    }

    return result;
  };

  async function handleSignOut() {
    setLoading(true);

    try {
      await fetcher({
        url: `/auth/session/${session?.user.user_id}`,
        method: "DELETE",
      });

      signOut();
      toast.success("Berhasil Logout");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(getError(error));
    }
  }

  return (
    <>
      <Head>
        <title>{`${title} | Ruangobat.id`}</title>
        <meta
          name="description"
          content="RuangObat merupakan platform belajar farmasi private No.1 di Indonesia untuk seluruh mahasiswa di Indonesia. Terdapat banyak program menarik, mulai dari Kelas Mata Kuliah & Praktikum, Kelas Skripsi & Riset, Kelas Masuk Apoteker & OSCE, Serta TryOut UKMPPAI."
        />
        <meta
          name="description"
          content="Di website RuangObat kalian akan dapat mengakses berbagai program. Mari raih gelar sarjana dan apotekermu bersama RuangObat #bimbelfarmasi #cukupdisiniaja."
        />
        <meta
          name="keywords"
          content="ruangobat, ruangobat.id, ruangobat id, ruang obat id, ruangobat ujian, ruangobat ujian online, ruangobat farmasi, ruangobat tryout, ruangobat tes, ujian online ruangobat, platform ujian mahasiswa farmasi, belajar farmasi online, tryout farmasi online, tes farmasi online, latihan soal farmasi, simulasi ujian farmasi, platform belajar farmasi, ujian online farmasi terpercaya kelas apoteker, kelas masuk apoteker, program apoteker, praktikum apoteker, ujian tryout apoteker, ujian praktikum apoteker, ujian praktikum farmasi, ujian praktikum jurusan farmasi, tryout juruan apoteker, ujian juruan apoteker, kelas masuk apoteker, kelas apoteker, kelas farmasi, kelas jurusan apoteker, kelas jurusan farmasi, kelas skripsi dan riset apoteker, kelas skripsi dan riset farmasi, ujian UKMPPAI, tryout UKMPPAI, skripsi apoteker, skripsi farmasi, ujian online apoteker, kelas online apoteker, kelas online farmasi"
        />
        <meta property="og:title" content={`${title} | Ruangobat.id`} />
        <meta
          property="og:description"
          content="RuangObat merupakan platform belajar farmasi private No.1 di Indonesia untuk seluruh mahasiswa di Indonesia. Terdapat banyak program menarik, mulai dari Kelas Mata Kuliah & Praktikum, Kelas Skripsi & Riset, Kelas Masuk Apoteker & OSCE, Serta TryOut UKMPPAI."
        />
        <meta
          property="og:description"
          content="Di website RuangObat kalian akan dapat mengakses berbagai program. Mari raih gelar sarjana dan apotekermu bersama RuangObat #bimbelfarmasi #cukupdisiniaja."
        />
      </Head>

      <div className="mx-auto grid w-full max-w-[1200px] px-6 xl:px-0">
        <Navbar className="items-center justify-between">
          <Link
            href={router.pathname == "/" ? "/" : "/dashboard"}
            className="inline-flex items-center gap-2"
          >
            <LogoRuangobat className="h-auto w-8 text-gray/20" />
            <h1 className="hidden text-[20px] font-extrabold -tracking-wide text-black sm:inline-flex">
              RuangObat<span className="text-purple">.</span>
            </h1>
          </Link>

          {status == "unauthenticated" ? (
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
            <>
              <Dropdown>
                <DropdownTrigger>
                  <div className="inline-flex items-center gap-[10px] hover:cursor-pointer">
                    <Avatar
                      isBordered
                      showFallback
                      size="sm"
                      src={`${status == "authenticated" ? (session.user.gender == "M" ? "/img/avatar-male.svg" : "/img/avatar-female.svg") : null}`}
                      classNames={{
                        base: "ring-purple bg-purple/20",
                        icon: "text-purple",
                      }}
                    />

                    <div>
                      <h6 className="text-sm font-bold text-black">
                        {status == "authenticated"
                          ? formatName(session.user.fullname)
                          : null}
                      </h6>
                      <p className="text-[12px] font-semibold uppercase text-gray">
                        {status == "authenticated"
                          ? session.user.user_id
                          : null}
                      </p>
                    </div>
                  </div>
                </DropdownTrigger>

                <DropdownMenu
                  aria-label="profile actions"
                  itemClasses={{
                    title: "font-semibold",
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

                  <DropdownItem
                    key="mytest"
                    color="secondary"
                    startContent={<Medal weight="bold" size={18} />}
                    onClick={() => router.push("/my/tests")}
                  >
                    Ujian Saya
                  </DropdownItem>

                  <DropdownSection
                    aria-label="support section"
                    title="Support & Masukan"
                  >
                    <DropdownItem
                      key="feedback"
                      color="secondary"
                      startContent={<ChatCircleText weight="bold" size={18} />}
                      onClick={onFeedbackOpen}
                    >
                      Feedback
                    </DropdownItem>

                    <DropdownItem
                      key="help"
                      color="secondary"
                      startContent={<Headset weight="bold" size={18} />}
                      onClick={onHelpOpen}
                    >
                      Bantuan
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection
                    aria-label="account & settings section"
                    title="Anda Yakin?"
                  >
                    <DropdownItem
                      key="profile"
                      color="secondary"
                      startContent={<UserCircle weight="bold" size={18} />}
                      onClick={() => router.push("/my/profile")}
                    >
                      Profil Saya
                    </DropdownItem>

                    <DropdownItem
                      key="logout"
                      color="danger"
                      startContent={<SignOut weight="bold" size={18} />}
                      onClick={onLogoutOpen}
                      className="text-danger-600"
                    >
                      Keluar
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>

              <ModalSendFeedback
                isOpen={isFeedbackOpen}
                onClose={onFeedbackClose}
              />

              <ModalRequestHelp isOpen={isHelpOpen} onClose={onHelpClose} />

              <ModalConfirm
                btnText="Logout Sekarang"
                header="Pemberitahuan"
                text="Apakah Anda Yakin Ingin Logout?"
                loading={loading}
                isOpen={isLogoutOpen}
                onClose={onLogoutClose}
                handleAction={handleSignOut}
              />
            </>
          )}
        </Navbar>

        <main className={`${className} min-h-[calc(100vh-96px)] pb-16 pt-6`}>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}
