import ModalConfirm from "@/components/modal/ModalConfirm";
import ModalRequestHelp from "@/components/modal/ModalRequestHelp";
import ModalSendFeedback from "@/components/modal/ModalSendFeedback";
import { menuItemsDesktop, menuItemsMobile } from "@/data/navbar";
import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { formatName } from "@/utils/string.util";
import {
  Avatar,
  Badge,
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
  CreditCard,
  Headset,
  IconContext,
  Medal,
  ShoppingCart,
  SignIn,
  SignOut,
  Sparkle,
  UserCircle,
} from "@phosphor-icons/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NavbarMain() {
  const router = useRouter();
  const { data: session, status } = useSession();

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

  function handleSignOut() {
    setLoading(true);
    toast.success("Berhasil logout!");

    setTimeout(() => {
      signOut();
    }, 300);
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      height="96px"
      classNames={{
        wrapper: "max-w-[1440px] px-6",
      }}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />

        <NavbarBrand className="hidden lg:inline-flex">
          <Link href="/" className="inline-flex items-center gap-2">
            <LogoRuangobat className="h-auto w-10 text-gray/20" />
            <h1 className="text-2xl font-black -tracking-wide text-black">
              RuangObat<span className="text-purple">.</span>
            </h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 lg:flex lg:gap-8" justify="center">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <div className="group inline-flex items-center gap-1 hover:cursor-pointer">
                <p className="text-sm font-medium text-gray hover:text-purple">
                  Daftar Program
                </p>

                <CaretDown
                  weight="bold"
                  size={14}
                  className="text-gray group-hover:text-purple"
                />
              </div>
            </DropdownTrigger>

            <DropdownMenu
              items={menuItemsDesktop}
              itemClasses={{
                base: "gap-2",
                title: "font-bold -tracking-wide text-black",
                // description: "text-sm text-gray",
              }}
            >
              {(item) => (
                <DropdownItem
                  key={item.description}
                  // description={item.description}
                  startContent={
                    <Image
                      src={item.icon}
                      alt="icon program"
                      width={500}
                      height={500}
                      loading="lazy"
                      className="size-7"
                    />
                  }
                  onClick={() => router.push(item.href)}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <Link
            href="/articles"
            className="text-sm font-medium text-gray hover:text-purple"
          >
            Artikel
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            href="https://wa.me/62895383359491"
            target="_blank"
            className="text-sm font-medium text-gray hover:text-purple"
          >
            WhatsApp Kami
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            href="/rosa"
            className="flex items-center gap-1 text-sm font-medium text-gray hover:text-purple"
          >
            <Sparkle weight="duotone" size={18} className="text-purple" />

            <Badge
              color="danger"
              content="Beta"
              size="sm"
              classNames={{
                badge: "-right-[13%] -top-[10%]",
              }}
            >
              <span>Apoteker ROSA</span>
            </Badge>
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
                    src={`${status == "authenticated" ? (session?.user.gender == "M" ? "https://ruangobat.is3.cloudhost.id/statics/images/avatar-img/avatar-male.svg" : "https://ruangobat.is3.cloudhost.id/statics/images/avatar-img/avatar-female.svg") : null}`}
                    classNames={{
                      base: "ring-purple bg-purple/20",
                      icon: "text-purple",
                    }}
                  />

                  <div>
                    <h6 className="text-sm font-bold text-black">
                      {status == "authenticated"
                        ? formatName(
                            session?.user.fullname
                              ? session?.user.fullname
                              : "",
                          )
                        : null}
                    </h6>
                    <p className="text-[12px] font-medium uppercase text-gray">
                      {status == "authenticated" ? session?.user.user_id : null}
                    </p>
                  </div>
                </div>
              </DropdownTrigger>

              <IconContext.Provider
                value={{
                  weight: "duotone",
                  size: 18,
                }}
              >
                <DropdownMenu
                  aria-label="profile actions"
                  itemClasses={{
                    title: "font-semibold",
                  }}
                >
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

                    <DropdownItem
                      key="mysubscribe"
                      color="secondary"
                      startContent={<CreditCard />}
                      onClick={() => router.push("/my/subscriptions")}
                    >
                      Langganan Saya
                    </DropdownItem>

                    <DropdownItem
                      key="mytransactions"
                      color="secondary"
                      startContent={<ShoppingCart />}
                      onClick={() => router.push("/my/transactions")}
                    >
                      Transaksi Saya
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
              btnText="Ya, Logout"
              header="Pemberitahuan"
              text="Apakah kamu yakin ingin logout?"
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
              onClick={() =>
                router.push(`/auth/login?callback=${router.asPath}`)
              }
              className="px-7 font-bold text-black"
            >
              Login
            </Button>

            <Button
              color="secondary"
              onClick={() =>
                router.push(`/auth/register?callback=${router.asPath}`)
              }
              className="px-8 font-bold"
            >
              Buat Akun
            </Button>
          </div>
        )}
      </NavbarContent>

      {/* mobile view */}
      <NavbarMenu className="gap-8">
        {menuItemsMobile.map((item, index) => (
          <NavbarMenuItem key={index}>
            <div className="grid gap-2">
              <span className="text-xs font-extrabold uppercase tracking-[4px] text-purple">
                {item.label}
              </span>

              <div className="grid gap-1">
                {item.list.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex rounded-lg text-sm font-medium text-gray [padding:8px_12px] hover:bg-gray/20"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </NavbarMenuItem>
        ))}

        {/* ai highlight */}
        <Link
          href="/rosa"
          className="flex items-start gap-6 rounded-xl border-l-8 border-pink-500 bg-purple p-6 hover:bg-purple/90"
        >
          <Sparkle weight="duotone" size={32} className="text-white" />

          <div className="grid flex-1 gap-1">
            <h4 className="text-lg font-bold text-white">
              <Badge
                color="danger"
                content="Beta"
                size="sm"
                classNames={{
                  badge: "-right-[10%] -top-[10%]",
                }}
              >
                <span>Apoteker ROSA</span>
              </Badge>
            </h4>

            <p className="text-sm font-medium text-white/80">
              AI Assistant yang siap bantu kamu menjawab berbagai pertanyaan
              seputar dunia Farmasi dan layanan belajar di RuangObat!
            </p>
          </div>
        </Link>
      </NavbarMenu>
    </Navbar>
  );
}
