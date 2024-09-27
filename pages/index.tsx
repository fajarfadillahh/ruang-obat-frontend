import Layout from "@/components/wrapper/Layout";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  return (
    <Layout title="Rumah Ujian Para Mahasiswa Farmasi">
      <div className="relative mx-auto grid max-w-[600px] items-center gap-10 lg:max-w-[700px] xl:max-w-none xl:grid-cols-[1fr_450px] xl:gap-4">
        <div className="grid gap-10 justify-self-center lg:max-w-[580px] xl:justify-self-start">
          <div className="grid gap-4">
            <p className="font-medium text-gray">
              👋 Selamat datang di Ruang Obat
            </p>
            <h1 className="text-[48px] font-black leading-[100%] -tracking-wide text-black md:text-[56px] lg:text-[72px]">
              Rumah Ujian Para Mahasiswa Farmasi{" "}
              <AvatarGroup size="lg" className="hidden lg:inline-flex">
                <Avatar src="/img/home-avatar-1.png" />
                <Avatar src="/img/home-avatar-2.png" />
                <Avatar src="/img/home-avatar-3.png" />
              </AvatarGroup>
            </h1>
            <p className="font-medium leading-[170%] text-gray">
              Kami berfokus untuk memberikan tempat ujian yang disesuaikan
              dengan kebutuhan. Sumber soal-soal yang relevan, serta komunitas
              yang suportif, dan peluang untuk mengasah kemampuan berfikirmu.
            </p>
          </div>

          <div className="grid gap-2 sm:inline-flex sm:items-center sm:gap-4">
            <Button
              variant="solid"
              color="secondary"
              endContent={<ArrowRight weight="bold" size={16} />}
              onClick={() => {
                if (window.location.host == "localhost:3000") {
                  router.push("/dashboard");
                } else {
                  window.open("https://cbt.ruangobat.id/dashboard", "_blank");
                }
              }}
              className="px-4 font-bold"
            >
              Halaman Dashboard
            </Button>

            <Button
              variant="bordered"
              className="border-black px-4 font-bold text-black"
              onClick={() => {
                if (window.location.host == "localhost:3000") {
                  router.push("/dashboard");
                } else {
                  window.open(
                    "https://cbt.ruangobat.id/auth/register",
                    "_blank",
                  );
                }
              }}
            >
              Mulai Ujian Sekarang!
            </Button>
          </div>
        </div>

        <Image
          priority
          src="/img/home-img.png"
          alt="home img"
          width={396}
          height={512}
          className="h-auto w-full justify-self-center xl:justify-self-end"
        />
      </div>
    </Layout>
  );
}
