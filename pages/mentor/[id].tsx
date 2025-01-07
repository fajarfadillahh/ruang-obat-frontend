import ButtonBack from "@/components/button/ButtonBack";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import Image from "next/image";

export default function DetailMentorPage() {
  return (
    <>
      <Layout title="Mentor - Nama Mentor Disini">
        <div className="grid gap-8">
          <ButtonBack />

          <section className="mx-auto grid max-w-[600px] gap-8 pb-[40px] lg:max-w-[700px] xl:max-w-none xl:grid-cols-2 xl:items-start">
            <div className="grid gap-8">
              <Image
                priority
                src={"/img/mentors/kak-disel-riset-sains-dan-teknologi.webp"}
                alt="mentor img"
                width={480}
                height={480}
                className="aspect-square h-auto w-full rounded-xl xl:max-w-[480px]"
              />

              <div className="grid gap-3">
                <h2 className="max-w-[420px] text-xl font-black -tracking-wide text-black xl:text-[28px]">
                  Dhecella Winy Cintya Ningrum
                  <br />
                  (Kak Disel)
                </h2>
                <p className="font-medium leading-[170%] text-gray">
                  Mentor Riset Sains & Teknologi
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              <h2 className="max-w-[420px] text-xl font-black -tracking-wide text-black xl:text-[28px]">
                Deskripsi Singkat
              </h2>

              <p className="font-medium leading-[170%] text-gray">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus vitae eaque, repellat sequi delectus, voluptates
                tempora velit iusto cum magni dolor quisquam obcaecati deleniti
                nobis quod esse? Quos, incidunt dolorum.
                <br />
                <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
                cupiditate earum, asperiores dolore ad harum iste iusto maxime
                recusandae aspernatur nostrum optio fuga ducimus, eaque dolorum
                facere commodi dignissimos magni? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ducimus magnam, iste corrupti
                accusamus sapiente tempora esse perspiciatis atque odio. Aliquid
                libero sit, id sequi expedita est perferendis voluptas
                recusandae illum?
                <br />
                <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
                officia veniam eos tempora rem illum, provident eius quasi
                voluptatem consequuntur cupiditate dignissimos aperiam unde
                deleniti alias vitae tenetur? Nobis, beatae? Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Maiores perspiciatis
                animi labore tempora sunt laudantium repellendus eos iste
                voluptate. Temporibus soluta consequatur itaque nemo similique,
                distinctio dolores est non autem! Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Officia rem accusamus corrupti
                porro, excepturi dicta natus odio itaque qui, ducimus modi
                libero nulla, rerum quia deleniti. Eos tenetur fugiat impedit?
              </p>
            </div>
          </section>

          <CTAMain />
        </div>
      </Layout>

      <Footer />
    </>
  );
}
