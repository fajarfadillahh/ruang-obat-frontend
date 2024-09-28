import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-4 border-t-2 border-gray/20 p-6 text-center xs:justify-between">
      <p className="text-sm font-medium capitalize text-gray">
        &copy; PT. Pharmacy Cone Group {new Date().getFullYear()}
      </p>

      <div className="inline-flex items-center gap-4">
        <Link
          href="/company/terms"
          className="text-[12px] font-medium text-gray underline hover:text-purple"
        >
          Ketentuan Layanan
        </Link>

        <Link
          href="/company/privacy"
          className="text-[12px] font-medium text-gray underline hover:text-purple"
        >
          Kebijakan Privasi
        </Link>
      </div>
    </footer>
  );
}
