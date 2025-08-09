import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  DotsThreeOutline,
  IconContext,
  Monitor,
  Sparkle,
  Trash,
} from "@phosphor-icons/react";
import Link from "next/link";

interface Props {
  isSidebarOpen?: boolean;
  isLaptop?: boolean;
}

export default function SidebarRosa({ isSidebarOpen, isLaptop }: Props) {
  const sidebarPosition = isLaptop
    ? isSidebarOpen
      ? "fixed -left-full top-0"
      : "left-0 top-0"
    : isSidebarOpen
      ? "fixed left-0 top-0 z-50"
      : "fixed -left-full top-0";

  return (
    <div
      className={`grid h-screen w-full max-w-[280px] grid-rows-[max-content_1fr] bg-white ${sidebarPosition}`}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 justify-self-center px-4 py-4"
      >
        <LogoRuangobat className="h-auto w-7 text-gray/20" />
        <h1 className="text-lg font-extrabold -tracking-wide text-black">
          RuangObat<span className="text-purple">.</span>
        </h1>
      </Link>

      <div className="grid grid-rows-[max-content_1fr] overflow-hidden p-4">
        <IconContext.Provider
          value={{
            weight: "duotone",
            size: 22,
          }}
        >
          <div className="grid gap-1 border-b-2 border-gray/10 pb-4">
            {[
              ["Halaman Utama", "/", <Monitor />],
              ["Obrolan Baru", "/ai", <Sparkle />],
            ].map(([label, path, icon], index) => (
              <Link
                key={index}
                href={path as string}
                className={`flex h-10 items-center justify-between rounded-xl bg-transparent [padding:0.5rem_1rem] hover:bg-purple/10`}
              >
                <div className="flex flex-1 items-center gap-2 text-purple">
                  {icon}
                  <article className="text-sm font-bold">{label}</article>
                </div>
              </Link>
            ))}
          </div>
        </IconContext.Provider>

        <div className="gap-1 overflow-y-scroll pt-4 scrollbar-hide">
          <article className="mb-3 text-sm font-semibold text-gray">
            Daftar Obrolan
          </article>

          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className={`group relative isolate flex h-10 items-center justify-between rounded-xl bg-transparent [padding:0.5rem_0.5rem_0.5rem_1rem] hover:cursor-pointer hover:bg-purple/10`}
            >
              <article className="line-clamp-1 text-sm font-bold text-gray group-hover:text-purple">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </article>

              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="secondary"
                    className="hidden group-hover:flex"
                  >
                    <DotsThreeOutline
                      weight="fill"
                      size={16}
                      className="text-purple"
                    />
                  </Button>
                </DropdownTrigger>

                <IconContext.Provider
                  value={{
                    weight: "duotone",
                    size: 18,
                  }}
                >
                  <DropdownMenu
                    aria-label="chat actions"
                    itemClasses={{
                      title: "font-semibold",
                    }}
                  >
                    <DropdownSection
                      aria-label="account section"
                      title="Apakah kamu yakin?"
                    >
                      <DropdownItem
                        key="delete"
                        color="danger"
                        startContent={<Trash />}
                        onClick={() => alert(`ID chat: ${index}`)}
                        className="text-danger"
                      >
                        Hapus Obrolan
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </IconContext.Provider>
              </Dropdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
