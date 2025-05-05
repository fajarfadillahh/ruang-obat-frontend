import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import CTASecondary from "@/components/cta/CTASecondary";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/footer/Footer";
import SearchInput from "@/components/SearchInput";
import Layout from "@/components/wrapper/Layout";
import { PharmacistAdmissionClassType } from "@/types/classes.type";
import { ErrorDataType, SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { filterData } from "@/utils/filterData";
import { isNewProduct } from "@/utils/isNewProduct";
import { Button, Chip } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PharmacyEntranceClassPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // for search product/class
  const keysToFilter: (keyof PharmacistAdmissionClassType)[] = [
    "university_id",
    "name",
  ];
  const filteredData = filterData(data || [], search, keysToFilter);

  return (
    <>
      <Layout
        title="Kelas Masuk Apoteker"
        description="Kelas ini dirancang khusus untuk mempersiapkan Anda menghadapi seleksi masuk Program Profesi Apoteker, dengan materi komprehensif dan pembimbing berpengalaman."
      >
        <BreadcrumbsUrl rootLabel="Home" basePath="/" />

        <section className="base-container items-center gap-4 xl:grid-cols-2 xl:gap-2">
          <div>
            <h1 className="mb-4 text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
              Kelas Siap Masuk Apoteker: Upgrade Skill, Raih Mimpi
            </h1>

            <p className="mb-10 font-medium leading-[170%] text-gray">
              Bersiaplah menghadapi seleksi masuk program profesi apoteker. Kami
              menyediakan program khusus yang disesuaikan dengan kebutuhan
              menjadi seorang Apoteker yang handal dan profesional. Kelas ini
              pula dirancang untuk membantu kamu memahami materi secara mendalam
              dan terarah.
            </p>

            <Button
              color="secondary"
              as={Link}
              href="#list-video"
              className="w-max px-12 font-bold"
            >
              Pilih Video Belajar
            </Button>
          </div>

          <Image
            priority
            src="/img/base/apoteker-img.svg"
            alt="class subject img"
            width={493}
            height={619}
            className="h-[600px] w-full justify-self-center"
          />
        </section>

        <section
          id="list-video"
          className="base-container gap-4 [padding:110px_0_100px]"
        >
          <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
            Daftar Video 🔥
          </h2>

          <SearchInput
            placeholder="Cari Video..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            className="mb-4 max-w-[550px]"
          />

          {filteredData.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray/20 p-6">
              <EmptyData text="Kelas Tidak Ditemukan 😥" />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 sm:items-start xl:grid-cols-3 xl:gap-8">
              {data?.map((item: PharmacistAdmissionClassType) => (
                <div
                  key={item.university_id}
                  className="group relative grid gap-8 rounded-xl bg-white p-6 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
                >
                  {isNewProduct(item.created_at) ? (
                    <Chip
                      color="danger"
                      className="absolute right-8 top-8 z-10"
                      classNames={{
                        content: "font-bold px-4",
                      }}
                    >
                      Baru
                    </Chip>
                  ) : null}

                  <Image
                    priority
                    src="/img/default-thumbnail.png"
                    alt="thumbnail"
                    width={304}
                    height={304}
                    className="aspect-square h-auto w-full rounded-xl object-cover object-center group-hover:grayscale-[0.5]"
                  />

                  <div className="grid gap-4">
                    <h1 className="line-clamp-2 text-xl font-black text-black group-hover:text-purple">
                      {item.name}
                    </h1>

                    <Button
                      variant="flat"
                      color="secondary"
                      onClick={() =>
                        router.push(`/kelas-masuk-apoteker/${item.slug}`)
                      }
                      className="font-bold"
                    >
                      Detail Video
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="base-container gap-4 py-[100px]">
          <div className="grid gap-1">
            <h2 className="text-center text-3xl font-black -tracking-wide text-black xl:text-left">
              Daftar Tryout ✍
            </h2>

            <p className="font-medium leading-[170%] text-gray">
              Kamu bisa memilih bonus tryout minimal 1 Univesitas.
            </p>
          </div>

          <p className="mt-6 text-xl font-medium text-gray">
            Daftar bonus tryout per universitas akan muncul disini!
          </p>
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}

type DataProps = {
  data?: PharmacistAdmissionClassType[];
  error?: ErrorDataType;
};

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
  try {
    const response = (await fetcher({
      method: "GET",
      url: "/general/pharmacistadmission",
    })) as SuccessResponse<PharmacistAdmissionClassType[]>;

    return {
      props: {
        data: response.data,
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
