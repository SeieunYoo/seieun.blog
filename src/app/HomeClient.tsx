"use client";

import { PostType } from "@/types/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { PreviewItem } from "@/components/home";
import { Navigation } from "@/components";
import { Wrap } from "@/components/Layout";

export const HomeClient = ({ posts }: { posts: PostType[] }) => {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [posts]);

  // 필터는 URL(?tag=)을 source of truth 로 사용 → 공유 가능 + 상세 태그 클릭과 연동
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("tag") ?? "All";
  const filtered = active === "All" ? posts : posts.filter((p) => p.tags?.includes(active));

  const selectTag = (tag: string) => {
    router.replace(tag === "All" ? "/" : `/?tag=${encodeURIComponent(tag)}`, { scroll: false });
  };

  return (
    <>
      <Navigation variant="home" />
      <Box as="main">
        <Wrap>
          {/* masthead */}
          <Box as="section" maxW="760px" pt={{ base: "44px", sm: "60px", lg: "88px" }} pb={{ base: "32px", sm: "56px" }}>
            <Box
              fontFamily="mono"
              fontSize="12px"
              fontWeight={500}
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="faint"
              mb={{ base: "18px", sm: "26px" }}
            >
              Frontend engineer
            </Box>
            <Box
              as="h1"
              fontSize={{ base: "30px", sm: "40px", lg: "52px" }}
              fontWeight={700}
              lineHeight={{ base: "1.18", lg: "1.12" }}
              letterSpacing="-0.035em"
              color="ink"
              css={{ textWrap: "balance" }}
            >
              프론트엔드 개발하며
              <br />
              배운 것들을 기록합니다.
            </Box>
          </Box>

          {/* filter bar */}
          <Flex
            align={{ base: "stretch", sm: "baseline" }}
            justify="space-between"
            direction={{ base: "column", sm: "row" }}
            gap={{ base: "12px", sm: "20px" }}
            pb="14px"
            borderBottom="1px solid"
            borderColor="ink"
          >
            <Flex
              gap={{ base: "18px", sm: "22px" }}
              fontSize="13px"
              fontWeight={500}
              overflowX="auto"
              css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
            >
              {allTags.map((tag) => (
                <Box
                  as="span"
                  key={tag}
                  onClick={() => selectTag(tag)}
                  cursor="pointer"
                  whiteSpace="nowrap"
                  color={active === tag ? "ink" : "faint"}
                  transition="color 0.15s"
                  _hover={{ color: "ink" }}
                >
                  {tag}
                </Box>
              ))}
            </Flex>
            <Box
              fontFamily="mono"
              fontSize="11px"
              fontWeight={500}
              letterSpacing="0.08em"
              textTransform="uppercase"
              color="faint"
              whiteSpace="nowrap"
              flexShrink={0}
              alignSelf={{ base: "flex-start", sm: "auto" }}
            >
              {filtered.length} posts · newest
            </Box>
          </Flex>

          {/* post list */}
          <Box as="ul" listStyleType="none" m={0} p={0}>
            {filtered.map((post, index) => (
              <Box as="li" key={post.slug}>
                <Link href={`/post/${post.slug}`}>
                  <PreviewItem post={post} index={index} />
                </Link>
              </Box>
            ))}
          </Box>

          {/* footer */}
          <Box
            as="footer"
            pt={{ base: "36px", sm: "44px" }}
            pb={{ base: "48px", sm: "60px" }}
            fontFamily="mono"
            fontSize={{ base: "10px", sm: "11px" }}
            fontWeight={500}
            letterSpacing="0.1em"
            textTransform="uppercase"
            color="foot"
          >
            © 2026 Seieun Yoo — github.com/SeieunYoo
          </Box>
        </Wrap>
      </Box>
    </>
  );
};
