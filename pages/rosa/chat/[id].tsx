import ModalUnauthenticated from "@/components/modal/ModalUnauthenticated";
import InputComponent from "@/components/rosa-ai/InputComponent";
import Message from "@/components/rosa-ai/Message";
import MessageStreaming from "@/components/rosa-ai/MessageStreaming";
import Navbar from "@/components/rosa-ai/NavbarRosa";
import Sidebar from "@/components/rosa-ai/SidebarNew";
import { AIContext } from "@/context/AIContext";
import AIProvider from "@/context/AIProvider";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ChatResponse, MessageState } from "@/types/chat.type";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { isUUID } from "@/utils/string.util";
import { Button } from "@nextui-org/react";
import { ArrowDown } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function RosaPageById({
  title,
  chats,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AIProvider>
      <SubRosaPageById {...{ title, chats }} />
    </AIProvider>
  );
}

export const getServerSideProps: GetServerSideProps<{
  title: string;
  chats: ChatResponse[];
}> = async ({ params, req, res }) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    if (!isUUID(params?.id as string)) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const chats: SuccessResponse<{
      thread_id: string;
      title: string;
      chats: ChatResponse[];
    }> = await fetcher({
      url: `/ai/chat/${params?.id}`,
      method: "GET",
      token: session.user.access_token,
    });

    return {
      props: {
        title: chats.data.title,
        chats: chats.data.chats || [],
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

function SubRosaPageById({
  chats,
  title,
}: {
  title: string;
  chats: ChatResponse[];
}) {
  const ctx = useContext(AIContext);
  const router = useRouter();
  const { data } = useSession();

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [messages, setMessages] = useState<MessageState[]>([]);

  const scrollThrottleRef = useRef<boolean>(false);
  const pendingScrollRef = useRef<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const streamingContentRef = useRef<string>("");
  const streamingChatIdRef = useRef<string>("");
  const messageStreamingRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(
    (behavior: "smooth" | "instant" | "auto" = "smooth") => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior,
        });
      }
    },
    [],
  );

  useEffect(() => {
    if (chats.length) {
      setMessages(chats);
      setTimeout(() => {
        scrollToBottom("instant");
      }, 10);
    }
  }, [chats]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const container = chatContainerRef.current;
        const isNearBottom =
          container.scrollTop + container.clientHeight >=
          container.scrollHeight - 200;

        setShowScrollButton(!isNearBottom && messages.length > 0);
      }
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messages.length]);

  const throttledScrollToBottom = useCallback(() => {
    if (scrollThrottleRef.current) {
      pendingScrollRef.current = true;
      return;
    }

    scrollThrottleRef.current = true;

    requestAnimationFrame(() => {
      if (chatContainerRef.current) {
        const container = chatContainerRef.current;
        const isNearBottom =
          container.scrollTop + container.clientHeight >=
          container.scrollHeight - 100;

        if (isNearBottom) {
          scrollToBottom("smooth");
        }
      }

      setTimeout(() => {
        scrollThrottleRef.current = false;
        if (pendingScrollRef.current) {
          pendingScrollRef.current = false;
          throttledScrollToBottom();
        }
      }, 100);
    });
  }, [scrollToBottom]);

  async function handleSendMessage(
    input: string,
    imageUrls?: { url: string }[],
  ) {
    if (!input.trim() && !imageUrls?.length) return;

    ctx?.setIsStreaming(true);
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    const chat_id_assistant = `${id}-assistant`;

    streamingContentRef.current = "";
    streamingChatIdRef.current = chat_id_assistant;

    setMessages((prev) => [
      ...prev,
      {
        chat_id: `${id}-user`,
        role: "user",
        content: input,
        images: imageUrls?.length
          ? imageUrls.map((item) => ({
              image_id:
                Date.now().toString() +
                Math.random().toString(36).substring(2, 15),
              img_url: item.url,
            }))
          : [],
      },
    ]);

    setTimeout(() => scrollToBottom(), 100);

    try {
      const prefix =
        process.env.NEXT_PUBLIC_MODE === "production" ? "api" : "dev";

      const response = await fetch(
        `https://${prefix}.ruangobat.id/api/ai/chat/streaming/v4`,
        {
          headers: {
            Authorization: `Bearer ${data?.user.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input,
            img_url: imageUrls?.map((item) => item.url),
            thread_id: router.query.id,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
      let streamComplete = false;
      let content = "";

      while (!streamComplete) {
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
              streamComplete = true;
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                streamingContentRef.current += parsed.content;
                content += parsed.content;

                if (messageStreamingRef.current) {
                  messageStreamingRef.current.innerHTML = content;
                  setTimeout(() => {
                    scrollToBottom();
                  }, 50);
                }
              }
            } catch (error) {
              console.error("JSON parse error:", error);
            }
          }
        }
      }

      if (buffer.trim()) {
        const lines = buffer.split("\n").filter((line) => line.trim());
        for (const line of lines) {
          if (line.startsWith("data:") && !line.includes("[DONE]")) {
            const data = line.replace(/^data:\s?/, "").trim();
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                streamingContentRef.current += parsed.content;
              }
            } catch (error) {
              console.error("Buffer parse error:", error);
            }
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: streamingContentRef.current,
          id,
          chat_id: chat_id_assistant,
        },
      ]);

      setTimeout(() => {
        scrollToBottom("instant");
      }, 100);

      reader?.cancel();
      ctx?.mutateLimit();
      ctx?.setIsStreaming(false);
    } catch (error) {
      ctx?.setIsStreaming(false);
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Ups sepertinya server kita ada masalah. Maaf ya atas ketidaknyamanannya 😫",
          id,
          chat_id: chat_id_assistant,
        },
      ]);
    }
  }

  return (
    <>
      <NextSeo
        title={title}
        description="Ruang Obat Smart Assistant dirancang untuk meningkatkan efektivitas proses belajar mahasiswa serta mempersiapkan mereka menghadapi tantangan profesional di dunia farmasi."
        canonical="https://ruangobat.id"
        openGraph={{
          url: "https://ruangobat.id",
          title,
          description:
            "Ruang Obat Smart Assistant dirancang untuk meningkatkan efektivitas proses belajar mahasiswa serta mempersiapkan mereka menghadapi tantangan profesional di dunia farmasi.",
          site_name: "RuangObat",
        }}
      />

      <ModalUnauthenticated
        isOpen={ctx?.isOpenUnauthenticated as boolean}
        onClose={() => {
          ctx?.onCloseUnauthenticated();
        }}
      />

      <div className="flex h-dvh overflow-hidden bg-white text-black">
        <Sidebar open={true} className="hidden lg:flex" />

        <Sidebar
          open={ctx?.sidebarOpen as boolean}
          onClose={() => ctx?.setSidebarOpen(false)}
          className="fixed inset-0 z-40 flex h-dvh lg:hidden"
        />

        <div className="relative isolate grid w-full grid-rows-[max-content_1fr_max-content]">
          <Navbar />

          <div
            ref={chatContainerRef}
            className="relative flex-1 overflow-y-scroll bg-white px-2 scrollbar-hide sm:px-4 lg:px-0 lg:scrollbar-default"
          >
            <div className="mx-auto min-h-full max-w-3xl px-2 py-4 sm:px-4">
              <div className="space-y-4 pb-8">
                {messages.map((message) => (
                  <Message {...message} key={message.chat_id} />
                ))}

                {ctx?.isStreaming ? (
                  <MessageStreaming messageStreamingRef={messageStreamingRef} />
                ) : null}
              </div>
            </div>

            {showScrollButton && (
              <Button
                isIconOnly
                onClick={() => scrollToBottom("smooth")}
                className="fixed bottom-28 right-4 z-50 lg:bottom-32"
                size="sm"
                variant="solid"
                color="secondary"
              >
                <ArrowDown size={18} weight="bold" className="animate-bounce" />
              </Button>
            )}
          </div>

          <InputComponent
            {...{
              inputContainerRef,
              textareaRef,
              handleSendMessage,
            }}
          />
        </div>
      </div>
    </>
  );
}
