import { createContext } from "react";

type AppContextType = {
  isOpenUnauthenticated: boolean;
  onCloseUnauthenticated: () => void;
  onOpenUnauthenticated: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
