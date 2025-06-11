import ModalUnauthenticated from "@/components/modal/ModalUnauthenticated";
import NavbarMenu from "@/components/navbar/NavbarMenu";
import { TypingText } from "@/components/TypingText";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { Button, useDisclosure } from "@nextui-org/react";
import { ArrowUp } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
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
};

type MessageState = {
  role: string;
  content: string;
  is_loading?: boolean;
  id?: number;
  is_typing?: boolean;
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

  const [onProgressAi, setOnProgressAi] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      onOpen();
    }
  }, [status, onOpen]);

  useEffect(() => {
    if (chats?.data?.length) {
      setMessages(chats.data.map((chat) => ({ ...chat, is_typing: false })));
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

    setOnProgressAi(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: "", is_loading: true, id },
    ]);

    try {
      const response: SuccessResponse<ChatResponse> = await fetcher({
        url: "/ai/chat",
        method: "POST",
        token: data?.user.access_token,
        data: { input },
      });

      mutate();

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? {
                role: "assistant",
                content: response.data.content,
                is_loading: false,
                id: 0,
                is_typing: true,
              }
            : msg,
        ),
      );
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
  }, [user?.data.remaining, input, data?.user.access_token, mutate]);

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
                  {/* === CONTAINER FOR CHAT WITH IMAGES === */}
                  {/* <div className="-mb-4 flex w-auto max-w-max flex-wrap justify-end gap-1 self-end">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Image
                        key={index}
                        priority
                        src="/img/default-thumbnail.png"
                        alt="default image"
                        width={100}
                        height={100}
                        className="aspect-square size-24 rounded-xl object-cover object-center sm:size-32"
                      />
                    ))}
                  </div> */}

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
                      <div className="flex justify-start space-x-1">
                        <div className="loader"></div>
                      </div>
                    ) : null}

                    {message.is_typing ? (
                      <TypingText
                        text={message.content}
                        key={message.id ?? index}
                        divRef={divRef}
                        onDone={() => {
                          setOnProgressAi(false);
                        }}
                      />
                    ) : (
                      <ReactMarkdown
                        children={message.content}
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
                      />
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={divRef}></div>
          </div>
        )}

        <div className="sticky bottom-0 left-0 bg-white pb-4 md:pb-8">
          <div className="flex flex-col gap-2 rounded-2xl border border-gray-300 bg-gray-100 p-5 shadow-sm">
            {/* === CONTAINER FOR REVIEW IMAGES === */}
            {/* <div className="mb-4 flex flex-wrap gap-2">
              {Array.from({ length: 5 }, (_, index) => (
                <div
                  key={index}
                  className="relative isolate size-16 overflow-hidden rounded-xl sm:size-20"
                >
                  <Image
                    priority
                    src="/img/default-thumbnail.png"
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
                      toast.success(`gambar ${index + 1} berhasil di hapus!`)
                    }
                    className="absolute right-1 top-1 z-10"
                  >
                    <X weight="bold" size={18} />
                  </Button>
                </div>
              ))}
            </div> */}

            <input
              placeholder="Tanyakan Seputar Farmasi dan Ruang Obat..."
              className="bg-gray-100 font-semibold outline-none placeholder:text-sm placeholder:font-semibold placeholder:text-gray"
              disabled={
                status == "authenticated"
                  ? !user?.data.remaining || onProgressAi
                  : onProgressAi
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !onProgressAi) {
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
                {/* <Button
                  variant="flat"
                  size="sm"
                  className="rounded-lg bg-gray-300 font-bold"
                  isIconOnly
                >
                  <Paperclip size={18} weight="bold" />
                </Button> */}

                <Button
                  isDisabled={
                    !input ||
                    !user?.data.remaining ||
                    status == "unauthenticated" ||
                    onProgressAi ||
                    messages.some((msg) => msg.is_loading)
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
