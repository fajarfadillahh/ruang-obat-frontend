import {
  Button,
  Checkbox,
  Chip,
  cn,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CaretDoubleLeft,
  CheckCircle,
} from "@phosphor-icons/react";
import { CaretDoubleRight } from "@phosphor-icons/react/dist/ssr";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function StartTest() {
  const router = useRouter();
  const { id } = router.query;
  const [contentOpen, setContentOpen] = useState<{
    left: boolean;
    right: boolean;
  }>({
    left: false,
    right: false,
  });

  const toggleContentOpen = (id: "left" | "right") => {
    setContentOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const totalTests: number = 100;
  const currentNumber = parseInt(router.query.number as string);

  return (
    <>
      <Head>
        <title>Mulai Ujian | Ruangobat.id</title>
        <meta
          name="description"
          content="Ruangobat adalah platform ujian online yang dirancang khusus untuk mahasiswa farmasi. Dapatkan pengalaman belajar dan ujian yang interaktif dengan berbagai soal terupdate sesuai kurikulum terkini. Uji kemampuan, tingkatkan pemahaman, dan siap menghadapi ujian farmasi dengan percaya diri. Belajar farmasi jadi lebih efektif dan terstruktur hanya di Ruangobat!"
        />
        <meta
          name="keywords"
          content="ruangobat, ruangobat.id, ruangobat ujian, ruangobat ujian online, ruangobat farmasi, ruangobat tryout, ruangobat tes, ujian online farmasi, ujian online ruangobat, platform ujian mahasiswa farmasi, belajar farmasi online, tryout farmasi online, tes farmasi online, latihan soal farmasi, simulasi ujian farmasi, platform belajar farmasi, ujian online farmasi terpercaya"
        />
        <meta property="og:title" content="Mulai Ujian | Ruangobat.id" />
        <meta
          property="og:description"
          content="Ruangobat adalah platform ujian online yang dirancang khusus untuk mahasiswa farmasi. Dapatkan pengalaman belajar dan ujian yang interaktif dengan berbagai soal terupdate sesuai kurikulum terkini. Uji kemampuan, tingkatkan pemahaman, dan siap menghadapi ujian farmasi dengan percaya diri. Belajar farmasi jadi lebih efektif dan terstruktur hanya di Ruangobat!"
        />
      </Head>

      <main className="relative mx-auto h-screen w-full max-w-[1440px] px-6">
        <section className="py-12 xl:grid xl:grid-cols-[260px_1fr_260px] xl:items-start xl:gap-4">
          <div
            className={`fixed top-0 z-50 h-screen w-[260px] rounded-r-xl border-gray/20 bg-white p-6 shadow-[4px_0_8px_rgba(0,0,0,0.1)] transition-all duration-300 xl:static xl:flex xl:h-[600px] xl:rounded-xl xl:border-2 xl:shadow-none ${
              contentOpen.left ? "left-0" : "-left-[260px]"
            }`}
          >
            <div className="grid divide-y-2 divide-dashed divide-gray/20">
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

              <div className="grid gap-4 overflow-hidden pt-8">
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
                            ? "bg-gray/30 text-gray"
                            : "bg-gray/10 text-gray hover:bg-gray/20"
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

            <div className="absolute -right-12 top-8 flex size-12 items-center justify-end rounded-r-full bg-white p-2 shadow-[4px_0_8px_rgba(0,0,0,0.1)] xl:hidden">
              <Button
                isIconOnly
                variant="flat"
                color="secondary"
                size="sm"
                radius="full"
                onClick={() => toggleContentOpen("left")}
                className={`transition-all duration-300 ${contentOpen.left ? "rotate-180" : "rotate-0"}`}
              >
                <CaretDoubleRight weight="bold" size={18} />
              </Button>
            </div>
          </div>

          <div className="mx-auto grid max-w-[748px] gap-6 xl:max-w-none">
            <div className="h-[600px] overflow-y-scroll rounded-xl border-2 border-gray/20">
              <div className="sticky left-0 top-0 bg-white p-6 text-[18px] font-extrabold text-purple">
                No. 1
              </div>

              <div className="grid gap-6 overflow-hidden p-[0_1.5rem_1.5rem]">
                <p className="font-semibold leading-[170%] text-black">
                  Seorang pasien laki-laki berusia 50 tahun datang ke rumah
                  sakit dengan diagnosa kanker prostat. Setelah dilakukan
                  pemeriksaan, pasien direkomendasikan terapi menggunakan
                  Hidroksiurea yang akan dilakukan selama beberapa siklus.
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
                  Kumpulkan Jawaban 🌟
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

          <div
            className={`fixed top-0 z-50 h-screen w-[260px] rounded-r-xl border-gray/20 bg-white p-6 shadow-[-4px_0_8px_rgba(0,0,0,0.1)] transition-all duration-300 xl:static xl:flex xl:h-[600px] xl:rounded-xl xl:border-2 xl:shadow-none ${
              contentOpen.right ? "right-0" : "-right-[260px]"
            }`}
          >
            <div className="grid divide-y-2 divide-dashed divide-gray/20">
              <div className="grid gap-2 pb-8">
                <h4 className="text-sm font-semibold text-black">
                  Data Peserta:
                </h4>

                <div>
                  <h4 className="font-bold -tracking-wide text-purple">
                    Fajar Fadillah Agustian
                  </h4>
                  <p className="text-[12px] font-semibold text-gray">
                    ROUFFA125638
                  </p>
                </div>
              </div>

              <div className="grid py-8">
                <h4 className="text-sm font-semibold text-black">
                  Sisa Waktu:
                </h4>
                <h4 className="text-[28px] font-extrabold -tracking-wide text-purple">
                  01:23:45
                </h4>
              </div>

              <div className="grid gap-4 py-8">
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

              <div className="grid gap-4 pt-8">
                <h4 className="text-sm font-semibold text-black">
                  Status Jaringan:
                </h4>

                <Chip
                  variant="flat"
                  color="success"
                  size="sm"
                  startContent={<CheckCircle weight="fill" size={16} />}
                  classNames={{
                    base: "gap-1 px-2",
                    content: "font-bold",
                  }}
                >
                  Jaringan Bagus
                </Chip>
              </div>
            </div>

            <div className="absolute -left-12 top-8 flex size-12 items-center justify-end rounded-l-full bg-white p-2 shadow-[-4px_0_8px_rgba(0,0,0,0.1)] xl:hidden">
              <Button
                isIconOnly
                variant="flat"
                color="secondary"
                size="sm"
                radius="full"
                onClick={() => toggleContentOpen("right")}
                className={`transition-all duration-300 ${contentOpen.right ? "rotate-180" : "rotate-0"}`}
              >
                <CaretDoubleLeft weight="bold" size={18} />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
