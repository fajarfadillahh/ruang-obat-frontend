import { ProgramsType } from "@/types/programs.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Chip, Tooltip } from "@nextui-org/react";
import {
  BookBookmark,
  ClipboardText,
  SealCheck,
  Tag,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function CardProgram(program: ProgramsType) {
  const router = useRouter();
  const isMyProgramsPage = router.pathname === "/my/programs";

  return (
    <div
      onClick={(e) => {
        if (!isMyProgramsPage) {
          router.push(`/programs/${program.program_id}`);
        }

        if (isMyProgramsPage && program.is_active) {
          router.push(`/programs/${program.program_id}`);
        } else {
          e.preventDefault();
        }
      }}
      className={`group relative isolate flex items-start gap-4 rounded-xl border-2 p-6 ${
        isMyProgramsPage && !program.is_active
          ? "border-danger/10 bg-danger/20 hover:cursor-not-allowed hover:bg-danger/30"
          : "border-gray/10 hover:cursor-pointer hover:bg-purple/10"
      } `}
    >
      {/* is_active bubble */}
      {isMyProgramsPage && !program.is_active ? (
        <div className="absolute bottom-0 left-0 z-10 w-full rounded-[10px] bg-danger text-center text-xs font-semibold text-white [padding:1rem_0.5rem]">
          Program sudah tidak aktif!
        </div>
      ) : null}

      <BookBookmark
        weight="duotone"
        size={32}
        className={`${isMyProgramsPage && !program.is_active ? "text-danger" : "text-purple"}`}
      />

      <div className="flex-1 divide-y-2 divide-dashed divide-gray/20">
        <div className="pb-4">
          <h4
            className={`line-clamp-2 text-lg font-bold -tracking-wide ${
              isMyProgramsPage && !program.is_active
                ? "text-danger"
                : "text-black group-hover:text-purple"
            }`}
          >
            {program.title}
          </h4>
        </div>

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
              <div
                className={`text-sm font-bold ${
                  isMyProgramsPage && !program.is_active
                    ? "text-danger"
                    : "text-purple"
                }`}
              >
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
    </div>
  );
}
