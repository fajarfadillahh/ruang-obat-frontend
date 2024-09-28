import { TestsType } from "@/types/tests.type";
import { Button, Chip } from "@nextui-org/react";
import { ClipboardText, ClockCountdown } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function CardTest(test: TestsType) {
  const router = useRouter();

  return (
    <div className="group grid gap-6 rounded-xl border-2 border-gray/20 bg-transparent p-6 hover:bg-gray/10 md:grid-cols-[1fr_max-content] md:items-center">
      <div className="flex flex-1 items-start gap-3">
        <ClipboardText weight="bold" size={28} className="text-purple" />

        <div className="grid flex-1 gap-6">
          <h4 className="line-clamp-2 max-w-[620px] text-[20px] font-bold leading-[120%] -tracking-wide text-black group-hover:text-purple">
            {test.title}
          </h4>

          <div className="grid items-start gap-4 sm:grid-cols-2 md:grid-cols-3 lg:inline-flex lg:gap-6">
            <div className="grid gap-[2px]">
              <span className="text-[12px] font-medium text-gray">
                Tanggal Mulai:
              </span>
              <h1 className="text-sm font-semibold text-black">
                {test.start_test}
              </h1>
            </div>

            <div className="grid gap-[2px]">
              <span className="text-[12px] font-medium text-gray">
                Tanggal Selesai:
              </span>
              <h1 className="text-sm font-semibold text-black">
                {test.end_test}
              </h1>
            </div>

            <div className="grid gap-[2px]">
              <span className="text-[12px] font-medium text-gray">
                Durasi Pengerjaan:
              </span>
              <h1 className="text-sm font-semibold text-black">
                {test.duration_test} Menit
              </h1>
            </div>

            <div className="grid gap-[2px]">
              <span className="text-[12px] font-medium text-gray">
                Status Ujian:
              </span>

              <Chip
                variant="flat"
                color="default"
                startContent={<ClockCountdown weight="bold" size={18} />}
                classNames={{
                  base: "px-3 gap-1",
                  content: "font-semibold capitalize",
                }}
              >
                {test.status_test}
              </Chip>
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="solid"
        size="sm"
        color="secondary"
        onClick={() => router.push(`/tests/${test.id}`)}
        className="w-full font-bold md:w-max md:px-6"
      >
        Lihat Ujian
      </Button>
    </div>
  );
}
