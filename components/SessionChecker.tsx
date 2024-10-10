import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function SessionChecker() {
  const router = useRouter();

  useEffect(() => {
    window.onfocus = async () => {
      if (!router.pathname.startsWith("/auth")) {
        try {
          const session = await getSession();
          const expired = new Date(session?.user.expired as string);
          const current = new Date();

          if (current > expired) {
            await fetcher({
              url: "/auth/session",
              method: "DELETE",
              token: session?.user.access_token,
            });

            signOut();
          }
        } catch (error) {
          console.log(error);
          toast.error(getError(error));
        }
      }
    };
  }, [router]);

  return null;
}
