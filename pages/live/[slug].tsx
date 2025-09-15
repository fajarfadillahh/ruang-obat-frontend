import ButtonBack from "@/components/button/ButtonBack";
import CTAPrivateClass from "@/components/cta/CTAPrivateClass";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { Chip } from "@nextui-org/react";

export default function StreamPage() {
  const embedLink = "https://www.youtube.com/embed/jfKfPfyJRdk";
  const title =
    "Meet The Expert Explore Your Future: Pengenalan Bidang dan Profesi di Dunia Farmasi";

  return (
    <>
      <Layout
        title="Meet The Expert Explore Your Future: Pengenalan Bidang dan Profesi di Dunia Farmasi"
        description="Ikuti sesi belajar interaktif langsung dengan pengajar berpengalaman. Dapatkan penjelasan mendalam, diskusi dua arah, dan pembelajaran efektif."
      >
        <ButtonBack />

        <section className="base-container gap-4 [padding:50px_0_100px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="line-clamp-2 max-w-[700px] text-2xl font-extrabold text-black">
              {title}
            </h1>

            <Chip
              color="danger"
              startContent={
                <span className="relative isolate flex size-4 items-center justify-center">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-white" />
                  <span className="relative inline-flex size-3 rounded-full bg-white" />
                </span>
              }
              classNames={{
                base: "px-2 gap-[2px]",
                content: "font-bold capitalize text-white",
              }}
            >
              Live
            </Chip>
          </div>

          <div className="flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-gray/10">
            <iframe
              allowFullScreen
              title={title}
              src={embedLink}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            ></iframe>
          </div>
        </section>

        <CTAPrivateClass />
      </Layout>

      <Footer />
    </>
  );
}
