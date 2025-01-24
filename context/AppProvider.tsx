import { AppContext } from "@/context/AppContext";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export default function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter;
  const {
    isOpen: isOpenUnauthenticated,
    onClose: onCloseUnauthenticated,
    onOpen: onOpenUnauthenticated,
  } = useDisclosure();

  useEffect(() => {
    onCloseUnauthenticated();
  }, [router, onCloseUnauthenticated]);

  return (
    <AppContext.Provider
      value={{
        isOpenUnauthenticated,
        onOpenUnauthenticated,
        onCloseUnauthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
