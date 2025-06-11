import CTASecondary from "@/components/cta/CTASecondary";
import Footer from "@/components/footer/Footer";
import TextHighlight from "@/components/TextHighlight";
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
        title="Apoteker ROSA"
        description="Apoteker ROSA adalah smart assistant berbasis AI yang dirancang khusus untuk membantu mahasiswa farmasi dalam proses pembelajaran secara praktis, cepat, dan efisien."
      >
        <section className="base-container items-center gap-4 [padding:50px_0_100px] xl:grid-cols-[1fr_500px] xl:gap-0">
          <div className="grid gap-4">
            <h1 className="text-4xl font-black capitalize -tracking-wide text-black xs:text-5xl xl:text-6xl">
              Apoteker ROSA:{" "}
              <span className="relative inline-block before:absolute before:-inset-1 before:-z-10 before:block before:bg-purple">
                <span className="relative text-white">Smart Assistant</span>
              </span>
              Pendamping Belajar Mahasiswa Farmasi
            </h1>

            <p className="mb-8 font-medium leading-[170%] text-gray">
              Apoteker ROSA adalah{" "}
              <TextHighlight text="smart assistant berbasis AI" />
              yang dirancang khusus untuk membantu kamu dalam{" "}
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
            src="/img/ai/APOTEKER-ROSA-1.webp"
            alt="apoteker rosa image"
            width={1000}
            height={1000}
            className="justify-self-center"
          />
        </section>

        <section ref={learnMore} className="base-container gap-12 py-[100px]">
          <h1 className="max-w-[900px] justify-self-center text-center text-4xl font-black capitalize -tracking-wide text-black">
            Belajar udah berkali-kali,{" "}
            <span className="text-purple">tapi masih bingung?</span> Materi
            diulang, <span className="text-purple">tetap aja belum masuk?</span>
          </h1>

          <Image
            priority
            src="/img/ai/APOTEKER-ROSA-3.webp"
            alt="apoteker rosa image"
            width={900}
            height={1000}
            className="justify-self-center"
          />

          <h4 className="text-center text-3xl font-medium leading-[140%] text-black">
            Kini saatnya beralih ke solusi yang lebih cerdas. Apoteker ROSA
            hadir sebagai{" "}
            <TextHighlight
              text="asisten pintar yang siap membantu menjawab berbagai
            pertanyaan seputar dunia farmasi."
              className="font-extrabold lowercase"
            />{" "}
            Dengan penjelasan yang mudah dipahami dan akses 24 jam, kamu tidak
            perlu lagi belajar sendirian. ROSA akan menemani proses belajarmu,{" "}
            <TextHighlight
              text="kapan pun kamu butuh."
              className="font-extrabold lowercase"
            />
          </h4>

          <Button
            color="secondary"
            endContent={<Sparkle weight="duotone" size={20} />}
            onClick={() => router.push("/rosa/chat")}
            className="justify-self-center px-6 font-bold"
          >
            Tanya ROSA Sekarang
          </Button>
        </section>

        <section className="base-container gap-8 py-[100px]">
          <h1 className="max-w-[600px] justify-self-center text-center text-4xl font-black capitalize -tracking-wide text-black">
            Mengapa Pilih <span className="text-purple">Apoteker ROSA</span>{" "}
            sebagai Asisten Belajar?
          </h1>

          <div className="grid items-start gap-4 sm:grid-cols-2">
            {siteROSAPage.reasoning.map((item, index) => (
              <div
                key={index}
                className="grid h-auto w-full gap-4 rounded-xl bg-white p-8 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]"
              >
                <item.icon weight="duotone" size={64} className="text-purple" />

                <div className="grid gap-2">
                  <h4 className="text-xl font-extrabold capitalize text-black">
                    {item.title}
                  </h4>

                  <p className="font-medium leading-[170%] text-gray">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button
            color="secondary"
            endContent={<Sparkle weight="duotone" size={20} />}
            onClick={() => router.push("/rosa/chat")}
            className="justify-self-center px-6 font-bold"
          >
            Tanya ROSA Sekarang
          </Button>
        </section>

        <section className="base-container gap-8 py-[100px]">
          <h1 className="max-w-[700px] justify-self-center text-center text-4xl font-black capitalize -tracking-wide text-black">
            Saat bingung belajar,{" "}
            <span className="text-purple">Apoteker ROSA</span> yang selalu siap
            bantu.
          </h1>

          <Image
            priority
            src="/img/ai/APOTEKER-ROSA-2.webp"
            alt="apoteker rosa image"
            width={3056}
            height={2000}
            className="justify-self-center"
          />

          <Button
            color="secondary"
            endContent={<Sparkle weight="duotone" size={20} />}
            onClick={() => router.push("/rosa/chat")}
            className="justify-self-center px-6 font-bold"
          >
            Tanya ROSA Sekarang
          </Button>
        </section>

        <section className="base-container gap-8 py-[100px]">
          <h1 className="text-center text-4xl font-black capitalize -tracking-wide text-black">
            <span className="text-purple">1000+</span> Mahasiswa Sudah Mencoba
          </h1>

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
                  <div className="group grid divide-y-2 divide-dashed divide-gray/20 overflow-hidden rounded-xl bg-white p-6 [box-shadow:0_0_12px_rgba(0,0,0,0.1)] [margin:1rem_0]">
                    <div className="flex items-center gap-4 pb-4">
                      <Image
                        src="/img/avatar-male.svg"
                        alt="avatar"
                        width={100}
                        height={100}
                        className="aspect-square size-10 rounded-full bg-purple/20"
                      />

                      <h1 className="font-bold text-black">{item.name}</h1>
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
          <h1 className="max-w-[700px] justify-self-center text-center text-4xl font-black capitalize -tracking-wide text-black">
            Pertanyaan yang sering ditanyakan tentang{" "}
            <span className="text-purple">Apoteker ROSA</span>
          </h1>

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
