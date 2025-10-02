import ButtonBack from "@/components/button/ButtonBack";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { EventTestApotekerclass } from "@/types/event.type";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { getStatusEvent } from "@/utils/getStatusEvent";
import { Chip } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DetailsTestSchedulesPage({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [client, setClient] = useState<boolean>(false);

  const rawDate = event?.registration_date ?? "";
  const [startStr, endStr] = rawDate.split(" - ");

  const startDate = startStr ? new Date(startStr) : null;
  const endDate = endStr ? new Date(endStr) : null;
  const status =
    startDate && endDate ? getStatusEvent(startDate, endDate) : null;

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return;

  return (
    <>
      <Layout
        title="Detail Jadwal Ujian Masuk Apoteker: Tanggal & Syarat Lengkap"
        description="Temukan detail jadwal ujian masuk program profesi apoteker dengan info terkini. Pastikan persiapan lebih matang dengan panduan yang jelas."
      >
        <ButtonBack />

        <section className="base-container relative isolate [padding:50px_0_100px]">
          <div className="grid gap-8 xl:grid-cols-[300px_1fr] xl:items-start xl:gap-16">
            <Image
              src={event?.img_url as string}
              alt="default img"
              width={500}
              height={500}
              className="aspect-square rounded-xl object-cover object-center xl:sticky xl:left-0 xl:top-[110px]"
              loading="lazy"
            />

            <div className="grid gap-6">
              <h1 className="text-2xl font-black -tracking-wide text-black md:text-3xl lg:text-4xl">
                {event?.title}
              </h1>

              <div className="mb-10 grid gap-4 xl:grid-cols-[repeat(3,max-content)] xl:gap-8">
                {[
                  [
                    "Tanggal Pendaftaran",
                    `${formatDateWithoutTime(startStr)} - ${formatDateWithoutTime(endStr)}`,
                  ],
                  ["Universitas", event?.university_name],
                  [
                    "Status Pendaftaran",
                    <Chip
                      variant="flat"
                      color={
                        status === "Dibuka"
                          ? "success"
                          : status === "Ditutup"
                            ? "danger"
                            : "default"
                      }
                      classNames={{
                        base: "px-2 gap-1",
                        content: "font-bold capitalize",
                      }}
                    >
                      {status}
                    </Chip>,
                  ],
                ].map(([label, value], index) => (
                  <div key={index} className="grid items-start gap-1">
                    <span className="text-sm font-medium text-gray">
                      {label}:
                    </span>
                    <h3 className="font-bold capitalize text-black">{value}</h3>
                  </div>
                ))}
              </div>

              <div className="grid gap-4">
                <h2 className="text-2xl font-black -tracking-wide text-black">
                  Ringkasan Jadwal ⏰
                </h2>

                <p
                  className="ck-content preventive-table preventive-list preventif-overlaps-text font-medium leading-[160%] text-black md:text-lg"
                  dangerouslySetInnerHTML={{ __html: event?.content as string }}
                />
              </div>
            </div>
          </div>
        </section>

        <CTAMain />
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  event?: EventTestApotekerclass;
}> = async ({ params }) => {
  const response: SuccessResponse<EventTestApotekerclass> = await fetcher({
    url: `/events/${encodeURIComponent(params?.id as string)}`,
    method: "GET",
  });

  return {
    props: {
      event: response.data,
    },
  };
};
