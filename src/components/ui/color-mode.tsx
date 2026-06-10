"use client";

import { ThemeProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useEffect, useState } from "react";

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    />
  );
}

export type ColorMode = "light" | "dark";

export interface UseColorModeReturn {
  colorMode: ColorMode | undefined;
  mounted: boolean;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

/**
 * next-themes 래퍼. SSR 시점엔 테마를 알 수 없으므로 `mounted` 로 가드해
 * 하이드레이션 미스매치를 막는다.
 */
export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return {
    colorMode: mounted ? (resolvedTheme as ColorMode) : undefined,
    mounted,
    setColorMode: setTheme,
    toggleColorMode,
  };
}
