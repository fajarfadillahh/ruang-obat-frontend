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
      label: "Program Kami",
      list: [
        {
          label: "Ruang Sarjana & Diploma Farmasi",
          href: "/programs/sarjana-diploma",
        },
        {
          label: "Ruang Private 1 on 1 Farmasi",
          href: "/programs/private-1-on-1",
        },
        {
          label: "Ruang Skripsi Farmasi",
          href: "/programs/skripsi-farmasi",
        },
        {
          label: "Ruang Riset Farmasi",
          href: "/programs/riset-farmasi",
        },
        {
          label: "Ruang Masuk Apoteker",
          href: "/programs/masuk-apoteker",
        },
        {
          label: "Ruang OSCE & UKMPPAI",
          href: "/programs/osce-ukmppai",
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
          href: "/terms-conditions",
        },
        {
          label: "Kebijakan Privasi",
          href: "/privacy-policy",
        },
      ],
    },
    {
      label: "Tentang Kami",
      list: [
        {
          label: "Tentang RuangObat",
          href: "/about-us",
        },
        {
          label: "Kontak Kami",
          href: "/contact-us",
        },
        {
          label: "Testimonial",
          href: "/testimonials",
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
