"use client";

import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { SearchProvider } from "@/components/Search/SearchProvider";
import type { SearchPost } from "@/components/Search/SearchModal";

export function Providers({
  children,
  searchPosts = [],
}: {
  children: ReactNode;
  searchPosts?: SearchPost[];
}) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <SearchProvider posts={searchPosts}>{children}</SearchProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
