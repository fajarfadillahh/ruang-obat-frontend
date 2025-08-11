import { MemoizedMarkdown } from "@/components/MemoizedMarkdown";
import ModalUnauthenticated from "@/components/modal/ModalUnauthenticated";
import NavbarMenu from "@/components/navbar/NavbarMenu";
import { ChatInput } from "@/components/rosa/ChatInput";
import ChatLoading from "@/components/rosa/ChatLoading";
import ChatWelcome from "@/components/rosa/ChatWelcome";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { Button, useDisclosure } from "@nextui-org/react";
import { ArrowUp, Paperclip, X } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type CheckResponse = {
  total: number;
  remaining: number;
};

type ChatResponse = {
  role: "user" | "assistant";
  content: string;
  images?: { image_id: string; img_url: string }[];
  chat_id: string;
};

type MessageState = {
  role: "user" | "assistant";
  content: string;
  is_loading?: boolean;
  chat_id?: string;
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

  const { data: chats, mutate: mutateChat } = useSWR<
    SuccessResponse<ChatResponse[]>
  >(
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
  const [imageUrls, setImageUrls] = useState<{ url: string }[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      onOpen();
    }
  }, [status, onOpen]);

  useEffect(() => {
    if (chats?.data?.length) {
      setMessages(chats.data);
      setTimeout(() => {
        divRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 250);
    }
  }, [chats?.data]);

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
    } catch (error) {
      setImageUrls([]);
      console.log(error);
      toast.error("Ups sepertinya ada kesalahan ketika upload gambar");
    }
  }

  async function handleSubmitChat() {
    if (!user?.data.remaining) return;

    setInput("");
    const images = [...imageUrls];
    setImageUrls([]);

    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    const chat_id_assistant = `${id}-assistant`;

    setMessages((prev) => [
      ...prev,
      {
        chat_id: `${id}-user`,
        role: "user",
        content: input,
        images: images.length
          ? images.map((item) => ({
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
        is_loading: true,
        id,
        chat_id: chat_id_assistant,
      },
    ]);

    setTimeout(() => {
      divRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 250);

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
            input,
            img_url: images.length ? images.map((item) => item.url) : [],
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
              mutate();
              mutateChat();
              divRef.current?.scrollIntoView({ behavior: "smooth" });
              break;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.content;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.chat_id === chat_id_assistant
                    ? {
                        ...msg,
                        role: "assistant",
                        content: msg.content + content,
                        is_loading: false,
                      }
                    : msg,
                ),
              );
            } catch (error) {
              // skip json parse error
              console.error(error);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.chat_id === chat_id_assistant
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
  }

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
          setImageUrls((prev) => prev.filter((image) => image.url !== url));
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
          <ChatWelcome />
        ) : (
          <div className="flex flex-col justify-center gap-6 overflow-y-scroll scrollbar-hide">
            {messages.map((message) => {
              return message.role == "user" ? (
                <div
                  key={message.chat_id}
                  className="flex flex-col gap-2 self-end"
                >
                  <div className="flex w-auto max-w-max flex-wrap justify-end gap-1 self-end">
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

                  <div className="h-max w-auto max-w-[600px] bg-gray/10 p-4 font-medium text-black [border-radius:1.5rem_1.5rem_2px_1.5rem] hover:bg-gray/20">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div
                  className={`mb-4 flex ${message.is_loading ? "items-center" : "items-start"} gap-4`}
                  key={message.chat_id}
                >
                  <Image
                    src="https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-1.webp"
                    alt="icon"
                    width={100}
                    height={100}
                    className="aspect-square size-9 rounded-full"
                  />

                  <div className="h-max flex-1 font-medium leading-[170%] text-black">
                    {message.is_loading && <ChatLoading />}

                    <MemoizedMarkdown
                      id={message.chat_id as string}
                      content={message.content}
                    />
                  </div>
                </div>
              );
            })}

            <div ref={divRef}></div>
          </div>
        )}

        <div className="sticky bottom-0 left-0 bg-white pb-2 md:pb-4">
          <div className="flex flex-col gap-2 rounded-2xl border border-gray-300 bg-gray-100 p-4 shadow-sm">
            {imageUrls.length ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {imageUrls.map((image, index) => (
                  <div
                    key={index}
                    className="relative isolate size-16 overflow-hidden rounded-xl sm:size-20"
                  >
                    <Image
                      priority
                      src={image.url}
                      alt="default image"
                      width={100}
                      height={100}
                      className="aspect-square object-cover object-center"
                    />

                    <Button
                      isIconOnly
                      size="sm"
                      radius="full"
                      className="absolute right-1 top-1 z-10"
                      onClick={() => handleDeleteImage(image.url)}
                    >
                      <X weight="bold" size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : null}

            <ChatInput
              input={input}
              setInput={setInput}
              handleSubmitChat={handleSubmitChat}
              disabled={
                status == "authenticated" ? !user?.data.remaining : false
              }
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
                  onChange={handleFileUpload}
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
                  onClick={() => handleSubmitChat()}
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
