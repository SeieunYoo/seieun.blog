import useDarkMode from "@/hooks/useDarkMode";
import React, { useEffect, useRef } from "react";

export default function Comments() {
  const ref = useRef<any>(null);
  const { darkMode } = useDarkMode();

  const makeComments = () => {
    const script = document.createElement("script");

    script.src = "https://utteranc.es/client.js";
    script.async = false;
    script.setAttribute("repo", "SeieunYoo/seieun.blog");
    script.setAttribute("issue-term", "title");

    // browser theme에 따라서 Comments theme을 변경해줍니다.
    if (darkMode) {
      script.setAttribute("theme", "dark-blue");
    } else {
      script.setAttribute("theme", "github-light");
    }
    script.setAttribute("label", "blog-comment");
    ref.current.appendChild(script);
  };

  const removeExistedComments = () => {
    const existingScript = ref.current.querySelector(".utterances");
    if (existingScript) {
      existingScript.remove();
    }
  };
  useEffect(() => {
    makeComments();
    removeExistedComments();
  }, [darkMode]);

  return <div ref={ref}></div>;
}
