import {
  Globe,
  InstagramLogo,
  TiktokLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";

export const footer = {
  copyright: `Part of Pharma Metrocity Group ${new Date().getFullYear()} | Hak cipta di lindungi undang-undang`,
  menu: [
    {
      label: "Produk Kami",
      list: [
        {
          label: "Ruang Sarjana & Diploma Farmasi",
          href: "/video",
        },
        {
          label: "Ruang Private 1 on 1 Farmasi",
          href: "/kelas/private-1-on-1",
        },
        {
          label: "Ruang Skripsi Farmasi",
          href: "/kelas/skripsi-farmasi",
        },
        {
          label: "Ruang Riset Farmasi",
          href: "/kelas/riset-farmasi",
        },
        {
          label: "Ruang Masuk Apoteker",
          href: "/kelas/masuk-apoteker",
        },
        {
          label: "Ruang OSCE & UKMPPAI",
          href: "/osce-ukmppai",
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
          href: "/testimonial",
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
