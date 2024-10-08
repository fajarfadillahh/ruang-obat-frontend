import { ProgramsType } from "@/types/programs.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Chip, Tooltip } from "@nextui-org/react";
import {
  BookBookmark,
  Notepad,
  SealCheck,
  Tag,
  Users,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function CardProgram(program: ProgramsType) {
  return (
    <Link
      href={`/programs/${program.program_id}`}
      className="group relative flex max-w-[380px] items-start gap-4 rounded-xl border-2 border-gray/20 bg-transparent p-6 hover:cursor-pointer hover:bg-gray/10 xl:max-w-none"
    >
      <BookBookmark weight="bold" size={32} className="text-purple" />

      <div className="flex-1 divide-y-2 divide-dashed divide-gray/20">
        <div className="grid gap-3 pb-4">
          <h4 className="line-clamp-2 text-[18px] font-bold leading-[120%] -tracking-wide text-black group-hover:text-purple">
            {program.title}
          </h4>

          {program.type === "free" ? (
            <Chip
              variant="flat"
              size="sm"
              color="default"
              startContent={<Tag weight="bold" size={14} />}
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

        <div className="flex items-center justify-between gap-2 pt-4">
          <div className="inline-flex items-center gap-1 text-gray">
            <Notepad weight="bold" size={14} />
            <p className="text-[12px] font-semibold">
              {program.total_tests} Ujian
            </p>
          </div>

          <div className="inline-flex items-center gap-1 text-gray">
            <Users weight="bold" size={14} />
            <p className="text-[12px] font-semibold">
              {program.total_users} Mahasiswa/i
            </p>
          </div>
        </div>
      </div>

      {program.participated ? (
        <Tooltip
          content="Program Telah DiIkuti"
          classNames={{
            content: "max-w-[350px] font-semibold text-black",
          }}
        >
          <SealCheck
            weight="fill"
            size={24}
            className="absolute right-4 top-4 text-success"
          />
        </Tooltip>
      ) : null}
    </Link>
  );
}
