import CardProgram from "@/components/card/CardProgram";
import EmptyData from "@/components/EmptyData";
import Loading from "@/components/Loading";
import Layout from "@/components/wrapper/Layout";
import { DashboardResponse } from "@/types/dashboard.type";
import { SuccessResponse } from "@/types/global.type";
import { Input, Pagination, Select, SelectItem } from "@nextui-org/react";
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

function getUrl(query: ParsedUrlQuery) {
  if (query.type) {
    return `/programs?type=${query.type}&page=${query.page ? query.page : 1}`;
  }

  if (query.q) {
    return `/programs?q=${query.q}&page=${query.page ? query.page : 1}`;
  }

  return `/programs?page=${query.page ? query.page : 1}`;
}

export default function DashboardPage({
  token,
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [search, setSearch] = useState(query.q ? query.q : "");
  const [searchValue] = useDebounce(search, 800);
  const { data, isLoading } = useSWR<SuccessResponse<DashboardResponse>>({
    url: getUrl(query),
    method: "GET",
    token,
  });

  useEffect(() => {
    if (searchValue) {
      router.push({ query: { q: searchValue } });
    } else {
      router.push("/dashboard");
    }
  }, [searchValue]);

  if (isLoading) return <Loading />;

  return (
    <Layout title="Pilih Program Yang Sesuai Dengan Kebutuhan Anda">
      <section className="mx-auto grid gap-6 md:max-w-[770px] xl:max-w-none">
        <h1 className="text-[24px] font-extrabold -tracking-wide text-black">
          Daftar Program 📋
        </h1>

        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <Input
              isClearable
              onClear={() => setSearch("")}
              defaultValue={query.q as string}
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
              className="max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select
              selectedKeys={[query.type as string]}
              aria-label="filter program"
              variant="flat"
              placeholder="Filter"
              startContent={
                <Funnel weight="bold" size={18} className="text-black" />
              }
              labelPlacement="outside"
              listboxProps={{
                itemClasses: {
                  title: "font-semibold text-black",
                },
              }}
              classNames={{
                base: "w-[150px]",
                value: "font-semibold text-black",
              }}
              onChange={(e) => {
                if (e.target.value) {
                  router.push({ query: { type: e.target.value } });
                } else {
                  router.push("/dashboard");
                }
              }}
            >
              <SelectItem key="free">Gratis</SelectItem>
              <SelectItem key="paid">Berbayar</SelectItem>
            </Select>
          </div>

          {searchValue && data?.data.programs.length === 0 ? (
            <EmptyData text="Program tidak ditemukan!" />
          ) : (
            <div className="grid items-start justify-center gap-2 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
              {data?.data.programs.map((program) => (
                <CardProgram key={program.program_id} {...program} />
              ))}
            </div>
          )}

          {data?.data.programs.length ? (
            <Pagination
              isCompact
              showControls
              page={data?.data.page as number}
              total={data?.data.total_pages as number}
              onChange={(e) => {
                router.push({
                  query: {
                    ...router.query,
                    page: e,
                  },
                });
              }}
              className="justify-self-center"
              classNames={{
                cursor: "bg-purple text-white",
              }}
            />
          ) : null}
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
  query: ParsedUrlQuery;
}> = async ({ req, query }) => {
  return {
    props: {
      token: req.headers["access_token"] as string,
      query,
    },
  };
};
