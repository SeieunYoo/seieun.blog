import useDarkMode from "@/hooks/useDarkMode";
import Link from "next/link";
import { useEffect } from "react";
import { Icon } from "../common";

export const Navigation = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  useEffect(() => {
    const utterancesElement = document.querySelector("iframe.utterances-frame") as HTMLIFrameElement;
    if (utterancesElement) {
      const commentTheme = darkMode ? "photon-dark" : "github-light";

      utterancesElement.contentWindow?.postMessage(
        { type: "set-theme", theme: commentTheme },
        "https://utteranc.es/",
      );
    }
  }, [darkMode]);
  return (
    <nav className="flex justify-between p-[3rem]">
      <Link href="/" className="flex gap-1">
        <Icon name="blog" color="black" />
        <button className="text-5xl">Seieun.blog</button>
      </Link>

      <div className="flex">
        <a href="https://github.com/SeieunYoo" target="_blank" className="flex">
          <Icon src="https://img.icons8.com/ios-glyphs/30/github.png" width={30} height={30} />
        </a>
        <button onClick={toggleDarkMode}>
          {darkMode ? (
            <Icon name="light" color="black" width={30} height={30} />
          ) : (
            <Icon name="dark" color="black" width={30} height={30} />
          )}
        </button>
      </div>
    </nav>
  );
};
