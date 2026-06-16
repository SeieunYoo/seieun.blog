import "@/styles/globals.css";
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import Script from "next/script";
import { metaData } from "@/constants/metaData";
import { GA_TRACKING_ID } from "@/lib/gtag";
import { getAllPosts } from "@/lib/api";
import type { SearchPost } from "@/components/Search/SearchModal";
import { Providers } from "./providers";
import { Analytics } from "./analytics";

export const metadata: Metadata = {
  metadataBase: new URL(metaData.url),
  title: {
    default: metaData.title,
    template: `%s · ${metaData.title}`,
  },
  description: metaData.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: metaData.url,
    siteName: metaData.title,
    title: metaData.title,
    description: metaData.description,
    images: [{ url: metaData.imageUrl }],
  },
  twitter: { card: "summary" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='-10' y='80' font-size='90'%3E%F0%9F%8C%88%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // 전역 검색 모달에서 사용할 글 목록 (모든 페이지에서 검색 가능)
  const searchPosts = getAllPosts(["slug", "title", "date", "info", "tags"]).map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    ...(p.info ? { info: p.info } : {}),
    ...(p.tags ? { tags: p.tags } : {}),
  })) as unknown as SearchPost[];

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <Providers searchPosts={searchPosts}>{children}</Providers>

        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
              `}
            </Script>
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
          </>
        )}
      </body>
    </html>
  );
}
