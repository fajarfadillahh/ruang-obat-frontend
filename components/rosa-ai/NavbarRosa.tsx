import { AIContext } from "@/context/AIContext";
import { formatName } from "@/utils/string.util";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  Archive,
  Gear,
  IconContext,
  SidebarSimple,
} from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function NavbarRosa() {
  const { status, data } = useSession();
  const router = useRouter();
  const ctx = useContext(AIContext);

  return (
    <nav className="z-10 flex h-20 items-center justify-between border-b border-gray/10 bg-white px-6 lg:justify-end">
      <Button
        isIconOnly
        variant="light"
        onClick={() => ctx?.setSidebarOpen(!ctx.sidebarOpen)}
        className="text-purple lg:hidden"
      >
        <SidebarSimple weight="duotone" size={24} />
      </Button>

      <div className="inline-flex cursor-pointer items-center gap-2.5">
        <Dropdown>
          <DropdownTrigger>
            <div className="inline-flex items-center gap-4 hover:cursor-pointer">
              <div className="inline-flex items-center gap-[10px]">
                <Avatar
                  isBordered
                  showFallback
                  size="sm"
                  src={`https://cdn.ruangobat.id/statics/images/avatar-img/avatar-${data?.user.gender === "M" ? "male" : "female"}.svg`}
                  classNames={{
                    base: "ring-purple bg-purple/20",
                    icon: "text-purple",
                  }}
                />

                <div>
                  <h6 className="text-sm font-bold text-black">
                    {status == "authenticated"
                      ? formatName(data?.user.fullname)
                      : "-"}
                  </h6>
                  <p className="text-[12px] font-medium uppercase text-gray">
                    {status == "authenticated" ? data?.user.user_id : "-"}
                  </p>
                </div>
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
                  key="archive"
                  color="secondary"
                  startContent={<Archive />}
                  onClick={() => router.push("/rosa/chat/archives")}
                >
                  Archive
                </DropdownItem>

                <DropdownItem
                  key="settings"
                  color="secondary"
                  startContent={<Gear />}
                  onClick={() =>
                    toast("Dalam tahap pengembangan", { icon: "⚠️" })
                  }
                >
                  Pengaturan
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </IconContext.Provider>
        </Dropdown>
      </div>
    </nav>
  );
}
