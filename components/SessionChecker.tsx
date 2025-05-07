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

  function isExcludedPath(path: string): boolean {
    const excludedPaths = [
      "/auth",
      "/tests",
      "/company",
      "/kelas-masuk-apoteker",
      "/kelas-riset-farmasi",
      "/kelas-skripsi-farmasi",
      "/kelas-matkul-farmasi",
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

  return null;
}
