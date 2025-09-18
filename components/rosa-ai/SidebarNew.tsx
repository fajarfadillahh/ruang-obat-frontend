import EmptyThread from "@/components/rosa-ai/EmptyThread";
import RuangObat from "@/components/rosa-ai/RuangObat";
import ThreadSkeleton from "@/components/rosa-ai/ThreadSkeleton";
import { AIContext } from "@/context/AIContext";
import { fetcher } from "@/utils/fetcher";
import { formatTimeAgo } from "@/utils/formatDate";
import { Button, Tooltip } from "@nextui-org/react";
import {
  Archive,
  ArrowUUpLeft,
  CreditCard,
  NotePencil,
} from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SidebarNew({
  open,
  onClose,
  className,
}: {
  open: boolean;
  onClose?: () => void;
  className?: string;
}) {
  const ctx = useContext(AIContext);
  const { status, data } = useSession();

  const router = useRouter();
  const currentThreadId =
    (router.query.id as string) || router.asPath.split("/")[1];
  const [typingText, setTypingText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (ctx?.typingThreadId && ctx?.dataThreads?.data) {
      const thread = ctx.dataThreads.data.find(
        (t) => t.thread_id === ctx.typingThreadId,
      );
      if (thread?.title) {
        let i = 0;
        const fullTitle = thread.title;

        const typeText = () => {
          if (i <= fullTitle.length) {
            setTypingText((prev) => ({
              ...prev,
              [ctx.typingThreadId!]: fullTitle.slice(0, i),
            }));
            i++;
            setTimeout(typeText, 25);
          }
        };

        typeText();
      }
    }
  }, [ctx?.typingThreadId, ctx?.dataThreads?.data]);

  useEffect(() => {
    if (
      ctx?.dataThreads?.data &&
      !ctx.dataThreads.data.length &&
      router.pathname === "/rosa/chat/[id]"
    ) {
      router.push("/rosa/chat");
    }
  }, [ctx?.dataThreads]);

  if (!open) return null;

  function handleArchiveThread(thread_id: string) {
    toast.promise(
      fetcher({
        url: "/ai/threads",
        method: "PATCH",
        token: data?.user.access_token,
        data: {
          thread_id,
          is_archived: true,
        },
      }),
      {
        loading: "loading...",
        success: () => {
          ctx?.mutateThreads();
          return "Chat berhasil diarsipkan";
        },
        error: () => {
          return "Gagal mengarsipkan chat";
        },
      },
    );
  }

  function renderSidebarData() {
    if (status === "unauthenticated") {
      return <EmptyThread type="unauthenticated" />;
    }

    if (ctx?.isLoadingThreads || ctx?.dataThreads === undefined) {
      return <ThreadSkeleton />;
    }

    if (ctx?.dataThreads?.data && !ctx?.dataThreads.data.length) {
      return <EmptyThread type="authenticated" />;
    }

    if (ctx?.dataThreads?.data && ctx?.dataThreads.data.length) {
      return ctx.dataThreads.data.map((thread, index) => {
        const isActive = currentThreadId === thread.thread_id;
        const isTyping = ctx?.typingThreadId === thread.thread_id;
        const displayTitle = isTyping
          ? typingText[thread.thread_id] || ""
          : thread.title || `Thread ${index + 1}`;

        return (
          <div
            key={thread.thread_id || index}
            className={`group relative cursor-pointer overflow-hidden rounded-xl p-3 transition-all duration-300 ${
              isActive
                ? "bg-purple text-white"
                : "hover:translate-x-1 hover:bg-purple/10"
            }`}
            onClick={() =>
              !isTyping && router.push(`/rosa/chat/${thread.thread_id}`)
            }
          >
            {isActive && (
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            )}
            <div className="flex items-center justify-between gap-3">
              <Tooltip
                content={thread.title || `Thread ${index + 1}`}
                closeDelay={200}
                classNames={{
                  content:
                    "font-semibold text-black bg-white shadow-lg border border-gray/20",
                }}
              >
                <div className="grid min-w-0 flex-1 gap-1">
                  <h3
                    className={`line-clamp-1 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "font-semibold text-white"
                        : "text-black group-hover:font-semibold group-hover:text-purple"
                    }`}
                  >
                    {displayTitle}
                  </h3>
                  <p
                    className={`text-xs transition-all duration-300 ${
                      isActive
                        ? "text-white/80"
                        : "text-gray group-hover:text-purple/70"
                    }`}
                  >
                    {isTyping ? (
                      <span className={isActive ? "text-white" : "text-purple"}>
                        Sedang menulis...
                      </span>
                    ) : isActive ? (
                      "Sedang aktif"
                    ) : (
                      formatTimeAgo(thread.created_at)
                    )}
                  </p>
                </div>
              </Tooltip>

              {!isTyping && (
                <Tooltip
                  content="Arsipkan Percakapan"
                  closeDelay={200}
                  classNames={{
                    content:
                      "font-semibold text-black bg-white shadow-lg border border-gray/20",
                  }}
                >
                  <Button
                    isIconOnly
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArchiveThread(thread.thread_id);
                    }}
                    className={`scale-90 bg-transparent opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 ${
                      isActive
                        ? "text-white/80 hover:bg-white/20 hover:text-white"
                        : "text-purple hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Archive size={16} weight="duotone" />
                  </Button>
                </Tooltip>
              )}
            </div>

            {isActive && (
              <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-purple/80 to-purple opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
            )}
          </div>
        );
      });
    }
  }

  return (
    <aside className={`${className}`}>
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />

      <div className="relative z-50 flex h-full w-72 flex-col border-r border-gray/10 bg-white/95 backdrop-blur-md">
        <div className="flex h-20 items-center border-b border-gray/10 px-6">
          <div
            className="group flex cursor-pointer items-center gap-3"
            onClick={() => router.push("/rosa/chat")}
          >
            <RuangObat className="size-8 flex-1 text-purple transition-transform group-hover:scale-110" />

            <div className="grid -space-y-1">
              <h1 className="text-lg font-extrabold text-purple">
                RuangObat<span className="text-purple">.</span>
              </h1>
              <p className="text-sm font-medium text-purple/90">
                Smart Assistant
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="grid gap-8 [padding:1.5rem_1.5rem_1rem]">
            <Button
              startContent={<NotePencil size={18} weight="duotone" />}
              className="group relative h-12 w-full justify-start gap-3 overflow-hidden bg-gradient-to-r from-purple via-purple-500 to-purple font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              radius="lg"
              onClick={() => {
                router.push("/rosa/chat");
              }}
              isDisabled={status !== "authenticated"}
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              Percakapan Baru
            </Button>

            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-black">Riwayat Chat</h2>

              {(ctx?.isLoadingThreads || ctx?.dataThreads === undefined) &&
                status === "loading" && (
                  <div className="flex items-center gap-1">
                    <div className="size-1.5 animate-bounce rounded-full bg-purple/80" />
                    <div className="size-1.5 animate-bounce rounded-full bg-purple/80 [animation-delay:0.1s]" />
                    <div className="size-1.5 animate-bounce rounded-full bg-purple/80 [animation-delay:0.2s]" />
                  </div>
                )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-4">
            <div className="space-y-1">{renderSidebarData()}</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-gray/10 p-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple/10 [padding:0.5rem_0.75rem]">
            <CreditCard size={18} weight="duotone" className="text-purple" />
            <span className="text-sm font-bold text-purple">Sisa Limit</span>
          </div>

          <div className="grid">
            <p className="text-3xl font-black text-purple">
              {ctx?.remaining ? ctx?.remaining : "-"}
            </p>
            <p className="text-xs font-medium text-gray">Pertanyaan hari ini</p>
          </div>

          <div className="flex items-center justify-center text-center">
            <span className="text-xs font-medium text-gray">
              Powered by{" "}
              <span className="font-bold text-purple transition-colors">
                RuangObat
              </span>
            </span>
          </div>

          <Button
            size="sm"
            variant="flat"
            startContent={<ArrowUUpLeft size={16} weight="bold" />}
            className="w-full bg-purple font-medium text-white transition-all duration-300 hover:scale-[1.02]"
            onClick={() => router.push("/rosa")}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </aside>
  );
}
