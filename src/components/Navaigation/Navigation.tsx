"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Box, Flex, chakra } from "@chakra-ui/react";
import { Wrap } from "@/components/Layout";
import { useColorMode } from "@/components/ui/color-mode";
import { useSearch } from "@/components/Search/SearchProvider";
import { GithubIcon, MoonIcon, SearchIcon, SunIcon } from "@/components/ui/icons";

const iconBtn = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "faint",
  cursor: "pointer",
  bg: "none",
  border: "0",
  p: 0,
  transition: "color 0.15s",
  _hover: { color: "ink" },
} as const;

export const Navigation = ({ variant = "home" }: { variant?: "home" | "detail" }) => {
  const { colorMode, mounted, toggleColorMode } = useColorMode();
  const { open } = useSearch();
  const pathname = usePathname();
  const isAbout = pathname === "/about";

  // utterances 댓글 테마를 현재 컬러모드에 동기화
  useEffect(() => {
    const frame = document.querySelector("iframe.utterances-frame") as HTMLIFrameElement | null;
    if (frame) {
      frame.contentWindow?.postMessage(
        { type: "set-theme", theme: colorMode === "dark" ? "github-dark" : "github-light" },
        "https://utteranc.es/",
      );
    }
  }, [colorMode]);

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={20}
      bg={variant === "detail" ? "navBgDetail" : "navBg"}
      backdropFilter="saturate(180%) blur(12px)"
      borderBottom="1px solid"
      borderColor="line"
      transition="background 0.25s ease, border-color 0.25s ease"
    >
      <Wrap>
        <Flex
          align="center"
          justify="space-between"
          h={{ base: "56px", sm: "64px" }}
        >
          <Link href="/">
            <Flex
              as="span"
              align="center"
              fontFamily="mono"
              fontSize="17px"
              fontWeight={600}
              letterSpacing="-0.01em"
              color="ink"
            >
              seieun.blog
              <Box
                as="span"
                display="inline-block"
                w="8px"
                h="16px"
                ml="3px"
                bg="accent"
                transform="translateY(2px)"
                animation="blink 1.1s steps(1) infinite"
              />
            </Flex>
          </Link>

          <Flex align="center" gap={{ base: "16px", sm: "20px" }}>
            <Link href="/about">
              <Box
                as="span"
                fontSize="13px"
                fontWeight={500}
                color={isAbout ? "accent" : "faint"}
                transition="color 0.15s"
                _hover={{ color: "accent" }}
              >
                About
              </Box>
            </Link>
            <chakra.button type="button" aria-label="검색" onClick={open} css={iconBtn}>
              <SearchIcon />
            </chakra.button>
            <chakra.a href="https://github.com/SeieunYoo" target="_blank" rel="noreferrer" aria-label="GitHub" css={iconBtn}>
              <GithubIcon />
            </chakra.a>
            <chakra.button
              type="button"
              aria-label="테마 전환"
              aria-pressed={colorMode === "dark"}
              onClick={toggleColorMode}
              css={iconBtn}
            >
              {/* SSR 미스매치 방지를 위해 mounted 후에만 아이콘 렌더 */}
              <Box w="16px" h="16px" display="flex" alignItems="center" justifyContent="center">
                {mounted && (colorMode === "dark" ? <SunIcon /> : <MoonIcon />)}
              </Box>
            </chakra.button>
          </Flex>
        </Flex>
      </Wrap>
    </Box>
  );
};
