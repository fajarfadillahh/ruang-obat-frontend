import { EventTestApotekerclass } from "@/types/event.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { Chip } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface CardScheduleProps {
  event: EventTestApotekerclass;
  status: string | null;
  startStr: string;
  endStr: string;
}

export default function CardSchedule({
  event,
  status,
  startStr,
  endStr,
}: CardScheduleProps) {
  const router = useRouter();

  return (
    <article
      className="group relative isolate grid overflow-hidden rounded-xl border-2 border-purple/10 hover:cursor-pointer hover:border-purple hover:bg-purple/10"
      onClick={() =>
        router.push(`/programs/masuk-apoteker/schedules/${event.event_id}`)
      }
    >
      <div className="relative isolate flex aspect-video items-center justify-center overflow-hidden">
        <Image
          src={event.img_url}
          alt="thumbnial img"
          width={500}
          height={500}
          className="size-full object-cover object-center transition-all group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="grid gap-4 rounded-b-xl p-4">
        <Chip
          size="sm"
          variant="flat"
          color={
            status === "Dibuka"
              ? "success"
              : status === "Ditutup"
                ? "danger"
                : "default"
          }
          classNames={{
            base: "px-2 gap-1",
            content: "font-bold capitalize",
          }}
        >
          {status}
        </Chip>

        <h2 className="line-clamp-2 font-extrabold leading-[140%] text-black">
          {event.title}
        </h2>

        <div className="grid gap-3">
          {[
            [
              "Tanggal Pendaftaran",
              `${formatDateWithoutTime(startStr)} - ${formatDateWithoutTime(endStr)}`,
            ],
            ["Universitas", event.university_name],
          ].map(([key, value], index) => (
            <div key={index} className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray">{key}:</span>
              <h2 className="text-sm font-bold text-black">{value}</h2>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
