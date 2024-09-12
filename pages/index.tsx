import CbtLayout from "@/components/layout/cbt/CbtLayout";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";

export default function HomePage() {
  return (
    <CbtLayout title="Landing Page">
      <div className="relative grid min-h-[calc(100vh-96px)] grid-cols-[1fr_480px] items-center gap-4 py-8">
        <div className="grid max-w-[580px] gap-10">
          <div className="grid gap-4">
            <p className="font-medium text-default">
              👋 Selamat datang di Ruang Obat
            </p>
            <h1 className="text-[72px] font-black leading-[100%] -tracking-wide text-foreground">
              Rumah Ujian Para Mahasiswa Farmasi{" "}
              <AvatarGroup size="lg" className="inline-flex">
                <Avatar src="/img/home-avatar-1.png" />
                <Avatar src="/img/home-avatar-2.png" />
                <Avatar src="/img/home-avatar-3.png" />
              </AvatarGroup>
            </h1>
            <p className="font-medium leading-[170%] text-default">
              Kami berfokus untuk memberikan tempat ujian yang disesuaikan
              dengan kebutuhan. Sumber soal-soal yang relevan, serta komunitas
              yang suportif, dan peluang untuk mengasah kemampuan berfikirmu.
            </p>
          </div>

          <div className="inline-flex items-center gap-4">
            <Button
              variant="solid"
              endContent={<ArrowRight weight="bold" size={16} />}
              className="bg-secondary px-4 font-bold text-white"
            >
              Halaman Dashboard
            </Button>

            <Button
              variant="bordered"
              className="border-1 border-foreground px-4 font-bold text-foreground"
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
          className="h-auto w-full justify-self-end"
        />
      </div>
    </CbtLayout>
  );
}
