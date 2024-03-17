import useDarkMode from "@/hooks/useDarkMode";
import Link from "next/link";
import { Icon } from "../common";

export const Navigation = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <nav className="flex justify-between p-[3rem]">
      <Link href="/">
        <Icon name="blog" color="black" />
        <button className="text-5xl pb-10">seieun.blog</button>
      </Link>

      <a href="https://github.com/SeieunYoo" target="_blank">
        <Icon src="https://img.icons8.com/ios-glyphs/30/github.png" width={30} height={30} />
      </a>
      <button onClick={toggleDarkMode}>
        {darkMode ? (
          <Icon name="light" color="black" width={30} height={30} />
        ) : (
          <Icon name="dark" color="black" width={30} height={30} />
        )}
      </button>
    </nav>
  );
};
