import { MemoizedMarkdown } from "@/components/MemoizedMarkdown";
import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { loadingTexts } from "@/utils/loadingTexts";
import { Avatar, Button, Chip } from "@nextui-org/react";
import {
  ArrowUUpLeft,
  CreditCard,
  Images,
  PaperPlaneTilt,
  SidebarSimple,
  X,
} from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
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
          loading: "Sedang mengupload gambar...",
          success: "Gambar berhasil diupload!",
          error: "Ups sepertinya ada kesalahan ketika upload gambar!",
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
      toast.error("Ups sepertinya ada kesalahan ketika upload gambar!");
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
        return toast.error("Gagal mendapatkan pembaca dari response body!");
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

  function formatName(name: string): string {
    const parts: string[] = name.split(" ");
    let result: string;

    if (parts.length === 1) {
      result = parts[0];
    } else if (parts.length === 2) {
      result = `${parts[0]} ${parts[1].charAt(0)}.`;
    } else {
      result = `${parts[0]} ${parts[1].charAt(0)}. ${parts[2].charAt(0)}.`;
    }

    return result;
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

      {/* === sidebar: desktop view === */}
      <Sidebar
        open={true}
        onClose={() => {}}
        remaining={limit?.data.remaining}
        className="hidden lg:flex"
      />

      {/* === sidebar: mobile view === */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        remaining={limit?.data.remaining}
        className="fixed inset-0 z-40 flex h-dvh lg:hidden"
      />

      <div className="relative isolate grid w-full grid-rows-[max-content_1fr_max-content]">
        {/* === navbar section === */}
        <nav className="z-10 flex h-20 items-center justify-between border-b-2 border-gray/5 bg-white px-4 lg:justify-end">
          <Button
            isIconOnly
            variant="light"
            onClick={() => setSidebarOpen(true)}
            className="text-purple lg:hidden"
          >
            <SidebarSimple weight="duotone" size={24} />
          </Button>

          <div className="inline-flex items-center gap-[10px] hover:cursor-pointer">
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
                {status === "authenticated"
                  ? formatName(data?.user.fullname)
                  : "-"}
              </h6>

              <p className="text-sm font-medium uppercase text-gray">
                {status === "authenticated" ? data?.user.user_id : "-"}
              </p>
            </div>
          </div>
        </nav>

        {/* === bubbles chat === */}
        <div
          ref={chatContainerRef}
          className="relative flex-1 overflow-hidden overflow-y-scroll bg-white px-4 scrollbar-hide lg:px-0 lg:scrollbar-default"
        >
          <div className="mx-auto grid min-h-full max-w-3xl [padding:1rem_0_3rem]">
            {!chatMessages.length ? (
              <div className="grid justify-center justify-items-center gap-8 self-center">
                <Image
                  src="https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-6.webp"
                  alt="apoteker rosa image"
                  width={600}
                  height={600}
                  className="h-56 w-auto lg:h-64"
                  priority
                />

                <div className="grid gap-2 text-center">
                  <h1 className="text-xl font-black text-black lg:text-3xl">
                    ROSA (Ruang Obat Smart Assistant)
                  </h1>

                  <p className="max-w-[320px] font-medium leading-[170%] text-gray lg:max-w-[600px]">
                    Hai, aku ROSA. Aku siap bantu kamu menjawab berbagai
                    pertanyaan seputar dunia farmasi dan layanan belajar di
                    RuangObat ✨.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid space-y-4">
                {chatMessages.map((message) => (
                  <ChatMessage {...message} key={message.chat_id} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* === input chat === */}
        <div
          ref={inputContainerRef}
          className="sticky bottom-0 h-auto w-full justify-self-center border-t-2 border-gray/5 [padding:1rem_1rem_2rem] lg:px-0"
        >
          <div className="mx-auto max-w-3xl">
            <ImagePreview images={imageUrls} setImages={setImageUrls} />

            <div className="w-full max-w-3xl">
              <div className="flex w-full flex-col gap-2 rounded-3xl border-2 border-purple/10 bg-purple/5 p-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-purple/10">
                <textarea
                  ref={textareaRef}
                  aria-label="chat input"
                  rows={1}
                  placeholder="Tanya seputar Farmasi dan RuangObat..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  onFocus={() => {
                    setTimeout(() => {
                      scrollToInput();
                    }, 300);
                  }}
                  className="max-h-32 w-full resize-none border-none bg-transparent font-semibold outline-none [padding:0.5rem_1rem] placeholder:text-sm placeholder:font-semibold placeholder:-tracking-wide placeholder:text-purple/80 focus:ring-0 lg:placeholder:text-base"
                />

                <div className="flex items-center justify-between px-2">
                  <Button
                    isIconOnly
                    variant="light"
                    color="secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Images weight="duotone" size={28} />
                  </Button>

                  <Button
                    isIconOnly
                    color="secondary"
                    isDisabled={!message.trim() && !imageUrls.length}
                    onClick={handleSendMessage}
                  >
                    <PaperPlaneTilt weight="duotone" size={20} />
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
  className,
}: {
  open: boolean;
  onClose: () => void;
  remaining?: number;
  className?: string;
}) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className={`${className}`}>
      {/* === overlay sidebar: mobile view === */}
      <div
        className="absolute inset-0 bg-black/30 lg:hidden"
        onClick={onClose}
      />

      <div className="relative z-50 flex h-full w-64 flex-col justify-between border-r-2 border-gray/5 bg-white">
        <div className="flex h-20 items-center gap-2 border-b-2 border-gray/5 px-4">
          <div className="inline-flex w-full items-center gap-2 lg:justify-center">
            <LogoRuangobat className="h-auto w-7 text-gray/20" />
            <h1 className="text-lg font-extrabold -tracking-wide text-black">
              RuangObat<span className="text-purple">.</span>
            </h1>
          </div>

          <Button
            isIconOnly
            variant="light"
            onClick={onClose}
            className="text-purple lg:hidden"
          >
            <SidebarSimple weight="duotone" size={24} />
          </Button>
        </div>

        <div className="grid gap-8 border-t-2 border-gray/5 p-4">
          <div className="grid justify-items-center">
            <Chip
              variant="flat"
              color="secondary"
              startContent={<CreditCard weight="duotone" size={18} />}
              classNames={{
                base: "px-2 gap-1 mb-2",
                content: "font-bold capitalize",
              }}
            >
              Sisa Limit
            </Chip>

            <h5 className="text-3xl font-black text-purple">
              {remaining ?? "-"}
            </h5>

            <p className="text-sm font-medium leading-[170%] text-gray">
              Pertanyaan hari ini
            </p>
          </div>

          <Button
            color="secondary"
            startContent={<ArrowUUpLeft weight="bold" size={18} />}
            onClick={() => router.push("/")}
            className="font-bold"
          >
            Kembali ke Beranda
          </Button>
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

          return "Gambar berhasil dihapus!";
        },
        error: (err) => {
          console.error(err);
          return "Ups sepertinya ada kesalahan ketika menghapus gambar!";
        },
      },
    );
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {images.map((image, index) => (
        <div key={index} className="group relative isolate">
          <div className="size-20 overflow-hidden rounded-xl border-2 border-gray/5 hover:cursor-pointer">
            <img
              src={image.url}
              alt={`Preview ${index + 1}`}
              className="size-full object-cover object-center"
            />
          </div>

          <button
            onClick={() => handleDeleteImage(image.url)}
            className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-danger text-white opacity-0 transition-opacity duration-200 hover:bg-danger-600 group-hover:opacity-100"
          >
            <X size={16} weight="bold" />
          </button>
        </div>
      ))}
    </div>
  );
}

