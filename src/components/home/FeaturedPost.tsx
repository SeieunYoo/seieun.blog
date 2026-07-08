import Link from "next/link";
import { Box, Flex } from "@chakra-ui/react";
import { PostType } from "@/types/types";
import { formatDate, readingTime } from "@/lib/post";
import { ArrowIcon } from "@/components/ui/icons";
import { Thumb } from "./Thumb";

/** 홈 상단의 최신 글 히어로 카드. */
export const FeaturedPost = ({ post }: { post: PostType }) => {
  const { title, date, info, coverImage, tags, content, slug } = post;
  const minutes = readingTime(content);

  return (
    <Link href={`/post/${slug}`}>
      <Flex
        as="article"
        direction={{ base: "column", md: "row" }}
        gap={{ base: "20px", md: "40px" }}
        align={{ md: "center" }}
        cursor="pointer"
        _hover={{
          "& .featured-title": {
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            textDecorationThickness: "1px",
            textDecorationColor: "accent",
          },
        }}
      >
        <Box w={{ base: "100%", md: "380px" }} flexShrink={0}>
          <Thumb
            coverImage={coverImage}
            title={title}
            tag={tags?.[0]}
            radius="8px"
            sizes="(max-width: 768px) 100vw, 380px"
          />
        </Box>

        <Box flex="1" minW={0}>
          <Flex align="center" gap="7px" fontSize="12px" fontWeight={600} color="accent" mb="12px">
            <Box as="span" w="6px" h="6px" borderRadius="50%" bg="accent" />
            Featured
          </Flex>
          <Box fontFamily="mono" fontSize="12px" fontWeight={500} color="monoFaint" mb="14px">
            {formatDate(date)}
            {tags?.[0] ? ` · ${tags[0]}` : ""} · {minutes} min
          </Box>
          <Box
            className="featured-title"
            as="h2"
            fontSize={{ base: "22px", sm: "27px", lg: "32px" }}
            fontWeight={700}
            lineHeight="1.25"
            letterSpacing="-0.025em"
            color="ink"
            mb="16px"
            css={{ textWrap: "balance" }}
          >
            {title}
          </Box>
          <Box
            fontSize={{ base: "14px", sm: "15px" }}
            lineHeight="1.65"
            color="muted"
            maxW="560px"
            mb="20px"
            css={{ textWrap: "pretty" }}
          >
            {info}
          </Box>
          <Flex align="center" gap="6px" fontSize="13px" fontWeight={600} color="ink">
            글 읽기
            <Box as="span" display="flex" color="accent">
              <ArrowIcon />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Link>
  );
};
