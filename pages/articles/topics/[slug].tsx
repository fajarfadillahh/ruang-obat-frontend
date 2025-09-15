import ButtonBack from "@/components/button/ButtonBack";
import CardArticle from "@/components/card/CardArticle";
import CTARosaAi from "@/components/cta/CTARosaAi";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/footer/Footer";
import SearchInput from "@/components/SearchInput";
import Layout from "@/components/wrapper/Layout";
import { getUrl } from "@/lib/getUrl";
import { Article } from "@/types/article.type";
import { SuccessResponse } from "@/types/global.type";
import {
  Button,
  Pagination,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import { ArrowRight, Funnel } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useQueryState } from "nuqs";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

type ArticleResponse = {
  articles: Article[];
  page: number;
  total_articles: number;
  total_pages: number;
};

export default function ArticlesByTopicPage({
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
  const [page, setPage] = useQueryState("page", { defaultValue: "" });
  const [sort, setSort] = useQueryState("sort", { defaultValue: "" });

  const [searchValue] = useDebounce(search, 800);
  const { data, isLoading } = useSWR<SuccessResponse<ArticleResponse>>({
    url: getUrl(`/articles/topics/${fromSlug(slug)}`, {
      q: searchValue,
      page,
      sort,
    }),
    method: "GET",
  });

  function fromSlug(slug: string) {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function formatSlug(str: string) {
    return str.replace(/-/g, " ");
  }

  return (
    <>
      <Layout
        title={`Semua Artikel Tentang ${formatSlug(slug).replace(/\b\w/g, (c) => c.toUpperCase())}`}
        description={`Artikel seputar ${formatSlug(slug)} dengan pembahasan lengkap dan mudah dipahami.`}
      >
        <ButtonBack href="/articles/topics" />

        <section className="base-container gap-1 py-[50px]">
          <h1 className="text-2xl font-black capitalize -tracking-wide text-black md:text-4xl">
            {formatSlug(slug)}
          </h1>

          <p className="max-w-[500px] font-medium leading-[170%] text-gray">
            Kumpulan artikel pilihan tentang {formatSlug(slug)} untuk menambah
            wawasan kamu 🔥
          </p>
        </section>

        <section className="base-container gap-8 pb-[100px]">
          <div className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 lg:gap-4">
              <SearchInput
                placeholder="Cari Artikel..."
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
                Array.from({ length: data?.data.articles.length || 8 }).map(
                  (_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[300px] w-full rounded-xl"
                    />
                  ),
                )
              ) : data?.data.articles.length ? (
                data?.data.articles.map((article) => (
                  <CardArticle key={article.article_id} article={article} />
                ))
              ) : (
                <div className="col-span-4 flex items-center justify-center rounded-xl border-2 border-dashed border-gray/20">
                  <EmptyData text="Artikel Tidak Ditemukan!" />
                </div>
              )}
            </div>
          </div>

          {data?.data.articles.length ? (
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
        </section>

        <section className="base-container py-[50px]">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl border-2 border-gray-500/10 p-8">
            <div className="grid gap-1">
              <h5 className="text-2xl font-extrabold leading-[170%] text-black">
                Cari Artikel Berdasarkan Topik
              </h5>

              <p className="max-w-[600px] font-medium leading-[170%] text-gray">
                Jelajahi artikel sesuai topik pilihan kamu mulai dari kesehatan,
                farmasi, gaya hidup sehat, hingga berbagai tips praktis lainnya.
              </p>
            </div>

            <Button
              color="secondary"
              endContent={<ArrowRight weight="bold" size={18} />}
              onClick={() => router.push(`/articles/topics`)}
              className="font-bold"
            >
              Semua Topik Artikel
            </Button>
          </div>
        </section>

        <CTARosaAi />
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ slug: string }> = async ({
  params,
}) => {
  return {
    props: {
      slug: params?.slug as string,
    },
  };
};
