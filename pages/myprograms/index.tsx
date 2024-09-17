import { programs } from "@/_dummy/programs";
import CardProgram from "@/components/card/CardProgram";
import Layout from "@/components/wrapper/Layout";
import { Button, Input } from "@nextui-org/react";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function MyProgramsPage() {
  const router = useRouter();

  return (
    <Layout title="My Programs Page">
      <section className="grid gap-6 pt-8">
        <h1 className="border-l-[6px] border-purple pl-4 text-[24px] font-extrabold -tracking-wide text-black">
          Program Saya 📋
        </h1>

        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <Input
              type="text"
              variant="flat"
              labelPlacement="outside"
              placeholder="Cari Program..."
              startContent={
                <MagnifyingGlass
                  weight="bold"
                  size={18}
                  className="text-gray"
                />
              }
              classNames={{
                input:
                  "font-semibold placeholder:font-semibold placeholder:text-gray",
              }}
              className="max-w-[450px]"
            />

            <Button
              variant="light"
              endContent={<ArrowRight weight="bold" size={16} />}
              onClick={() => router.push("/dashboard")}
              className="w-max px-4 font-bold text-black"
            >
              Lihat Semua Program
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {programs.slice(0, 1).map((program) => (
              <CardProgram key={program.id} {...program} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
