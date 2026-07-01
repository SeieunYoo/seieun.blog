import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

/**
 * Seieun.blog 모노톤 디자인 시스템 (시안 site.css 토큰을 Chakra 시맨틱 토큰으로 이식).
 * - 모든 색은 light/dark 두 값을 가진 시맨틱 토큰으로 관리한다.
 * - dark 전환은 next-themes 가 <html class="dark"> 를 붙여주고, Chakra `_dark` 조건이 이를 읽는다.
 */
const t = (base: string, _dark: string) => ({ value: { base, _dark } });

const config = defineConfig({
  theme: {
    keyframes: {
      blink: { "50%": { opacity: 0 } },
    },
    tokens: {
      fonts: {
        // UI 폰트는 Pretendard 하나로 통일. (코드블럭만 article.module.css 에서 JetBrains Mono 유지)
        heading: { value: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif" },
        body: { value: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif" },
        mono: { value: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        canvas: t("#ffffff", "#0c0c0e"),
        detailBg: t("#f6f5f3", "#0c0c0e"),
        ink: t("#0a0a0a", "#ededed"),
        inkStrong: t("#161616", "#fafafa"),
        muted: t("#6e6e6e", "#85858d"),
        bodyInk: t("#2a2a2a", "#c2c2c8"),
        faint: t("#9a9a9a", "#8b8b94"),
        monoFaint: t("#a0a09b", "#82828b"),
        line: t("#ececec", "#222226"),
        rowHover: t("#fafafa", "#161619"),
        num: t("#b0b0b0", "#45454d"),
        foot: t("#bdbdbd", "#45454d"),

        navBg: t("rgba(255,255,255,0.82)", "rgba(16,16,18,0.82)"),
        navBgDetail: t("rgba(255,255,255,0.86)", "rgba(16,16,18,0.86)"),

        cardBg: t("#ffffff", "#121214"),
        cardLine: t("#e3e3e0", "#232328"),
        codeInlineBg: t("#f3f2f0", "#1d1d22"),
        chipText: t("#8a8a85", "#7a7a82"),
        hash: t("#b6b6b2", "#55555c"),
        tocFaint: t("#9a9a96", "#6f6f78"),
        tocLine: t("#e3e3e0", "#2c2c32"),

        thumbBase: t("#f1f0ee", "#1b1b1e"),
        thumbStripe: t("rgba(0,0,0,0.045)", "rgba(255,255,255,0.05)"),
        thumbBorder: t("rgba(0,0,0,0.05)", "rgba(255,255,255,0.06)"),
        thumbInk: t("rgba(0,0,0,0.32)", "rgba(255,255,255,0.34)"),

        searchPanelBg: t("#ffffff", "#15151a"),
        searchLine: t("#eeede9", "#26262b"),
        searchBorder: t("#e3e3e0", "#2c2c32"),
        searchHover: t("#f5f4f1", "#1d1d22"),
        searchPlaceholder: t("#b6b6b2", "#55555c"),
        markBg: t("#fdf2c8", "#5a4d1e"),
        markInk: t("#161616", "#fde68a"),
        scrim: t("rgba(16,16,18,0.34)", "rgba(0,0,0,0.5)"),

        // 메인 컬러(accent) — 베이비블루 파스텔톤
        accent: t("#4FB6E8", "#7DD3FC"),
        accentStrong: t("#2E93C7", "#A5E9FF"),
        accentSoft: t("rgba(79,182,232,0.12)", "rgba(125,211,252,0.16)"),
      },
    },
  },
  globalCss: {
    "html, body": {
      bg: "canvas",
      color: "ink",
      fontFamily: "body",
      scrollBehavior: "smooth",
      transition: "background 0.25s ease, color 0.25s ease",
    },
    "::selection": {
      bg: "inkStrong",
      color: "canvas",
    },
    a: { color: "inherit", textDecoration: "none" },
  },
});

export const system = createSystem(defaultConfig, config);
