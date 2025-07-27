import { SuccessResponse } from "@/types/global.type";
import { UserDataResponse } from "@/types/profile.type";
import { fetcher } from "@/utils/fetcher";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SessionChecker() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [hasChecked, setHasChecked] = useState(false);

  async function checkSession() {
    const session = await getSession();
    if (!session) return signOut();

    const now = new Date();
    const expired = new Date(session.user.expired as string);

    if (now > expired) {
      return signOut();
    }
  }

  async function checkVerified(token: string) {
    try {
      const response: SuccessResponse<UserDataResponse> = await fetcher({
        url: "/my/profile",
        method: "GET",
        token,
      });

      return response.data.is_verified;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function isExcludedPath(path: string): boolean {
    const excludedPaths = [
      "/auth",
      "/tests",
      "/perusahaan",
      "/kelas",
      "/video",
      "/mentor",
      "/",
      "/reset",
      "/500",
      "/400",
    ];
    return excludedPaths.some((excluded) => path.startsWith(excluded));
  }

  useEffect(() => {
    async function handleFocus() {
      if (!isExcludedPath(router.pathname)) {
        await checkSession();
      }
    }

    async function checkRouter() {
      if (!isExcludedPath(router.pathname)) {
        await checkSession();
      }
    }

    window.onfocus = handleFocus;

    checkRouter();

    return () => {
      window.onfocus = null;
    };
  }, [router]);

  useEffect(() => {
    if (status === "authenticated" && !hasChecked) {
      checkStatus();
    }

    async function checkStatus() {
      const is_verified = await checkVerified(
        session?.user.access_token as string,
      );

      if (is_verified === false && router.pathname !== "/unverified") {
        router.push("/unverified");
      }

      if (is_verified === null) {
        toast.error("Gagal mengambil data user");
      }

      if (is_verified === true) {
        setHasChecked(true);
      }
    }
  }, [router, status, session, hasChecked]);

  return null;
}
