import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SessionChecker() {
  const router = useRouter();

  async function checkSession() {
    const session = await getSession();
    if (!session) return signOut();

    const now = new Date();
    const expired = new Date(session.user.expired as string);

    if (now > expired) {
      return signOut();
    }
  }

  useEffect(() => {
    async function handleFocus() {
      if (
        !router.pathname.startsWith("/auth") &&
        !router.pathname.startsWith("/tests") &&
        !router.pathname.startsWith("/company") &&
        router.pathname !== "/" &&
        router.pathname !== "/reset"
      ) {
        await checkSession();
      }
    }

    async function checkRouter() {
      if (
        !router.pathname.startsWith("/auth") &&
        !router.pathname.startsWith("/tests") &&
        !router.pathname.startsWith("/company") &&
        router.pathname !== "/" &&
        router.pathname !== "/reset"
      ) {
        await checkSession();
      }
    }

    window.onfocus = handleFocus;

    checkRouter();

    return () => {
      window.onfocus = null;
    };
  }, [router]);

  return null;
}
