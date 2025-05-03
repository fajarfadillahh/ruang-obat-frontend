import { ProgramsType } from "@/types/programs.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Chip, Tooltip } from "@nextui-org/react";
import {
  BookBookmark,
  ClipboardText,
  Clock,
  SealCheck,
  Tag,
  Users,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function CardProgram(program: ProgramsType) {
  return (
    <Link
      href={`/programs/${program.program_id}`}
      className="group relative flex items-start gap-4 rounded-xl bg-white p-6 ring-2 ring-gray/5 hover:bg-purple/10 hover:ring-purple"
    >
      <BookBookmark weight="duotone" size={32} className="text-purple" />

      <div className="flex-1 divide-y-2 divide-dashed divide-gray/20">
        <div className="grid gap-2 pb-4">
          <h4 className="line-clamp-2 text-lg font-bold -tracking-wide text-black group-hover:text-purple">
            {program.title}
          </h4>

          {program.type === "free" ? (
            <Chip
              variant="flat"
              size="sm"
              color="default"
              startContent={<Tag weight="duotone" size={14} />}
              classNames={{
                base: "px-2 gap-1",
                content: "font-bold capitalize",
              }}
            >
              Gratis
            </Chip>
          ) : (
            <div className="text-sm font-bold text-purple">
              {formatRupiah(program.price)}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="inline-flex items-center gap-1 text-gray">
            <ClipboardText weight="duotone" size={18} />

            <p className="text-sm font-semibold">{program.total_tests} Ujian</p>
          </div>

          <div className="inline-flex items-center gap-1 text-gray">
            <Users weight="duotone" size={18} />

            <p className="text-sm font-semibold">
              {program.total_users} Mahasiswa
            </p>
          </div>
        </div>
      </div>

      {/* badge following & waiting */}
      {program.is_approved == true ? (
        <Tooltip
          content="Program Telah Diikuti"
          classNames={{
            content: "max-w-[350px] font-semibold text-black",
          }}
        >
          <SealCheck
            weight="fill"
            size={24}
            className="absolute right-2 top-2 text-success"
          />
        </Tooltip>
      ) : program.is_approved == false ? (
        <Tooltip
          content="Menunggu Approve"
          classNames={{
            content: "max-w-[350px] font-semibold text-black",
          }}
        >
          <Clock
            weight="fill"
            size={24}
            className="absolute right-2 top-2 text-warning"
          />
        </Tooltip>
      ) : null}
    </Link>
  );
}
