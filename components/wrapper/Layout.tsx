import ModalUnauthenticated from "@/components/modal/ModalUnauthenticated";
import NavbarMenu from "@/components/navbar/NavbarMenu";
import { AppContext } from "@/context/AppContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";

interface LayoutProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Layout({ title, children, className }: LayoutProps) {
  const router = useRouter();
  const ctx = useContext(AppContext);

  return (
    <>
      <Head>
        <title>{`${title} | Ruangobat.id`}</title>
        <meta
          name="description"
          content="RuangObat merupakan platform belajar farmasi private No.1 di Indonesia untuk seluruh mahasiswa di Indonesia. Terdapat banyak program menarik, mulai dari Kelas Mata Kuliah & Praktikum, Kelas Skripsi & Riset, Kelas Masuk Apoteker & OSCE, Serta TryOut UKMPPAI."
        />
        <meta
          name="description"
          content="Di website RuangObat kalian akan dapat mengakses berbagai program. Mari raih gelar sarjana dan apotekermu bersama RuangObat #bimbelfarmasi #cukupdisiniaja."
        />
        <meta
          name="keywords"
          content="ruangobat, ruangobat.id, ruangobat id, ruang obat id, ruangobat ujian, ruangobat ujian online, ruangobat farmasi, ruangobat tryout, ruangobat tes, ujian online ruangobat, platform ujian mahasiswa farmasi, belajar farmasi online, tryout farmasi online, tes farmasi online, latihan soal farmasi, simulasi ujian farmasi, platform belajar farmasi, ujian online farmasi terpercaya kelas apoteker, kelas masuk apoteker, program apoteker, praktikum apoteker, ujian tryout apoteker, ujian praktikum apoteker, ujian praktikum farmasi, ujian praktikum jurusan farmasi, tryout juruan apoteker, ujian juruan apoteker, kelas masuk apoteker, kelas apoteker, kelas farmasi, kelas jurusan apoteker, kelas jurusan farmasi, kelas skripsi dan riset apoteker, kelas skripsi dan riset farmasi, ujian UKMPPAI, tryout UKMPPAI, skripsi apoteker, skripsi farmasi, ujian online apoteker, kelas online apoteker, kelas online farmasi"
        />
        <meta property="og:title" content={`${title} | Ruangobat.id`} />
        <meta
          property="og:description"
          content="RuangObat merupakan platform belajar farmasi private No.1 di Indonesia untuk seluruh mahasiswa di Indonesia. Terdapat banyak program menarik, mulai dari Kelas Mata Kuliah & Praktikum, Kelas Skripsi & Riset, Kelas Masuk Apoteker & OSCE, Serta TryOut UKMPPAI."
        />
        <meta
          property="og:description"
          content="Di website RuangObat kalian akan dapat mengakses berbagai program. Mari raih gelar sarjana dan apotekermu bersama RuangObat #bimbelfarmasi #cukupdisiniaja."
        />
      </Head>

      <NavbarMenu />

      <div className="mx-auto grid w-full max-w-[1200px] px-6 xl:px-0">
        <main className={`${className} min-h-[calc(100vh-96px)] pb-16 pt-6`}>
          <ModalUnauthenticated
            isOpen={ctx?.isOpenUnauthenticated as boolean}
            onClose={ctx?.onCloseUnauthenticated as () => void}
          />

          {children}
        </main>

        {/* {router.pathname === "https://cbt.ruangobat.id/" ? (
          <FooterSimple />
        ) : null} */}
      </div>
    </>
  );
}
