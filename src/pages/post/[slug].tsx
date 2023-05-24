import { PostType } from "@/types/types";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "./markdown.module.css";

const Post = ({ post }: { post: PostType }) => {
  return (
    <>
    <div className="w-fit p-4">
      <div>{post.title}</div>
      <div>{post.date}</div>
      <div className= {markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: post.content }} />
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
