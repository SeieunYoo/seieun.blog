import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import DEFAULT_SEO from "../../next-seo-config";
import { DefaultSeo } from "next-seo";
import { Provider } from "@/components/ui/provider";
import { SearchProvider } from "@/components/Search/SearchProvider";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider>
      <DefaultSeo {...DEFAULT_SEO} />
      <SearchProvider posts={pageProps.allPosts ?? []}>
        <Component {...pageProps} />
      </SearchProvider>
    </Provider>
  );
}
