export type SiteConfig = typeof siteConfig;
import {
  BookBookmark,
  ClipboardText,
  CloudSun,
  Gift,
  Globe,
  GraduationCap,
  Headset,
  InstagramLogo,
  MagnifyingGlass,
  Medal,
  NotePencil,
  PencilRuler,
  Pill,
  Question,
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
      text: "Pilihan program farmasi mulai dari mata kuliah, skripsi, riset, hingga persiapan masuk apoteker, tersedia di satu tempat! #cukupdisiniaja",
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
  products: [
    {
      id: 1,
      title: "Kelas Video Mata Kuliah S1 & D3",
      image: "/img/products/product-1.png",
      path: "/class/subject",
    },
    {
      id: 2,
      title: "Kelas Skripsi Farmasi",
      image: "/img/products/product-2.png",
      path: "/class/thesis",
    },
    {
      id: 3,
      title: "Kelas Riset Farmasi",
      image: "/img/products/product-3.png",
      path: "/class/research",
    },
    {
      id: 4,
      title: "Kelas Masuk Apoteker",
      image: "/img/products/product-4.png",
      path: "#",
    },
    {
      id: 5,
      title: "Tryout UKMPPAI",
      image: "/img/products/product-5.png",
      path: "https://cbt.ruangobat.id/dashboard",
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
      text: "Ruang Obat merupakan platform Bimbel Private Farmasi No. 1 yang telah memfasilitasi 10.000+ Mahasiswa Farmasi di seluruh Indonesia. Terdapat berbagai kelas menarik untuk semua jenjang pendidikan, antara lain; Kelas Mata Kuliah, Kelas Skripsi Farmasi, Kelas Riset Farmasi, Kelas Masuk Apoteker & OSCE, dan Tryout UKMPPAI.",
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
      "PT. Pharmacy Cone Group 2024 | Hak cipta di lindungi undang-undang",
    menu: [
      {
        label: "Produk Kami",
        list: [
          {
            label: "Tryout UKMPPAI (CBT)",
            href: "#",
          },
          {
            label: "Kelas Mata Kuliah",
            href: "#",
          },
          {
            label: "Kelas Skripsi Farmasi",
            href: "#",
          },
          {
            label: "Kelas Riset Farmasi",
            href: "#",
          },
          {
            label: "Kelas Masuk Apoteker",
            href: "#",
          },
        ],
      },
      {
        label: "Panduan",
        list: [
          {
            label: "Ketentuan Layanan",
            href: "/company/terms",
          },
          {
            label: "Kebijakan Privasi",
            href: "/company/privacy",
          },
        ],
      },
      {
        label: "Tentang Kami",
        list: [
          {
            label: "Tentang Ruang Obat",
            href: "#",
          },
          {
            label: "Kontak Kami",
            href: "#",
          },
          {
            label: "Testimonial",
            href: "#",
          },
        ],
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

export const siteConfigClassSubjectPrivate = {
  list: [
    {
      id: 1,
      icon: PencilRuler,
      text: "Pembahasan materi atau soal-soal UTS dan UAS",
    },
    {
      id: 2,
      icon: BookBookmark,
      text: "Pembahasan terkait tugas, praktikum, skill ataupun OSCE.",
    },
    {
      id: 3,
      icon: MagnifyingGlass,
      text: "Review atau mengulas kembali materi-materi perkuliahan",
    },
    {
      id: 4,
      icon: Medal,
      text: "Persiapa untuk lomba, intern dan karir di Farmasi",
    },
    {
      id: 5,
      icon: Question,
      text: "+ Request atau permintaan lainnya bebas",
    },
  ],
  pricelist: [
    {
      id: 1,
      title: "Paket Ruang Private 🔒",
      description:
        "Paket ini untuk kamu yang ingin lebih fokus atau belajar private sendiri. Namun kalau ingin lebih hemat kamujuga bisa membuat kelompok belajar bersama teman, maksimal untuk kelas ini 1 hingga 3 orang.",
      list: [
        {
          price: 80000,
          label: "untuk 1x pertemuan (1 jam)",
        },
        {
          price: 120000,
          label: "untuk 2x pertemuan (2 jam)",
        },
        {
          price: 210000,
          label: "untuk 3x pertemuan (3 jam)",
        },
        {
          price: 500000,
          label: "untuk 4x pertemuan (4 jam)",
        },
      ],
    },
    {
      id: 2,
      title: "Paket Ruang Bersama 🤝",
      description:
        "Paket ini digunakan untuk kamu yang ingin belajar bersama kelompok belajarmu atau circle-mu. Di Paket Ruang Belajar Bersama ini tentunya akan lebih hemat karena kamu bisa belajar bersama teman-teman terdekatmu dan dengan harga hemat dengan patungan bersama tim kelompok, akan lebih seru dan hemat bukan? 🤩. Kelas Ruang Belajar Bersama terdiri dari 4 hingga 7 orang.",
      list: [
        {
          price: 130000,
          label: "untuk 1x pertemuan (1 jam)",
        },
        {
          price: 200000,
          label: "untuk 2x pertemuan (2 jam)",
        },
        {
          price: 280000,
          label: "untuk 3x pertemuan (3 jam)",
        },
        {
          price: 550000,
          label: "untuk 4x pertemuan (4 jam)",
        },
      ],
    },
  ],
};
