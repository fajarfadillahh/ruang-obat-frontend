import { useRouter } from "next/router";
import { useEffect } from "react";

export function scrollRestoration(maxHistory: number) {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const key = `scroll-${router.asPath}`;
    const historyKey = "scroll-history";

    // --- Helpers ---
    const getHistoryCount = () =>
      parseInt(sessionStorage.getItem(historyKey) || "0");

    const setHistoryCount = (count: number) =>
      sessionStorage.setItem(historyKey, count.toString());

    const clearScrollData = () => {
      Object.keys(sessionStorage)
        .filter((k) => k.startsWith("scroll-"))
        .forEach((k) => sessionStorage.removeItem(k));
      setHistoryCount(0);
    };

    // --- Restore Scroll ---
    const saved = sessionStorage.getItem(key);
    window.scrollTo({
      top: saved ? parseInt(saved) : 0,
      behavior: "smooth",
    });

    // --- Save Scroll ---
    const handleRouteChange = () => {
      sessionStorage.setItem(key, window.scrollY.toString());

      const count = getHistoryCount() + 1;
      setHistoryCount(count);

      if (count > maxHistory) clearScrollData();
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router, maxHistory]);
}
