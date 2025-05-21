import ModalUnauthenticated from "@/components/modal/ModalUnauthenticated";
import NavbarMenu from "@/components/navbar/NavbarMenu";
import { SuccessResponse } from "@/types/global.type";
import { customInputClassnames } from "@/utils/customInputClassnames";
import { fetcher } from "@/utils/fetcher";
import { Button, Textarea, useDisclosure } from "@nextui-org/react";
import { CreditCard, PaperPlaneRight } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";

type TypingTextProps = {
  text: string;
  speed?: number;
  onDone?: () => void;
  divRef: MutableRefObject<HTMLDivElement | null>;
};

function TypingText(props: TypingTextProps) {
  const { text, speed = 0.2, onDone } = props;
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(
    function () {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);

          props.divRef.current?.scrollIntoView({ behavior: "smooth" });
        }, speed);

        return () => clearTimeout(timeout);
      } else {
        if (onDone) {
          onDone();
        }
      }
    },
    [index, text, speed, onDone, props.divRef],
  );

  return (
    <ReactMarkdown
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
      }}
    >
      {displayedText}
    </ReactMarkdown>
  );
}

export default function RosaPage() {
  const { status, data } = useSession();

  const { data: user, mutate } = useSWR<
    SuccessResponse<{ total: number; remaining: number }>
  >(
    status == "authenticated"
      ? {
          url: "/ai/limits/check",
          method: "GET",
          token: data.user.access_token,
        }
      : null,
  );

  const { data: chats } = useSWR<
    SuccessResponse<{ role: string; content: string }[]>
  >(
    status == "authenticated"
      ? {
          url: "/ai/chat",
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
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<
    {
      role: string;
      content: string;
      is_loading?: boolean;
      id?: number;
      is_typing?: boolean;
    }[]
  >(
    chats?.data.length
      ? chats.data.map((chat) => ({ ...chat, is_typing: false }))
      : [],
  );
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

  async function handleSubmitChat() {
    const id = Date.now();
    if (!user?.data.remaining) return;

    setOnProgressAi(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: "", is_loading: true, id },
    ]);

    setTimeout(() => {
      divRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 250);

    try {
      const response: SuccessResponse<{ role: string; content: string }> =
        await fetcher({
          url: "/ai/chat",
          method: "POST",
          token: data?.user.access_token,
          data: {
            input,
          },
        });

      mutate();

      setMessages((prev) =>
        prev.map((msg) => {
          return msg.id == id
            ? {
                role: "assistant",
                content: response.data.content,
                is_loading: false,
                id: 0,
                is_typing: true,
              }
            : msg;
        }),
      );
    } catch (error) {
      console.log(error);

      setMessages((prev) =>
        prev.map((msg) => {
          return msg.id == id
            ? {
                role: "assistant",
                content:
                  "Ups sepertinya server kita ada masalah. Maaf ya atas ketidaknyamanannya 😫",
                is_loading: false,
                id: 0,
              }
            : msg;
        }),
      );
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
        {/* message */}
        {messages.length ? (
          <div className="flex flex-col justify-center gap-6 overflow-y-scroll scrollbar-hide">
            {messages.map((message, index) => {
              return message.role == "user" ? (
                <div className="h-max w-auto max-w-[600px] self-end bg-gray/10 p-4 font-medium text-black [border-radius:1.5rem_1.5rem_2px_1.5rem] hover:bg-gray/20">
                  {message.content}
                </div>
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
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={divRef}></div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-2xl font-extrabold text-black">
              ROSA (Ruang Obat Smart Assistant) 💊
            </h1>
            <p className="max-w-[600px] text-center font-medium leading-[170%] text-gray">
              Hi, aku ROSA yang siap bantu kamu menjawab berbagai pertanyaan
              seputar dunia Farmasi dan layanan belajar di Ruang Obat ✨.
            </p>
          </div>
        )}

        {/* input field */}
        <div className="sticky bottom-0 left-0 bg-white pb-4 md:pb-8">
          <div className="grid gap-4 rounded-xl border-2 border-gray/10 p-4">
            <div className="inline-flex items-center gap-2">
              <CreditCard weight="duotone" size={22} className="text-purple" />

              <p className="text-sm font-medium capitalize leading-[170%] text-gray">
                Sisa akses AI Anda hari ini:{" "}
                <span className="font-black text-purple">
                  {status == "authenticated" ? user?.data.remaining : "-"}
                </span>
              </p>
            </div>

            <div className="grid gap-2">
              <Textarea
                isDisabled={
                  status == "authenticated"
                    ? !user?.data.remaining || onProgressAi
                    : onProgressAi
                }
                minRows={2}
                maxRows={6}
                type="text"
                variant="flat"
                labelPlacement="outside"
                placeholder="Tanyakan Seputar Dunia Farmasi dan Ruang Obat..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !onProgressAi) {
                    e.preventDefault();
                    handleSubmitChat();
                    setInput("");
                  }
                }}
                classNames={customInputClassnames}
              />

              <Button
                isDisabled={
                  !input ||
                  !user?.data.remaining ||
                  status == "unauthenticated" ||
                  onProgressAi ||
                  messages.some((msg) => msg.is_loading)
                }
                color="secondary"
                endContent={<PaperPlaneRight weight="bold" size={18} />}
                onClick={() => {
                  handleSubmitChat();
                  setInput("");
                }}
                className="font-bold"
              >
                Tanyakan
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
