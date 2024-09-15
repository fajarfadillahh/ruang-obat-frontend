import ButtonBack from "@/components/button/ButtonBack";
import CbtLayout from "@/components/layout/cbt/CbtLayout";
import { Button, Chip } from "@nextui-org/react";
import { ArrowRight, ClockCountdown } from "@phosphor-icons/react";

export default function DetailsTest() {
  return (
    <CbtLayout title="Details Test Page">
      <section className="grid gap-8 pt-8">
        <ButtonBack />

        <div className="grid grid-cols-[1fr_300px] items-end justify-between gap-4">
          <div className="divide-gray/20 grid max-w-[750px] divide-y-2 divide-dashed">
            <div className="grid gap-4 pb-8">
              <h4 className="text-[28px] font-bold capitalize leading-[120%] -tracking-wide text-black">
                Tryout Internal Ruangobat Part 1
              </h4>
              <p className="text-gray font-medium leading-[170%]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deleniti doloremque commodi corrupti doloribus voluptatem in
                voluptates voluptate vel a amet maxime nam natus libero nisi
                quo, ratione cumque eaque assumenda!
              </p>
            </div>

            <div className="flex items-start justify-between gap-4 pt-8">
              <div className="grid gap-1">
                <span className="text-gray text-sm font-medium">
                  Tanggal Mulai:
                </span>
                <h1 className="font-bold text-black">5 Agustus 2024 10:00</h1>
              </div>

              <div className="grid gap-1">
                <span className="text-gray text-sm font-medium">
                  Tanggal Selesai:
                </span>
                <h1 className="font-bold text-black">10 Agustus 2024 23:59</h1>
              </div>

              <div className="grid gap-1">
                <span className="text-gray text-sm font-medium">
                  Durasi Pengerjaan:
                </span>
                <h1 className="font-bold text-black">200 Menit</h1>
              </div>

              <div className="grid gap-1">
                <span className="text-gray text-sm font-medium">
                  Jumlah Soal:
                </span>
                <h1 className="font-bold text-black">100 Butir</h1>
              </div>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="grid gap-1">
              <span className="text-gray text-sm font-medium">
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

            <Button
              variant="solid"
              color="secondary"
              endContent={<ArrowRight weight="bold" size={18} />}
              className="px-4 font-bold"
            >
              Mulai Ujian
            </Button>
          </div>
        </div>
      </section>
    </CbtLayout>
  );
}
