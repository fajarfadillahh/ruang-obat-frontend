import { ProgramsType } from "@/types/programs.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Chip, Tooltip } from "@nextui-org/react";
import {
  BookBookmark,
  ClipboardText,
  SealCheck,
  Tag,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function CardProgram(program: ProgramsType) {
  return (
    <Link
      href={`/programs/${program.program_id}`}
      className="group relative flex items-start gap-4 rounded-xl border-2 border-gray/10 p-6 hover:bg-purple/10"
    >
      <BookBookmark weight="duotone" size={32} className="text-purple" />

      <div className="flex-1 divide-y-2 divide-dashed divide-gray/20">
        <h4 className="line-clamp-2 pb-4 text-lg font-bold -tracking-wide text-black group-hover:text-purple">
          {program.title}
        </h4>

        <div className="flex items-start justify-between gap-2 pt-4">
          <div className="grid gap-1">
            <span className="text-xs font-medium text-gray">
              Harga Program:
            </span>

            {program.type === "free" ? (
              <Chip
                variant="flat"
                size="sm"
                color="default"
                startContent={<Tag weight="duotone" size={16} />}
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

          <div className="grid gap-1">
            <span className="text-xs font-medium text-gray">Jumlah Ujian:</span>

            <div className="flex items-center gap-1">
              <ClipboardText weight="duotone" size={16} />

              <p className="text-sm font-semibold text-black">
                {program.total_tests} Ujian
              </p>
            </div>
          </div>
        </div>
      </div>

      {program.is_approved && (
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
      )}
    </Link>
  );
}
