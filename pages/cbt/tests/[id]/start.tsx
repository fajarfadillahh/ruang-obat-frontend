import CbtLayout from "@/components/layout/cbt/CbtLayout";
import { Button, Checkbox, cn, Radio, RadioGroup } from "@nextui-org/react";
import { ArrowDown, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function StartTest() {
  const router = useRouter();
  const { id } = router.query;

  const totalTests: number = 100;
  const currentNumber = parseInt(router.query.number as string);

  return (
    <CbtLayout title="Start Test Page">
      <section className="grid grid-cols-[260px_1fr_260px] items-start gap-4">
        <div className="grid h-[550px] divide-y-2 divide-dashed divide-gray/20 overflow-hidden rounded-xl border-2 border-gray/20 p-6">
          <div className="grid gap-4 pb-8">
            <h4 className="text-sm font-semibold text-black">
              Keterangan Warna:
            </h4>

            <div className="grid gap-2">
              <div className="inline-flex items-center gap-2">
                <div className="size-6 rounded-full bg-purple" />
                <p className="text-[12px] font-semibold text-black">
                  Sudah dijawab
                </p>
              </div>

              <div className="inline-flex items-center gap-2">
                <div className="size-6 rounded-full bg-yellow-500" />
                <p className="text-[12px] font-semibold text-black">
                  Ragu-ragu
                </p>
              </div>

              <div className="inline-flex items-center gap-2">
                <div className="size-6 rounded-full bg-gray/20" />
                <p className="text-[12px] font-semibold text-black">
                  Belum dijawab
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 pt-8">
            <h4 className="text-sm font-semibold text-black">
              Daftar Pertanyaan:
            </h4>

            <div className="grid h-full max-h-[230px] grid-cols-5 justify-items-center gap-2 overflow-y-scroll scrollbar-hide">
              {Array.from({ length: totalTests }, (_, i) => {
                const isActive = currentNumber === i + 1;

                return (
                  <Link
                    key={i}
                    href={`/tests/${id}/start?number=${i + 1}`}
                    className={`inline-flex size-[34px] items-center justify-center rounded-lg text-[12px] font-bold ${
                      isActive
                        ? "bg-purple text-white"
                        : "bg-gray/10 text-gray hover:bg-gray/30"
                    }`}
                  >
                    {i + 1}
                  </Link>
                );
              })}
            </div>

            <div className="inline-flex items-center gap-1 pt-2 italic text-gray/80">
              <p className="text-[10px] font-semibold">Scroll ke bawah</p>
              <ArrowDown
                weight="bold"
                size={10}
                className="animate-bounce italic"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="min-h-[550px] rounded-xl border-2 border-gray/20 p-6">
            <div className="grid gap-6">
              <h4 className="text-[18px] font-extrabold text-purple">No. 1</h4>

              <p className="font-semibold leading-[170%] text-black">
                Seorang pasien laki-laki berusia 50 tahun datang ke rumah sakit
                dengan diagnosa kanker prostat. Setelah dilakukan pemeriksaan,
                pasien direkomendasikan terapi menggunakan Hidroksiurea yang
                akan dilakukan selama beberapa siklus.
                <br />
                <br />
                Pada fase manakah agen tersebut bekerja?
              </p>

              <RadioGroup
                aria-label="select the answer"
                color="secondary"
                classNames={{
                  base: "font-semibold text-black",
                }}
              >
                <Radio value="fase-s">Fase S</Radio>
                <Radio value="fase-g1">Fase G1</Radio>
                <Radio value="fase-g2">Fase G2</Radio>
                <Radio value="fase-m">Fase M</Radio>
                <Radio value="fase-non-spesifik">Fase non-spesifik</Radio>
              </RadioGroup>

              <Checkbox
                color="warning"
                classNames={{
                  base: cn(
                    "inline-flex w-max m-[2px_0_2px_2px] text-black font-semibold",
                    "border-2 border-gray/20 rounded-lg hover:bg-gray/10 px-3",
                    "data-[selected=true]:border-warning data-[selected=true]:bg-warning/20",
                  ),
                }}
              >
                Ragu-ragu
              </Checkbox>
            </div>
          </div>

          <div className="inline-flex items-center gap-4 justify-self-center">
            {currentNumber === totalTests ? (
              <Button
                variant="solid"
                color="secondary"
                onClick={() => {
                  if (confirm("Yakin dengan semua jawabanmu?")) {
                    router.push(`/tests/${id}/finish?number=1`);
                  }
                }}
                className="font-bold"
              >
                Kumpulkan Jawaban 🚀
              </Button>
            ) : (
              <>
                <Button
                  variant="solid"
                  color="default"
                  startContent={<ArrowLeft weight="bold" size={16} />}
                  className="font-bold"
                >
                  Sebelumnya
                </Button>

                <Button
                  variant="solid"
                  color="secondary"
                  endContent={<ArrowRight weight="bold" size={16} />}
                  className="font-bold"
                >
                  Selanjutanya
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="h-[550px] rounded-xl border-2 border-gray/20 p-6">
          <div className="grid divide-y-2 divide-dashed divide-gray/20">
            <div className="grid gap-2 pb-8">
              <h4 className="text-sm font-semibold text-black">
                Data Peserta:
              </h4>

              <div>
                <h4 className="text-[18px] font-bold -tracking-wide text-purple">
                  Fajar Fadillah Agustian
                </h4>
                <p className="text-[12px] font-semibold text-gray">
                  ROUFFA125638
                </p>
              </div>
            </div>

            <div className="grid py-8">
              <h4 className="text-sm font-semibold text-black">Sisa Waktu:</h4>
              <h4 className="text-[38px] font-extrabold -tracking-wide text-purple">
                01:23:45
              </h4>
            </div>

            <div className="grid gap-4 pt-8">
              <h4 className="text-sm font-semibold text-black">
                Penyelesaian Soal:
              </h4>

              <ul className="space-y-1 text-[12px] font-semibold text-black">
                <li className="flex items-center gap-2">
                  <p className="w-[100px]">Jumlah Soal</p>
                  <div>:</div>
                  <p className="font-extrabold text-purple">100</p>
                </li>
                <li className="flex items-center gap-2">
                  <p className="w-[100px]">Sudah dijawab</p>
                  <div>:</div>
                  <p className="font-extrabold text-purple">50</p>
                </li>
                <li className="flex items-center gap-2">
                  <p className="w-[100px]">Ragu-ragu</p>
                  <div>:</div>
                  <p className="font-extrabold text-purple">25</p>
                </li>
                <li className="flex items-center gap-2">
                  <p className="w-[100px]">Belum dijawab</p>
                  <div>:</div>
                  <p className="font-extrabold text-purple">25</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </CbtLayout>
  );
}
