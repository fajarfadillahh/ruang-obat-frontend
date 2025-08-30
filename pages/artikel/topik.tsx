import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

type TopicsResponse = {
  topic: string;
  items: {
    name: string;
  }[];
};

export default function TopicsArticlePage() {
  const router = useRouter();

  const { data, isLoading } = useSWR<SuccessResponse<TopicsResponse[]>>({
    url: "/topics/all",
    method: "GET",
  });

  return (
    <>
      <Layout
        title="Kumpulan Artikel Berdasarkan Topik"
        description="Jelajahi artikel sesuai topik pilihan kamu. Dari kesehatan, dunia Farmasi, lifestyle, sampai tips & triks. Temukan bacaan yang relevan dan bermanfaat di RuangObat."
      >
        <ButtonBack href="/artikel" />

        <section className="base-container gap-1 py-[50px]">
          <h1 className="text-2xl font-black -tracking-wide text-black md:text-4xl">
            Kumpulan Artikel Berdasarkan Topik
            <span className="text-purple">.</span>
          </h1>

          <p className="max-w-[600px] font-medium leading-[170%] text-gray">
            Jelajahi artikel sesuai topik pilihan kamu. Dari kesehatan, dunia
            Farmasi, lifestyle, sampai tips & triks. Temukan bacaan yang relevan
            dan bermanfaat di RuangObat.
          </p>
        </section>

        <section className="base-container gap-4 pb-[100px]">
          <h2 className="font-extrabold text-black md:text-xl">Daftar Topik</h2>

          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full rounded-xl" />
            ))
          ) : (
            <div className="grid gap-12">
              {data?.data.map((topic, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[max-content_max-content_1fr] items-center gap-8"
                >
                  <h3 className="text-3xl font-extrabold text-purple">
                    {topic.topic}
                  </h3>

                  <div className="hidden h-[2px] border-t-2 border-dashed border-gray/20 sm:flex sm:w-[50px] md:w-[100px]" />

                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-12">
                    {topic.items.map((item, index) => (
                      <Link
                        key={index}
                        href={`/artikel/semua?topik=${item.name}`}
                        className="font-medium text-black hover:text-purple hover:underline"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </Layout>

      <Footer />
    </>
  );
}
