import { PostType } from "@/types/types";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "./markdown.module.css";
import Image from "next/image";
import useParseDate from "@/hooks/useParseDate";
import { Navigation } from "@/components";
import { NextSeo } from "next-seo";
import { metaData } from "@/constants/metaData";
import Comments from "@/components/Post/Comments";

const Post = ({ post }: { post: PostType }) => {
  const { title, date, content, coverImage, info, slug } = post;
  const parsedDate = useParseDate(date);

  // function parseLinks(html: string) {
  //   // 정규식 패턴을 사용하여 링크를 찾음
  //   let linkPattern = /(?:https?|ftp):\/\/[\n\S]+/g;

  //   // 링크를 찾아내어 <a> 태그로 변환
  //   let parsedHtml = html.replace(linkPattern, function (match: string) {
  //     console.log(html);
  //     return '<a href="' + match + '">' + match + "</a>";
  //   });

  //   return parsedHtml;
  // }

  // 변환된 HTML 출력
  // console.log(parseLinks(content));
  // console.log(content);
  return (
    <>
      <NextSeo
        title={title}
        description={info}
        canonical={`${metaData.url}/post/${slug}`}
        openGraph={{
          url: `${metaData.url}/post/${slug}`,
          images: [
            {
              url: coverImage,
            },
          ],
        }}
      />
      <Navigation />
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
            <Image
              src={coverImage}
              alt={title}
              width={500}
              height={500}
              className="pb-[3rem] w-auto h-auto"
              priority={false}
            />
          )}
        </section>
        <div className={markdownStyles["markdown"]} dangerouslySetInnerHTML={{ __html: content }} />
        <Comments />
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
    "info",
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
