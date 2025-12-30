import AuthChecker from "@/components/AuthChecker";
import { fontMono, fontSans } from "@/config/fonts";
import seoConfig from "@/config/seo.config";
import AppProvider from "@/context/AppProvider";
import "@/styles/globals.css";
import { fetcher } from "@/utils/fetcher";
import { scrollRestoration } from "@/utils/scrollRestoration";
import { NextUIProvider } from "@nextui-org/react";
import "katex/dist/katex.min.css";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  scrollRestoration(5);

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
      <NextNProgress
        color="#6238C3"
        options={{ showSpinner: false }}
        showOnShallow={false}
      />
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <AuthChecker />
        <SWRConfig
          value={{
            fetcher,
            revalidateOnFocus: false,
          }}
        >
          <AppProvider>
            {process.env.NEXT_PUBLIC_MODE === "production" ? (
              <DefaultSeo {...seoConfig} />
            ) : null}
            <NuqsAdapter>
              <Component {...pageProps} />
            </NuqsAdapter>
          </AppProvider>
        </SWRConfig>
      </SessionProvider>

      {/* {process.env.NEXT_PUBLIC_MODE === "production" ? (
        <GoogleAnalytics gaId="G-QPX13ESQJV" />
      ) : null} */}
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
