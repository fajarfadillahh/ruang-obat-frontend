import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { siteTestimonials } from "@/config/site";
import { Quotes } from "@phosphor-icons/react";
import Image from "next/image";

export default function TestimonialsPage() {
  return (
    <>
      <Layout
        title="Testimonial Mereka Tentang Kami"
        description="Simak cerita dan pengalaman para mahasiswa yang telah mengikuti program kami. Testimoni nyata dari mereka yang telah merasakan manfaat langsung dari pembelajaran di RuangObat."
      >
        <BreadcrumbsUrl rootLabel="Home" basePath="/" />

        <section className="base-container gap-8 pb-[100px]">
          <div className="grid justify-items-center gap-2 text-center">
            <h1 className="text-4xl font-black -tracking-wide text-black">
              Testimonial
            </h1>

            <p className="max-w-[700px] font-medium leading-[170%] text-gray">
              Temukan inspirasi dari berbagai testimoni mahasiswa yang telah
              merasakan manfaat pembelajaran bersama RuangObat. Bukti nyata
              kualitas yang kami tawarkan.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-8">
            {siteTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="grid gap-12 rounded-xl bg-white p-6 [box-shadow:0_0_12px_rgba(0,0,0,0.1)]"
              >
                <div className="grid gap-1">
                  <Quotes weight="fill" size={48} className="text-purple" />

                  <h4 className="text-xl font-black text-black">
                    {testimonial.comment}
                  </h4>
                </div>

                <div className="grid gap-4">
                  <Image
                    src="/img/avatar-male.svg"
                    alt="avatar"
                    width={100}
                    height={100}
                    className="aspect-square size-14 rounded-full bg-purple/20"
                  />

                  <div className="grid">
                    <h5 className="font-bold text-black">{testimonial.name}</h5>

                    <p className="leading-[170%] text-gray">
                      {testimonial.university}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
