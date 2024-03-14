import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="flex justify-between">
      <Link href="/">
        <button className="text-5xl pb-10">Seieun Yoo Bloggg</button>
      </Link>
      <a href="#" target="_blank" className="text-blue-500 underline hover:text-blue-700">
        github
      </a>
    </nav>
  );
};
