import { PostType } from "@/types/types";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "./markdown.module.css";
import Image from "next/image";
import Head from "next/head";

const Post = ({ post }: { post: PostType }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="p-4">
        <section className="flex flex-col items-center">
          <header className="pb-[3rem]">
            <div className="text-5xl font-bold w-full pb-10">{post.title}</div>
            <div className="text-2xl flex justify-end w-full">{post.date}</div>
          </header>
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              width={500}
              height={500}
              className="pb-[3rem]"
            />
          )}
        </section>
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </>
  );
};

export async function getStaticProps({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = getPostBySlug(params.slug, [
    "title",
    "slug",
    "description",
    "coverImage",
    "date",
    "lastmod",
    "weight",
    "content",
    "fileName",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
