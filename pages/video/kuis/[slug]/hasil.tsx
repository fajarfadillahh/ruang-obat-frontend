import Footer from "@/components/footer/Footer";
import Layout from "@/components/wrapper/Layout";
import { useRouter } from "next/router";

export default function VideoLearningClassResultQuizPage() {
  const router = useRouter();
  const { slug } = router.query;

  const decodedSlug = decodeURIComponent(slug as string)
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Layout title={`Hasil ${decodedSlug}`}>
        <section>result ujian</section>
      </Layout>

      <Footer />
    </>
  );
}
