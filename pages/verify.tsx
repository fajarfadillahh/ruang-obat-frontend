import { Button } from "@nextui-org/react";
import { CheckCircle } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function VerifyPage() {
  const router = useRouter();

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray/5 px-6">
      <div className="grid w-full max-w-[450px] justify-items-center gap-6 rounded-xl bg-white p-8 [box-shadow:4px_2px_16px_rgba(82,82,82,0.1)]">
        <CheckCircle weight="fill" size={64} className="text-secondary" />

        <div className="grid gap-1 text-center">
          <h1 className="text-[24px] font-extrabold leading-[120%] text-black">
            Email Terverifikasi
          </h1>
          <p className="text-sm font-medium leading-[170%] text-gray">
            Email anda berhasil diverifikasi
          </p>
        </div>

        <Button
          variant="solid"
          color="secondary"
          onClick={() => router.push("/dashboard")}
          className="w-full font-bold"
        >
          Kembali ke Dashboard
        </Button>
      </div>
    </main>
  );
}
