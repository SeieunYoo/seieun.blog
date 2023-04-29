import Link from "next/link";

export const Navigation = () => {
  return (
    <>
      <Link href="/">
      <button>home</button>
      </Link>
      <Link href="/blog">
        <button>blog</button>
      </Link>
    </>
  );
};
