import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { SearchModal, type SearchPost } from "./SearchModal";

type SearchContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within <SearchProvider>");
  return ctx;
}

export function SearchProvider({
  posts = [],
  children,
}: PropsWithChildren<{ posts?: SearchPost[] }>) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // "/" 단축키로 검색 열기 (입력 중일 땐 무시)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName ?? "";
      if (e.key === "/" && !isOpen && !/^(input|textarea)$/i.test(tag)) {
        e.preventDefault();
        open();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, open]);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchModal posts={posts} isOpen={isOpen} onClose={close} />
    </SearchContext.Provider>
  );
}
