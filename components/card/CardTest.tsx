import { formatDateWithoutTime } from "@/utils/formatDate";
import { Button, Chip } from "@nextui-org/react";
import { ClipboardText, HourglassLow, Lock } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function CardTest(test: CardTest) {
  const router = useRouter();

  return (
    <div className="group grid gap-6 rounded-xl border-2 border-purple/10 bg-transparent p-6 hover:border-purple hover:bg-purple/10 md:grid-cols-[1fr_max-content] md:items-center">
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
                {formatDateWithoutTime(test.start)}
              </h1>
            </div>

            <div className="grid gap-[2px]">
              <span className="text-[12px] font-medium text-gray">
                Tanggal Selesai:
              </span>
              <h1 className="text-sm font-semibold text-black">
                {formatDateWithoutTime(test.end)}
              </h1>
            </div>

            <div className="grid gap-[2px]">
              <span className="text-[12px] font-medium text-gray">
                Durasi Pengerjaan:
              </span>
              <h1 className="text-sm font-semibold text-black">
                {test.duration} Menit
              </h1>
            </div>

            <div className="grid gap-[2px]">
              <span className="text-[12px] font-medium text-gray">
                Status Ujian:
              </span>

              <Chip
                variant="flat"
                color="warning"
                startContent={<HourglassLow weight="fill" size={18} />}
                classNames={{
                  base: "px-2",
                  content: "font-semibold capitalize",
                }}
              >
                {test.status}
              </Chip>
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="solid"
        size="sm"
        color="secondary"
        onClick={() => router.push(`/tests/${test.test_id}`)}
        className="w-full font-bold md:w-max md:px-6"
        isDisabled={!test.is_approved}
      >
        {!test.is_approved ? <Lock weight="bold" size={18} /> : "Lihat Ujian"}
      </Button>
    </div>
  );
}

type CardTest = {
  test_id: string;
  title: string;
  start: string;
  end: string;
  duration: number;
  is_active: boolean;
  has_result: boolean;
  status: string;
  is_approved: boolean | null;
};
