import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Box, Flex } from "@chakra-ui/react";
import { PostType } from "@/types/types";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import articleStyles from "@/styles/article.module.css";
import { Navigation } from "@/components";
import Comments from "@/components/Post/Comments";
import { Toc } from "@/components/Post/Toc";
import { ArrowIcon } from "@/components/ui/icons";
import { addHeadingIdsAndToc, formatDate, readingTime } from "@/lib/post";
import { metaData } from "@/constants/metaData";

export function generateStaticParams() {
  return getAllPosts(["slug"]).map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug, ["title", "info", "coverImage", "slug"]);
  return {
    title: post.title,
    description: post.info,
    alternates: { canonical: `/post/${params.slug}` },
    openGraph: {
      url: `${metaData.url}/post/${params.slug}`,
      title: post.title,
      description: post.info,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "slug",
    "description",
    "coverImage",
    "date",
    "info",
    "tags",
    "content",
  ]) as unknown as PostType;

  const rawContent = post.content || "";
  const html = await markdownToHtml(rawContent);
  const { html: content, toc } = addHeadingIdsAndToc(html);
  const readMinutes = readingTime(rawContent);

  const { title, date, coverImage, slug, tags } = post;

  return (
    <Box bg="detailBg" minH="100dvh">
      <Navigation variant="detail" />

      <Flex
        gap={{ base: "32px", lg: "48px" }}
        maxW="1080px"
        mx="auto"
        px={{ base: "20px", sm: "36px", lg: "48px" }}
        pt={{ base: "28px", sm: "36px", lg: "48px" }}
        pb={{ base: "56px", sm: "64px", lg: "80px" }}
      >
        <Box as="main" flex="1" minW={0}>
          <Link href="/">
            <Flex
              as="span"
              display="inline-flex"
              align="center"
              gap="8px"
              mb="24px"
              fontFamily="mono"
              fontSize="12px"
              fontWeight={500}
              letterSpacing="0.04em"
              color="monoFaint"
              transition="color 0.15s"
              _hover={{ color: "inkStrong" }}
            >
              <Box as="span" display="flex" transform="rotate(180deg)">
                <ArrowIcon />
              </Box>
              cd ..
            </Flex>
          </Link>

          <Box fontFamily="mono" fontSize="12px" fontWeight={500} color="monoFaint" mb="16px">
            {formatDate(date)}
            {tags?.[0] ? ` · ${tags[0]}` : ""} · {readMinutes} min read
          </Box>

          <Box
            as="h1"
            fontSize={{ base: "27px", lg: "36px" }}
            fontWeight={700}
            lineHeight="1.22"
            letterSpacing="-0.03em"
            color="inkStrong"
            mb="32px"
            css={{ textWrap: "balance" }}
          >
            {title}
          </Box>

          <Box
            bg="cardBg"
            border="1px solid"
            borderColor="cardLine"
            borderRadius={{ base: "6px", sm: "8px" }}
            p={{ base: "20px", sm: "28px" }}
            transition="background 0.25s ease, border-color 0.25s ease"
          >
            {coverImage && (
              <Box position="relative" w="100%" h={{ base: "140px", sm: "180px" }} borderRadius="4px" overflow="hidden" bg="thumbBase">
                <Image src={coverImage} alt={title} fill sizes="(max-width: 1080px) 100vw, 1000px" style={{ objectFit: "cover" }} priority={false} />
              </Box>
            )}
            <Box mt="26px" className={articleStyles["body"]} dangerouslySetInnerHTML={{ __html: content }} />
          </Box>

          {tags && tags.length > 0 && (
            <Flex gap="6px" mt="22px" wrap="wrap" align="center">
              <Box
                as="span"
                fontFamily="mono"
                fontSize="11px"
                fontWeight={500}
                letterSpacing="0.1em"
                textTransform="uppercase"
                color="monoFaint"
                mr="4px"
              >
                Tags
              </Box>
              {tags.map((tag) => (
                <Link key={tag} href={{ pathname: "/", query: { tag } }}>
                  <Box
                    fontFamily="mono"
                    fontSize="12px"
                    fontWeight={500}
                    color="chipText"
                    border="1px solid"
                    borderColor="cardLine"
                    bg="cardBg"
                    borderRadius="4px"
                    px="10px"
                    py="6px"
                    transition="color 0.15s, border-color 0.15s"
                    _hover={{ color: "inkStrong", borderColor: "monoFaint" }}
                  >
                    #{tag}
                  </Box>
                </Link>
              ))}
            </Flex>
          )}

          <Box mt="28px">
            <Comments />
          </Box>
        </Box>

        <Toc items={toc} />
      </Flex>
    </Box>
  );
}
