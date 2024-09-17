import { tests } from "@/_dummy/tests";
import ButtonBack from "@/components/button/ButtonBack";
import CardTest from "@/components/card/CardTest";
import Layout from "@/components/wrapper/Layout";
import { Button, Chip } from "@nextui-org/react";
import { BookBookmark, Tag } from "@phosphor-icons/react";

export default function DetailsProgram() {
  return (
    <Layout title="Details Program Page">
      <section className="grid gap-8 pt-8">
        <ButtonBack />

        <div className="grid divide-y-2 divide-dashed divide-gray/20">
          <div className="flex items-start gap-6 pb-8">
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
              {tests.map((test) => (
                <CardTest key={test.id} {...test} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
