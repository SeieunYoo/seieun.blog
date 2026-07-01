import { Box, type BoxProps } from "@chakra-ui/react";

/** 시안의 .wrap / .nav-inner — 1180px 중앙 정렬 + 반응형 좌우 패딩. */
export const Wrap = (props: BoxProps) => (
  <Box mx="auto" maxW="1180px" px={{ base: "20px", sm: "36px", lg: "72px" }} {...props} />
);
