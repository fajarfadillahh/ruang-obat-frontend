import ModalUnauthenticated from "@/components/modal/ModalUnauthenticated";
import NavbarMenu from "@/components/navbar/NavbarMenu";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { loadingTexts } from "@/utils/loadingTexts";
import { Button, useDisclosure } from "@nextui-org/react";
import { ArrowUp, Paperclip, X } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useSWR from "swr";

type CheckResponse = {
  total: number;
  remaining: number;
};

type ChatResponse = {
  role: string;
  content: string;
  images?: { image_id: string; img_url: string }[];
};

type MessageState = {
  role: string;
  content: string;
  is_loading?: boolean;
  id?: number;
  images?: { image_id: string; img_url: string }[];
};

export default function RosaChatPage() {
  const { status, data } = useSession();

  const { data: user, mutate } = useSWR<SuccessResponse<CheckResponse>>(
    status == "authenticated"
      ? {
          url: "/ai/limits/check",
          method: "GET",
          token: data.user.access_token,
        }
      : null,
  );

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

  const { onOpen, isOpen, onClose } = useDisclosure();
  const divRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const currentUrl = `https://ruangobat.id${router.asPath}`;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageState[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      onOpen();
    }
  }, [status, onOpen]);

  useEffect(() => {
    if (chats?.data?.length) {
      setMessages(chats.data.map((chat) => ({ ...chat })));
    }
  }, [chats?.data]);

  useEffect(() => {
    if (messages.length) {
      divRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmitChat = useCallback(async () => {
    const id = Date.now();
    if (!user?.data.remaining) return;

    const newImages: { url: string }[] = [];

    if (images.length) {
      const upload = await handleFileUpload(images);

      if (!Array.isArray(upload)) {
        return toast.error(upload as string);
      }

      newImages.push(...upload);
      setImages([]);
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
        images: newImages.length
          ? newImages.map((item) => ({
              image_id:
                Date.now().toString() +
                Math.random().toString(36).substring(2, 15),
              img_url: item.url,
            }))
          : [],
      },
      { role: "assistant", content: "", is_loading: true, id },
    ]);

    try {
      const prefix = process.env.NEXT_PUBLIC_MODE == "dev" ? "dev" : "api";

      const response = await fetch(
        `https://${prefix}.ruangobat.id/api/ai/chat/streaming`,
        {
          headers: {
            Authorization: `Bearer ${data?.user.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input,
            img_url: newImages.length ? newImages.map((item) => item.url) : [],
          }),
          method: "POST",
        },
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader?.read();
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
              break;
            }

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === id
                  ? {
                      ...msg,
                      role: "assistant",
                      content: msg.content + data,
                      is_loading: false,
                    }
                  : msg,
              ),
            );
          }
        }
      }

      mutate();
    } catch (error) {
      console.error(error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? {
                role: "assistant",
                content:
                  "Ups sepertinya server kita ada masalah. Maaf ya atas ketidaknyamanannya 😫",
                is_loading: false,
                id: 0,
              }
            : msg,
        ),
      );
    }
  }, [user?.data.remaining, input, data?.user.access_token, mutate, images]);

  function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
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

    setImages(validFiles);
  }

  async function handleFileUpload(images: File[]) {
    try {
      const form = new FormData();

      for (const image of images) {
        form.append("images", image);
      }

      const result: SuccessResponse<{ url: string }[]> = await fetcher({
        url: "/ai/chat/images",
        method: "POST",
        data: form,
        file: true,
        token: data?.user.access_token,
      });

      return result.data;
    } catch (error) {
      console.log(error);
      return "Ups sepertinya ada kesalahan ketika upload gambar" as string;
    }
  }

  return (
    <>
      <NextSeo
        title="Ruang Obat Smart Assistant (ROSA)"
        description="Ruang Obat Smart Assistant dirancang untuk meningkatkan efektivitas proses belajar mahasiswa serta mempersiapkan mereka menghadapi tantangan profesional di dunia farmasi."
        canonical={currentUrl}
        openGraph={{
          url: currentUrl,
          title: "Ruang Obat Smart Assistant (ROSA)",
          description:
            "Ruang Obat Smart Assistant dirancang untuk meningkatkan efektivitas proses belajar mahasiswa serta mempersiapkan mereka menghadapi tantangan profesional di dunia farmasi.",
          site_name: "RuangObat",
        }}
      />

      <Head>
        <title>Ruang Obat Smart Assistant (ROSA)</title>
      </Head>

      <NavbarMenu />

      <ModalUnauthenticated
        isOpen={isOpen}
        onClose={() => {
          router.back();
          onClose();
        }}
      />

      <main className="relative isolate mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-[900px] grid-rows-[1fr_max-content] px-6 pt-6 xl:px-0">
        {!messages.length ? (
          <div className="mt-8 grid h-max gap-4 xl:mt-0">
            <Image
              priority
              src="/img/ai/APOTEKER-ROSA-4.webp"
              alt="apoteker rosa image"
              width={250}
              height={250}
              className="justify-self-center"
            />

            <div className="grid justify-items-center gap-2 text-center">
              <h1 className="text-2xl font-extrabold text-black">
                ROSA (Ruang Obat Smart Assistant) 💊
              </h1>

              <p className="max-w-[600px] font-medium leading-[170%] text-gray">
                Hi, aku ROSA yang siap bantu kamu menjawab berbagai pertanyaan
                seputar dunia Farmasi dan layanan belajar di Ruang Obat ✨.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center gap-6 overflow-y-scroll scrollbar-hide">
            {messages.map((message, index) => {
              return message.role == "user" ? (
                <>
                  <div className="-mb-4 flex w-auto max-w-max flex-wrap justify-end gap-1 self-end">
                    {message.images?.map((image) => (
                      <Image
                        key={image.image_id}
                        priority
                        src={image.img_url}
                        alt="default image"
                        width={100}
                        height={100}
                        className="aspect-square size-24 cursor-pointer rounded-xl object-cover object-center sm:size-32"
                        onClick={() => window.open(image.img_url, "_blank")}
                      />
                    ))}
                  </div>

                  <div className="h-max w-auto max-w-[600px] self-end bg-gray/10 p-4 font-medium text-black [border-radius:1.5rem_1.5rem_2px_1.5rem] hover:bg-gray/20">
                    {message.content}
                  </div>
                </>
              ) : (
                <div
                  className={`mb-4 flex ${message.is_loading ? "items-center" : "items-start"} gap-4`}
                >
                  <Image
                    src="/img/default-thumbnail.png"
                    alt="icon"
                    width={100}
                    height={100}
                    className="aspect-square size-9 rounded-full"
                  />

                  <div className="h-max flex-1 font-medium leading-[170%] text-black">
                    {message.is_loading ? (
                      <div className="relative max-w-xs rounded-xl bg-gray-100 px-4 py-3 text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-200">
                        <p className="mb-1 text-sm">
                          {
                            loadingTexts[
                              Math.floor(Math.random() * loadingTexts.length)
                            ]
                          }
                        </p>
                        <div className="flex items-center space-x-1">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 [animation-delay:-0.3s] dark:bg-gray-300"></span>
                          <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 [animation-delay:-0.15s] dark:bg-gray-300"></span>
                          <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 dark:bg-gray-300"></span>
                        </div>

                        <div className="absolute -left-2 top-3 h-3 w-3 rotate-45 rounded-sm bg-gray-100 shadow-sm dark:bg-gray-800"></div>
                      </div>
                    ) : null}

                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        ol: ({ children, ...props }) => (
                          <ol className="list-decimal pl-4" {...props}>
                            {children}
                          </ol>
                        ),
                        ul: ({ children, ...props }) => (
                          <ul className="list-disc pl-4" {...props}>
                            {children}
                          </ul>
                        ),
                        table: ({ children, ...props }) => (
                          <div className="overflow-x-scroll scrollbar-hide">
                            <table
                              className="my-4 table-auto border border-black [&_td]:border [&_td]:p-4 [&_th]:whitespace-nowrap [&_th]:border [&_th]:bg-gray/20 [&_th]:p-4 [&_tr:last-child]:border-b-0 [&_tr]:border-b"
                              {...props}
                            >
                              {children}
                            </table>
                          </div>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            })}

            <div ref={divRef}></div>
          </div>
        )}

        <div className="sticky bottom-0 left-0 bg-white pb-4 md:pb-8">
          <div className="flex flex-col gap-2 rounded-2xl border border-gray-300 bg-gray-100 p-5 shadow-sm">
            {images.length ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative isolate size-16 overflow-hidden rounded-xl sm:size-20"
                  >
                    <Image
                      priority
                      src={URL.createObjectURL(image)}
                      alt="default image"
                      width={100}
                      height={100}
                      className="aspect-square object-cover object-center"
                    />

                    <Button
                      isIconOnly
                      size="sm"
                      radius="full"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="absolute right-1 top-1 z-10"
                    >
                      <X weight="bold" size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : null}

            <input
              placeholder="Tanyakan Seputar Farmasi dan Ruang Obat..."
              className="bg-gray-100 font-semibold outline-none placeholder:text-sm placeholder:font-semibold placeholder:text-gray"
              disabled={
                status == "authenticated" ? !user?.data.remaining : false
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitChat();
                  setInput("");
                }
              }}
            />

            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs font-medium capitalize leading-[170%] text-gray">
                Sisa Pertanyaan Kamu Hari Ini:{" "}
                <span className="font-black text-purple">
                  {status == "authenticated" ? user?.data.remaining : "-"}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  onChange={handleFileInput}
                  accept=".jpg, .jpeg, .png"
                />

                <Button
                  variant="flat"
                  size="sm"
                  className="rounded-lg bg-gray-300 font-bold"
                  isIconOnly
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip size={18} weight="bold" />
                </Button>

                <Button
                  isDisabled={
                    !input ||
                    !user?.data.remaining ||
                    status == "unauthenticated"
                  }
                  variant="flat"
                  size="sm"
                  isIconOnly
                  className="rounded-lg bg-purple font-bold text-white"
                  onClick={() => {
                    handleSubmitChat();
                    setInput("");
                  }}
                >
                  <ArrowUp size={18} weight="bold" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
