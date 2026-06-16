"use client";

import { Box, Flex, chakra } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/post";

/** 상세 페이지 sticky 목차 + 스크롤 스파이. */
export const Toc = ({ items }: { items: TocItem[] }) => {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  if (!items.length) return null;

  // 가장 상위 레벨을 기준으로 상대 들여쓰기 (h1 없이 h2/h3만 있어도 자연스럽게)
  const minLevel = Math.min(...items.map((it) => it.level));

  return (
    <Box as="aside" w="200px" flexShrink={0} hideBelow="lg">
      <Box position="sticky" top="88px">
        <Box
          fontFamily="mono"
          fontSize="11px"
          fontWeight={500}
          letterSpacing="0.1em"
          textTransform="uppercase"
          color="monoFaint"
          mb="16px"
        >
          On this page
        </Box>
        <Flex direction="column" gap="2px">
          {items.map((it) => {
            const on = active === it.id;
            const depth = it.level - minLevel; // 0, 1, 2...
            return (
              <chakra.a
                key={it.id}
                href={`#${it.id}`}
                ml={`${depth * 14}px`}
                fontSize={depth === 0 ? "13px" : "12px"}
                fontWeight={depth === 0 ? 500 : 400}
                lineHeight="1.5"
                color={on ? "inkStrong" : "tocFaint"}
                borderLeft="2px solid"
                borderColor={on ? "inkStrong" : "tocLine"}
                pl="12px"
                py="4px"
                transition="color 0.15s, border-color 0.15s"
                _hover={{ color: "inkStrong" }}
              >
                {it.text}
              </chakra.a>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
};
