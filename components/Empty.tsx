import { MagnifyingGlass } from "@phosphor-icons/react";

export default function Empty({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray/20 p-12">
      <MagnifyingGlass weight="duotone" size={20} className="text-gray" />

      <p className="font-semibold capitalize text-gray">{text}</p>
    </div>
  );
}
