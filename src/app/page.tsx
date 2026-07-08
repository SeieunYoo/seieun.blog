import { Suspense } from "react";
import { getAllPosts } from "@/lib/api";
import { PostType } from "@/types/types";
import { HomeClient } from "./HomeClient";

export default function Page() {
  const posts = getAllPosts([
    "slug",
    "title",
    "date",
    "coverImage",
    "info",
    "tags",
    "content",
  ]) as unknown as PostType[];

  // HomeClient 가 useSearchParams 를 사용하므로 Suspense 로 감싼다.
  return (
    <Suspense fallback={null}>
      <HomeClient posts={posts} />
    </Suspense>
  );
}
