import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SessionChecker() {
  const router = useRouter();

  async function checkSession() {
    try {
      const session = await getSession();
      if (!session) return signOut();

      const current = new Date();
      const expired = new Date(session.user.expired as string);

      if (current > expired) {
        await fetcher({
          url: `/auth/session/${session.user.user_id}`,
          method: "DELETE",
        });
        return signOut();
      }

      const responseFromBackend = (await fetcher({
        url: `/auth/session/check`,
        method: "GET",
        token: session.user.access_token,
      })) as SuccessResponse<{ message: string; session_id: string }>;

      if (!responseFromBackend.success) {
        return signOut();
      }
    } catch (error: any) {
      console.log(error);
      if (error.status_code === 404) {
        signOut();
      }
    }
  }

  useEffect(() => {
    const handleFocus = async () => {
      if (
        !router.pathname.startsWith("/auth") &&
        router.pathname !== "/" &&
        router.pathname !== "/reset"
      ) {
        await checkSession();
      }
    };

    const checkRouter = async () => {
      if (
        !router.pathname.startsWith("/auth") &&
        router.pathname !== "/" &&
        router.pathname !== "/reset"
      ) {
        await checkSession();
      }
    };

    window.onfocus = handleFocus;

    checkRouter();

    return () => {
      window.onfocus = null;
    };
  }, [router]);

  return null;
}
