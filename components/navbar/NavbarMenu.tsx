import ModalConfirm from "@/components/modal/ModalConfirm";
import ModalRequestHelp from "@/components/modal/ModalRequestHelp";
import ModalSendFeedback from "@/components/modal/ModalSendFeedback";
import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { SuccessResponse } from "@/types/global.type";
import { UserDataResponse } from "@/types/profile.type";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import {
  CaretDown,
  ChatCircleText,
  ClipboardText,
  Headset,
  House,
  IconContext,
  Medal,
  SignIn,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const menuItemsMobile = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/company/about-us" },
  {
    label: "Video Belajar",
    href: "/kelas-pembelajaran-farmasi/video-matkul-farmasi",
  },
  {
    label: "Kelas Matkul Farmasi",
    href: "/kelas-matkul-farmasi",
  },
  { label: "Kelas Skripsi Farmasi", href: "/kelas-skripsi-farmasi" },
  { label: "Kelas Riset Farmasi", href: "/kelas-riset-farmasi" },
  { label: "Kelas Masuk Apoteker", href: "/kelas-masuk-apoteker" },
  { label: "TryOut UKMPPAI", href: "/dashboard" },
];

const menuItemsDesktop = [
  {
    label: "Kelas Matkul Farmasi",
    href: "/kelas-matkul-farmasi",
  },
  { label: "Kelas Skripsi Farmasi", href: "/kelas-skripsi-farmasi" },
  { label: "Kelas Riset Farmasi", href: "/kelas-riset-farmasi" },
  { label: "Kelas Masuk Apoteker", href: "/kelas-masuk-apoteker" },
];

export default function NavbarMain() {
  const router = useRouter();
  const { data: token, status } = useSession();
  const { data: user } = useSWR<SuccessResponse<UserDataResponse>>({
    url: "/my/profile",
    method: "GET",
    token: token?.user.access_token,
  });

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function formatName(name: string): string {
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
  }

  function handleSignOut() {
    setLoading(true);
    toast.success("Berhasil Logout");

    setTimeout(() => {
      signOut();
    }, 300);
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      height="96px"
      classNames={{
        wrapper: "max-w-[1200px] px-6 xl:px-0",
      }}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />

        <NavbarBrand className="hidden lg:inline-flex">
          <Link href="/" className="inline-flex items-center gap-2">
            <LogoRuangobat className="h-auto w-8 text-gray/20" />
            <h1 className="text-[20px] font-extrabold -tracking-wide text-black">
              RuangObat<span className="text-purple">.</span>
            </h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-5 lg:flex" justify="center">
        <NavbarItem>
          <Link
            href="/kelas-pembelajaran-farmasi/video-matkul-farmasi"
            className="text-sm font-medium text-gray hover:text-purple"
          >
            Video Belajar
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <div className="group inline-flex items-center gap-1 hover:cursor-pointer">
                <p className="text-sm font-medium text-gray hover:text-purple">
                  Daftar Kelas
                </p>
                <CaretDown
                  weight="bold"
                  size={14}
                  className="text-gray group-hover:text-purple"
                />
              </div>
            </DropdownTrigger>

            <DropdownMenu items={menuItemsDesktop}>
              {(item) => (
                <DropdownItem key={item.href}>
                  <Link
                    href={item.href}
                    className="w-full text-sm font-medium text-gray"
                  >
                    {item.label}
                  </Link>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray hover:text-purple"
          >
            TryOut UKMPPAI
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            href="/company/about-us"
            className="text-sm font-medium text-gray hover:text-purple"
          >
            Tentang Kami
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {status === "authenticated" ? (
          <>
            <Dropdown>
              <DropdownTrigger>
                <div className="inline-flex items-center gap-[10px] hover:cursor-pointer">
                  <Avatar
                    isBordered
                    showFallback
                    size="sm"
                    src={`${status == "authenticated" ? (user?.data.gender == "M" ? "/img/avatar-male.svg" : "/img/avatar-female.svg") : null}`}
                    classNames={{
                      base: "ring-purple bg-purple/20",
                      icon: "text-purple",
                    }}
                  />

                  <div>
                    <h6 className="text-sm font-bold text-black">
                      {status == "authenticated"
                        ? formatName(
                            user?.data.fullname ? user?.data.fullname : "",
                          )
                        : null}
                    </h6>
                    <p className="text-[12px] font-medium uppercase text-gray">
                      {status == "authenticated" ? user?.data.user_id : null}
                    </p>
                  </div>
                </div>
              </DropdownTrigger>

              <IconContext.Provider
                value={{
                  weight: "bold",
                  size: 18,
                }}
              >
                <DropdownMenu
                  aria-label="profile actions"
                  itemClasses={{
                    title: "font-semibold",
                  }}
                >
                  <DropdownItem
                    key="dashboard"
                    color="secondary"
                    startContent={<House />}
                    onClick={() => router.push("/dashboard")}
                  >
                    Dashboard
                  </DropdownItem>

                  <DropdownSection
                    aria-label="account & settings section"
                    title="Akun & Info"
                  >
                    <DropdownItem
                      key="profile"
                      color="secondary"
                      startContent={<UserCircle />}
                      onClick={() => router.push("/my/profile")}
                    >
                      Profil Saya
                    </DropdownItem>

                    <DropdownItem
                      key="myprogram"
                      color="secondary"
                      startContent={<ClipboardText />}
                      onClick={() => router.push("/my/programs")}
                    >
                      Program Saya
                    </DropdownItem>

                    <DropdownItem
                      key="mytest"
                      color="secondary"
                      startContent={<Medal />}
                      onClick={() => router.push("/my/tests")}
                    >
                      Ujian Saya
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection
                    aria-label="support section"
                    title="Support & Feedback"
                  >
                    <DropdownItem
                      key="help"
                      color="secondary"
                      startContent={<Headset />}
                      onClick={onHelpOpen}
                    >
                      Bantuan
                    </DropdownItem>

                    <DropdownItem
                      key="feedback"
                      color="secondary"
                      startContent={<ChatCircleText />}
                      onClick={onFeedbackOpen}
                    >
                      Feedback
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownItem
                    key="logout"
                    color="danger"
                    startContent={<SignOut />}
                    onClick={onLogoutOpen}
                    className="text-danger-600"
                  >
                    Keluar
                  </DropdownItem>
                </DropdownMenu>
              </IconContext.Provider>
            </Dropdown>

            <ModalSendFeedback
              isOpen={isFeedbackOpen}
              onClose={onFeedbackClose}
            />

            <ModalRequestHelp isOpen={isHelpOpen} onClose={onHelpClose} />

            <ModalConfirm
              btnText="Logout"
              header="Pemberitahuan"
              text="Apakah Anda Yakin Ingin Logout?"
              loading={loading}
              isOpen={isLogoutOpen}
              onClose={onLogoutClose}
              handleAction={handleSignOut}
            />
          </>
        ) : (
          <div className="inline-flex items-center gap-2">
            <Button
              variant="bordered"
              startContent={<SignIn weight="bold" size={18} />}
              onClick={() => router.push("/auth/login")}
              className="px-7 font-bold text-black"
            >
              Login
            </Button>

            <Button
              color="secondary"
              onClick={() => router.push("/auth/register")}
              className="px-8 font-bold"
            >
              Register
            </Button>
          </div>
        )}
      </NavbarContent>

      {/* mobile view */}
      <NavbarMenu className="gap-1">
        {menuItemsMobile.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              href={item.href}
              className="flex rounded-lg text-sm font-medium text-gray [padding:8px_12px] hover:bg-gray/20"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
