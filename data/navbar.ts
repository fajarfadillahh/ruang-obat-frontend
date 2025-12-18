// === navbar menu mobile view ===
export const menuItemsMobile = [
  {
    label: "Utama",
    list: [
      { label: "Beranda", href: "/" },
      { label: "Artikel", href: "/articles" },
      { label: "WhatsApp Kami", href: "https://wa.me/62895383359491" },
    ],
  },
  {
    label: "Produk",
    list: [
      {
        label: "Ruang Sarjana & Diploma Farmasi",
        href: "/programs/sarjana-diploma",
      },
      {
        label: "Ruang Private 1 on 1 Farmasi",
        href: "/programs/private-1-on-1",
      },
      { label: "Ruang Skripsi Farmasi", href: "/programs/skripsi-farmasi" },
      { label: "Ruang Riset Farmasi", href: "/programs/riset-farmasi" },
      { label: "Ruang Masuk Apoteker", href: "/programs/masuk-apoteker" },
      { label: "Ruang OSCE & UKMPPAI", href: "/programs/osce-ukmppai" },
    ],
  },
];

// === navbar menu desktop view ===
export const menuItemsDesktop = [
  {
    icon: "https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/new-logo-program/icon/icon-ruang-sarjana.webp",
    iconColor: "warning",
    label: "Ruang Sarjana & Diploma Farmasi",
    description:
      "Video belajar fleksibel & lengkap untuk gelar Sarjana & Diploma.",
    href: "/programs/sarjana-diploma",
  },
  {
    icon: "https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/new-logo-program/icon/icon-ruang-private.webp",
    iconColor: "secondary",
    label: "Ruang Private 1 on 1 Farmasi",
    description: "Pendampingan intensif untuk hasil belajar maksimal.",
    href: "/programs/private-1-on-1",
  },
  {
    icon: "https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/new-logo-program/icon/icon-ruang-skripsi.webp",
    iconColor: "success",
    label: "Ruang Skripsi Farmasi",
    description: "Bimbingan skripsi terarah dari awal hingga tuntas.",
    href: "/programs/skripsi-farmasi",
  },
  {
    icon: "https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/new-logo-program/icon/icon-ruang-riset.webp",
    iconColor: "primary",
    label: "Ruang Riset Farmasi",
    description: "Tingkatkan skill risetmu dengan metode yang tepat.",
    href: "/programs/riset-farmasi",
  },
  {
    icon: "https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/new-logo-program/icon/icon-ruang-masuk-apoteker.webp",
    iconColor: "danger",
    label: "Ruang Masuk Apoteker",
    description: "Persiapan matang menuju profesi apoteker impianmu.",
    href: "/programs/masuk-apoteker",
  },
  {
    icon: "https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/new-logo-program/icon/icon-ruang-osce-ukmppai.webp",
    iconColor: "warning",
    label: "Ruang OSCE & UKMPPAI",
    description: "Siap hadapi ujian kompetensi dengan percaya diri.",
    href: "/programs/osce-ukmppai",
  },
];
