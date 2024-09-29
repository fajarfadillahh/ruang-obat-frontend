import { programs } from "@/_dummy/programs";
import CardProgram from "@/components/card/CardProgram";
import Layout from "@/components/wrapper/Layout";
import { formatDayWithoutTime } from "@/utils/formatDate";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [time, setTime] = useState(new Date());
  const [client, setClient] = useState(false);
  const formatTime = (num: any) => String(num).padStart(2, "0");

  useEffect(() => {
    setClient(true);

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!client) {
    return;
  }

  return (
    <Layout title="Pilih Program Yang Sesuai Dengan Kebutuhan Anda">
      <section className="mx-auto grid gap-6 md:max-w-[770px] xl:max-w-none">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-end sm:gap-2">
          <h1 className="text-[24px] font-extrabold -tracking-wide text-black">
            Daftar Program 📋
          </h1>

          <p className="text-sm font-semibold text-black">
            {formatDayWithoutTime(new Date())}{" "}
            {`${formatTime(time.getHours())}:${formatTime(time.getMinutes())}`}
          </p>
        </div>

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
              placeholder="Filter"
              startContent={
                <Funnel weight="bold" size={18} className="text-black" />
              }
              labelPlacement="outside"
              classNames={{
                base: "w-[200px]",
                value: "font-semibold text-black",
              }}
            >
              <SelectItem key="free">Gratis</SelectItem>
              <SelectItem key="paid">Berbayar</SelectItem>
            </Select>
          </div>

          <div className="grid items-start justify-center gap-2 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {programs.map((program) => (
              <CardProgram key={program.id} {...program} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
