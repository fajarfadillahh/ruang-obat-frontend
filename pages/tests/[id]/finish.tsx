import Layout from "@/components/wrapper/Layout";
import {
  Accordion,
  AccordionItem,
  Button,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { ArrowDown, ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ResultTest() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title="Hasil Ujian">
      <section className="grid gap-8">
        <Button
          variant="light"
          startContent={<ArrowLeft weight="bold" size={16} />}
          onClick={() => (window.location.href = `/tests/${id}`)}
          className="w-max px-4 font-bold text-black"
        >
          Kembali Ke Halaman Detail
        </Button>

        <div className="grid grid-cols-[260px_1fr_260px] items-start gap-4">
          <div className="h-[550px] rounded-xl border-2 border-gray/20 p-6">
            <div className="grid divide-y-2 divide-dashed divide-gray/20">
              <div className="grid gap-4 pb-8">
                <h4 className="text-sm font-semibold text-black">
                  Keterangan Warna:
                </h4>

                <div className="grid gap-2">
                  <div className="inline-flex items-center gap-2">
                    <div className="size-6 rounded-full bg-success" />
                    <p className="text-[12px] font-semibold text-black">
                      Jawaban Benar
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <div className="size-6 rounded-full bg-danger" />
                    <p className="text-[12px] font-semibold text-black">
                      Jawaban Salah
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 overflow-hidden pt-8">
                <h4 className="text-sm font-semibold text-black">
                  Daftar Pertanyaan:
                </h4>

                <div className="grid h-full max-h-[230px] grid-cols-5 justify-items-center gap-2 overflow-y-scroll scrollbar-hide">
                  {Array.from({ length: 100 }, (_, i) => {
                    const randomAnswer = Math.floor(Math.random() * 3);
                    let answerClass = "";

                    if (randomAnswer === 0) {
                      answerClass = "bg-danger text-white";
                    } else {
                      answerClass = "bg-success text-white";
                    }

                    return (
                      <Link
                        key={i}
                        href={`/tests/${id}/finish?number=${i + 1}`}
                        className={`inline-flex size-[34px] items-center justify-center rounded-lg text-[12px] font-bold ${answerClass}`}
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
          </div>

          <div className="h-[550px] overflow-y-scroll rounded-xl border-2 border-gray/20">
            <div className="sticky left-0 top-0 bg-white p-6 text-[18px] font-extrabold text-purple">
              No. 1
            </div>

            <div className="grid gap-6 overflow-hidden p-[0_1.5rem_1.5rem]">
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
                defaultValue="fase-s"
                classNames={{
                  base: "font-semibold text-black",
                }}
              >
                <Radio
                  isDisabled={false}
                  value="fase-s"
                  color="success"
                  classNames={{
                    label: "text-success font-extrabold",
                  }}
                >
                  Fase S
                </Radio>
                <Radio
                  isDisabled={true}
                  value="fase-g1"
                  color="danger"
                  classNames={{
                    label: "text-danger",
                  }}
                >
                  Fase G1
                </Radio>
                <Radio
                  isDisabled={true}
                  value="fase-g2"
                  color="danger"
                  classNames={{
                    label: "text-danger",
                  }}
                >
                  Fase G2
                </Radio>
                <Radio
                  isDisabled={true}
                  value="fase-m"
                  color="danger"
                  classNames={{
                    label: "text-danger",
                  }}
                >
                  Fase M
                </Radio>
                <Radio
                  isDisabled={true}
                  value="fase-non-spesifik"
                  color="danger"
                  classNames={{
                    label: "text-danger",
                  }}
                >
                  Fase non-spesifik
                </Radio>
              </RadioGroup>

              <Accordion variant="bordered">
                <AccordionItem
                  aria-label="accordion answer"
                  key="answer"
                  title="Penjelasan:"
                  classNames={{
                    title: "font-semibold text-black",
                    content: "font-medium text-black leading-[170%] pb-4",
                  }}
                >
                  Hidroksiurea bekerja pada fase S dari siklus sel. Pada fase S,
                  sel melakukan replikasi atau duplikasi DNA sebelum masuk ke
                  tahap pembelahan. Dengan menghambat sintesis DNA pada fase
                  ini, Hidroksiurea mencegah sel kanker untuk berkembang biak,
                  sehingga memperlambat atau menghentikan pertumbuhannya.
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="h-[550px] rounded-xl border-2 border-gray/20 p-6">
            <div className="grid gap-8">
              <h4 className="text-[18px] font-bold text-black">Hasil Ujian:</h4>

              <div className="grid divide-y-2 divide-dashed divide-gray/20">
                <div className="grid gap-1 pb-8">
                  <p className="text-[14px] font-medium text-gray">
                    Nilai Anda
                  </p>
                  <h4 className="text-[36px] font-extrabold text-black">
                    🏆 80
                  </h4>
                </div>

                <div className="grid gap-6 pt-8">
                  <div className="grid gap-1">
                    <p className="text-[14px] font-medium text-gray">
                      Jawaban Benar
                    </p>
                    <h4 className="text-[24px] font-extrabold text-black">
                      ✅ 80
                    </h4>
                  </div>

                  <div className="grid gap-1">
                    <p className="text-[14px] font-medium text-gray">
                      Jawaban Salah
                    </p>
                    <h4 className="text-[24px] font-extrabold text-black">
                      ❌ 20
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
