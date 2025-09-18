import { loadingTexts } from "@/utils/loadingTexts";

export default function LoadingMessage() {
  const text = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];

  return (
    <div className="flex items-start gap-4 pb-6">
      <div className="flex max-w-2xl items-center gap-2 rounded-3xl rounded-tl-sm bg-gray/5 p-4 text-black hover:bg-gray/10">
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 animate-[breathe_2s_ease-in-out_infinite] rounded-full bg-purple/60" />
          <div className="h-1.5 w-1.5 animate-[breathe_2s_ease-in-out_infinite_0.3s] rounded-full bg-purple/60" />
          <div className="h-1.5 w-1.5 animate-[breathe_2s_ease-in-out_infinite_0.6s] rounded-full bg-purple/60" />
        </div>

        <p className="text-sm font-medium leading-[170%] text-black lg:text-base">
          {text}
        </p>
      </div>
    </div>
  );
}
