import { footerConfigContent } from "@/config/site";
import { Image } from "@nextui-org/react";
import { IconContext } from "@phosphor-icons/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="isolate grid gap-4 overflow-hidden bg-purple">
      <div className="relative mx-auto h-full w-full max-w-[1440px] px-6">
        <div className="grid gap-16 py-[164px] sm:flex sm:items-start md:items-center">
          <div className="flex flex-wrap items-start gap-16">
            {footerConfigContent.menu.map((item, index) => (
              <div key={index} className="grid gap-4">
                <h4 className="text-xl font-extrabold text-white">
                  {item.label}
                </h4>

                <ul className="flex flex-col gap-2">
                  {item.list.map((subitem, index) => (
                    <Link
                      key={index}
                      href={subitem.href as string}
                      className="w-max font-medium text-white/80 hover:text-white hover:underline"
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="hidden h-1 w-full flex-1 bg-white/20 md:flex" />

          <IconContext.Provider
            value={{
              weight: "duotone",
              size: 24,
              className: "text-white",
            }}
          >
            <div className="flex items-center gap-6">
              {footerConfigContent.sosmed.map((item) => (
                <Link
                  key={item.label}
                  href={item.href as string}
                  target="_blank"
                  className="rounded-md p-1 hover:bg-pink-500"
                >
                  <item.icon />
                </Link>
              ))}
            </div>
          </IconContext.Provider>
        </div>

        <p className="text-center font-medium capitalize text-white/80">
          &copy; {footerConfigContent.copyright}
        </p>
      </div>

      {/* RUANGOBAT text */}
      <div className="flex max-w-[100vw] justify-center opacity-20">
        <Image
          src="/img/text-footer-img.svg"
          alt="footer img"
          className="h-auto w-full max-w-[100vw]"
        />
      </div>
    </footer>
  );
}
