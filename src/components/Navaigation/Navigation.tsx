import useDarkMode from "@/hooks/useDarkMode";
import Link from "next/link";

export const Navigation = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <nav className="flex justify-between p-[3rem]">
      <Link href="/">
        <button className="text-5xl pb-10">seieun.blog</button>
      </Link>
      <a
        href="https://github.com/SeieunYoo"
        target="_blank"
        className="text-blue-500 underline hover:text-blue-700"
      >
        github
      </a>
      <button onClick={toggleDarkMode}>{darkMode ? "dark입니다" : "light입니다"}</button>
    </nav>
  );
};
