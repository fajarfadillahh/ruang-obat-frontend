import CardProgram from "@/components/card/CardProgram";
import Loading from "@/components/Loading";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { ProgramsType } from "@/types/programs.type";
import { Input, Pagination, Select, SelectItem } from "@nextui-org/react";
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

export default function DashboardPage({
  token,
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [search, setSearch] = useState(query.q ? query.q : "");
  const [searchValue] = useDebounce(search, 800);
  const { data, isLoading } = useSWR<SuccessResponse<ProgramsResponse>>({
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

  const filteredPrograms = data?.data.programs.filter((program) =>
    program.title.toLowerCase().includes(`${searchValue}`),
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout title="Pilih Program Yang Sesuai Dengan Kebutuhan Anda">
      <section className="mx-auto grid gap-6 md:max-w-[770px] xl:max-w-none">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-end sm:gap-2">
          <h1 className="text-[24px] font-extrabold -tracking-wide text-black">
            Daftar Program 📋
          </h1>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <Input
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
                base: "w-[200px]",
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

          {searchValue && filteredPrograms?.length === 0 ? (
            <div className="flex items-center justify-center gap-2 pt-16">
              <MagnifyingGlass weight="bold" size={20} className="text-gray" />
              <p className="font-semibold capitalize text-gray">
                Program tidak ditemukan!
              </p>
            </div>
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

type ProgramsResponse = {
  programs: ProgramsType[];
  page: number;
  total_programs: number;
  total_pages: number;
};

function getUrl(query: ParsedUrlQuery) {
  if (query.type) {
    return `/programs?type=${query.type}&page=${query.page ? query.page : 1}`;
  }

  if (query.q) {
    return `/programs?q=${query.q}&page=${query.page ? query.page : 1}`;
  }

  return `/programs?page=${query.page ? query.page : 1}`;
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
