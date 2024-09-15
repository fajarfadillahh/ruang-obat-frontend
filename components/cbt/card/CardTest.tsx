import { Button, Chip } from "@nextui-org/react";
import { ClipboardText, ClockCountdown } from "@phosphor-icons/react";

export default function CardTest() {
  return (
    <div className="hover:bg-gray/10 border-gray/20 group flex items-center justify-between gap-4 rounded-xl border-2 bg-transparent p-6">
      <div className="inline-flex flex-1 items-start gap-3">
        <ClipboardText weight="bold" size={28} className="text-purple" />

        <div className="grid gap-6">
          <h4 className="group-hover:text-purple line-clamp-2 max-w-[620px] text-[20px] font-bold leading-[120%] -tracking-wide text-black">
            Tryout Internal Ruangobat Part 1
          </h4>

          <div className="inline-flex items-start gap-6">
            <div className="grid gap-[2px]">
              <span className="text-gray text-[12px] font-medium">
                Tanggal Mulai:
              </span>
              <h1 className="text-sm font-bold text-black">
                5 Agustus 2024 10:00
              </h1>
            </div>

            <div className="grid gap-[2px]">
              <span className="text-gray text-[12px] font-medium">
                Tanggal Selesai:
              </span>
              <h1 className="text-sm font-bold text-black">
                10 Agustus 2024 23:59
              </h1>
            </div>

            <div className="grid gap-[2px]">
              <span className="text-gray text-[12px] font-medium">
                Durasi Pengerjaan:
              </span>
              <h1 className="text-sm font-bold text-black">200 Menit</h1>
            </div>

            <div className="grid gap-[2px]">
              <span className="text-gray text-[12px] font-medium">
                Status Program:
              </span>
              <Chip
                variant="flat"
                color="default"
                startContent={<ClockCountdown weight="bold" size={18} />}
                classNames={{
                  base: "px-3 gap-1",
                  content: "font-bold",
                }}
              >
                Belum Dimulai
              </Chip>
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="solid"
        size="sm"
        color="secondary"
        className="px-6 font-bold"
      >
        Lihat Ujian
      </Button>
    </div>
  );
}
