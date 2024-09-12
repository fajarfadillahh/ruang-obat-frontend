import { ReactNode } from "react";

interface NavbarProps {
  className?: string;
  children: ReactNode;
}

export default function Navbar({ children, className }: NavbarProps) {
  return (
    <nav
      className={`${className} sticky left-0 top-0 z-50 flex h-24 border-b border-default/20 bg-white`}
    >
      {children}
    </nav>
  );
}
