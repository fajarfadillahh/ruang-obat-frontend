export type SiteConfig = typeof siteConfig;
import {
  ClipboardText,
  CloudSun,
  Gift,
  Globe,
  GraduationCap,
  Headset,
  InstagramLogo,
  Notebook,
  NotePencil,
  PencilRuler,
  Pill,
  RocketLaunch,
  Target,
  TiktokLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";

export const siteConfig = {
  reasons: [
    {
      id: 1,
      title: "Program Menarik & Lengkap",
      icon: GraduationCap,
      text: "Beragam pilihan program farmasi mulai dari mata kuliah, riset, hingga persiapan apoteker. Semua tersedia di satu tempat.",
    },
    {
      id: 2,
      title: "Soal Ujian yang Up-to-Date",
      icon: ClipboardText,
      text: "Soal-soal ujian terbaru yang sesuai blueprint terkini, membuat persiapan makin maksimal dengan kualitas terbaik.",
    },
    {
      id: 3,
      title: "Website Nyaman & Responsif",
      icon: RocketLaunch,
      text: "Akses belajar nyaman dengan website yang responsif. Bisa diakses kapan aja, di mana aja, dan tanpa hambatan.",
    },
  ],
  programs: [
    {
      id: 1,
      title: "Kelas Mata Kuliah & Praktikum",
      icon: PencilRuler,
      text: "Dapatkan pemahaman mendalam tentang mata kuliah farmasi sekaligus pengalaman praktikum yang aplikatif.",
    },
    {
      id: 2,
      title: "Kelas Masuk Apoteker & OSCE",
      icon: Pill,
      text: "Persiapkan diri kamu untuk ujian masuk Apoteker dan OSCE dengan latihan intensif di kelas ini.",
    },
    {
      id: 3,
      title: "Kelas Skripsi & Riset",
      icon: Notebook,
      text: "Butuh bimbingan buat skripsi atau riset? Di kelas ini, kamu bakal dipandu langsung oleh para mentor.",
    },
    {
      id: 4,
      title: "TryOut UKMPPAI",
      icon: Target,
      text: "Rangkaian soal didesain sesuai blueprint terbaru untuk menguji kesiapan kamu dalam ujian.",
    },
  ],
  mentors: [
    {
      id: 1,
      image: "/img/mentors/kak-asma-farmakologi-dan-toksikologi.webp",
      name: "Kak Asma",
      mentor_title: "Mentor Farmakologi dan Toksikologi",
    },
    {
      id: 2,
      image: "/img/mentors/kak-aurel-farmasi-klinis.webp",
      name: "Kak Aurel",
      mentor_title: "Mentor Farmasi Klinis",
    },
    {
      id: 3,
      image: "/img/mentors/kak-azka-teknologi-farmasi.webp",
      name: "Kak Azka",
      mentor_title: "Mentor Teknologi Farmasi",
    },
    {
      id: 4,
      image: "/img/mentors/kak-daffa-kimia-farmasi.webp",
      name: "Kak Daffa",
      mentor_title: "Mentor Kimia Farmasi",
    },
    {
      id: 5,
      image: "/img/mentors/kak-dellia-formulasi.webp",
      name: "Kak Dellia",
      mentor_title: "Mentor Formulasi",
    },
    {
      id: 6,
      image: "/img/mentors/kak-dhea-spss.webp",
      name: "Kak Dhea",
      mentor_title: "Mentor SPSS",
    },
    {
      id: 7,
      image: "/img/mentors/kak-disel-riset-sains-dan-teknologi.webp",
      name: "Kak Disel",
      mentor_title: "Mentor Riset Sains dan Teknologi",
    },
    {
      id: 8,
      image: "/img/mentors/kak-fasha-teknologi-farmasi.webp",
      name: "Kak Fasha",
      mentor_title: "Mentor Teknologi Farmasi",
    },
    {
      id: 9,
      image: "/img/mentors/kak-friska-klinis.webp",
      name: "Kak Friska",
      mentor_title: "Mentor Klinis",
    },
    {
      id: 10,
      image: "/img/mentors/kak-nanda-farmasi-klinis.webp",
      name: "Kak Nanda",
      mentor_title: "Mentor Farmasi Klinis",
    },
    {
      id: 11,
      image: "/img/mentors/kak-pradhini-farmakologi-dan-toksikologi.webp",
      name: "Kak Pradhini",
      mentor_title: "Mentor Farmakologi dan Toksikologi",
    },
    {
      id: 12,
      image: "/img/mentors/kak-tiya-teknologi-formulasi-dan-kimia.webp",
      name: "Kak Tiya",
      mentor_title: "Mentor Teknologi Formulasi dan Kimia",
    },
  ],
  faqs: [
    {
      id: 1,
      title: "Apa itu Ruang Obat?",
      text: "Ruang Obat adalah tempat belajar online khusus mahasiswa farmasi yang menyediakan berbagai program belajar, mulai dari mata kuliah, persiapan ujian masuk apoteker, hingga tryout UKMPPAI. Semua program disusun untuk membantu kamu sukses dalam pendidikan farmasi.",
      icon: Pill,
    },
    {
      id: 2,
      title: "Bagaimana cara mendaftar di Ruang Obat?",
      text: "Klik tombol register di pojok kanan atas untuk membuat akun, pilih program yang sesuai kebutuhan, dan ikuti instruksi pendaftaran. Setelah daftar, kamu bisa langsung akses program dan mulai belajar.",
      icon: NotePencil,
    },
    {
      id: 3,
      title: "Apakah ada program yang gratis di Ruang Obat?",
      text: "Ya, Ruang Obat menyediakan beberapa program gratis dengan syarat tertentu, seperti upload bukti follow, share, dan komen di media sosial Ruang Obat. Detailnya bisa cek di halaman program gratis.",
      icon: Gift,
    },
    {
      id: 4,
      title: "Bagaimana cara mengikuti tryout di Ruang Obat?",
      text: "Kamu bisa ikut tryout UKMPPAI di program khusus yang sudah disediakan. Cukup pilih program tryout, ikuti instruksi, dan selamat kamu bisa mengerjakan soal-soal tryout yang sesuai dengan standar terbaru.",
      icon: Target,
    },
    {
      id: 5,
      title: "Apakah materi ujian bisa diakses kapan saja?",
      text: "Bisa banget! Materi di Ruang Obat tersedia selama 24/7, jadi kamu bisa belajar kapan aja sesuai jadwal dan ritme belajarmu.",
      icon: CloudSun,
    },
    {
      id: 6,
      title: "Siapa yang bisa saya hubungi jika ada kendala?",
      text: "Jika kamu butuh bantuan, kamu bisa hubungi tim support Ruang Obat via nomor WhatsApp.",
      icon: Headset,
    },
  ],
  footer: {
    copyright:
      "PT. Pharmacy Cone Group 2024 | Hak cipta dilindungi undang-undang",
    menu: [
      {
        label: "Beranda",
        href: "#",
      },
      {
        label: "Ketentuan Layanan",
        href: "/company/terms",
      },
      {
        label: "Tentang Kami",
        href: "#",
      },
      {
        label: "Kebijakan Privacy",
        href: "/company/privacy",
      },
      {
        label: "CBT",
        href: "https://cbt.ruangobat.id/",
      },
    ],
    sosmed: [
      {
        label: "instagram",
        href: "https://www.instagram.com/ruangobat.id/",
        icon: InstagramLogo,
      },
      {
        label: "whatsapp",
        href: "https://api.whatsapp.com/send?phone=6289637015733",
        icon: WhatsappLogo,
      },
      {
        label: "website",
        href: "https://ruangobat.id/",
        icon: Globe,
      },
      {
        label: "tiktok",
        href: "https://www.tiktok.com/@ruangobat.id",
        icon: TiktokLogo,
      },
    ],
  },
};
