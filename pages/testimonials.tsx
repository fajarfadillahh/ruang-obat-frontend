import EmptyData from "@/components/EmptyData";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { authOptions } from "./api/auth/[...nextauth]";

type TestimonialResponse = {
  apotekerclass: TestimonialImage[];
  videocourse: TestimonialImage[];
  tryout: TestimonialImage[];
  private: TestimonialImage[];
  research: TestimonialImage[];
  theses: TestimonialImage[];
};

type TestimonialImage = {
  testimonial_id: string;
  img_url: string;
  type: string;
  created_at: string;
};

export default function TestimonialsPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, isLoading } = useSWR<SuccessResponse<TestimonialResponse>>({
    url: `/testimonials/page`,
    method: "GET",
    token,
  });
  const [testimonialImage, setTestimonialImage] = useState<string>("");

  return (
    <>
      <Layout
        title="Testimonial Mereka Tentang Kami"
        description="Simak testimoni nyata mahasiswa yang sudah ikut program RuangObat. Cerita pengalaman dan manfaat langsung dari pembelajaran bersama kami."
      >
        <Modal
          scrollBehavior="inside"
          placement="center"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 font-extrabold text-black">
                  Detail Testimonial
                </ModalHeader>

                <ModalBody className="h-auto w-full">
                  <Image
                    src={testimonialImage as string}
                    alt="testimonial image"
                    width={307}
                    height={600}
                    className="h-auto w-full rounded-lg"
                    priority
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onClick={onClose}
                    className="font-bold"
                  >
                    Tutup
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <section className="base-container gap-24 [padding:50px_0_100px]">
          <div className="grid justify-items-center gap-2 text-center">
            <h1 className="text-2xl font-black -tracking-wide text-black xs:text-3xl md:text-4xl">
              Testimonial
            </h1>

            <p className="max-w-[700px] font-medium leading-[170%] text-gray">
              Temukan inspirasi dari berbagai testimoni mahasiswa yang telah
              merasakan manfaat pembelajaran bersama RuangObat. Bukti nyata
              kualitas yang kami tawarkan.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 items-start gap-4 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="size-full rounded-xl" />
              ))}
            </div>
          ) : (
            <>
              <TestimonialCardSection
                title="Testimonial Ruang Sarjana & Diplomasi Farmasi 🎬"
                items={data?.data.videocourse || []}
                onOpen={onOpen}
                setTestimonialImage={setTestimonialImage}
              />

              <TestimonialCardSection
                title="Testimonial Ruang Private 1 on 1 Farmasi 📋"
                items={data?.data.private || []}
                onOpen={onOpen}
                setTestimonialImage={setTestimonialImage}
              />

              <TestimonialCardSection
                title="Testimonial Ruang Skripsi Farmasi 📚"
                items={data?.data.theses || []}
                onOpen={onOpen}
                setTestimonialImage={setTestimonialImage}
              />

              <TestimonialCardSection
                title="Testimonial Ruang Riset Farmasi 🔍"
                items={data?.data.research || []}
                onOpen={onOpen}
                setTestimonialImage={setTestimonialImage}
              />

              <TestimonialCardSection
                title="Testimonial Ruang Masuk Apoteker 💊"
                items={data?.data.apotekerclass || []}
                onOpen={onOpen}
                setTestimonialImage={setTestimonialImage}
              />

              <TestimonialCardSection
                title="Testimonial Ruang OSCE & UKMPPAI 📋"
                items={data?.data.tryout || []}
                onOpen={onOpen}
                setTestimonialImage={setTestimonialImage}
              />
            </>
          )}
        </section>
      </Layout>

      <Footer />
    </>
  );
}

type TestimonialCardSectionProps = {
  title: string;
  items: TestimonialImage[];
  onOpen: () => void;
  setTestimonialImage: (url: string) => void;
};

function TestimonialCardSection({
  title,
  items,
  onOpen,
  setTestimonialImage,
}: TestimonialCardSectionProps) {
  return (
    <div className="grid gap-6">
      <h2 className="text-lg font-extrabold text-black md:text-2xl">{title}</h2>

      <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.length ? (
          items.map((item) => (
            <div
              key={item.testimonial_id}
              onClick={() => {
                onOpen();
                setTestimonialImage(item.img_url);
              }}
              className="group aspect-square h-[360px] w-full overflow-hidden rounded-xl border-2 border-gray/10"
            >
              <Image
                src={item.img_url}
                alt="testi image"
                width={1000}
                height={1000}
                className="h-full w-full object-cover object-center transition-all group-hover:scale-110 group-hover:cursor-pointer"
                priority
              />
            </div>
          ))
        ) : (
          <div className="rounded-xl border-2 border-dashed border-gray/20 sm:col-span-2 xl:col-span-4">
            <EmptyData text="Belum ada testimonial" />
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      token: session ? (session?.user.access_token as string) : "",
    },
  };
};
