import SessionChecker from "@/components/SessionChecker";
import { fontMono, fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import { fetcher } from "@/utils/fetcher";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <NextUIProvider>
      <Toaster
        toastOptions={{
          style: {
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            color: "#171717",
          },
        }}
      />
      <NextNProgress color="#6238C3" options={{ showSpinner: false }} />
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <SessionChecker />
        <SWRConfig
          value={{
            fetcher,
            revalidateOnFocus: false,
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </SessionProvider>
      <GoogleAnalytics gaId="G-QPX13ESQJV" />
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
