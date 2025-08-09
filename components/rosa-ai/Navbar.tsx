import CustomTooltip from "@/components/CustomTooltip";
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
  IconContext,
  Monitor,
  SidebarSimple,
  SignOut,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";

interface Props {
  handleToggleSidebar?: () => void;
}

export default function NavbarRosa({ handleToggleSidebar }: Props) {
  const router = useRouter();

  const title =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quasi";

  return (
    <nav className="flex h-16 w-full items-center justify-between bg-gray-50 p-4">
      <Button
        isIconOnly
        variant="light"
        color="secondary"
        onClick={handleToggleSidebar}
      >
        <CustomTooltip content="Toogle Sidebar">
          <SidebarSimple weight="duotone" size={22} />
        </CustomTooltip>
      </Button>

      <CustomTooltip content={title}>
        <h4 className="hidden font-semibold text-black lg:line-clamp-1 lg:max-w-[400px]">
          {title}
        </h4>
      </CustomTooltip>

      <Dropdown>
        <DropdownTrigger>
          <div className="inline-flex items-center gap-[10px] hover:cursor-pointer">
            <Avatar
              isBordered
              showFallback
              size="sm"
              src={`/img/avatar-male.svg`}
              classNames={{
                base: "ring-purple bg-purple/20",
                icon: "text-purple",
              }}
            />

            <div>
              <h6 className="text-sm font-bold text-black">Fajar Fadillah A</h6>
              <p className="text-[12px] font-medium uppercase text-gray">
                ROUFFA123456
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
            <DropdownSection aria-label="account section" title="Lainnya">
              <DropdownItem
                key="profile"
                color="secondary"
                onClick={() => router.push("/")}
                startContent={<Monitor />}
              >
                Beranda
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                startContent={<SignOut />}
                className="text-danger"
              >
                Keluar
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </IconContext.Provider>
      </Dropdown>
    </nav>
  );
}
