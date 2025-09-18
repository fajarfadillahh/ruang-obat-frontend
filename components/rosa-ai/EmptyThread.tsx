import { ChatsCircle, IconContext, LockKey } from "@phosphor-icons/react";

type EmptyThreadProps = {
  type: "authenticated" | "unauthenticated";
};

export default function EmptyThread({ type }: EmptyThreadProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-8">
      <IconContext.Provider
        value={{
          weight: "duotone",
          size: 32,
          className: "text-purple",
        }}
      >
        <div className="rounded-full bg-purple/10 p-6">
          {type === "authenticated" ? <ChatsCircle /> : <LockKey />}
        </div>
      </IconContext.Provider>

      <div className="grid gap-1 text-center">
        <h3 className="font-bold text-black">
          {type === "authenticated" ? "Belum Ada Riwayat" : "Terkunci"}
        </h3>

        <p className="text-xs font-medium leading-[170%] text-gray">
          {type === "authenticated"
            ? "Ayo mulai percakapan baru dengan ROSA"
            : "Silakan login atau daftar untuk memulai percakapan"}
        </p>
      </div>
    </div>
  );
}
