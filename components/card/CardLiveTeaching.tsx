import { Button, Chip } from "@nextui-org/react";
import { CalendarDots, Play } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";

type CardLiveTeachingProps = {
  livestream?: string;
};

export default function CardLiveTeaching({
  livestream,
}: CardLiveTeachingProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(livestream as string)}
      className="group relative isolate grid overflow-hidden rounded-xl border-2 border-purple/10 hover:cursor-pointer hover:border-purple hover:bg-purple/10"
    >
      <Chip
        size="sm"
        color="success"
        className="absolute right-4 top-4 z-10"
        classNames={{
          base: "px-2 gap-1",
          content: "font-bold capitalize text-white",
        }}
      >
        selesai
      </Chip>

      <div className="relative isolate flex aspect-video items-center justify-center overflow-hidden">
        <Image
          src="https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/ruangobat-logo/default-thumbnail.png"
          alt="default img"
          width={500}
          height={500}
          className="size-full object-cover object-center transition-all group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute z-10 hidden size-12 items-center justify-center rounded-full bg-white/30 backdrop-blur group-hover:flex">
          <Play weight="fill" size={26} className="text-white" />
        </div>
      </div>

      <div className="grid gap-4 rounded-b-xl p-4">
        <h3 className="line-clamp-2 text-lg font-extrabold text-black">
          Meet The Expert Explore Your Future: Pengenalan Bidang dan Profesi di
          Dunia Farmasi
        </h3>

        <div className="flex items-start gap-2">
          <CalendarDots weight="duotone" size={24} className="text-purple" />

          <div className="grid text-sm">
            <p className="font-bold text-black">Sabtu, 23 Agustus 2025</p>

            <p className="font-medium text-gray">19:00 - 21:00</p>
          </div>
        </div>

        <Button
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            router.push(livestream as string);
          }}
          className="mt-4 font-bold"
        >
          Lihat Ulang
        </Button>
      </div>
    </div>
  );
}
