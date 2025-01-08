import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { customInputClassnames } from "@/utils/customInputClassnames";
import { Button, Chip, Input } from "@nextui-org/react";
import { Images, MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PharmacyEntranceClassPage() {
  const router = useRouter();

  return (
    <>
      <Layout title="Kelas Masuk Apoteker">
        <section className="mx-auto grid max-w-[600px] items-center gap-8 lg:max-w-[700px] xl:max-w-none">
          <div className="grid max-w-[850px] gap-[10px]">
            <h1 className="text-[48px] font-black capitalize leading-[110%] -tracking-wide text-black">
              Kelas Masuk Apoteker
            </h1>
            <p className="font-medium leading-[170%] text-gray">
              Bersiaplah menghadapi seleksi masuk program profesi apoteker. Kami
              menyediakan program khusus yang disesuaikan dengan kampus pilihan
              kamu, dan kelas ini pula dirancang untuk membantu kamu memahami
              materi seleksi secara mendalam dan terarah.
            </p>
          </div>

          <Button
            color="secondary"
            as={Link}
            href="#list-class"
            className="w-max px-16 font-bold"
          >
            Pilih Kelas
          </Button>
        </section>

        <section
          id="list-class"
          className="mx-auto grid max-w-[600px] gap-4 [padding:110px_0_100px] lg:max-w-[700px] xl:max-w-none"
        >
          <h2 className="text-center text-[32px] font-black capitalize leading-[120%] -tracking-wide text-black xl:text-left">
            Daftar Kelas per Universitas
          </h2>

          <Input
            type="text"
            variant="flat"
            labelPlacement="outside"
            placeholder="Cari Kelas per Kampus..."
            startContent={
              <MagnifyingGlass weight="bold" size={18} className="text-gray" />
            }
            classNames={customInputClassnames}
            className="max-w-[500px] pt-2"
          />

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="group relative grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
              >
                <Chip
                  color="danger"
                  className="absolute right-8 top-8 z-10"
                  classNames={{
                    content: "font-bold px-4",
                  }}
                >
                  Baru
                </Chip>

                <div className="flex aspect-square size-full items-center justify-center rounded-xl bg-purple object-cover object-center group-hover:grayscale-[0.5]">
                  <Images weight="bold" size={64} className="text-white/50" />
                </div>

                <div className="grid gap-8">
                  <h1 className="line-clamp-2 text-lg font-black leading-[120%] text-black group-hover:text-purple">
                    Kelas Masuk Apoteker Universitas Pancasila
                  </h1>

                  <Button
                    variant="flat"
                    color="secondary"
                    onClick={() => router.push("/kelas-masuk-apoteker/slug")}
                    className="font-bold"
                  >
                    Detail Kelas
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}
