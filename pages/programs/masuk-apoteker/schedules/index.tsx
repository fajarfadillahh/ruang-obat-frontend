import CardSchedule from "@/components/card/CardSchedule";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/footer/Footer";
import SearchInput from "@/components/SearchInput";
import Layout from "@/components/wrapper/Layout";
import { getUrl } from "@/lib/getUrl";
import { EventTestApotekerclass } from "@/types/event.type";
import { SuccessResponse } from "@/types/global.type";
import { getStatusEvent } from "@/utils/getStatusEvent";
import { Pagination, Select, SelectItem, Skeleton } from "@nextui-org/react";
import { Funnel } from "@phosphor-icons/react";
import { useQueryState } from "nuqs";
import { useRef } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

export interface DataResposnse {
  events: EventTestApotekerclass[];
  page: number;
  total_events: number;
  total_pages: number;
}

export default function TestSchedulesPage() {
  const [page, setPage] = useQueryState("page", { defaultValue: "" });
  const [sort, setSort] = useQueryState("sort", { defaultValue: "" });
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
  const [searchValue] = useDebounce(search, 800);

  const divRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading } = useSWR<SuccessResponse<DataResposnse>>({
    url: getUrl("/events", { q: searchValue, page, sort }),
    method: "GET",
  });

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
            <div className="flex flex-wrap items-center justify-between gap-2 lg:gap-4">
              <SearchInput
                placeholder="Cari Jadwal..."
                onClear={() => setSearch("")}
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value)}
              />

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
                  value: "font-semibold text-gray",
                }}
              >
                <SelectItem key="title.asc">A-Z</SelectItem>
                <SelectItem key="title.desc">Z-A</SelectItem>
                <SelectItem key="created_at.desc">Terbaru</SelectItem>
                <SelectItem key="created_at.asc">Terlama</SelectItem>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
              {isLoading ? (
                Array.from({ length: data?.data.events.length || 8 }).map(
                  (_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[300px] w-full rounded-xl"
                    />
                  ),
                )
              ) : data?.data.events.length ? (
                data.data.events.map((event, index) => {
                  const rawDate = event?.registration_date ?? "";
                  const [startStr, endStr] = rawDate.split(" - ");

                  const startDate = startStr ? new Date(startStr) : null;
                  const endDate = endStr ? new Date(endStr) : null;

                  const status =
                    startDate && endDate
                      ? getStatusEvent(startDate, endDate)
                      : null;

                  return (
                    <CardSchedule
                      key={index}
                      event={event}
                      status={status}
                      startStr={startStr}
                      endStr={endStr}
                    />
                  );
                })
              ) : (
                <div className="col-span-4 flex items-center justify-center rounded-xl border-2 border-dashed border-gray/20">
                  <EmptyData text="Jadwal Tidak Ditemukan!" />
                </div>
              )}
            </div>
          </div>

          {!isLoading && data?.data.events.length ? (
            <Pagination
              isCompact
              showControls
              page={data.data.page as number}
              total={data.data.total_pages as number}
              onChange={(e) => {
                setPage(`${e}`);
                divRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="justify-self-center"
              classNames={{
                cursor: "bg-purple text-white",
              }}
            />
          ) : null}
        </section>
      </Layout>

      <Footer />
    </>
  );
}
