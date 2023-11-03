import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { SessionProvider } from "next-auth/react";
import "../lib/dayjs";
import { queryClient } from "../lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "pt_BR",
            url: "https://www.call-me/",
            siteName: "Call-me",
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
      </SessionProvider>
    </QueryClientProvider>
  );
}
