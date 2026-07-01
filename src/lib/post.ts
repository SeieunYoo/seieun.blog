export type TocItem = { id: string; text: string; level: number };

/** 20230429 → "2023.04.29" */
export function formatDate(date: number | string): string {
  const s = String(date);
  return `${s.slice(0, 4)}.${s.slice(4, 6)}.${s.slice(6, 8)}`;
}

/** 한글 기준 대략 분당 500자로 읽기 시간 추정 (최소 1분). */
export function readingTime(markdown: string): number {
  const text = (markdown || "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[#>*`_~\-\[\]()!]/g, "")
    .replace(/\s/g, "");
  return Math.max(1, Math.round(text.length / 500));
}

/**
 * 변환된 HTML 의 h1~h3 에 id 를 부여하고 목차(TOC)를 위계(level)와 함께 추출한다.
 * h2 에는 시안과 동일하게 제목 앞에 `#` 해시 마커(span.hash)를 주입한다.
 */
export function addHeadingIdsAndToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  let i = 0;
  const out = html.replace(/<h([1-3])>([\s\S]*?)<\/h\1>/g, (_match, lvl: string, inner: string) => {
    const level = Number(lvl);
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = `section-${++i}`;
    toc.push({ id, text, level });
    const content = level === 2 ? `<span class="hash">#</span> ${inner}` : inner;
    return `<h${lvl} id="${id}">${content}</h${lvl}>`;
  });
  return { html: out, toc };
}
