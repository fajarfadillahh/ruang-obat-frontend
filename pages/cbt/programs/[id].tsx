import ButtonBack from "@/components/button/ButtonBack";
import CardTest from "@/components/cbt/card/CardTest";
import CbtLayout from "@/components/layout/cbt/CbtLayout";
import { Button, Chip } from "@nextui-org/react";
import { BookBookmark, Tag } from "@phosphor-icons/react";

export default function DetailsProgram() {
  return (
    <CbtLayout title="Details Program Page">
      <section className="grid gap-8 pt-8">
        <ButtonBack />

        <div className="divide-gray/20 grid gap-6 divide-y-2 divide-dashed">
          <div className="flex items-start gap-6 pb-2">
            <BookBookmark weight="bold" size={56} className="text-purple" />

            <div className="grid gap-6">
              <h4 className="max-w-[700px] text-[28px] font-bold leading-[120%] -tracking-wide text-black">
                Kelas Ruangobat Tatap Muka: Mandiri Agustus 2024
              </h4>

              <div className="flex items-start gap-12">
                <Chip
                  variant="flat"
                  color="default"
                  startContent={<Tag weight="bold" size={18} />}
                  classNames={{
                    base: "px-4 gap-1",
                    content: "font-bold",
                  }}
                >
                  Program Gratis
                </Chip>

                <Button
                  variant="solid"
                  color="secondary"
                  className="px-12 font-bold"
                >
                  Ikuti Program
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 pt-8">
            <h4 className="text-[20px] font-bold -tracking-wide text-black">
              Daftar Ujian 📋
            </h4>

            <div className="grid gap-4">
              <CardTest />
              <CardTest />
              <CardTest />
            </div>
          </div>
        </div>
      </section>
    </CbtLayout>
  );
}
