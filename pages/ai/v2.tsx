import { MemoizedMarkdown } from "@/components/MemoizedMarkdown";
import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { loadingTexts } from "@/utils/loadingTexts";
import { Avatar, Button } from "@nextui-org/react";
import {
  ArrowUUpLeft,
  CreditCard,
  Images,
  PaperPlaneTilt,
  SidebarSimple,
  X,
} from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type ChatResponse = {
  role: "user" | "assistant";
  content: string;
  images?: { image_id: string; img_url: string }[];
  chat_id: string;
};

type MessageState = {
  role: "user" | "assistant";
  content: string;
  chat_id?: string;
  images?: { image_id: string; img_url: string }[];
};

export default function RosaPage() {
  const { data, status } = useSession();
  const { data: chats } = useSWR<SuccessResponse<ChatResponse[]>>(
    status == "authenticated"
      ? {
          url: `/ai/chat?timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
          method: "GET",
          token: data.user.access_token,
        }
      : null,
    status == "authenticated"
      ? {
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          refreshInterval: 0,
          dedupingInterval: 0,
          keepPreviousData: false,
        }
      : {},
  );

  const { data: limit, mutate: mutateLimit } = useSWR<
    SuccessResponse<{
      total: number;
      remaining: number;
    }>
  >(
    status == "authenticated"
      ? {
          url: "/ai/limits/check",
          method: "GET",
          token: data?.user.access_token,
        }
      : null,
  );

  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<MessageState[]>([]);
  const [imageUrls, setImageUrls] = useState<{ url: string }[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollThrottleRef = useRef<boolean>(false);
  const pendingScrollRef = useRef<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function scrollToInput() {
    if (inputContainerRef.current) {
      inputContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }

  useEffect(() => {
    if (!chatContainerRef.current) return;

    const sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    chatContainerRef.current.appendChild(sentinel);

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsAtBottom(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(sentinel);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      sentinel.remove();
    };
  }, [chatMessages.length]);

  const throttledScrollToBottom = useCallback(() => {
    if (!isAtBottom) return;

    if (scrollThrottleRef.current) {
      pendingScrollRef.current = true;
      return;
    }

    scrollThrottleRef.current = true;

    requestAnimationFrame(() => {
      if (chatContainerRef.current && isAtBottom) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }

      setTimeout(() => {
        scrollThrottleRef.current = false;

        if (pendingScrollRef.current) {
          pendingScrollRef.current = false;
          throttledScrollToBottom();
        }
      }, 100);
    });
  }, [isAtBottom]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [message]);

  useEffect(() => {
    if (chats?.data?.length) {
      setChatMessages(chats.data);
      setTimeout(() => {
        scrollToBottom();
      }, 250);
    }
  }, [chats?.data]);

  function scrollToBottom() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
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
      toast.error(`Maksimal upload ${maxFiles} gambar.`);
      return;
    }

    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`File "${file.name}" harus JPG, JPEG, atau PNG.`);
        return;
      }

      if (file.size > maxSizeInBytes) {
        toast.error(`File "${file.name}" terlalu besar. Maksimal 5 MB.`);
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
          loading: "Sedang mengupload gambar...",
          success: "Gambar berhasil diupload",
          error: "Ups sepertinya ada kesalahan ketika upload gambar",
        },
      );

      if (imageUrls.length) {
        setImageUrls((prev) => [...prev, ...result.data]);
      } else {
        setImageUrls(result.data);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setImageUrls([]);
      console.log(error);
      toast.error("Ups sepertinya ada kesalahan ketika upload gambar");
    }
  }

  async function handleSendMessage() {
    if (!limit?.data.remaining) return;
    if (!message.trim() && imageUrls.length === 0) return;

    setMessage("");
    setImageUrls([]);

    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    const chat_id_assistant = `${id}-assistant`;

    setChatMessages((prev) => [
      ...prev,
      {
        chat_id: `${id}-user`,
        role: "user",
        content: message,
        images: imageUrls.length
          ? imageUrls.map((item) => ({
              image_id:
                Date.now().toString() +
                Math.random().toString(36).substring(2, 15),
              img_url: item.url,
            }))
          : [],
      },
      {
        role: "assistant",
        content: "",
        id,
        chat_id: chat_id_assistant,
      },
    ]);

    setTimeout(() => {
      scrollToBottom();
    }, 100);

    try {
      const prefix = process.env.NEXT_PUBLIC_MODE === "prod" ? "api" : "dev";

      const response = await fetch(
        `https://${prefix}.ruangobat.id/api/ai/chat/streaming`,
        {
          headers: {
            Authorization: `Bearer ${data?.user.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: message,
            img_url: imageUrls.length ? imageUrls.map((item) => item.url) : [],
          }),
          method: "POST",
        },
      );

      const reader = response.body?.getReader();

      if (!reader) {
        return toast.error("Gagal mendapatkan pembaca dari response body");
      }

      const decoder = new TextDecoder();
      let buffer = "";
      let chunkCount = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex;
        while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);

          if (line.startsWith("data:")) {
            const data = line.replace(/^data:\s?/, "");

            if (data === "[DONE]") {
              reader?.cancel();
              mutateLimit();
              scrollToBottom();
              break;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.content;
              setChatMessages((prev) =>
                prev.map((msg) =>
                  msg.chat_id === chat_id_assistant
                    ? {
                        ...msg,
                        role: "assistant",
                        content: msg.content + content,
                      }
                    : msg,
                ),
              );

              if (chunkCount % 6 === 0) {
                throttledScrollToBottom();
              }
            } catch (error) {
              // skip json parse error
              console.error(error);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);

      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.chat_id === chat_id_assistant
            ? {
                role: "assistant",
                content:
                  "Ups sepertinya server kita ada masalah. Maaf ya atas ketidaknyamanannya 😫",
                id: 0,
              }
            : msg,
        ),
      );
    }
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-white text-black">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        accept="image/*"
        className="hidden"
      />

      <div className="hidden md:flex">
        <Sidebar
          open={true}
          onClose={() => {}}
          remaining={limit?.data.remaining}
        />
      </div>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        remaining={limit?.data.remaining}
      />

      <div className="flex h-dvh flex-1 flex-col overflow-hidden">
        <div className="z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
          <Button
            isIconOnly
            variant="light"
            className="text-[#6238C3] md:hidden"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <SidebarSimple weight="duotone" size={22} />
          </Button>
          <div className="ml-auto inline-flex items-center gap-[10px] hover:cursor-pointer">
            <Avatar
              isBordered
              showFallback
              size="sm"
              src={`https://ruangobat.is3.cloudhost.id/statics/images/avatar-img/avatar-${data?.user.gender === "M" ? "male" : "female"}.svg`}
              classNames={{
                base: "ring-purple bg-purple/20",
                icon: "text-purple",
              }}
            />
            <div>
              <h6 className="text-sm font-bold text-black">
                {status === "authenticated" ? data?.user.fullname : "-"}
              </h6>
              <p className="text-[12px] font-medium uppercase text-gray">
                {status === "authenticated" ? data?.user.user_id : "-"}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto scrollbar-hide lg:scrollbar-default"
        >
          <div className="mx-auto max-w-3xl px-4 py-6">
            {!chatMessages.length && (
              <div className="mb-6 text-center">
                <img
                  src="https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-6.webp"
                  alt="apoteker rosa image"
                  width={350}
                  height={350}
                  className="mb-4"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <h1 className="text-xl font-extrabold text-black md:text-2xl">
                    ROSA
                  </h1>
                  <h1 className="text-xl font-extrabold text-black md:text-2xl">
                    (Ruang Obat Smart Assistant)
                  </h1>
                  <p className="max-w-[320px] font-medium leading-[170%] text-gray-600 md:max-w-[600px]">
                    Hai, aku ROSA. Aku siap bantu kamu menjawab berbagai
                    pertanyaan seputar dunia farmasi dan layanan belajar di
                    RuangObat ✨.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {chatMessages.map((message) => (
                <ChatMessage {...message} key={message.chat_id} />
              ))}

              <div className="h-32"></div>
            </div>
          </div>
        </div>

        <div
          ref={inputContainerRef}
          className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4 md:left-64"
        >
          <ImagePreview images={imageUrls} setImages={setImageUrls} />
          <div className="flex w-full justify-center">
            <div className="w-full max-w-3xl">
              <div className="flex w-full flex-col items-stretch gap-2 rounded-3xl border border-[#6238C3]/20 bg-[#6238C3]/5 p-2 shadow-lg backdrop-blur-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-[#6238C3]/30">
                <div className="flex min-w-0 flex-1 items-end">
                  <textarea
                    ref={textareaRef}
                    placeholder="Tanya seputar farmasi dan RuangObat..."
                    rows={1}
                    className="ml-3 max-h-[120px] w-full resize-none overflow-y-auto border-none bg-transparent pr-10 pt-3 text-sm font-medium outline-none placeholder:text-[#6238C3]/50 focus:ring-0"
                    aria-label="Chat input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => {
                      setTimeout(() => {
                        scrollToInput();
                      }, 300);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    style={{ minHeight: "24px" }}
                  />
                </div>
                <div className="flex flex-row items-center justify-between px-2">
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-[#6238C3]"
                    size="md"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Images weight="duotone" size={30} />
                  </Button>
                  <Button
                    isIconOnly
                    color="secondary"
                    size="md"
                    isDisabled={!message.trim() && !imageUrls.length}
                    onClick={handleSendMessage}
                  >
                    <PaperPlaneTilt weight="duotone" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  open,
  onClose,
  remaining,
}: {
  open: boolean;
  onClose: () => void;
  remaining?: number;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex h-dvh md:static md:z-auto md:flex md:w-64 md:bg-white">
      <div
        className="absolute inset-0 bg-black/30 md:hidden"
        onClick={onClose}
      />
      <div className="relative z-50 flex h-full w-64 flex-col border-r border-gray-200 bg-white">
        <div className="p-4">
          <div className="mb-4 flex items-center gap-3 border-b">
            <div className="inline-flex w-full items-center justify-center gap-2 px-4 py-4">
              <LogoRuangobat className="h-auto w-7 text-gray/20" />
              <h1 className="text-lg font-extrabold -tracking-wide text-black">
                RuangObat<span className="text-purple">.</span>
              </h1>
            </div>
            <Button
              isIconOnly
              variant="light"
              className="ml-auto text-[#6238C3] md:hidden"
              size="sm"
              onClick={onClose}
            >
              <SidebarSimple weight="duotone" size={22} />
            </Button>
          </div>

          {/* <Button
            startContent={<Plus className="h-4 w-4" />}
            className="w-full"
            color="secondary"
            variant="flat"
          >
            New Chat
          </Button>

          <div className="flex-1 px-4">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Clock className="mb-3 h-12 w-12 text-gray-600" />
              <p className="mb-1 text-sm text-gray-400">No conversations yet</p>
              <p className="text-xs text-gray-500">Start a new chat to begin</p>
            </div>
          </div> */}
        </div>

        <div className="mt-auto border-t border-gray-200 p-4">
          <div className="flex flex-col items-center gap-3">
            <div className="flex w-full flex-col items-center justify-center">
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#6238C3]/10 px-3 py-1 text-xs font-semibold text-[#6238C3]">
                  <CreditCard className="h-4 w-4 text-[#6238C3]" />
                  Sisa Limit
                </span>
              </div>
              <span className="text-3xl font-black tracking-tight text-[#6238C3] drop-shadow-sm">
                {remaining ?? "-"}
              </span>
              <p className="mt-1 text-xs font-medium text-gray-500">
                Pertanyaan hari ini
              </p>
            </div>

            <Button
              startContent={<ArrowUUpLeft className="h-4 w-4" />}
              className="w-full"
              variant="flat"
              color="secondary"
            >
              Kembali ke halaman
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagePreview({
  images,
  setImages,
}: {
  images: { url: string }[];
  setImages: Dispatch<SetStateAction<{ url: string }[]>>;
}) {
  const { data } = useSession();
  if (!images.length) return null;

  async function handleDeleteImage(url: string) {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    await toast.promise(
      fetcher({
        url: `/ai/chat/images?key=${cleanPath}`,
        method: "DELETE",
        token: data?.user.access_token,
      }),
      {
        loading: "Menghapus gambar...",
        success: () => {
          setImages((prev) => prev.filter((image) => image.url !== url));

          return "Gambar berhasil dihapus";
        },
        error: (err) => {
          console.error(err);
          return "Ups sepertinya ada kesalahan ketika menghapus gambar";
        },
      },
    );
  }

  return (
    <div className="mb-2 flex w-full justify-center">
      <div className="w-full max-w-3xl px-4">
        <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <div key={index} className="group relative">
              <img
                src={image.url}
                alt={`Preview ${index + 1}`}
                className="h-20 w-20 rounded-lg border border-gray-200 object-cover shadow-sm"
              />
              <button
                onClick={() => handleDeleteImage(image.url)}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity duration-200 hover:bg-red-600 group-hover:opacity-100"
              >
                <X size={12} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatMessage(prop: MessageState) {
  const { role, content, images, chat_id } = prop;

  if (role === "user") {
    return (
      <div className="flex justify-end gap-3">
        <div className="max-w-xs space-y-2">
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
            <div className="rounded-2xl rounded-tr-sm bg-[#6238C3] px-4 py-2 text-white">
              <p className="text-sm">
                <MemoizedMarkdown id={chat_id as string} content={content} />
              </p>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <Avatar
            size="sm"
            src="https://ruangobat.is3.cloudhost.id/statics/images/avatar-img/avatar-male.svg"
            classNames={{
              base: "ring-2 ring-[#6238C3] bg-[#6238C3]/20",
            }}
          />
        </div>
      </div>
    );
  }

  if (!content) {
    return <LoadingMessage />;
  }

  return (
    <div className="flex justify-start gap-3">
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full shadow-md">
          <img
            src="https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-5.webp"
            alt="ROSA"
            className="h-6 w-6 rounded-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 text-gray-800 shadow-sm">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <p className="text-sm leading-relaxed">
                <MemoizedMarkdown id={chat_id as string} content={content} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingMessage() {
  const text = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
  return (
    <div className="flex justify-start gap-3">
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full shadow-md">
          <img
            src="https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-5.webp"
            alt="ROSA"
            className="h-6 w-6 rounded-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 text-gray-800 shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-[#6238C3]"></div>
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-[#6238C3]"
                style={{ animationDelay: "0.15s" }}
              ></div>
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-[#6238C3]"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
            <span className="text-xs font-medium text-gray-500">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
