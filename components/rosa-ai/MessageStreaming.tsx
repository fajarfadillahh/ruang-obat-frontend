import { loadingTexts } from "@/utils/loadingTexts";
import { RefObject, useEffect } from "react";

type MessageStreamingProps = {
  messageStreamingRef: RefObject<HTMLDivElement>;
};
export default function MessageStreaming({
  messageStreamingRef,
}: MessageStreamingProps) {
  useEffect(() => {
    if (messageStreamingRef.current) {
      const randomLoadingText =
        loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
      messageStreamingRef.current.innerHTML = `<p class="text-gray-500 animate-pulse flex items-center gap-2">
        <svg class="animate-spin h-4 w-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        ${randomLoadingText}
      </p>`;
    }
  }, [messageStreamingRef]);
  return (
    <div className="flex justify-start gap-3">
      <div className="flex w-full flex-col gap-3 lg:max-w-3xl">
        <div className="overflow-hidden rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 text-gray-800 shadow-sm">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <div
                className="text-md overflow-wrap-anywhere min-h-[20px break-words leading-relaxed"
                ref={messageStreamingRef}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
