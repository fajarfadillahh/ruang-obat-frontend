import { siteConfigHomePage } from "@/config/site";
import { IconContext } from "@phosphor-icons/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="grid overflow-hidden bg-purple">
      <div className="relative mx-auto h-full w-full max-w-[1200px] px-6 xl:p-0">
        <div className="grid gap-16 py-[164px] sm:flex sm:items-start md:items-center">
          <div className="flex flex-wrap items-start gap-16">
            {siteConfigHomePage.footer.menu.map((item, index) => (
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
              {siteConfigHomePage.footer.sosmed.map((item) => (
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

        <p className="pb-8 text-center font-medium capitalize text-white/80 xl:relative xl:-mb-10 xl:pb-0">
          &copy; {siteConfigHomePage.footer.copyright}
        </p>
      </div>

      <h1 className="hidden select-none justify-self-center text-center text-[240px] font-black leading-tight -tracking-[12px] text-white/20 xl:flex">
        RuangObat.
      </h1>
    </footer>
  );
}
