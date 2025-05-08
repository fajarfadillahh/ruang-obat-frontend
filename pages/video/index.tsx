import BreadcrumbsUrl from "@/components/BreadcrumbsUrl";
import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";

export default function LearningVideosPage() {
  return (
    <>
      <Layout
        title="Video Pembelajaran Farmasi"
        description="Akses seluruh video pembelajaran eksklusif dari RuangObat untuk mendukung proses belajarmu. Solusi praktis untuk membantu kamu belajar kapan saja dan di mana saja dengan sangat lengkap dan mudah dipahami."
      >
        <BreadcrumbsUrl rootLabel="Beranda" basePath="/" />

        <section>learning videos page</section>
      </Layout>

      <Footer />
    </>
  );
}
