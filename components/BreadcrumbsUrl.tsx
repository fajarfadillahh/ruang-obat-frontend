import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";

type BreadcrumbsUrlProps = {
  rootLabel?: string;
  basePath?: string;
};

export default function BreadcrumbsUrl({
  rootLabel = "Beranda",
  basePath = "/",
}: BreadcrumbsUrlProps) {
  const { asPath } = useRouter();

  const pathWithoutQuery = asPath.split("?")[0];
  const cleanPath = pathWithoutQuery.replace(
    basePath === "/" ? "" : basePath,
    "",
  );
  const segments = cleanPath.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const decoded = decodeURIComponent(segment);
    const label = decoded
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      key: segment,
      label,
      href: `${basePath}${basePath.endsWith("/") ? "" : "/"}${segments
        .slice(0, index + 1)
        .join("/")}`,
    };
  });

  return (
    <Breadcrumbs classNames={{ base: "mb-8" }}>
      <BreadcrumbItem classNames={{ base: "font-medium text-gray" }}>
        <Link href={basePath}>{decodeURIComponent(rootLabel)}</Link>
      </BreadcrumbItem>

      {breadcrumbs.map((item, index) => (
        <BreadcrumbItem
          key={item.key}
          isCurrent={index === breadcrumbs.length - 1}
          classNames={{ base: "font-medium text-gray" }}
        >
          <Link href={item.href}>{item.label}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