function ChatMessage(prop: MessageState) {
  const { role, content, images, chat_id } = prop;

  if (role === "user") {
    return (
      <div className="max-w-md space-y-2 justify-self-end">
        {images && images.length > 0 && (
          <div className="flex flex-wrap justify-end gap-1">
            {images.map((image, index) => (
              <img
                key={image.img_url}
                src={image.img_url}
                alt={`User image ${index + 1}`}
                className="size-32 cursor-pointer rounded-xl border-2 border-gray/5 object-cover transition-opacity hover:opacity-60"
                onClick={() => {
                  const imageUrl = image.img_url;
                  window.open(imageUrl, "_blank");
                }}
              />
            ))}
          </div>
        )}

        {content && (
          <div className="rounded-3xl rounded-tr-sm bg-purple p-4 text-white hover:bg-purple/90">
            <p className="text-sm font-medium lg:text-base">
              <MemoizedMarkdown id={chat_id as string} content={content} />
            </p>
          </div>
        )}
      </div>
    );
  }

  if (!content) {
    return <LoadingMessage />;
  }

  return (
    <div className="flex items-start gap-4 pb-6">
      <img
        src="https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-5.webp"
        alt="ROSA"
        className="hidden size-10 rounded-full object-cover object-center shadow lg:flex"
      />

      <div className="max-w-2xl rounded-3xl rounded-tl-sm bg-gray/5 p-4 text-black hover:bg-gray/10">
        <p className="text-sm leading-[170%] lg:text-base">
          <MemoizedMarkdown id={chat_id as string} content={content} />
        </p>
      </div>
    </div>
  );
}

function LoadingMessage() {
  const text = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];

  return (
    <div className="flex items-start gap-4 pb-6">
      <img
        src="https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-5.webp"
        alt="ROSA"
        className="hidden size-10 rounded-full object-cover object-center shadow lg:flex"
      />

      <div className="flex max-w-2xl items-center gap-2 rounded-3xl rounded-tl-sm bg-gray/5 p-4 text-black hover:bg-gray/10">
        <div className="flex gap-1">
          <div className="size-2 animate-bounce rounded-full bg-purple" />
          <div className="size-2 animate-bounce rounded-full bg-purple delay-150" />
          <div className="size-2 animate-bounce rounded-full bg-purple delay-300" />
        </div>

        <p className="text-sm font-medium leading-[170%] text-black lg:text-base">
          {text}
        </p>
      </div>
    </div>
  );
}
