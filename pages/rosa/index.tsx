import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import TextHighlight from "@/components/text/TextHighlight";
import Layout from "@/components/wrapper/Layout";
import { siteROSAPage } from "@/data/site";
import { scrollToSection } from "@/utils/scrollToSection";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { Sparkle } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function RosaPage() {
  const router = useRouter();
  const learnMore = useRef<HTMLElement | null>(null);

  return (
    <>
      <Layout
        title="Apoteker ROSA: Partner Virtual Farmasi Pertama di Indonesia"
        description="Apoteker ROSA, smart assistant AI untuk mahasiswa farmasi. Belajar jadi lebih praktis, cepat, dan efisien dengan panduan pintar berbasis teknologi."
      >
        <section className="base-container items-center gap-4 [padding:50px_0_100px] xl:grid-cols-2">
          <div className="grid gap-4">
            <h1 className="text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl md:text-4xl lg:text-5xl">
              Apoteker ROSA:
              <br />{" "}
              <TextHighlight
                text="Partner Virtual Farmasi"
                className="font-black"
              />{" "}
              Pertama di Indonesia
            </h1>

            <p className="mb-8 font-medium leading-[170%] text-gray">
              Apoteker ROSA adalah{" "}
              <TextHighlight text="smart assistant berbasis AI" /> yang
              dirancang khusus untuk membantu kamu dalam{" "}
              <TextHighlight
                text="proses
              pembelajaran secara praktis, cepat, dan efisien."
                className="lowercase"
              />{" "}
              Dengan kecerdasan buatan yang terus berkembang, ROSA mampu
              menjawab berbagai pertanyaan seputar dunia farmasi, persiapan
              masuk profesi apoteker, hingga rekomendasi sumber belajar yang
              relevan.
            </p>

            <div className="grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                color="secondary"
                endContent={<Sparkle weight="duotone" size={20} />}
                onClick={() => router.push("/rosa/chat")}
                className="px-6 font-bold"
              >
                Tanya ROSA Sekarang
              </Button>

              <Button
                variant="bordered"
                onClick={() => scrollToSection(learnMore)}
                className="px-6 font-bold"
              >
                Pelajari Lebih Lanjut!
              </Button>
            </div>
          </div>

          <Image
            priority
            src="https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-1.webp"
            alt="apoteker rosa image"
            width={1000}
            height={1000}
            className="h-auto w-full justify-self-center"
          />
        </section>

        <section ref={learnMore} className="base-container gap-12 py-[100px]">
          <h2 className="max-w-[900px] justify-self-center text-center text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl md:text-4xl">
            Belajar udah berkali-kali,{" "}
            <span className="text-purple">tapi masih bingung?</span> Materi
            diulang, <span className="text-purple">tetap aja belum masuk?</span>
          </h2>

          <Image
            priority
            src="https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-3.webp"
            alt="apoteker rosa image"
            width={900}
            height={1000}
            className="justify-self-center"
          />

          <h2 className="text-center text-xl font-semibold leading-[170%] text-black md:text-3xl md:leading-[150%]">
            Kini saatnya beralih ke solusi yang lebih cerdas. Apoteker ROSA
            hadir sebagai asisten pintar yang siap membantu menjawab berbagai
            pertanyaan seputar dunia farmasi. Dengan penjelasan yang mudah
            dipahami dan akses 24 jam, kamu tidak perlu lagi belajar sendirian.
            ROSA akan menemani proses belajarmu, kapan pun kamu butuh.
          </h2>
        </section>

        <section className="base-container gap-8 py-[100px]">
          <h2 className="max-w-[600px] justify-self-center text-center text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl md:text-4xl">
            Mengapa Pilih <span className="text-purple">Apoteker ROSA</span>{" "}
            sebagai Asisten Belajar?
          </h2>

          <div className="grid items-start gap-4 sm:grid-cols-2">
            {siteROSAPage.reasoning.map((item, index) => (
              <div
                key={index}
                className="grid h-auto w-full gap-4 rounded-xl border-2 border-gray/10 p-8"
              >
                <item.icon weight="duotone" size={64} className="text-purple" />

                <div className="grid gap-2">
                  <h3 className="text-xl font-extrabold capitalize text-black">
                    {item.title}
                  </h3>

                  <p className="font-medium leading-[170%] text-gray">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="base-container gap-8 py-[100px]">
          <h2 className="max-w-[700px] justify-self-center text-center text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl md:text-4xl">
            Saat bingung belajar,{" "}
            <span className="text-purple">Apoteker ROSA</span> yang selalu siap
            bantu.
          </h2>

          <Image
            priority
            src="https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-2.webp"
            alt="apoteker rosa image"
            width={3056}
            height={2000}
            className="justify-self-center"
          />
        </section>

        <section className="base-container gap-4 py-[100px] md:gap-8">
          <h2 className="text-center text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl md:text-4xl">
            <span className="text-purple">1000+</span> Mahasiswa Sudah Mencoba
          </h2>

          <div className="testimonial-container overflow-hidden">
            <Swiper
              loop={true}
              slidesPerView={"auto"}
              spaceBetween={16}
              // centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
              {siteROSAPage.testimonial.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="max-w-[330px] lg:max-w-[276px]"
                >
                  <div className="base-card group divide-y-2 divide-dashed divide-gray/20 p-6 [margin:1rem_0]">
                    <div className="flex items-center gap-4 pb-4">
                      <Image
                        priority
                        src="https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/avatar-img/avatar-male.svg"
                        alt="avatar"
                        width={100}
                        height={100}
                        className="aspect-square size-10 rounded-full bg-purple/20"
                      />

                      <h3 className="font-bold text-black">{item.name}</h3>
                    </div>

                    <p className="line-clamp-3 pt-4 text-sm font-medium leading-[170%] text-gray">
                      {item.comment}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="base-container gap-8 py-[100px]">
          <h2 className="max-w-[700px] justify-self-center text-center text-2xl font-black capitalize -tracking-wide text-black xs:text-3xl md:text-4xl">
            Pertanyaan yang sering ditanyakan tentang{" "}
            <span className="text-purple">Apoteker ROSA</span>
          </h2>

          <Accordion defaultExpandedKeys={["0"]}>
            {siteROSAPage.faqs.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.question}
                // startContent={<item.icon />}
                classNames={{
                  title: "text-lg text-black font-bold xs:text-xl",
                  indicator: "text-black",
                  content: "text-gray leading-[170%] font-medium pb-8",
                }}
              >
                {item.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <CTASecondary />
      </Layout>

      <Footer />
    </>
  );
}
