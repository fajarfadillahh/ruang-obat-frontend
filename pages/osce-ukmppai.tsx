import CardProgram from "@/components/card/CardProgram";
import Empty from "@/components/Empty";
import SearchInput from "@/components/SearchInput";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { ProgramsType } from "@/types/programs.type";
import { Pagination, Select, SelectItem, Skeleton } from "@nextui-org/react";
import { Funnel, IconContext } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { useQueryState } from "nuqs";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import { authOptions } from "./api/auth/[...nextauth]";

function getUrl(query: { type?: string; q?: string; page?: string }) {
  if (query.type) {
    return `/programs?type=${query.type}&page=${query.page ? query.page : 1}`;
  }

  if (query.q) {
    return `/programs?q=${query.q}&page=${query.page ? query.page : 1}`;
  }

  return `/programs?page=${query.page ? query.page : 1}`;
}

type ProgramsResponse = {
  programs: ProgramsType[];
  page: number;
  total_programs: number;
  total_pages: number;
};

export default function OsceUkmppaiPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
  const [page, setPage] = useQueryState("page", { defaultValue: "" });
  const [type, setType] = useQueryState("type", { defaultValue: "" });

  const [searchValue] = useDebounce(search, 800);
  const { data, isLoading } = useSWR<SuccessResponse<ProgramsResponse>>({
    url: getUrl({ type, q: searchValue, page }),
    method: "GET",
    token,
  });

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
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Select
                selectedKeys={[type]}
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
                onChange={(e) => setType(e.target.value)}
              >
                <SelectItem key="free">Gratis</SelectItem>
                <SelectItem key="paid">Berbayar</SelectItem>
              </Select>
            </div>
          </IconContext.Provider>

          {!isLoading && !data?.data.programs.length ? (
            <Empty text="Program tidak ditemukan!" />
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start justify-center gap-2 lg:gap-6 xl:grid-cols-3">
              {renderContent(isLoading, data?.data.programs as ProgramsType[])}
            </div>
          )}

          {isLoading ? (
            <Skeleton
              className="h-10 w-28 justify-self-center rounded-xl"
              isLoaded={false}
            />
          ) : data?.data.programs.length ? (
            <Pagination
              isCompact
              showControls
              page={data?.data.page as number}
              total={data?.data.total_pages as number}
              onChange={(e) => setPage(`${e}`)}
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

function renderContent(isLoading: boolean, programs: ProgramsType[]) {
  if (isLoading) {
    return (
      <>
        <Skeleton className="h-36 w-full rounded-xl" isLoaded={false} />
        <Skeleton className="h-36 w-full rounded-xl" isLoaded={false} />
        <Skeleton className="h-36 w-full rounded-xl" isLoaded={false} />
      </>
    );
  }

  return programs.map((program) => (
    <CardProgram key={program.program_id} {...program} />
  ));
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
}> = async ({ req, query, res }) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      token: session?.user.access_token as string,
    },
  };
};
