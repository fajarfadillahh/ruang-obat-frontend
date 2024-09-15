import CardProgram from "@/components/cbt/card/CardProgram";
import CbtLayout from "@/components/layout/cbt/CbtLayout";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function DashboardPage() {
  const filterPrograms = [
    { key: "free", label: "Gratis" },
    { key: "paid", label: "Berbayar" },
  ];

  return (
    <CbtLayout title="Dashboard Page">
      <section className="grid gap-6 pt-8">
        <h1 className="text-[24px] font-extrabold -tracking-wide text-black">
          Daftar Program 📋
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
            />

            <Select
              aria-label="filter program"
              variant="flat"
              items={filterPrograms}
              placeholder="Filter Program"
              labelPlacement="outside"
              classNames={{
                base: "w-[200px]",
                value: "font-semibold text-black",
              }}
            >
              {(program) => (
                <SelectItem key={program.key}>{program.label}</SelectItem>
              )}
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <CardProgram />
            <CardProgram />
            <CardProgram />
          </div>
        </div>
      </section>
    </CbtLayout>
  );
}
