import { ReactNode } from "react";

interface AdminContainerProps {
  children: ReactNode;
  className?: string;
}

export default function AdminContainer({
  children,
  className,
}: AdminContainerProps) {
  return (
    <div className="min-h-screen">
      <div className={`grid ${className}`}>{children}</div>
    </div>
  );
}
