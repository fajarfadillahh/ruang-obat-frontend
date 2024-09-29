import { tests } from "@/_dummy/tests";
import ButtonBack from "@/components/button/ButtonBack";
import CardTest from "@/components/card/CardTest";
import ModalInputAccessKey from "@/components/modal/ModalInputAccessKey";
import Layout from "@/components/wrapper/Layout";
import { Chip } from "@nextui-org/react";
import { BookBookmark, Notepad, Tag, Users } from "@phosphor-icons/react";

export default function DetailsProgram() {
  return (
    <Layout title={`Kelas Ruangobat Tatap Muka: Mandiri Agustus 2024`}>
      <section className="grid gap-8">
        <ButtonBack />

        <div className="grid divide-y-2 divide-dashed divide-gray/20">
          <div className="grid gap-10 pb-8 sm:grid-cols-[1fr_max-content] sm:items-start md:pr-6">
            <div className="flex items-start gap-6">
              <BookBookmark weight="bold" size={48} className="text-purple" />

              <div className="grid flex-1 gap-4">
                <h4 className="max-w-[700px] text-[24px] font-bold leading-[120%] -tracking-wide text-black lg:text-[28px]">
                  Kelas Ruangobat Tatap Muka: Mandiri Agustus 2024
                </h4>

                <div className="flex flex-wrap items-center gap-4 lg:gap-10">
                  <Chip
                    variant="flat"
                    color="default"
                    startContent={<Tag weight="bold" size={18} />}
                    classNames={{
                      base: "px-3 gap-1",
                      content: "font-bold",
                    }}
                  >
                    Gratis
                  </Chip>

                  <div className="inline-flex items-center gap-1 text-gray">
                    <Notepad weight="bold" size={18} />
                    <p className="text-sm font-semibold">9 Modul Ujian</p>
                  </div>

                  <div className="inline-flex items-center gap-1 text-gray">
                    <Users weight="bold" size={18} />
                    <p className="text-sm font-semibold">1.2K Mahasiswa/i</p>
                  </div>
                </div>
              </div>
            </div>

            <ModalInputAccessKey />
          </div>

          <div className="grid gap-4 pt-8">
            <h4 className="text-[20px] font-bold -tracking-wide text-black">
              Daftar Ujian 📋
            </h4>

            <div className="relative grid gap-2">
              {tests.map((test) => (
                <CardTest key={test.id} {...test} />
              ))}

              {/* <div className="absolute left-0 top-0 z-10 h-full w-full rounded-xl bg-black/10 backdrop-blur-sm" /> */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
