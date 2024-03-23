import { getAllPosts } from "@/lib/api";
import { PostType } from "@/types/types";
import { NextPage } from "next";
import Link from "next/link";
import { PreviewItem } from "@/components/home";
import { Navigation } from "@/components";

const Home: NextPage<{ posts: PostType[] }> = ({ posts }) => {
  return (
    <>
      <Navigation />
      <ul>
        {posts.map((post, index) => (
          <Link key={index} href={`/post/${post.slug}`}>
            <PreviewItem post={post} />
          </Link>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts(["slug", "title", "date", "content", "coverImage", "info"]);

  return {
    props: {
      posts,
    },
  };
}

export default Home;
