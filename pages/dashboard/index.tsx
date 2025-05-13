import CardProgram from "@/components/card/CardProgram";
import EmptyData from "@/components/EmptyData";
import Loading from "@/components/Loading";
import SearchInput from "@/components/SearchInput";
import Layout from "@/components/wrapper/Layout";
import { DashboardResponse } from "@/types/dashboard.type";
import { SuccessResponse } from "@/types/global.type";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { Funnel, IconContext } from "@phosphor-icons/react";
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
    <Layout title="Pilih Program Yang Sesuai Dengan Kebutuhan Kamu">
      <section className="base-container gap-6">
        <h1 className="text-2xl font-extrabold -tracking-wide text-black">
          Daftar Program 📋
        </h1>

        <div className="grid gap-4">
          <IconContext.Provider
            value={{
              weight: "bold",
              size: 18,
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <SearchInput
                placeholder="Cari Program..."
                onClear={() => setSearch("")}
                defaultValue={query.q as string}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Select
                selectedKeys={[query.type as string]}
                aria-label="filter program"
                variant="flat"
                placeholder="Semua"
                startContent={
                  <Funnel weight="duotone" className="text-black" />
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
          </IconContext.Provider>

          {searchValue && data?.data.programs.length === 0 ? (
            <EmptyData text="Program tidak ditemukan!" />
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start justify-center gap-2 lg:gap-6 xl:grid-cols-3">
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
