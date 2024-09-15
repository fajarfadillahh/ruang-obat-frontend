import { useRouter } from "next/router";
import { ReactNode } from "react";

interface NavbarProps {
  className?: string;
  children: ReactNode;
}

export default function Navbar({ children, className }: NavbarProps) {
  const router = useRouter();

  return (
    <nav
      className={`${className} ${router.pathname == "/" ? null : "border-gray/20 border-b-2"} sticky left-0 top-0 z-50 flex h-24 bg-white`}
    >
      {children}
    </nav>
  );
}
