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
      <Layout title="Kelas Masuk Apoteker">
        <section className="mx-auto grid max-w-[600px] items-center gap-8 lg:max-w-[700px] xl:max-w-none">
          <div className="grid max-w-[850px] gap-[10px]">
            <h1 className="text-[48px] font-black capitalize leading-[110%] -tracking-wide text-black">
              Kelas Masuk Apoteker
            </h1>
            <p className="font-medium leading-[170%] text-gray">
              Bersiaplah menghadapi seleksi masuk program profesi apoteker. Kami
              menyediakan program khusus yang disesuaikan dengan kampus pilihan
              kamu, dan kelas ini pula dirancang untuk membantu kamu memahami
              materi seleksi secara mendalam dan terarah.
            </p>
          </div>

          <Button
            color="secondary"
            as={Link}
            href="#list-class"
            className="w-max px-16 font-bold"
          >
            Pilih Kelas
          </Button>
        </section>

        <section
          id="list-class"
          className="mx-auto grid max-w-[600px] gap-4 [padding:110px_0_100px] lg:max-w-[700px] xl:max-w-none"
        >
          <h2 className="text-center text-[32px] font-black capitalize leading-[120%] -tracking-wide text-black xl:text-left">
            Daftar Kelas per Universitas
          </h2>

          <SearchInput
            placeholder="Cari Kelas per Universitas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
          />

          {filteredData.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray/20">
              <EmptyData text="Kelas Masuk Apoteker Tidak Ditemukan 😥" />
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

                  <div className="aspect-square size-full overflow-hidden rounded-xl bg-purple group-hover:grayscale-[0.5]">
                    <Image
                      src={item.img_url as string}
                      alt="thumbnail img"
                      width={500}
                      height={500}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="grid gap-8">
                    <h1 className="line-clamp-2 text-lg font-black capitalize leading-[120%] text-black group-hover:text-purple">
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
                      Detail Kelas
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
