import CardArticle from "@/components/card/CardArticle";
import CTARosaAi from "@/components/cta/CTARosaAi";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { Article } from "@/types/article.type";
import { SuccessResponse } from "@/types/global.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { Button, Skeleton } from "@nextui-org/react";
import { ArrowRight, CalendarDots } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";

type ArticleResponse = {
  newest_articles: Article[];
  most_viewed_articles: Article[];
  ads: any[];
};

export default function ArticlesHomePage() {
  const router = useRouter();

  const { data, isLoading } = useSWR<SuccessResponse<ArticleResponse>>({
    url: "/articles/homepage",
    method: "GET",
  });

  const newestArticleCard = data?.data.newest_articles[0];
  const otherNewestArticleCard = data?.data.newest_articles.slice(1);

  return (
    <>
      <Layout
        title="Kumpulan Artikel Inspiratif & Informatif"
        description="Baca artikel farmasi pilihan dengan bahasa mudah dipahami. Temukan tren terbaru, tips kesehatan, dan info terpercaya yang inspiratif buat kamu."
      >
        <section className="base-container gap-1 py-[50px]">
          <h1 className="text-2xl font-black -tracking-wide text-black md:text-4xl">
            Artikel RuangObat<span className="text-purple">.</span>
          </h1>

          <p className="max-w-[600px] font-medium leading-[170%] text-gray">
            Dapatkan informasi terpercaya seputar dunia farmasi dan kesehatan.
            Mulai dari tips, trik, hingga wawasan terbaru yang bermanfaat bagi
            kamu.
          </p>
        </section>

        <section className="base-container gap-4 pb-[100px]">
          <h2 className="font-extrabold text-black md:text-xl">
            Artikel Terbaru 🚨
          </h2>

          {isLoading ? (
            <Skeleton className="h-[380px] w-full rounded-2xl" />
          ) : data?.data.newest_articles.length ? (
            <>
              {/* === newest article card === */}
              <div
                onClick={() =>
                  router.push(
                    `/articles/${encodeURIComponent(newestArticleCard?.slug as string)}`,
                  )
                }
                className="group grid gap-4 rounded-2xl border-2 border-purple/10 p-4 hover:cursor-pointer hover:border-purple hover:bg-purple/10 sm:p-8 xl:grid-cols-[450px_1fr]"
              >
                <div className="order-2 flex flex-col justify-between gap-8 md:-order-1">
                  <div className="grid gap-2">
                    <p className="mb-2 line-clamp-2 text-sm font-medium leading-[170%] text-purple sm:text-base">
                      {newestArticleCard?.topic.name}
                    </p>

                    <h3 className="line-clamp-2 text-xl font-black capitalize -tracking-wide text-black group-hover:text-purple xs:text-2xl sm:text-3xl">
                      {newestArticleCard?.title}
                    </h3>

                    <p className="line-clamp-3 text-sm font-medium leading-[170%] text-gray sm:text-base">
                      {newestArticleCard?.description}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-gray">
                    <CalendarDots weight="duotone" size={20} />

                    <p className="text-sm font-medium leading-[170%] sm:text-base">
                      {formatDateWithoutTime(
                        newestArticleCard?.created_at as string,
                      )}
                    </p>
                  </div>
                </div>

                <div className="aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={newestArticleCard?.img_url as string}
                    alt={newestArticleCard?.title as string}
                    width={500}
                    height={500}
                    className="size-full object-cover object-center transition-all group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* === other newest article card === */}
              {otherNewestArticleCard?.length ? (
                <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
                  {otherNewestArticleCard?.map((article) => (
                    <CardArticle key={article.article_id} article={article} />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <div className="col-span-4 flex items-center justify-center rounded-xl border-2 border-dashed border-gray/20">
              <EmptyData text="Belum Ada Artikel Terbaru!" />
            </div>
          )}
        </section>

        <section className="base-container gap-4 pb-[100px]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-extrabold text-black md:text-xl">
              Artikel Terpopuler 🔥
            </h2>

            <Button
              size="sm"
              variant="light"
              endContent={<ArrowRight weight="bold" size={18} />}
              onClick={() => router.push("/articles/all")}
              className="w-max font-bold"
            >
              Lihat Semua
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-4">
            {isLoading ? (
              Array.from({
                length: data?.data.most_viewed_articles.length || 8,
              }).map((_, index) => (
                <Skeleton key={index} className="h-[300px] w-full rounded-xl" />
              ))
            ) : data?.data.most_viewed_articles.length ? (
              data?.data.most_viewed_articles.map((article) => (
                <CardArticle key={article.article_id} article={article} />
              ))
            ) : (
              <div className="col-span-4 flex items-center justify-center rounded-xl border-2 border-dashed border-gray/20">
                <EmptyData text="Belum Ada Artikel Terpopuler!" />
              </div>
            )}
          </div>
        </section>

        <section className="base-container py-[50px]">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl border-2 border-gray-500/10 p-8">
            <div className="grid gap-1">
              <h2 className="text-2xl font-extrabold leading-[170%] text-black">
                Cari Artikel Berdasarkan Topik
              </h2>

              <p className="max-w-[600px] font-medium leading-[170%] text-gray">
                Jelajahi artikel sesuai topik pilihan kamu mulai dari kesehatan,
                farmasi, gaya hidup sehat, hingga berbagai tips praktis lainnya.
              </p>
            </div>

            <Button
              color="secondary"
              endContent={<ArrowRight weight="bold" size={18} />}
              onClick={() => router.push("/articles/topics")}
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
