import { AIContext } from "@/context/AIContext";
import { SuccessResponse } from "@/types/global.type";
import { UserLimit, UserThread } from "@/types/user.type";
import { useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import useSWR from "swr";

export default function AIProvider({ children }: { children: ReactNode }) {
  const { data, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [skipNextLoading, setSkipNextLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [typingThreadId, setTypingThreadId] = useState<string | null>(null);

  const { data: limit, mutate: mutateLimit } = useSWR<
    SuccessResponse<UserLimit>
  >(
    status == "authenticated"
      ? {
          url: "/ai/limits/check",
          method: "GET",
          token: data?.user.access_token,
        }
      : null,
  );

  const {
    data: dataThreads,
    isLoading: isLoadingThreads,
    mutate: mutateThreads,
  } = useSWR<SuccessResponse<UserThread[]>>(
    status === "authenticated"
      ? {
          url: "/ai/threads",
          method: "GET",
          token: data?.user.access_token,
        }
      : null,
  );

  const {
    isOpen: isOpenUnauthenticated,
    onClose: onCloseUnauthenticated,
    onOpen: onOpenUnauthenticated,
  } = useDisclosure();

  useEffect(() => {
    onCloseUnauthenticated();
  }, [router, onCloseUnauthenticated]);

  return (
    <AIContext.Provider
      value={{
        isOpenUnauthenticated,
        onOpenUnauthenticated,
        onCloseUnauthenticated,
        mutateLimit,
        remaining: limit?.data?.remaining || 0,
        isLoadingThreads,
        dataThreads: dataThreads!,
        sidebarOpen,
        setSidebarOpen,
        mutateThreads,
        skipNextLoading,
        setSkipNextLoading,
        setIsStreaming,
        isStreaming,
        typingThreadId,
        setTypingThreadId,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}
