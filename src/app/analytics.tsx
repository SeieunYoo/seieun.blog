"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/gtag";

/** App Router 에는 router.events 가 없으므로 pathname/searchParams 변화를 구독해 페이지뷰를 전송한다. */
export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const query = searchParams?.toString();
    pageview(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}
