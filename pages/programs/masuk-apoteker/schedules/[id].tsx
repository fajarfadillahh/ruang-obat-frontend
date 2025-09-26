import ButtonBack from "@/components/button/ButtonBack";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import Image from "next/image";

export default function DetailsTestSchedulesPage() {
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
              src="https://ruangobat.is3.cloudhost.id/statics/images/ruangobat-logo/default-thumbnail.png"
              alt="default img"
              width={500}
              height={500}
              className="aspect-square rounded-xl object-cover object-center xl:sticky xl:left-0 xl:top-[110px]"
              loading="lazy"
            />

            <div className="grid gap-6">
              <h1 className="text-2xl font-black -tracking-wide text-black md:text-3xl lg:text-4xl">
                Ujian Masuk Apoteker Universitas Pancasila
              </h1>

              <div className="mb-10 grid gap-4 xl:grid-cols-[repeat(3,max-content)] xl:gap-8">
                {[
                  ["Tanggal Pendaftaran", "29 Agustus 2025 - 10 Oktoker 2025"],
                  ["Tanggal Ujian", "15 Oktoker 2025"],
                  ["Status Pendaftaran", "Belum dibuka"],
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

                <p className="font-medium leading-[170%] text-gray">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem, praesentium atque. Recusandae, accusamus minus officia
                  earum consectetur cupiditate dolores repellendus atque animi
                  ratione, voluptatum ullam modi et tenetur fuga odio.
                  Praesentium repudiandae eius aliquid dignissimos? Quos
                  commodi, non provident accusamus nisi, atque quibusdam numquam
                  fuga nostrum excepturi blanditiis hic. Hic incidunt voluptas
                  laboriosam quis suscipit debitis, dolorum maxime, eveniet
                  nesciunt deserunt vero facilis reprehenderit, a perspiciatis
                  deleniti nostrum exercitationem praesentium nisi sequi odit?
                  Quibusdam ratione accusamus architecto sed exercitationem
                  commodi a aspernatur facilis! Voluptatibus neque repellendus
                  minus ratione repellat laborum blanditiis perferendis nisi
                  velit accusantium libero molestias sint voluptas numquam hic
                  nihil corrupti doloremque laudantium perspiciatis asperiores
                  ab, quaerat corporis. Deserunt, veniam corrupti minima illum
                  beatae ad tempora eum fugit nobis quidem, tempore asperiores
                  hic ea quaerat perferendis nisi, a officiis dolorem cupiditate
                  consequuntur! Dicta, ipsam eligendi. Quas deserunt doloribus,
                  consequatur eum consectetur rerum rem hic consequuntur eaque
                  voluptas dolorem, iusto provident, ipsam facilis libero! Eaque
                  velit laborum explicabo aliquid corporis dicta, dolorum,
                  delectus asperiores pariatur eum saepe harum omnis
                  dignissimos, placeat iusto labore beatae nihil tempora illum
                  sed veritatis nobis ipsam? Nobis, harum rem porro voluptas
                  impedit corporis molestiae doloribus quasi omnis quaerat
                  mollitia voluptatem quisquam nemo reiciendis minima architecto
                  quas beatae ipsa inventore minus alias nam sed. Vel, maxime
                  non dolorem quaerat nam ipsam. Voluptate necessitatibus,
                  aliquid labore unde, ullam consectetur aut a doloremque error
                  porro voluptas temporibus praesentium doloribus, repudiandae
                  eum? Necessitatibus, sed facere, explicabo inventore
                  repudiandae nemo ipsum aut quis reiciendis rerum illum quasi
                  magnam pariatur suscipit! Eos alias ipsa sed eum voluptatem
                  est! Minima est sint, fugit laudantium ut quibusdam quam
                  dolorum ex amet maxime corrupti, molestiae, vero aut porro
                  molestias! Ut provident molestias perspiciatis quidem cum,
                  reprehenderit soluta impedit, asperiores nihil non ipsa
                  temporibus sequi quam voluptas ipsam. Adipisci sit eos iure
                  quasi magnam commodi culpa harum accusamus, earum aut incidunt
                  esse hic voluptatibus illo saepe aliquid minus possimus. Dicta
                  minima molestias, perspiciatis officia illo, ullam natus,
                  voluptatem accusamus numquam obcaecati laudantium! Reiciendis
                  voluptates quidem provident optio maiores expedita at.
                  Suscipit minus recusandae officia itaque impedit tenetur
                  dignissimos beatae placeat accusamus reiciendis, quasi
                  repellendus maxime aspernatur excepturi mollitia dolore
                  consectetur, natus consequuntur? Sequi, minima quidem! Enim
                  officiis nulla odit inventore pariatur voluptatem culpa
                  maiores, id quo doloribus dignissimos quasi, consectetur,
                  facilis veniam optio itaque suscipit sunt unde iusto vero.
                  Rerum impedit incidunt neque quisquam possimus deleniti
                  doloremque saepe eveniet nulla. Quis soluta repudiandae fuga
                  voluptate, cum nobis blanditiis doloribus perspiciatis, nam
                  hic harum dolor asperiores tempore esse ad voluptates quidem
                  quia exercitationem doloremque. Molestiae, assumenda porro
                  atque libero corrupti perspiciatis quis exercitationem esse
                  praesentium facere. Ullam officiis, cupiditate ad minima error
                  consectetur temporibus quis nobis numquam dolorum incidunt
                  enim velit soluta minus, culpa atque quo eius ipsum deserunt
                  beatae suscipit! Dolore illo beatae totam neque architecto ex
                  molestias est, porro reprehenderit facere aliquam veniam
                  ducimus similique, nihil, minus temporibus quidem quo odio
                  ipsam officia! Cum vitae ab praesentium, ducimus sequi
                  laboriosam cupiditate soluta, quis est, hic vero veritatis?
                  Eveniet laudantium a nemo quisquam quae.
                </p>
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
