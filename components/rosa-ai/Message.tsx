import { MemoizedMarkdown } from "@/components/MemoizedMarkdown";
import LoadingMessage from "@/components/rosa-ai/LoadingMessage";
import { MessageState } from "@/types/chat.type";
import { Button } from "@nextui-org/react";
import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Message(prop: MessageState) {
  const { role, content, images, chat_id } = prop;

  const [isCopied, setIsCopied] = useState(false);

  if (role === "user") {
    return (
      <div className="flex justify-end gap-3">
        <div className="max-w-xs space-y-2 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          {images && images.length > 0 && (
            <div className="flex flex-wrap justify-end gap-1">
              {images.map((image, index) => (
                <img
                  key={image.img_url}
                  src={image.img_url}
                  alt={`User image ${index + 1}`}
                  className="h-32 w-32 cursor-pointer rounded-lg border border-gray-200 object-cover shadow-sm transition-opacity hover:opacity-90"
                  onClick={() => {
                    const imageUrl = image.img_url;
                    window.open(imageUrl, "_blank");
                  }}
                />
              ))}
            </div>
          )}
          {content && (
            <div className="break-words rounded-2xl rounded-tr-sm bg-purple px-4 py-2 text-white">
              <div className="text-md overflow-wrap-anywhere">
                <MemoizedMarkdown id={chat_id as string} content={content} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!content) {
    return <LoadingMessage />;
  }

  return (
    <div className="flex justify-start gap-3">
      <div className="flex w-full flex-col gap-3 lg:max-w-3xl">
        <div className="overflow-hidden rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 text-gray-800 shadow-sm">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <div className="text-md overflow-wrap-anywhere break-words leading-relaxed">
                <MemoizedMarkdown id={chat_id as string} content={content} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <Button
            size="sm"
            variant="light"
            color={isCopied ? "success" : "default"}
            onPress={async () => {
              try {
                await navigator.clipboard.writeText(content);
                setIsCopied(true);

                setTimeout(() => {
                  setIsCopied(false);
                }, 2000);
              } catch (error) {
                toast.error("Gagal menyalin pesan");
              }
            }}
            startContent={
              isCopied ? <Check size={14} weight="bold" /> : <Copy size={14} />
            }
            className={`min-w-0 px-2 py-1 text-xs font-medium transition-all duration-200 ${
              isCopied
                ? "text-green-600 hover:text-green-700"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            } `}
          >
            {isCopied ? "Tersalin" : "Salin"}
          </Button>
        </div>
      </div>
    </div>
  );
}
