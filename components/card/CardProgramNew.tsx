import { ProgramsType } from "@/types/programs.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Chip, Tooltip } from "@nextui-org/react";
import {
  BookOpenText,
  ClipboardText,
  SealCheck,
  Tag,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function CardProgram(program: ProgramsType) {
  const router = useRouter();
  const isMyProgramsPage = router.pathname === "/my/programs";
  const isDisabled = isMyProgramsPage && !program.is_active;

  return (
    <div
      onClick={(e) => {
        if (!isMyProgramsPage) {
          router.push(`/programs/osce-ukmppai/${program.program_id}`);
        }
        if (isMyProgramsPage && program.is_active) {
          router.push(`/programs/osce-ukmppai/${program.program_id}`);
        } else {
          e.preventDefault();
        }
      }}
      className={`group relative rounded-2xl p-5 transition-all duration-300 ${
        isDisabled
          ? "cursor-not-allowed border border-danger/20 bg-danger/10"
          : "cursor-pointer border border-gray/15 hover:border-purple/20 hover:bg-purple/10 hover:shadow-sm"
      }`}
    >
      {program.is_approved && (
        <Tooltip content="Program Telah Diikuti">
          <SealCheck
            weight="fill"
            size={22}
            className="absolute right-4 top-4 text-success"
          />
        </Tooltip>
      )}

      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isDisabled ? "bg-danger/20" : "bg-purple/10"
          }`}
        >
          <BookOpenText
            weight="duotone"
            size={22}
            className={isDisabled ? "text-danger" : "text-purple"}
          />
        </div>

        <h3
          className={`line-clamp-2 min-w-0 flex-1 text-base font-bold -tracking-wide ${
            isDisabled ? "text-danger" : "text-black group-hover:text-purple"
          }`}
        >
          {program.title}
        </h3>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          {program.type === "free" ? (
            <Chip
              size="sm"
              variant="flat"
              startContent={<Tag size={14} />}
              classNames={{
                base: "px-2 gap-1",
                content: "font-bold capitalize",
              }}
              className="bg-pink-200 text-pink-800"
            >
              FREE
            </Chip>
          ) : (
            <>
              <span className="text-xs text-gray">Harga</span>
              <span
                className={`text-sm font-semibold ${
                  isDisabled ? "text-danger" : "text-purple"
                }`}
              >
                {formatRupiah(program.price)}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm text-black">
          <ClipboardText size={16} />
          <span className="font-medium">{program.total_tests} Ujian</span>
        </div>
      </div>

      {isDisabled && (
        <div className="mt-4 rounded-lg bg-danger py-2 text-center text-xs font-semibold text-white">
          Program sudah tidak aktif
        </div>
      )}
    </div>
  );
}
