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
