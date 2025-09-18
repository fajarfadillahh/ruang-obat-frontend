import { SuccessResponse } from "@/types/global.type";
import { UserLimit, UserThread } from "@/types/user.type";
import { createContext, Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";

type AIContextType = {
  isOpenUnauthenticated: boolean;
  onCloseUnauthenticated: () => void;
  onOpenUnauthenticated: () => void;
  mutateLimit: KeyedMutator<SuccessResponse<UserLimit>>;
  remaining: number;
  isLoadingThreads: boolean;
  dataThreads: SuccessResponse<UserThread[]>;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  mutateThreads: KeyedMutator<SuccessResponse<UserThread[]>>;
  setSkipNextLoading: Dispatch<SetStateAction<boolean>>;
  skipNextLoading: boolean;
  setIsStreaming: Dispatch<SetStateAction<boolean>>;
  isStreaming: boolean;
  setTypingThreadId: Dispatch<SetStateAction<string | null>>;
  typingThreadId: string | null;
};

export const AIContext = createContext<AIContextType | undefined>(undefined);
