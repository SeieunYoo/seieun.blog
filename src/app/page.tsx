import { Suspense } from "react";
import { getAllPosts } from "@/lib/api";
import { PostType } from "@/types/types";
import { readingTime } from "@/lib/post";
import { HomeClient } from "./HomeClient";

export default function Page() {
  const rawPosts = getAllPosts([
    "slug",
    "title",
    "date",
    "coverImage",
    "info",
    "tags",
    "content",
  ]) as unknown as (PostType & { content: string })[];

  // 히어로의 읽기시간은 서버에서 미리 계산해 숫자만 클라이언트로 내려준다.
  // (content 원문 전체를 client component 로 보내지 않기 위함)
  const posts: PostType[] = rawPosts.map(({ content, ...post }) => ({
    ...post,
    readingMinutes: readingTime(content),
  }));

  // HomeClient 가 useSearchParams 를 사용하므로 Suspense 로 감싼다.
  return (
    <Suspense fallback={null}>
      <HomeClient posts={posts} />
    </Suspense>
  );
}
