import { Chip } from "@nextui-org/react";
import { BookBookmark, Notepad, Tag, Users } from "@phosphor-icons/react";

export default function CardProgram() {
  return (
    <div className="hover:bg-gray/10 border-gray/20 group flex items-start gap-4 rounded-xl border-2 bg-transparent p-6 hover:cursor-pointer">
      <BookBookmark weight="regular" size={32} className="text-purple" />

      <div className="divide-gray/20 flex-1 divide-y-2 divide-dashed">
        <div className="grid gap-3 pb-4">
          <h4 className="group-hover:text-purple line-clamp-2 text-[18px] font-bold leading-[120%] -tracking-wide text-black">
            Kelas Ruangobat Tatap Muka: Mandiri Agustus 2024
          </h4>
          <Chip
            variant="flat"
            size="sm"
            color="default"
            startContent={<Tag weight="bold" size={14} />}
            classNames={{
              base: "px-2 gap-1",
              content: "font-bold",
            }}
          >
            Program Gratis
          </Chip>
        </div>

        <div className="flex items-center justify-between gap-2 pt-4">
          <div className="text-gray inline-flex items-center gap-1">
            <Notepad weight="bold" size={14} />
            <p className="text-[12px] font-semibold">9 Modul Ujian</p>
          </div>

          <div className="text-gray inline-flex items-center gap-1">
            <Users weight="bold" size={14} />
            <p className="text-[12px] font-semibold">120 Mahasiswa/i</p>
          </div>
        </div>
      </div>
    </div>
  );
}
