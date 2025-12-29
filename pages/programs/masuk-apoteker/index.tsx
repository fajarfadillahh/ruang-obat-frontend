import CardSchedule from "@/components/card/CardSchedule";
import CTASecondary from "@/components/cta/CTASecondary";
import CustomTooltip from "@/components/CustomTooltip";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/footer/Footer";
import SearchInput from "@/components/SearchInput";
import SectionCategory from "@/components/section/SectionCategory";
import SectionSubscription from "@/components/section/SectionSubscription";
import TextHighlight from "@/components/text/TextHighlight";
import Layout from "@/components/wrapper/Layout";
import { getUrl } from "@/lib/getUrl";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ApotekerClassResponse } from "@/types/apotekerclass.type";
import { EventTestApotekerclass } from "@/types/event.type";
import { SuccessResponse } from "@/types/global.type";
import { Province } from "@/types/province.type";
import { fetcher } from "@/utils/fetcher";
import { getStatusEvent } from "@/utils/getStatusEvent";
import { scrollToSection } from "@/utils/scrollToSection";
import { handleShareClipboard } from "@/utils/shareClipboard";
import {
  Button,
  Chip,
  Pagination,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import {
  ClipboardText,
  Funnel,
  IconContext,
  ShareNetwork,
  Sparkle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQueryState } from "nuqs";
import { useRef } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

type EventResposnse = {
  events: EventTestApotekerclass[];
  page: number;
  total_events: number;
  total_pages: number;
};

export default function ApotekerClassPage({
  detailsData,
  provincesData,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const subscribeRef = useRef<HTMLElement | null>(null);
  const hasSubscribeRef = useRef<HTMLElement | null>(null);

  const [page, setPage] = useQueryState("page", { defaultValue: "" });
  const [sort, setSort] = useQueryState("sort", { defaultValue: "" });
  const [filter, setFilter] = useQueryState("filter", { defaultValue: "" });
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
  const [searchValue] = useDebounce(search, 800);

  const divRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading } = useSWR<SuccessResponse<EventResposnse>>({
    url: getUrl("/events", { q: searchValue, page, sort, filter }),
    method: "GET",
  });

  return (
    <>
      <Layout
        title="Ruang Masuk Apoteker: Persiapan Skill Terbaik Jadi Apoteker Andal"
        description="Bersiap seleksi profesi apoteker dengan program khusus. Kuasai materi mendalam & terarah untuk jadi apoteker handal dan profesional."
      >
        {detailsData?.has_subscription ? (
          <div className="mb-4 flex items-center justify-center rounded-xl border-2 border-success bg-success/10 p-3 text-sm sm:text-base">
            <h4 className="font-medium text-success-800">
              🎉 Yeay, anda telah berlangganan pada:{" "}
              <strong className="font-bold">Ruang Masuk Apoteker 💊</strong>
            </h4>
          </div>
        ) : null}

        <section className="base-container items-center gap-6 [padding:50px_0_100px] xl:grid-cols-[1fr_550px]">
          <div className="grid gap-4">
            <Chip
              color="secondary"
              variant="flat"
              classNames={{
                content: "font-bold",
              }}
              className="mb-2"
            >
              💊 Ruang Masuk Apoteker
            </Chip>

            <h1 className="text-2xl font-black capitalize -tracking-wide text-black sm:text-3xl lg:text-5xl">
              Persiapkan Diri dengan{" "}
              <TextHighlight text="Skill Terbaik" className="font-black" />{" "}
              untuk Menjadi Apoteker Andal
            </h1>

            <p className="mb-6 font-medium leading-[170%] text-gray">
              Bersiaplah menghadapi seleksi masuk program profesi apoteker. Kami
              menyediakan program khusus yang disesuaikan dengan kebutuhan
              menjadi seorang Apoteker yang handal dan profesional. Kelas ini
              pula dirancang untuk membantu kamu memahami materi secara mendalam
              dan terarah.
            </p>

            <div className="grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                color="secondary"
                endContent={<Sparkle weight="duotone" size={18} />}
                onClick={() =>
                  scrollToSection(
                    detailsData?.has_subscription
                      ? hasSubscribeRef
                      : subscribeRef,
                  )
                }
                className="px-6 font-bold"
              >
                {detailsData?.has_subscription
                  ? "Lihat Video Belajar!"
                  : "Langganan Sekarang!"}
              </Button>

              <Button
                aria-label="Share Link"
                variant="bordered"
                startContent={<ShareNetwork weight="duotone" size={18} />}
                onClick={handleShareClipboard}
                className="px-6 font-bold"
              >
                Bagikan
              </Button>
            </div>
          </div>

          <Image
            priority
            src="=https://cdn.ruangobat.id/statics/images/new-illustration-program/img-masuk-apoteker.webp"
            alt="class subject img"
            width={1000}
            height={1000}
            className="w-full justify-self-center"
          />
        </section>

        <section className="base-container justify-items-center [padding:100px_0_50px]">
          <Image
            src="=https://cdn.ruangobat.id/statics/images/new-logo-program/logo/logo-ruang-masuk-apoteker.webp"
            alt="logo program"
            width={1000}
            height={1000}
            className="h-auto w-full max-w-[330px] xl:max-w-[500px]"
            loading="lazy"
          />
        </section>

        <SectionCategory
          sectionRef={hasSubscribeRef}
          type="apotekerclass"
          categories={detailsData?.categories}
        />

        {detailsData?.universities.length ? (
          <section className="base-container gap-4 py-[100px]">
            <div className="grid gap-1">
              <h2 className="text-2xl font-black -tracking-wide text-black sm:text-3xl">
                Tryout Universitas 🎓
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                Dapatkan bonus tryout dari universitas ternama untuk kamu yang
                telah berlangganan kelas ini.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3">
              {detailsData.universities.map((university) => (
                <div
                  className="group relative isolate grid grid-cols-[max-content_1fr] items-center gap-4 overflow-hidden rounded-xl border-2 border-gray/10 p-4 hover:cursor-pointer hover:bg-purple/10"
                  key={university.univ_id}
                  onClick={() =>
                    router.push(
                      `/programs/masuk-apoteker/universitas/${university.slug}`,
                    )
                  }
                >
                  <div className="relative aspect-square size-full items-center justify-center rounded-md bg-purple/5 p-2 text-5xl">
                    <Image
                      src={university.thumbnail_url}
                      alt={university.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>

                  <div className="grid gap-4">
                    <CustomTooltip content={university.title}>
                      <h3 className="line-clamp-1 font-black text-black group-hover:text-purple">
                        {university.title}
                      </h3>
                    </CustomTooltip>

                    <div className="grid gap-1">
                      <span className="text-xs font-medium text-gray">
                        Jumlah Tryout
                      </span>

                      <div className="flex items-center gap-1">
                        <IconContext.Provider
                          value={{
                            weight: "duotone",
                            size: 18,
                            className: "text-purple",
                          }}
                        >
                          <ClipboardText />
                        </IconContext.Provider>

                        <p className="text-sm font-semibold capitalize text-black">
                          {university.total_tests}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="base-container gap-4 py-[100px]">
          <div className="grid gap-1">
            <h2 className="text-2xl font-black -tracking-wide text-black sm:text-3xl">
              Jadwal Ujian Masuk Apoteker 📆
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Temukan jadwal ujian masuk apoteker terkini beserta detail penting
              lainnya.
            </p>
          </div>

          <div className="mt-4 grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 lg:gap-4">
              <SearchInput
                placeholder="Cari Jadwal..."
                onClear={() => setSearch("")}
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-[500px]"
              />

              <div className="flex flex-1 items-center justify-end gap-2">
                <Select
                  aria-label="filter"
                  size="md"
                  variant="flat"
                  startContent={
                    <Funnel weight="duotone" size={18} className="text-gray" />
                  }
                  placeholder="Provinsi"
                  selectedKeys={[filter]}
                  onChange={(e) => setFilter(e.target.value)}
                  className="max-w-[180px] text-gray"
                  classNames={{
                    value: "font-semibold text-gray",
                  }}
                >
                  {provincesData?.map((province) => (
                    <SelectItem key={province.name}>{province.name}</SelectItem>
                  )) ?? []}
                </Select>

                <Select
                  aria-label="sort"
                  size="md"
                  variant="flat"
                  startContent={
                    <Funnel weight="duotone" size={18} className="text-gray" />
                  }
                  placeholder="Urutkan"
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

        {!detailsData?.has_subscription ? (
          <SectionSubscription
            sectionRef={subscribeRef}
            subscriptions={detailsData?.subscriptions}
          />
        ) : null}

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  detailsData?: ApotekerClassResponse;
  provincesData?: Province[];
  error?: any;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    const [response, responseProvinces] = await Promise.all([
      fetcher({
        url: "/apotekerclass",
        method: "GET",
        token: session?.user.access_token,
      }) as Promise<SuccessResponse<ApotekerClassResponse>>,
      fetch("https://cdn.ruangobat.id/statics/provinces.json"),
    ]);

    const provincesData: Province[] = await responseProvinces.json();

    return {
      props: {
        detailsData: response.data,
        provincesData,
      },
    };
  } catch (error: any) {
    console.error(error);

    return {
      props: {
        error,
      },
    };
  }
};
