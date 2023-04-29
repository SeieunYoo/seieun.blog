import Link from "next/link";
import { PreviewItem } from "@/components";
import previews from "../components/Preview/_meta.json";
import { InferGetStaticPropsType } from "next";

export default function Blog({ previewData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div>Blog</div>
      {previewData.map((preview) => (
        <div key={preview.id}>
          <Link href={`/post/${preview.title}`}>
            <PreviewItem title={preview.title} description={preview.description} />
          </Link>
        </div>
      ))}
    </>
  );
}

export const getStaticProps = async () => {
  const previewData = previews.previews;

  return {
    props: {
      previewData,
    },
  };
};
