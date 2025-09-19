import ImagePreview from "@/components/rosa-ai/ImagePreview";
import { AIContext } from "@/context/AIContext";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@nextui-org/react";
import { Images, PaperPlaneTilt } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import {
  ChangeEvent,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

type InputComponentProps = {
  textareaRef: RefObject<HTMLTextAreaElement>;
  inputContainerRef: RefObject<HTMLDivElement>;
  suggestion?: string;
  handleSendMessage(
    input: string,
    imageUrls?: {
      url: string;
    }[],
  ): Promise<string | void>;
};

export default function InputComponent({
  textareaRef,
  inputContainerRef,
  handleSendMessage,
  suggestion,
}: InputComponentProps) {
  const { status, data } = useSession();
  const ctx = useContext(AIContext);
  const [input, setInput] = useState("");
  const [imageUrls, setImageUrls] = useState<{ url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (suggestion) {
      setInput(suggestion);
    }
  }, [suggestion]);

  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputActive =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.hasAttribute("contenteditable");

      const isModifierKey = e.ctrlKey || e.metaKey || e.altKey;
      const isSpecialKey = [
        "Enter",
        "Escape",
        "Tab",
        "Backspace",
        "Delete",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "F11",
        "F12",
      ].includes(e.key);

      const hasModalOpen =
        ctx?.sidebarOpen ||
        document.querySelector('[role="dialog"]') ||
        document.querySelector('.fixed.inset-0:not([class*="bg-white"])');

      if (isInputActive || isModifierKey || isSpecialKey || hasModalOpen) {
        return;
      }

      if (e.key.length === 1) {
        e.preventDefault();

        if (textareaRef.current) {
          textareaRef.current.focus();

          setInput((prev) => prev + e.key);
          scrollToInput();
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyPress);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyPress);
    };
  }, [ctx?.sidebarOpen]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  function scrollToInput() {
    if (inputContainerRef.current) {
      inputContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }

  async function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSizeInBytes = 5 * 1024 * 1024;
    const maxFiles = 3;

    if (files.length > maxFiles) {
      toast.error(`Maksimal upload ${maxFiles} gambar!`);
      return;
    }

    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`File "${file.name}" harus JPG, JPEG, atau PNG!`);
        return;
      }

      if (file.size > maxSizeInBytes) {
        toast.error(`File "${file.name}" terlalu besar. Maksimal 5 MB!`);
        return;
      }

      validFiles.push(file);
    });

    try {
      const form = new FormData();

      for (const validFile of validFiles) {
        form.append("images", validFile);
      }

      const result: SuccessResponse<{ url: string }[]> = await toast.promise(
        fetcher({
          url: "/ai/chat/images",
          method: "POST",
          data: form,
          file: true,
          token: data?.user.access_token,
        }),
        {
          loading: "Mengupload gambar...",
          success: "Gambar berhasil diupload",
          error: "Ups sepertinya ada kesalahan ketika upload gambar!",
        },
      );

      setImageUrls((prev) => [...prev, ...result.data]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setImageUrls([]);
      console.log(error);
      toast.error("Ups sepertinya ada kesalahan ketika upload gambar!");
    }
  }

  function handleSubmit() {
    if (
      !input.trim() ||
      (!imageUrls.length && !input.trim()) ||
      ctx?.isStreaming ||
      status !== "authenticated"
    )
      return;

    textareaRef.current?.blur();
    handleSendMessage(input, imageUrls);
    setInput("");
    setImageUrls([]);
  }

  return (
    <div
      className="sticky bottom-0 mx-auto h-auto w-full max-w-[46rem] rounded-tl-3xl rounded-tr-3xl lg:pb-8"
      ref={inputContainerRef}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        accept="image/*"
        className="hidden"
      />

      <ImagePreview images={imageUrls} setImages={setImageUrls} />

      <div className="w-full">
        <div className="flex w-full flex-col gap-2 rounded-tl-3xl rounded-tr-3xl border border-purple/10 bg-secondary-50 p-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-purple/10 lg:rounded-3xl">
          <textarea
            ref={textareaRef}
            aria-label="chat input"
            rows={1}
            placeholder="Tanya seputar farmasi dan RuangObat..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            onFocus={scrollToInput}
            className="max-h-32 w-full resize-none border-none bg-transparent px-4 py-2 font-semibold outline-none placeholder:text-sm placeholder:font-semibold placeholder:-tracking-wide placeholder:text-secondary-400 focus:ring-0 lg:placeholder:text-base"
          />

          <div className="flex items-center justify-between px-2">
            <Button
              isIconOnly
              variant="light"
              color="secondary"
              onClick={() => {
                if (status !== "authenticated") {
                  ctx?.onOpenUnauthenticated();
                } else {
                  fileInputRef.current?.click();
                }
              }}
            >
              <Images weight="duotone" size={28} />
            </Button>

            <div className="inline-flex items-center gap-2">
              <Button
                isIconOnly
                color="secondary"
                isDisabled={
                  !input.trim() ||
                  (!imageUrls.length && !input.trim()) ||
                  ctx?.isStreaming ||
                  status !== "authenticated"
                }
                onTouchStart={handleSubmit}
                onClick={handleSubmit}
              >
                <PaperPlaneTilt weight="duotone" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
