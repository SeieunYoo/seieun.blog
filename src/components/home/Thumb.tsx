import Image from "next/image";
import { Box } from "@chakra-ui/react";

/** 커버 이미지가 없으면 모노톤 스트라이프 패턴 + 태그 라벨로 대체되는 썸네일. */
export const Thumb = ({
  coverImage,
  title,
  tag,
  sizes,
  ratio = "16/9",
  bordered = true,
  radius = "6px",
}: {
  coverImage?: string;
  title: string;
  tag?: string;
  sizes: string;
  ratio?: string;
  bordered?: boolean;
  radius?: string;
}) => (
  <Box
    position="relative"
    w="100%"
    aspectRatio={ratio}
    borderRadius={radius}
    overflow="hidden"
    border={bordered ? "1px solid" : undefined}
    borderColor="thumbBorder"
    bg="thumbBase"
  >
    {coverImage ? (
      <Image src={coverImage} alt={title} fill sizes={sizes} style={{ objectFit: "cover" }} />
    ) : (
      <>
        <Box
          position="absolute"
          inset={0}
          css={{
            backgroundImage:
              "repeating-linear-gradient(135deg, token(colors.thumbStripe) 0 1px, transparent 1px 14px)",
          }}
        />
        {tag && (
          <Box
            position="absolute"
            left="14px"
            bottom="12px"
            fontFamily="mono"
            fontSize="11px"
            fontWeight={600}
            letterSpacing="0.04em"
            color="thumbInk"
          >
            {tag}
          </Box>
        )}
      </>
    )}
  </Box>
);
