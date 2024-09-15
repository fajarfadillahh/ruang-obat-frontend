import CbtLayout from "@/components/layout/cbt/CbtLayout";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  return (
    <CbtLayout title="Landing Page">
      <div className="relative grid grid-cols-[1fr_480px] items-center gap-4">
        <div className="grid max-w-[580px] gap-10">
          <div className="grid gap-4">
            <p className="text-gray font-medium">
              👋 Selamat datang di Ruang Obat
            </p>
            <h1 className="text-[72px] font-black leading-[100%] -tracking-wide text-black">
              Rumah Ujian Para Mahasiswa Farmasi{" "}
              <AvatarGroup size="lg" className="inline-flex">
                <Avatar src="/img/home-avatar-1.png" />
                <Avatar src="/img/home-avatar-2.png" />
                <Avatar src="/img/home-avatar-3.png" />
              </AvatarGroup>
            </h1>
            <p className="text-gray font-medium leading-[170%]">
              Kami berfokus untuk memberikan tempat ujian yang disesuaikan
              dengan kebutuhan. Sumber soal-soal yang relevan, serta komunitas
              yang suportif, dan peluang untuk mengasah kemampuan berfikirmu.
            </p>
          </div>

          <div className="inline-flex items-center gap-4">
            <Button
              variant="solid"
              color="secondary"
              endContent={<ArrowRight weight="bold" size={16} />}
              onClick={() => router.push("/cbt")}
              className="px-4 font-bold"
            >
              Halaman Dashboard
            </Button>

            <Button
              variant="bordered"
              className="border-black px-4 font-bold text-black"
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
