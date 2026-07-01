import { PostType } from "@/types/types";
import Image from "next/image";
import { Box, Flex } from "@chakra-ui/react";
import { formatDate } from "@/lib/post";

/** 홈 에디토리얼 포스트 행 (번호 · 메타 · 제목 · 요약 · 썸네일). */
export const PreviewItem = ({ post, index }: { post: PostType; index: number }) => {
  const { title, date, info, coverImage, tags } = post;

  return (
    <Flex
      as="article"
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "16px", sm: "28px" }}
      align="flex-start"
      px={{ base: 0, sm: "18px" }}
      py={{ base: "24px", sm: "30px" }}
      mx={{ base: 0, sm: "-18px" }}
      borderBottom="1px solid"
      borderColor="line"
      cursor="pointer"
      transition="background 0.15s"
      _hover={{
        bg: { base: "transparent", sm: "rowHover" },
        "& .post-title": {
          textDecoration: "underline",
          textUnderlineOffset: "4px",
          textDecorationThickness: "1px",
          textDecorationColor: "accent",
        },
      }}
    >
      <Box
        display={{ base: "none", sm: "block" }}
        w="52px"
        flexShrink={0}
        pt="6px"
        fontFamily="mono"
        fontSize="11px"
        fontWeight={500}
        lineHeight="1.5"
        color="num"
      >
        {String(index + 1).padStart(2, "0")}
      </Box>

      <Box flex="1" minW={0} order={{ base: 1, sm: 0 }}>
        <Box
          fontSize="11px"
          fontWeight={500}
          letterSpacing="0.02em"
          color="faint"
          mb="12px"
        >
          {formatDate(date)}
          {tags?.[0] ? ` · ${tags[0]}` : ""}
        </Box>
        <Box
          className="post-title"
          fontSize={{ base: "17px", sm: "20px" }}
          fontWeight={650}
          lineHeight="1.3"
          letterSpacing="-0.02em"
          color="ink"
          mb="8px"
          css={{ textWrap: "balance" }}
        >
          {title}
        </Box>
        <Box fontSize={{ base: "13px", sm: "14px" }} lineHeight="1.6" color="muted" maxW="620px">
          {info}
        </Box>
      </Box>

      <Box
        position="relative"
        flexShrink={0}
        order={{ base: -1, sm: 1 }}
        w={{ base: "100%", sm: "132px" }}
        h={{ base: "160px", sm: "84px" }}
        borderRadius="4px"
        overflow="hidden"
        border="1px solid"
        borderColor="thumbBorder"
        bg="thumbBase"
      >
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 132px"
            style={{ objectFit: "cover" }}
          />
        )}
      </Box>
    </Flex>
  );
};
