import { formatDateWithoutTime } from "@/utils/formatDate";
import { Button, Chip } from "@nextui-org/react";
import {
  CheckCircle,
  ClipboardText,
  ClockCountdown,
  HourglassLow,
  Lock,
  Prohibit,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function CardTest(test: CardTest) {
  const router = useRouter();

  function getButtonProps(test: CardTest) {
    let isDisabled = false;
    let buttonText: string | JSX.Element = "";

    const lockIcon = <Lock weight="bold" size={18} />;

    if (!test.is_approved || test.status === "Belum dimulai") {
      isDisabled = true;
      buttonText = lockIcon;
    } else if (test.status === "Berlangsung") {
      if (test.remaining_tests > 0) {
        isDisabled = false;
        buttonText = "Lihat Ujian";
      } else {
        isDisabled = false;
        buttonText = "Jawaban Saya";
      }
    } else if (test.status === "Berakhir") {
      if (test.remaining_tests > 0) {
        isDisabled = false;
        buttonText = "Jawaban Saya";
      } else {
        isDisabled = !test.has_result;
        buttonText = test.has_result ? "Jawaban Saya" : "Tidak Mengerjakan";
      }
    }

    return { isDisabled, buttonText };
  }

  return (
    <div
      className={`hover:bg-purple/10" group grid gap-6 rounded-xl border-2 border-purple/10 bg-transparent p-6 hover:border-purple md:grid-cols-[1fr_max-content] md:items-center`}
    >
      <div className="flex flex-1 items-start gap-3">
        {test.is_active ? (
          <ClipboardText weight="bold" size={28} className="text-purple" />
        ) : (
          <Prohibit weight="bold" size={28} className="text-danger" />
        )}

        <div className="grid flex-1 gap-6">
          <h4
            className={`line-clamp-2 max-w-[620px] text-[20px] font-bold leading-[120%] -tracking-wide ${
              test.is_active
                ? "text-black group-hover:text-purple"
                : "text-danger"
            }`}
          >
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
                Sisa Pengerjaan:
              </span>
              <h1 className="text-sm font-semibold text-black">
                {test.remaining_tests === 0
                  ? "-"
                  : `${test.remaining_tests} kali`}
              </h1>
            </div>

            <div className="grid gap-[2px]">
              <span className="text-[12px] font-medium text-gray">
                Status Ujian:
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <Chip
                  variant="flat"
                  color={
                    test.status === "Belum dimulai"
                      ? "danger"
                      : test.status === "Berlangsung"
                        ? "warning"
                        : "success"
                  }
                  size="sm"
                  startContent={
                    test.status === "Belum dimulai" ? (
                      <ClockCountdown weight="bold" size={16} />
                    ) : test.status === "Berlangsung" ? (
                      <HourglassLow weight="fill" size={16} />
                    ) : (
                      <CheckCircle weight="fill" size={16} />
                    )
                  }
                  classNames={{
                    base: "px-2 gap-1",
                    content: "font-semibold capitalize",
                  }}
                >
                  {test.status}
                </Chip>

                {test.has_result && (
                  <Chip
                    variant="flat"
                    color="success"
                    size="sm"
                    startContent={<CheckCircle weight="fill" size={16} />}
                    classNames={{
                      base: "px-2 gap-1",
                      content: "font-semibold capitalize",
                    }}
                  >
                    Sudah Mengerjakan
                  </Chip>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        size="sm"
        color={!test.is_active ? "danger" : "secondary"}
        onClick={() => {
          if (test.status === "Berlangsung") {
            test.remaining_tests > 0
              ? router.push(`/tests/${test.test_id}`)
              : router.push(`/my/tests`);
          } else if (test.status === "Berakhir") {
            test.remaining_tests > 0 || test.has_result
              ? router.push(`/my/tests`)
              : console.log("Kesempatan habis dan tidak ada hasil.");
          } else {
            console.log("Ujian belum dimulai.");
          }
        }}
        className="w-full font-bold md:w-max md:px-6"
        isDisabled={getButtonProps(test).isDisabled}
      >
        {getButtonProps(test).buttonText}
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
  remaining_tests: number;
  result_id: string;
  status: string;
  is_approved: boolean | null;
};
