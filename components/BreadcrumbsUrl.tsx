import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";

type BreadcrumbsUrlProps = {
  rootLabel?: string;
  basePath?: string;
};

export default function BreadcrumbsUrl({
  rootLabel = "Dashboard",
  basePath = "/dashboard",
}: BreadcrumbsUrlProps) {
  const { asPath } = useRouter();

  // clear basePath dari URL dan split jadi segment
  const cleanPath = asPath.replace(basePath === "/" ? "" : basePath, "");
  const segments = cleanPath.split("/").filter(Boolean);

  // Build breadcrumbs array
  const breadcrumbs = segments.map((segment, index) => ({
    key: segment,
    label: segment
      .split("-")
      .map((label) => label[0].toUpperCase() + label.slice(1))
      .join(" "),
    href: `${basePath}${basePath.endsWith("/") ? "" : "/"}${segments
      .slice(0, index + 1)
      .join("/")}`,
  }));

  return (
    <Breadcrumbs
      classNames={{
        base: "mb-8",
      }}
    >
      <BreadcrumbItem
        classNames={{
          base: "font-medium text-gray",
        }}
      >
        <Link href={basePath}>{rootLabel}</Link>
      </BreadcrumbItem>

      {breadcrumbs.map((item, index) => (
        <BreadcrumbItem
          key={index}
          isCurrent={index === breadcrumbs.length - 1}
          classNames={{
            base: "font-medium text-gray",
          }}
        >
          <Link href={item.href}>{item.label}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
