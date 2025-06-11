import {
  Alarm,
  BookBookmark,
  Brain,
  ChatDots,
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
  Video,
  WhatsappLogo,
} from "@phosphor-icons/react";

export const footerConfigContent = {
  copyright: `Part of Pharma Metrocity Group ${new Date().getFullYear()} | Hak cipta di lindungi undang-undang`,
  menu: [
    {
      label: "Produk Kami",
      list: [
        {
          label: "Video Belajar",
          href: "/video",
        },
        {
          label: "Kelas Private 1 on 1",
          href: "/kelas/private-1-on-1",
        },
        {
          label: "Kelas Skripsi Farmasi",
          href: "/kelas/skripsi-farmasi",
        },
        {
          label: "Kelas Riset Farmasi",
          href: "/kelas/riset-farmasi",
        },
        {
          label: "Kelas Masuk Apoteker",
          href: "/kelas/masuk-apoteker",
        },
        {
          label: "UKMPPAI & OSCE",
          href: "/dashboard",
        },
        {
          label: "Apoteker ROSA",
          href: "/rosa",
        },
      ],
    },
    {
      label: "Panduan",
      list: [
        {
          label: "Ketentuan Layanan",
          href: "/perusahaan/ketentuan-layanan",
        },
        {
          label: "Kebijakan Privasi",
          href: "/perusahaan/kebijakan-privasi",
        },
      ],
    },
    {
      label: "Tentang Kami",
      list: [
        {
          label: "Tentang RuangObat",
          href: "/perusahaan/tentang-kami",
        },
        {
          label: "Kontak Kami",
          href: "/perusahaan/kontak-kami",
        },
        {
          label: "Testimonial",
          href: "/perusahaan/testimonial",
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
};

export const siteConfigHomePage = {
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
      text: "Akses belajar nyaman dengan website yang responsif. Bisa diakses kapan saja, di mana saja, dan tanpa adanya hambatan.",
    },
  ],
  classes: [
    {
      id: 1,
      title: "Video Pembelajaran",
      image: "/img/products/video-pembelajaran.svg",
      path: "/video",
      tagline: "Belajar fleksibel, materi lengkap & bebas akses kapan saja.",
    },
    {
      id: 2,
      title: "Kelas Private 1 on 1",
      image: "/img/products/kelas-private-1-on-1.svg",
      path: "/kelas/private-1-on-1",
      tagline: "Pendampingan intensif untuk hasil belajar maksimal.",
    },
    {
      id: 3,
      title: "Kelas Skripsi Farmasi",
      image: "/img/products/kelas-skripsi-farmasi.svg",
      path: "/kelas/skripsi-farmasi",
      tagline: "Bimbingan skripsi terarah dari awal hingga tuntas.",
    },
    {
      id: 4,
      title: "Kelas Riset Farmasi",
      image: "/img/products/kelas-riset-farmasi.svg",
      path: "/kelas/riset-farmasi",
      tagline: "Tingkatkan skill risetmu dengan metode yang tepat.",
    },
    {
      id: 5,
      title: "Kelas Masuk Apoteker",
      image: "/img/products/kelas-masuk-apoteker.svg",
      path: "/kelas/masuk-apoteker",
      tagline: "Persiapan matang menuju profesi apoteker impianmu.",
    },
    {
      id: 6,
      title: "UKMPPAI & OSCE",
      image: "/img/products/ukmppai-osce.svg",
      path: "/dashboard",
      tagline: "Siap hadapi ujian kompetensi dengan percaya diri.",
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
      text: "Ruang Obat merupakan platform Bimbel Private Farmasi No. 1 yang telah memfasilitasi 10.000+ Mahasiswa Farmasi di seluruh Indonesia. Terdapat berbagai kelas menarik untuk semua jenjang pendidikan, antara lain; Kelas Mata Kuliah, Kelas Skripsi Farmasi, Kelas Riset Farmasi, Kelas Masuk Apoteker, dan UKMPPAI & OSCE.",
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
      text: "Kamu bisa ikut UKMPPAI & OSCE di program khusus yang sudah disediakan. Cukup pilih program tryout, ikuti instruksi, dan selamat kamu bisa mengerjakan soal-soal tryout yang sesuai dengan standar terbaru.",
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
};

export const siteConfigPhamacyPrivteClassPage = {
  consultation_list: [
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
      text: "Persiapan untuk lomba, intern dan karir di Farmasi",
    },
    {
      id: 5,
      icon: Question,
      text: "+ Request atau permintaan lainnya bebas",
    },
  ],
  price_list: [
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

export const siteConfigAboutUsPage = {
  products: [
    { label: "Video Pembelajaran", icon: Video },
    { label: "Kelas Private 1 on 1", icon: ClipboardText },
    { label: "Kelas Skripsi Farmasi", icon: BookBookmark },
    { label: "Kelas Riset Farmasi", icon: MagnifyingGlass },
    { label: "Kelas Masuk Apoteker", icon: Pill },
    { label: "UKMPPAI & OSCE", icon: PencilRuler },
  ],
  data: {
    vision: {
      title: "Visi 🎯",
      text: "Membantu menciptakan generasi apoteker professional, inovatif dan berdaya saing global untuk tercapainya Golden Pharmacy 2045",
    },
    mission: {
      title: "Misi 🔥",
      list: [
        {
          key: 1,
          text: "Penyediaan akses End-to-End pendidikan farmasi berkualitas tinggi dan terjangkau bagi seluruh mahasiswa farmasi di Indonesia",
        },
        {
          key: 2,
          text: "Penyediaan komunitas belajar yang aktif dan kolaboratif untuk mendorong semangat berbagi ilmu dan inovasi farmasi di Indonesia",
        },
        {
          key: 3,
          text: "Mendukung penelitian dan pengembangan pada bidang farmasi untuk menghasilkan inovasi yang bermanfaat bagi masyarakat di Indonesia",
        },
        {
          key: 4,
          text: "Membangun kemitraan yang kuat dengan berbagai stakeholders di Indonesia",
        },
      ],
    },
  },
};

export const siteConfigTestimonialsPage = [
  {
    comment:
      "Ruang Obat bener-bener ngebantu banget buat persiapan ujian. Materinya jelas, latihan soalnya juga mirip banget sama yang keluar di ujian kampus. Thanks to Ruang Obat, nilai saya naik signifikan!",
    name: "Dinda A.",
    university: "Universitas Indonesia",
  },
  {
    comment:
      "Awalnya aku kira e-learning farmasi bakal boring, tapi Ruang Obat beda sih. Penjelasannya ringan, gampang dicerna, dan ada banyak latihan soal. Bikin belajar jadi lebih enjoy, gak berasa dipaksa.",
    name: "Aditya S.",
    university: "Universitas Padjadjaran",
  },
  {
    comment:
      "Setelah pake Ruang Obat, gue ngerasa belajar farmasi jadi lebih terstruktur. Gak cuma ngehafal, tapi bener-bener ngerti konsepnya. Fitur CBT-nya juga keren, beneran bantu buat simulasi ujian!",
    name: "Sarah M.",
    university: "Universitas Airlangga",
  },
  {
    comment:
      "Pas lagi hectic sama tugas akhir, Ruang Obat jadi penyelamat. Gak cuma nyediain materi yang lengkap, tapi juga bantu saya buat latihan fokus lewat CBT yang modelnya mirip banget sama real test.",
    name: "Reza F.",
    university: "Universitas Gadjah Mada",
  },
  {
    comment:
      "Sebagai mahasiswa baru, jujur awalnya saya ngerasa lost di dunia farmasi. Tapi ketemu Ruang Obat, saya bisa belajar step by step tanpa ngerasa overwhelmed. Cara ngajarnya friendly dan relatable banget.",
    name: "Alya P.",
    university: "Universitas Hasanuddin",
  },
  {
    comment:
      "Ruang Obat bikin belajar farmasi jadi lebih gampang. Materinya lengkap, penjelasannya juga enak banget diikutin. Rasanya kayak lagi diskusi santai, bukan belajar yang ngebosenin.",
    name: "Kevin T.",
    university: "Universitas Brawijaya",
  },
  {
    comment:
      "Udah cobain beberapa platform belajar, tapi Ruang Obat yang paling cocok buat aku. Modulnya update, soal-soalnya juga ngebantu banget buat persiapan ujian nasional farmasi.",
    name: "Rani S.",
    university: "Universitas Muhammadiyah Yogyakarta",
  },
  {
    comment:
      "CBT di Ruang Obat itu kayak simulasi beneran. Jadi pas ujian asli, aku udah terbiasa sama tipe-tipe soalnya. Gokil sih, ngebantu banget buat ngurangin rasa panik.",
    name: "Fajar P.",
    university: "Universitas Andalas",
  },
  {
    comment:
      "Materi farmasi itu kadang berat, tapi di Ruang Obat dibikin ringan tanpa ngurangin esensinya. Cara penyampaian yang simple bikin aku lebih cepet paham.",
    name: "Livia R.",
    university: "Universitas Sumatera Utara",
  },
  {
    comment:
      "Pas lagi magang di apotek, banyak materi kuliah yang kepake. Untung ada Ruang Obat yang ngebekalin aku jauh-jauh hari. Jadi pas praktek, aku gak kaget lagi.",
    name: "Gibran M.",
    university: "Universitas Pancasila",
  },
  {
    comment:
      "Suka banget sama vibes belajarnya di Ruang Obat. Ga ngebosenin, tapi tetep serius. Fitur e-learningnya rapi, gampang diakses kapan aja, apalagi buat yang kuliahnya udah padet kayak gue.",
    name: "Indah K.",
    university: "Universitas Islam Indonesia",
  },
  {
    comment:
      "Buat saya yang belajarnya suka nunda-nunda, Ruang Obat ngebantu banget buat stay on track. Ada reminder, ada progress tracker, jadi lebih termotivasi buat konsisten belajar.",
    name: "Zaky R.",
    university: "Universitas Jenderal Soedirman",
  },
  {
    comment:
      "CBT dan e-learning di Ruang Obat dikemas dengan format yang fresh. Nggak kaku sama sekali. Seriusan, belajar farmasi di sini malah jadi salah satu aktivitas yang saya tunggu-tunggu.",
    name: "Felicia N.",
    university: "Universitas Udayana",
  },
  {
    comment:
      "Tim Ruang Obat keren banget sih. Materi yang ribet bisa dikemas jadi lebih simple dan relate sama kondisi nyata di dunia farmasi. Respect banget buat effortnya.",
    name: "Daniel S.",
    university: "Universitas Diponegoro",
  },
  {
    comment:
      "Ruang Obat tuh bukan cuma tempat buat belajar doang, tapi juga buat ngebangun mindset sebagai calon tenaga kesehatan. Insight yang dikasih di luar textbook juga banyak banget gunanya.",
    name: "Maya D.",
    university: "Universitas Sanata Dharma",
  },
  {
    comment:
      "Belajar farmasi kadang berat, tapi dengan Ruang Obat semua terasa lebih santai. Gak berasa lagi dikejar-kejar tugas karena materinya mudah dipahami.",
    name: "Vania M.",
    university: "Universitas Katolik Atma Jaya",
  },
  {
    comment:
      "Gue suka banget sama konsep CBT di Ruang Obat. Serius, kayak lagi latihan beneran sebelum perang di ujian akhir. Jadi lebih pede pas masuk ruangan!",
    name: "Rafi D.",
    university: "Universitas Surabaya",
  },
  {
    comment:
      "Platform e-learning Ruang Obat user-friendly parah. Mau akses lewat HP atau laptop, sama-sama gampang. Sangat ngebantu buat mahasiswa mobile kayak gue.",
    name: "Citra L.",
    university: "Universitas Kristen Maranatha",
  },
  {
    comment:
      "Materi di Ruang Obat tuh gak cuma teori kaku. Ada banyak contoh aplikasinya di dunia kerja juga, jadi ngerasa lebih siap buat terjun ke lapangan.",
    name: "Bayu W.",
    university: "Universitas Negeri Semarang",
  },
  {
    comment:
      "Ruang Obat selalu update materi terbaru, jadi saya gak pernah ketinggalan info penting. Cocok banget buat mahasiswa farmasi yang pengen stay ahead.",
    name: "Nadya P.",
    university: "Universitas Pelita Harapan",
  },
  {
    comment:
      "Gue suka gimana Ruang Obat ngejabarin materi berat dengan gaya bahasa yang ringan dan relate sama kehidupan sehari-hari. Jadi lebih nyantol di otak.",
    name: "Dewi R.",
    university: "Universitas Trisakti",
  },
  {
    comment:
      "Pernah stuck waktu ngerjain tugas, akhirnya coba buka Ruang Obat, eh malah jadi ngerti dan tugas kelar lebih cepat. Nyesel baru tau sekarang.",
    name: "Andra S.",
    university: "Universitas Sebelas Maret",
  },
  {
    comment:
      "Kalau lo mau serius di dunia farmasi, Ruang Obat tempat yang pas. Materinya dalam tapi penyampaiannya santai, cocok buat semua tipe belajar.",
    name: "Zahra F.",
    university: "Universitas Muhammadiyah Malang",
  },
  {
    comment:
      "Sering banget gue pake Ruang Obat buat prepare OSCE. Simulasi dan tips-tipsnya ngebantu banget buat ngelewatin ujian praktek.",
    name: "Dimas A.",
    university: "Universitas Sumatera Utara",
  },
  {
    comment:
      "Ruang Obat itu bukan cuma tentang belajar, tapi juga ngebangun mental siap tempur buat dunia kerja farmasi. Mindset-nya keren abis.",
    name: "Amira J.",
    university: "Universitas Esa Unggul",
  },
];

export const siteROSAPage = {
  reasoning: [
    {
      icon: ChatDots,
      title: "Menjawab Keraguan dengan Cepat",
      description:
        "ROSA hadir untuk menjawab pertanyaan-pertanyaan yang muncul dari kebingungan atau rasa kurang yakin selama proses belajar. Tidak perlu berlama-lama lagi, langsung tanyakan saja.",
    },
    {
      icon: Brain,
      title: "Dirancang Khusus untuk Mahasiswa Farmasi",
      description:
        "ROSA bukan AI biasa — ia dibuat dan dioptimalkan untuk membantu mahasiswa farmasi secara spesifik. Jadi jawabannya lebih relevan, fokus, dan sesuai dengan kebutuhan kamu.",
    },
    {
      icon: RocketLaunch,
      title: "Mendampingi Proses Belajar Secara Interaktif",
      description:
        "Tidak hanya memberikan jawaban, ROSA bisa mengajak kamu belajar lebih aktif lewat diskusi, penjelasan konsep, sampai latihan soal. Cocok untuk kamu yang suka belajar dinamis.",
    },
    {
      icon: Alarm,
      title: "Efisien dan Praktis 24/7",
      description:
        "Belajar kapan pun dan di mana pun tanpa menunggu siapapun. ROSA selalu siap membantu kamu, bahkan di jam-jam begadang menjelang ujian.",
    },
  ],
  testimonial: [
    {
      name: "Alya Putri",
      comment:
        "Aku suka banget pake ROSA, jawabannya cepet dan jelas. Bikin belajar farmasi jadi nggak pusing.",
    },
    {
      name: "Rizky Maulana",
      comment:
        "ROSA ngebantu banget pas aku lagi belajar tengah malam. Nggak perlu nunggu temen buat diskusi.",
    },
    {
      name: "Dian Sari",
      comment:
        "Awalnya iseng nyoba, ternyata ROSA bisa jawab semua pertanyaanku dengan cara yang gampang dipahami.",
    },
    {
      name: "Bagas Pratama",
      comment:
        "Gue sering pake ROSA kalo lagi stuck ngerjain tugas. Jawabannya nggak ribet dan langsung to the point.",
    },
    {
      name: "Nadya Rahma",
      comment:
        "Aku terbantu banget sama ROSA, apalagi pas lagi belajar sendirian. Nggak ngerasa clueless lagi.",
    },
    {
      name: "Taufik Hidayat",
      comment:
        "Gue ngerasa ROSA tuh kaya temen belajar yang ngerti banget materi farmasi. Serius enak banget!",
    },
    {
      name: "Salsabila Nur",
      comment:
        "Dulu aku suka bingung sama istilah farmasi, sekarang tinggal tanya ke ROSA, langsung ngerti.",
    },
    {
      name: "Fadli Nugraha",
      comment:
        "ROSA bener-bener ngebantu pas gue butuh penjelasan yang nggak bertele-tele. Mantap sih!",
    },
    {
      name: "Citra Anggraini",
      comment:
        "Aku ngerasa belajar jadi lebih santai. ROSA jawabnya nggak cuma benar, tapi juga bikin paham.",
    },
    {
      name: "Ilham Setiawan",
      comment:
        "ROSA ngebantu banget pas gue nyiapin presentasi. Jawabannya lengkap dan gampang diserap.",
    },
    {
      name: "Laras Widya",
      comment:
        "Aku biasanya pake ROSA pas mau ujian. Ngebantu banget buat review materi cepet.",
    },
    {
      name: "Andhika Prasetyo",
      comment:
        "Gue lebih paham konsep-konsep rumit kayak farmakokinetik gara-gara ROSA. Keren sih!",
    },
    {
      name: "Rina Oktaviani",
      comment:
        "Belajar sendirian jadi nggak serem lagi karena aku bisa langsung nanya ke ROSA kalau bingung.",
    },
    {
      name: "Farhan Aulia",
      comment:
        "Penjelasannya simpel tapi dalam. Gue jadi lebih ngerti daripada baca slide dosen doang.",
    },
    {
      name: "Dewi Melati",
      comment:
        "Aku suka karena ROSA bisa bantu kapan aja. Cocok buat aku yang sering belajar malem-malem.",
    },
    {
      name: "Akbar Fauzi",
      comment:
        "Waktu ngerjain laporan, gue sempet bingung, tapi ROSA bantu jelasin step-nya satu per satu. Gokil!",
    },
    {
      name: "Tiara Kusuma",
      comment:
        "Beneran kaya punya tutor pribadi. ROSA selalu ada pas aku butuh bantuan belajar.",
    },
    {
      name: "Yusuf Rachman",
      comment:
        "Belajar farmasi jadi nggak ngebosenin lagi. ROSA tuh penyelamat banget waktu deadline mepet.",
    },
    {
      name: "Mei Linawati",
      comment:
        "Aku bisa belajar mandiri tapi tetap merasa ditemani. ROSA selalu siap bantu tanpa ribet.",
    },
    {
      name: "Gilang Saputra",
      comment:
        "Gue jadi lebih enjoy belajar karena bisa langsung diskusi sama ROSA kalau nggak ngerti materi.",
    },
  ],
  faqs: [
    {
      question: "Apa itu Apoteker ROSA?",
      answer:
        "Apoteker ROSA adalah smart assistant berbasis AI dari RuangObat yang dirancang khusus untuk membantu mahasiswa farmasi dalam belajar, mengerjakan tugas, dan memahami konsep-konsep kompleks seputar dunia farmasi.",
    },
    {
      question: "Apa saja yang bisa ditanyakan ke ROSA?",
      answer:
        "Kamu bisa tanya apapun seputar farmasi—dari penjelasan materi kuliah, referensi jurnal, sampai bantu ngerangkum topik atau nyari ide skripsi. Tinggal ketik aja pertanyaannya!",
    },
    {
      question: "Kapan saja ROSA bisa diakses?",
      answer:
        "ROSA bisa kamu akses 24 jam nonstop. Jadi kapan pun kamu butuh bantuan belajar, tinggal buka dan tanya aja.",
    },
    {
      question: "Apakah jawaban ROSA bisa dipercaya?",
      answer:
        "Jawaban dari ROSA berbasis sumber terpercaya, terutama buat hal-hal penting atau teknis banget.",
    },
    {
      question: "Apakah ROSA bisa diakses lewat HP?",
      answer:
        "Bisa banget! ROSA bisa kamu akses langsung dari browser di HP atau laptop, tinggal login ke akun RuangObat kamu.",
    },
    {
      question: "Gimana caranya mulai pakai ROSA?",
      answer:
        "Cukup login ke akun RuangObat, lalu klik tombol 'Tanya ROSA Sekarang'. Kamu langsung bisa mulai menulis pertanyaan kamu di kolom chat-nya.",
    },
  ],
};
