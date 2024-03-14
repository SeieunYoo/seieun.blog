import { PostType } from "@/types/types";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "./markdown.module.css";
import Image from "next/image";
import Head from "next/head";
import useParseDate from "@/hooks/useParseDate";

const Post = ({ post }: { post: PostType }) => {
  const { title, date, content, coverImage } = post;
  const parsedDate = useParseDate(date);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="p-4">
        <section className="flex flex-col items-center">
          <header className="pb-[3rem]">
            <div className="text-5xl font-bold w-full pb-10">{title}</div>
            <div className="text-2xl flex justify-end w-full">
              <span>
                {parsedDate.year}년 {parsedDate.month}월 {parsedDate.day}일
              </span>
            </div>
          </header>
          {post.coverImage && (
            <Image src={coverImage} alt={title} width={500} height={500} className="pb-[3rem]" />
          )}
        </section>
        <div className={markdownStyles["markdown"]} dangerouslySetInnerHTML={{ __html: content }} />
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
