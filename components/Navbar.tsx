import { ReactNode } from "react";

interface NavbarProps {
  className?: string;
  children: ReactNode;
}

export default function Navbar({ children, className }: NavbarProps) {
  return (
    <nav className="sticky left-0 top-0 z-50 bg-white">
      <div
        className={`mx-auto flex h-24 w-full max-w-[1200px] px-6 xl:px-0 ${className}`}
      >
        {children}
      </div>
    </nav>
  );
}
