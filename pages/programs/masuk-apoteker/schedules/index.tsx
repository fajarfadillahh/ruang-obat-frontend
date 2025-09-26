import CardSchedule from "@/components/card/CardSchedule";
import Footer from "@/components/footer/Footer";
import SearchInput from "@/components/SearchInput";
import Layout from "@/components/wrapper/Layout";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { Funnel } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";

export default function TestSchedulesPage() {
  const router = useRouter();
  const [page, setPage] = useQueryState("page", { defaultValue: "" });
  const [sort, setSort] = useQueryState("sort", { defaultValue: "" });
  const [filter, setFilter] = useQueryState("filter", { defaultValue: "" });

  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
  const [searchValue] = useDebounce(search, 800);

  const months = Array.from({ length: 12 }, (_, index) =>
    new Date(0, index).toLocaleString("id-ID", { month: "long" }),
  );

  return (
    <>
      <Layout
        title="Jadwal Ujian Masuk Apoteker Terbaru & Lengkap"
        description="Temukan jadwal ujian masuk apoteker terkini beserta detail penting. Persiapkan diri dengan informasi akurat dan panduan seleksi lengkap."
      >
        <section className="base-container gap-1 py-[50px]">
          <h1 className="text-2xl font-black -tracking-wide text-black md:text-4xl">
            Jadwal Ujian Masuk Apoteker<span className="text-purple">.</span>
          </h1>

          <p className="max-w-[600px] font-medium leading-[170%] text-gray">
            Temukan jadwal ujian masuk apoteker terkini beserta detail penting
            lainnya.
          </p>
        </section>

        <section className="base-container gap-8 pb-[100px]">
          <div className="grid gap-4">
            <div className="flex flex-wrap items-center gap-2 lg:gap-4">
              <SearchInput
                placeholder="Cari Jadwal..."
                onClear={() => setSearch("")}
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="inline-flex flex-1 items-center justify-end gap-4">
                <Select
                  aria-label="filter"
                  size="md"
                  variant="flat"
                  startContent={
                    <Funnel weight="duotone" size={18} className="text-gray" />
                  }
                  placeholder="Filter"
                  selectedKeys={[filter]}
                  onChange={(e) => setFilter(e.target.value)}
                  className="max-w-[180px] text-gray"
                  classNames={{
                    value: "font-semibold text-gray",
                  }}
                >
                  {months.map((month, index) => (
                    <SelectItem key={month.toLowerCase()} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  aria-label="sort"
                  size="md"
                  variant="flat"
                  startContent={
                    <Funnel weight="duotone" size={18} className="text-gray" />
                  }
                  placeholder="Sort"
                  selectedKeys={[sort]}
                  onChange={(e) => setSort(e.target.value)}
                  className="max-w-[180px] text-gray"
                  classNames={{
                    value: "font-semibold text-gray capitalize",
                    listbox: "capitalize",
                  }}
                >
                  <SelectItem key="title.asc">A-Z</SelectItem>
                  <SelectItem key="title.desc">Z-A</SelectItem>
                  <SelectItem key="created_at.desc">Terbaru</SelectItem>
                  <SelectItem key="created_at.asc">Terlama</SelectItem>
                  <SelectItem key="status.Belum dibuka">
                    Belum dibuka
                  </SelectItem>
                  <SelectItem key="status.Dibuka">Dibuka</SelectItem>
                  <SelectItem key="status.Ditutup">Ditutup</SelectItem>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <CardSchedule key={index} />
              ))}
            </div>
          </div>

          <Pagination
            isCompact
            showControls
            page={1}
            total={4}
            onChange={(e) => setPage(`${e}`)}
            className="justify-self-center"
            classNames={{
              cursor: "bg-purple text-white",
            }}
          />
        </section>
      </Layout>

      <Footer />
    </>
  );
}
