import { ReactNode } from "react";

interface NavbarProps {
  className?: string;
  children: ReactNode;
}

export default function Navbar({ children, className }: NavbarProps) {
  return (
    <nav
      className={`${className} border-default/20 sticky left-0 top-0 z-50 flex h-24 border-b bg-white`}
    >
      {children}
    </nav>
  );
}
