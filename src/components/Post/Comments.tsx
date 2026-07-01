"use client";

import { useEffect, useRef } from "react";
import { useColorMode } from "@/components/ui/color-mode";

/**
 * utterances 댓글. 컨테이너에 스크립트를 "한 번만" 주입한다.
 * (인라인 ref 콜백은 매 렌더마다 호출돼 iframe 이 중복 생성되므로 useEffect + 가드 사용)
 * 생성 시점의 컬러모드를 theme 으로 박아 새 iframe 이 올바른 테마로 뜨게 한다.
 */
function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { colorMode, mounted } = useColorMode();

  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el || el.querySelector("script, .utterances")) return;

    const theme = colorMode === "dark" ? "github-dark" : "github-light";
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", "SeieunYoo/seieun.blog");
    script.setAttribute("issue-term", "title");
    script.setAttribute("label", "blog-comment");
    script.setAttribute("theme", theme);
    script.crossOrigin = "anonymous";
    el.appendChild(script);
    // colorMode 변경은 Navigation 의 set-theme 메시지가 처리하므로 deps 에서 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  return <div ref={ref} />;
}

export default Comments;
