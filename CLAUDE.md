# CLAUDE.md

Claude가 이 저장소에서 코드를 작성하거나 **PR 리뷰를 달 때** 참고하는 기준 문서입니다.

## 프로젝트 개요

`seieun.blog` — Next.js 기반 개인 기술 블로그. 마크다운(`__posts/*.md`)을 빌드 시점에 정적 페이지(SSG)로 생성합니다.

## 기술 스택

- **Next.js 13.5.6 / App Router** (Pages Router에서 이전 완료 — `src/app/`)
- **React 18 + TypeScript**
- **Chakra UI v3** (emotion 기반) + **next-themes** 다크모드
- **Yarn Berry (PnP, zero-install)** — `nodeLinker: pnp`
- 배포: **Vercel** (`engines.node: 24.x`)
- 마크다운: `unified` + `remark-gfm` + `remark-rehype` + `rehype-raw` + `rehype-highlight` + `rehype-stringify`

## 디렉터리 구조

```
src/
  app/                      # App Router 라우트
    layout.tsx              # 루트 레이아웃: html/head/폰트/Providers/gtag/Metadata
    providers.tsx           # (client) Chakra + ColorMode + Search Provider
    analytics.tsx           # (client) usePathname 기반 gtag 페이지뷰
    page.tsx                # 홈 (server) → HomeClient
    HomeClient.tsx          # (client) 태그 필터 UI
    post/[slug]/page.tsx    # 상세 (server) + generateStaticParams + generateMetadata
  components/
    ui/                     # provider, color-mode (next-themes 래퍼)
    Post/                   # Comments(utterances), Toc(스크롤 스파이)
    Search/                 # SearchModal, SearchProvider("/" 단축키)
    Navaigation/            # Navigation (오타 디렉터리명 — 그대로 유지)
    home/, Layout/, common/
  lib/                      # api(글 로딩), markdownToHtml, post(toc/날짜/읽기시간), gtag
  styles/                   # globals.css, article.module.css (본문 + 코드 하이라이팅)
  theme.ts                  # Chakra createSystem + 시맨틱 토큰(라이트/다크)
  constants/metaData.ts
__posts/*.md                # 글 (frontmatter + 마크다운)
```

## 글(post) 규칙

`__posts/<slug>.md`. 파일명이 곧 URL slug (`/post/<slug>`). frontmatter:

```yaml
---
title: 제목
date: 20260616          # YYYYMMDD 숫자. 목록은 date 내림차순 정렬
info: 한 줄 요약        # 목록 카드 설명 + SEO description
coverImage: https://... # 선택. next.config remotePatterns 에 호스트 등록 필요
tags: [태그1, 태그2]    # 선택. 첫 태그가 메타에 노출, 태그 필터(?tag=)와 연동
---
```

- 현재 이미지 허용 호스트는 `velog.velcdn.com` 뿐 (`next.config.js` `images.remotePatterns`). 다른 호스트 이미지면 호스트를 추가해야 함.
- 본문은 `rehype-raw`로 처리되므로 **마크다운 안의 raw HTML이 실제로 렌더링됨** — 신뢰할 수 있는 내용만.

## 컨벤션

- **커밋 메시지: 한국어**, `type: 요약` 형식 (`feat:`, `fix:`, `style:`, `refactor:`, `chore:`, `post:`). 이모지 prefix 사용 가능(`✨ feat:`, `💄 style:`).
- **주석/문서: 한국어.**
- **Prettier**: 큰따옴표, 세미콜론, 2-space, `trailingComma: all`, `printWidth: 100`, `arrowParens: always`. (`.prettierrc.json`)
- import alias: `@/*` → `src/*`.
- 스타일링은 **Chakra 프롭 우선**, 전역/본문 스타일만 CSS Module(`article.module.css`).

## 리뷰 기준 (PR 리뷰 시 우선 점검)

### 1. App Router 경계 (가장 흔한 실수)
- 서버 컴포넌트가 직접 렌더하는 컴포넌트가 훅/이벤트/브라우저 API를 쓰면 **`"use client"` 필수**. (예: Navigation, Comments, Toc, SearchModal)
- `"use client"`는 **상호작용이 필요한 최소 경계**에만. 데이터 로딩/마크다운 변환은 서버 컴포넌트에서.
- `useSearchParams()` / `usePathname()` 사용 컴포넌트는 **`<Suspense>`로 감싸야** 정적 빌드가 깨지지 않음.
- 라우팅은 `next/navigation`(`useRouter().push/replace`, `useSearchParams`). `next/router`는 사용 금지(App Router 비호환).

### 2. 데이터 / 라우팅
- 글 로딩은 서버에서 `getAllPosts` / `getPostBySlug`(`src/lib/api`). 새 동적 라우트엔 **`generateStaticParams`** 추가.
- SEO는 **Next Metadata API**(`metadata` / `generateMetadata`)로만. `next-seo`는 제거됨 — 재도입 금지.

### 3. 스타일 / 디자인
- `dangerouslySetInnerHTML`로 주입되는 HTML의 클래스(예: `hljs-*`)에 CSS Module 스타일을 줄 때는 **`:global(...)`** 필수 (해시되면 매칭 안 됨).
- 색상/배경은 `theme.ts` **시맨틱 토큰** 사용 — 하드코딩 hex 지양. 새 토큰은 라이트/다크 **양쪽** 정의.
- 반응형은 Chakra 객체 문법(`{ base, sm, lg }`) 유지. 다크모드에서 깨지지 않는지 확인.

### 4. Yarn Berry zero-install (배포 직결)
- 의존성을 추가/제거하면 **`.yarn/cache/*`, `.pnp.cjs`, `yarn.lock`을 반드시 함께 커밋**. 누락 시 Vercel 빌드 실패.
- 플랫폼 종속 바이너리(예: `@next-swc-*`)는 리눅스(Vercel) 기준이 포함돼야 함.

### 5. 빌드 / 검증
- 변경 후 **`yarn build`로 SSG 생성·타입 통과 확인**. 빌드 끝의 `unhandledRejection ... rimraf`는 PnP의 알려진 무해한 경고(무시).
- ESLint의 `eslint-plugin-prettier ... prettier (peer dependency)` 경고도 기존부터 있던 비차단 이슈.

### 6. 일반
- 접근성: 인터랙티브 요소에 `aria-label`/적절한 시맨틱 태그.
- 비밀값/토큰 하드코딩 금지(GA ID 등은 `NEXT_PUBLIC_*` 환경변수).
- 불필요한 의존성 추가 지양. 번들/이미지 비용 고려.

## 작업 후 체크리스트

- [ ] `yarn build` 통과 (홈 + 글 페이지 SSG 생성 확인)
- [ ] 의존성 변경 시 `.yarn/cache` · `.pnp.cjs` · `yarn.lock` 커밋 포함
- [ ] 새 클라이언트 상호작용에 `"use client"` 경계 정확
- [ ] 다크/라이트 모두 정상, 반응형 확인
- [ ] 한국어 커밋 메시지 + Prettier 포맷
