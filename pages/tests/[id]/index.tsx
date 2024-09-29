import ButtonBack from "@/components/button/ButtonBack";
import Layout from "@/components/wrapper/Layout";
import { Button, Chip } from "@nextui-org/react";
import { ArrowRight, ClockCountdown } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function DetailsTest() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title={`Tryout Internal Ruangobat Part 1`}>
      <section className="grid gap-8">
        <ButtonBack />

        <div className="grid items-end justify-center gap-10 lg:grid-cols-[1fr_300px] lg:justify-between lg:gap-4">
          <div className="grid max-w-[750px] divide-y-2 divide-dashed divide-gray/20">
            <div className="grid gap-4 pb-8">
              <h4 className="text-[28px] font-bold capitalize leading-[120%] -tracking-wide text-black">
                Tryout Internal Ruangobat Part 1
              </h4>
              <p className="font-medium leading-[170%] text-gray">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deleniti doloremque commodi corrupti doloribus voluptatem in
                voluptates voluptate vel a amet maxime nam natus libero nisi
                quo, ratione cumque eaque assumenda!
              </p>
            </div>

            <div className="grid gap-4 pt-8 xs:grid-cols-2 sm:grid-cols-3 md:flex md:items-start md:justify-between">
              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray">
                  Tanggal Mulai:
                </span>
                <h1 className="font-semibold text-black">
                  5 Agustus 2024 10:00
                </h1>
              </div>

              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray">
                  Tanggal Selesai:
                </span>
                <h1 className="font-semibold text-black">
                  10 Agustus 2024 23:59
                </h1>
              </div>

              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray">
                  Durasi Pengerjaan:
                </span>
                <h1 className="font-semibold text-black">200 Menit</h1>
              </div>

              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray">
                  Jumlah Soal:
                </span>
                <h1 className="font-semibold text-black">100 Butir</h1>
              </div>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="grid gap-1">
              <span className="text-sm font-medium text-gray">
                Status Ujian:
              </span>

              <Chip
                variant="flat"
                color="default"
                startContent={<ClockCountdown weight="bold" size={18} />}
                classNames={{
                  base: "px-3 gap-1",
                  content: "font-semibold",
                }}
              >
                Belum Dimulai
              </Chip>
            </div>

            <Button
              variant="solid"
              color="secondary"
              endContent={<ArrowRight weight="bold" size={18} />}
              onClick={() => {
                document.documentElement.requestFullscreen();
                router.push(`/tests/${id}/start?number=1`);
              }}
              className="px-4 font-bold"
            >
              Mulai Ujian
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
