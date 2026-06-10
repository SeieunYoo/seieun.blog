import { Box, Flex, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SearchIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/post";

export type SearchPost = {
  slug: string;
  title: string;
  date: number;
  info?: string;
  tags?: string[];
};

const Kbd = chakra("span", {
  base: {
    fontFamily: "mono",
    fontSize: "10px",
    fontWeight: 500,
    border: "1px solid",
    borderColor: "searchBorder",
    borderRadius: "4px",
    px: "5px",
    py: "3px",
    color: "chipText",
    lineHeight: 1,
  },
});

function highlight(title: string, q: string) {
  if (!q) return title;
  const i = title.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return title;
  return (
    <>
      {title.slice(0, i)}
      <chakra.mark bg="markBg" color="markInk" px="1px" borderRadius="2px">
        {title.slice(i, i + q.length)}
      </chakra.mark>
      {title.slice(i + q.length)}
    </>
  );
}

export function SearchModal({
  posts,
  isOpen,
  onClose,
}: {
  posts: SearchPost[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const hay = `${p.title} ${(p.tags ?? []).join(" ")} ${p.info ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, query]);

  useEffect(() => setSel(0), [query]);

  // 열릴 때 포커스 + 스크롤 락
  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    const id = window.setTimeout(() => inputRef.current?.focus(), 0);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const go = (slug: string) => {
    onClose();
    router.push(`/post/${slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => (results.length ? (s + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => (results.length ? (s - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      const post = results[sel];
      if (post) go(post.slug);
    }
  };

  return (
    <Flex
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={onKeyDown}
      position="fixed"
      inset="0"
      zIndex={100}
      align="flex-start"
      justify="center"
      px="20px"
      pt="12vh"
      pb="20px"
      bg="scrim"
      backdropFilter="blur(3px)"
      opacity={isOpen ? 1 : 0}
      pointerEvents={isOpen ? "auto" : "none"}
      transition="opacity 0.16s ease"
      display={isOpen ? "flex" : "none"}
    >
      <Flex
        direction="column"
        w="100%"
        maxW="560px"
        maxH="76vh"
        bg="searchPanelBg"
        border="1px solid"
        borderColor="searchBorder"
        borderRadius="12px"
        boxShadow="0 16px 48px rgba(0,0,0,0.28)"
        overflow="hidden"
        transform={isOpen ? "translateY(0)" : "translateY(-8px)"}
        transition="transform 0.16s ease"
      >
        {/* head */}
        <Flex align="center" gap="12px" px="18px" py="16px" borderBottom="1px solid" borderColor="searchLine">
          <Box color="faint" display="flex" flexShrink={0}>
            <SearchIcon width={18} height={18} />
          </Box>
          <chakra.input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="grep posts…"
            autoComplete="off"
            spellCheck={false}
            flex="1"
            border="0"
            outline="0"
            bg="transparent"
            color="ink"
            fontSize="16px"
            _placeholder={{ color: "searchPlaceholder", fontFamily: "mono", fontSize: "14px" }}
          />
          <Kbd>esc</Kbd>
        </Flex>

        {/* results */}
        <Box overflowY="auto" overflowX="hidden" p="6px">
          {results.length === 0 ? (
            <Box py="44px" px="20px" textAlign="center" fontFamily="mono" fontSize="13px" color="searchPlaceholder">
              &quot;{query}&quot; 에 대한 결과가 없어요.
            </Box>
          ) : (
            <>
              <Box
                fontFamily="mono"
                fontSize="10px"
                fontWeight={500}
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="searchPlaceholder"
                px="12px"
                pt="12px"
                pb="8px"
              >
                {query.trim() ? `${results.length} result${results.length > 1 ? "s" : ""}` : "all posts"}
              </Box>
              {results.map((p, i) => (
                <Flex
                  key={p.slug}
                  align="center"
                  gap="14px"
                  px="12px"
                  py="12px"
                  borderRadius="8px"
                  cursor="pointer"
                  bg={i === sel ? "searchHover" : "transparent"}
                  onMouseMove={() => setSel(i)}
                  onClick={() => go(p.slug)}
                >
                  <Box fontFamily="mono" fontSize="11px" fontWeight={500} color="num" w="22px" flexShrink={0}>
                    {String(i + 1).padStart(2, "0")}
                  </Box>
                  <Box flex="1" minW={0}>
                    <Box
                      fontSize="14px"
                      fontWeight={600}
                      color="ink"
                      mb="3px"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {highlight(p.title, query.trim())}
                    </Box>
                    <Box fontFamily="mono" fontSize="11px" fontWeight={500} color="faint">
                      {formatDate(p.date)}
                    </Box>
                  </Box>
                  {p.tags?.[0] && (
                    <Box
                      fontFamily="mono"
                      fontSize="11px"
                      fontWeight={500}
                      color="chipText"
                      border="1px solid"
                      borderColor="searchBorder"
                      borderRadius="4px"
                      px="8px"
                      py="5px"
                      flexShrink={0}
                    >
                      {p.tags[0]}
                    </Box>
                  )}
                </Flex>
              ))}
            </>
          )}
        </Box>

        {/* foot */}
        <Flex gap="16px" align="center" px="16px" py="10px" borderTop="1px solid" borderColor="searchLine" fontFamily="mono" fontSize="10px" fontWeight={500} color="searchPlaceholder" hideBelow="sm">
          <Flex gap="6px" align="center">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> 이동
          </Flex>
          <Flex gap="6px" align="center">
            <Kbd>↵</Kbd> 열기
          </Flex>
          <Flex gap="6px" align="center">
            <Kbd>esc</Kbd> 닫기
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
