import ModalUnauthenticated from "@/components/modal/ModalUnauthenticated";
import InputComponent from "@/components/rosa-ai/InputComponent";
import Message from "@/components/rosa-ai/Message";
import NavbarRosa from "@/components/rosa-ai/NavbarRosa";
import Sidebar from "@/components/rosa-ai/SidebarNew";
import WelcomeChat from "@/components/rosa-ai/WelcomeChat";
import { AIContext } from "@/context/AIContext";
import AIProvider from "@/context/AIProvider";
import { MessageState } from "@/types/chat.type";
import { fetcher } from "@/utils/fetcher";
import { Button, useDisclosure } from "@nextui-org/react";
import { ArrowDown } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function RosaPage() {
  return (
    <AIProvider>
      <SubRosaPage />
    </AIProvider>
  );
}

function SubRosaPage() {
  const ctx = useContext(AIContext);
  const router = useRouter();
  const { data, status } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [suggestion, setSuggestion] = useState("");

  const scrollThrottleRef = useRef<boolean>(false);
  const pendingScrollRef = useRef<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const streamingContentRef = useRef<string>("");
  const streamingChatIdRef = useRef<string>("");
  const lastUpdateTimeRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const rafUpdateRef = useRef<number>();

  function cancelPendingRAF() {
    if (rafUpdateRef.current) {
      cancelAnimationFrame(rafUpdateRef.current);
      rafUpdateRef.current = undefined;
    }
  }

  const scrollToBottom = useCallback(
    (behavior: "smooth" | "auto" = "smooth") => {
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
    if (status === "unauthenticated") {
      onOpen();
    }
  }, [status, onOpen]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      cancelPendingRAF();

      if (streamingContentRef.current && streamingChatIdRef.current) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.chat_id === streamingChatIdRef.current
              ? {
                  ...msg,
                  role: "assistant",
                  content: streamingContentRef.current,
                }
              : msg,
          ),
        );
      }
    };
  }, []);

  const throttledUpdateContent = useCallback(() => {
    const now = Date.now();
    if (now - lastUpdateTimeRef.current < 100) return;

    lastUpdateTimeRef.current = now;

    setMessages((prev) =>
      prev.map((msg) =>
        msg.chat_id === streamingChatIdRef.current
          ? {
              ...msg,
              role: "assistant",
              content: streamingContentRef.current,
            }
          : msg,
      ),
    );
  }, []);

  const smoothUpdateContent = useCallback(() => {
    cancelPendingRAF();

    rafUpdateRef.current = requestAnimationFrame(() => {
      throttledUpdateContent();
      rafUpdateRef.current = undefined;
    });
  }, [throttledUpdateContent]);

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
        scrollToBottom("smooth");
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
      {
        role: "assistant",
        content: "",
        id,
        chat_id: chat_id_assistant,
      },
    ]);

    setTimeout(() => scrollToBottom(), 100);

    try {
      const responseThread = await fetcher({
        url: "/ai/threads",
        method: "POST",
        token: data?.user.access_token,
      });

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
            thread_id: responseThread.data.thread_id,
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
      let text = "";
      let chunkCount = 0;
      let streamComplete = false;

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
                text += parsed.content;
                chunkCount++;

                if (chunkCount % 3 === 0) {
                  smoothUpdateContent();
                  throttledScrollToBottom();
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

      cancelPendingRAF();

      await new Promise((resolve) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.chat_id === streamingChatIdRef.current
              ? {
                  ...msg,
                  role: "assistant",
                  content: streamingContentRef.current,
                }
              : msg,
          ),
        );

        setTimeout(resolve, 100);
      });

      reader?.cancel();
      scrollToBottom();

      fetcher({
        url: "/ai/chat/summarize",
        method: "POST",
        token: data?.user.access_token,
        data: {
          input: "xxx",
          thread_id: responseThread.data.thread_id,
          messages: [
            {
              role: "user",
              content: input,
            },
            {
              role: "assistant",
              content: text,
            },
          ],
        },
      }).then(() => {
        router.push(`/rosa/chat/${responseThread.data.thread_id}`);

        setTimeout(() => {
          ctx?.mutateThreads();
          ctx?.setTypingThreadId(responseThread.data.thread_id);
        }, 500);

        setTimeout(() => {
          ctx?.setIsStreaming(false);
          ctx?.setTypingThreadId(null);
        }, 2000);
      });
      ctx?.mutateLimit();
    } catch (error) {
      ctx?.setIsStreaming(false);
      console.error(error);

      setMessages((prev) =>
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
    <>
      <NextSeo
        title="ROSA | Ruang Obat Smart Assistant"
        description="Ruang Obat Smart Assistant dirancang untuk meningkatkan efektivitas proses belajar mahasiswa serta mempersiapkan mereka menghadapi tantangan profesional di dunia farmasi."
        canonical="https://ruangobat.id"
        openGraph={{
          url: "https://ruangobat.id",
          title: "ROSA | Ruang Obat Smart Assistant",
          description:
            "Ruang Obat Smart Assistant dirancang untuk meningkatkan efektivitas proses belajar mahasiswa serta mempersiapkan mereka menghadapi tantangan profesional di dunia farmasi.",
          site_name: "RuangObat",
        }}
      />

      <ModalUnauthenticated
        isOpen={isOpen}
        onClose={() => {
          onClose();
          router.back();
          return;
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
          <NavbarRosa />

          <div
            ref={chatContainerRef}
            className="relative flex-1 overflow-y-scroll bg-white px-2 scrollbar-hide sm:px-4 lg:px-0 lg:scrollbar-default"
          >
            <div className="mx-auto min-h-full max-w-3xl px-4 py-4">
              {!messages.length ? (
                <WelcomeChat setSuggestion={setSuggestion} />
              ) : (
                <div className="space-y-4 pb-8">
                  {messages.map((message) => (
                    <Message {...message} key={message.chat_id} />
                  ))}
                </div>
              )}
            </div>

            {showScrollButton && (
              <Button
                isIconOnly
                variant="solid"
                color="secondary"
                onClick={() => scrollToBottom("smooth")}
                className="fixed bottom-0 right-0 z-40"
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
              suggestion,
            }}
          />
        </div>
      </div>
    </>
  );
}
