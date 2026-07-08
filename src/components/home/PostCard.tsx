import Link from "next/link";
import { Box } from "@chakra-ui/react";
import { PostType } from "@/types/types";
import { formatDate } from "@/lib/post";
import { Thumb } from "./Thumb";

/** 홈 그리드의 개별 글 카드. */
export const PostCard = ({ post }: { post: PostType }) => {
  const { title, date, info, coverImage, tags, slug } = post;

  return (
    <Link href={`/post/${slug}`}>
      <Box
        as="article"
        h="100%"
        border="1px solid"
        borderColor="cardLine"
        borderRadius="8px"
        overflow="hidden"
        bg="cardBg"
        cursor="pointer"
        transition="border-color 0.15s"
        _hover={{
          borderColor: "accent",
          "& .post-title": {
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            textDecorationThickness: "1px",
            textDecorationColor: "accent",
          },
        }}
      >
        <Thumb
          coverImage={coverImage}
          title={title}
          tag={tags?.[0]}
          bordered={false}
          radius="0"
          sizes="(max-width: 640px) 100vw, (max-width: 992px) 50vw, 33vw"
        />
        <Box p={{ base: "16px", sm: "18px" }}>
          <Box fontSize="11px" fontWeight={500} letterSpacing="0.02em" color="faint" mb="10px">
            {formatDate(date)}
            {tags?.[0] ? ` · ${tags[0]}` : ""}
          </Box>
          <Box
            className="post-title"
            fontSize="16px"
            fontWeight={650}
            lineHeight="1.35"
            letterSpacing="-0.015em"
            color="ink"
            mb="8px"
            css={{ textWrap: "balance" }}
          >
            {title}
          </Box>
          <Box
            fontSize="13.5px"
            lineHeight="1.55"
            color="muted"
            css={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {info}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
