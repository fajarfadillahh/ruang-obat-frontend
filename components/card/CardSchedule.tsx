import { Chip } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CardSchedule() {
  const router = useRouter();

  return (
    <article
      className="group relative isolate grid overflow-hidden rounded-xl border-2 border-purple/10 hover:cursor-pointer hover:border-purple hover:bg-purple/10"
      onClick={() =>
        router.push(`/programs/masuk-apoteker/schedules/${crypto.randomUUID()}`)
      }
    >
      <Chip
        size="sm"
        color="default"
        className="absolute right-4 top-4 z-10"
        classNames={{
          base: "px-2 gap-1",
          content: "font-bold capitalize",
        }}
      >
        Belum dibuka
      </Chip>

      <div className="relative isolate flex aspect-video items-center justify-center overflow-hidden">
        <Image
          src="https://ruangobat.is3.cloudhost.id/statics/images/ruangobat-logo/default-thumbnail.png"
          alt="default img"
          width={500}
          height={500}
          className="size-full object-cover object-center transition-all group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="grid gap-4 rounded-b-xl p-4">
        <h2 className="line-clamp-2 text-lg font-extrabold text-black">
          Ujian Masuk Apoteker Universitas Pancasila
        </h2>

        <div className="grid gap-3">
          {[
            ["Tanggal Pendaftaran", `29 Agustus 2025 - 10 Oktoker 2025`],
            ["Tanggal Ujian", "15 Oktoker 2025"],
          ].map(([label, value], index) => (
            <div key={index} className="grid gap-1">
              <span className="text-xs font-medium text-gray">{label}:</span>
              <h3 className="text-sm font-bold text-black">{value}</h3>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
