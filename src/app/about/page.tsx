import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Box, Flex, chakra } from "@chakra-ui/react";
import { Navigation } from "@/components";
import { MailIcon } from "@/components/ui/icons";
import { metaData } from "@/constants/metaData";

export const metadata: Metadata = {
  title: "About",
  description: "유세은 — 숨어있는 문제를 찾아 근본 원인부터 해결하는 프론트엔드 개발자",
  alternates: { canonical: "/about" },
  openGraph: {
    url: `${metaData.url}/about`,
    title: `About · ${metaData.title}`,
    description: "유세은 — 숨어있는 문제를 찾아 근본 원인부터 해결하는 프론트엔드 개발자",
  },
};

const Strong = ({ children }: { children: ReactNode }) => (
  <Box as="b" color="ink" fontWeight={650}>
    {children}
  </Box>
);

const Key = ({ children }: { children: ReactNode }) => (
  <Box as="span" color="accent" fontWeight={650}>
    {children}
  </Box>
);

const Tag = ({ children }: { children: ReactNode }) => (
  <Box
    as="span"
    fontFamily="mono"
    fontSize="12px"
    fontWeight={500}
    color="chipText"
    border="1px solid"
    borderColor="cardLine"
    bg="cardBg"
    borderRadius="4px"
    px="10px"
    py="6px"
  >
    {children}
  </Box>
);

const SectionHead = ({ idx, title }: { idx: string; title: string }) => (
  <Flex align="baseline" gap="12px" mb="22px" pb="12px" borderBottom="1px solid" borderColor="ink">
    <Box as="span" fontSize="13px" fontWeight={500} color="accent">
      {idx}
    </Box>
    <Box as="h2" fontSize="20px" fontWeight={650} letterSpacing="-0.02em" color="ink" m={0}>
      {title}
    </Box>
  </Flex>
);

const bullet = {
  content: '""',
  position: "absolute",
  left: "1px",
  top: "8px",
  w: "5px",
  h: "5px",
  borderRadius: "50%",
  bg: "accent",
  opacity: 0.55,
} as const;

const Bullet = ({ children }: { children: ReactNode }) => (
  <Box
    as="li"
    position="relative"
    pl="16px"
    fontSize="14.5px"
    lineHeight="1.62"
    color="muted"
    css={{ textWrap: "pretty" }}
    _before={bullet}
  >
    {children}
  </Box>
);

const Job = ({
  company,
  team,
  period,
  role,
  children,
  impact,
}: {
  company: string;
  team: string;
  period: string;
  role: string;
  children: ReactNode;
  impact?: ReactNode;
}) => (
  <Box py="26px" borderBottom="1px solid" borderColor="line" _last={{ borderBottom: 0, pb: 0 }}>
    <Flex align="baseline" justify="space-between" gap="16px" wrap="wrap">
      <Flex align="baseline" gap="10px" wrap="wrap">
        <Box as="span" fontSize="19px" fontWeight={700} letterSpacing="-0.02em" color="ink">
          {company}
        </Box>
        <Box
          as="span"
          fontSize="12px"
          fontWeight={500}
          color="accent"
          bg="accentSoft"
          borderRadius="999px"
          px="11px"
          py="5px"
        >
          {team}
        </Box>
      </Flex>
      <Box as="span" fontSize="13px" fontWeight={500} color="faint" flexShrink={0}>
        {period}
      </Box>
    </Flex>
    <Box fontSize="14px" fontWeight={500} color="bodyInk" mt="10px">
      {role}
    </Box>
    <Box
      as="ul"
      listStyleType="none"
      m={0}
      mt="12px"
      p={0}
      display="flex"
      flexDirection="column"
      gap="9px"
    >
      {children}
    </Box>
    {impact && (
      <Flex
        gap="12px"
        align="baseline"
        bg="accentSoft"
        borderRadius="8px"
        px="16px"
        py="13px"
        mt="16px"
        mb="4px"
      >
        <Box
          as="span"
          fontSize="12px"
          fontWeight={700}
          letterSpacing="0.04em"
          color="accent"
          flexShrink={0}
        >
          IMPACT
        </Box>
        <Box as="span" fontSize="14px" fontWeight={500} color="ink">
          {impact}
        </Box>
      </Flex>
    )}
  </Box>
);

export default function AboutPage() {
  return (
    <Box bg="detailBg" minH="100dvh">
      <Navigation variant="detail" />

      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: "40px", lg: "56px" }}
        maxW="1040px"
        mx="auto"
        px={{ base: "20px", sm: "36px", lg: "48px" }}
        py={{ base: "40px", sm: "56px" }}
      >
        {/* ─────────────── SIDEBAR ─────────────── */}
        <Box as="aside" w={{ base: "auto", lg: "252px" }} flexShrink={0}>
          <Flex
            direction="column"
            gap="24px"
            position={{ base: "static", lg: "sticky" }}
            top="88px"
          >
            <Box>
              <Box
                as="h1"
                fontSize={{ base: "26px", sm: "30px" }}
                fontWeight={700}
                lineHeight="1.1"
                letterSpacing="-0.03em"
                color="ink"
                m={0}
              >
                유세은
              </Box>
              <Box fontSize="14px" fontWeight={500} color="accent" mt="6px">
                Frontend Engineer
              </Box>
              <Box
                fontSize="14px"
                lineHeight="1.55"
                color="muted"
                mt="12px"
                pl="12px"
                borderLeft="2px solid"
                borderColor="accent"
                css={{ textWrap: "pretty" }}
              >
                숨어있는 문제를 찾아 근본 원인부터 해결하는 개발자
              </Box>
            </Box>

            <Flex direction="column" gap="1px">
              <chakra.a
                href="mailto:seeun0792@gmail.com"
                display="flex"
                alignItems="center"
                gap="9px"
                fontSize="13px"
                fontWeight={500}
                color="muted"
                py="7px"
                transition="color 0.15s"
                _hover={{ color: "accent" }}
                css={{ wordBreak: "break-all" }}
              >
                <Box color="faint" flexShrink={0} display="flex">
                  <MailIcon />
                </Box>
                seeun0792@gmail.com
              </chakra.a>
            </Flex>

            <Box pt="22px" borderTop="1px solid" borderColor="line">
              <Box fontSize="12px" fontWeight={500} letterSpacing="0.02em" color="faint" mb="12px">
                자격증
              </Box>
              <Flex wrap="wrap" gap="6px">
                <Tag>SQLD · 2024.12</Tag>
                <Tag>정보처리기사 · 2025.06</Tag>
              </Flex>
            </Box>

            <Box pt="22px" borderTop="1px solid" borderColor="line">
              <Box fontSize="12px" fontWeight={500} letterSpacing="0.02em" color="faint" mb="12px">
                학력
              </Box>
              <Box fontSize="14px" lineHeight="1.5" color="bodyInk" fontWeight={650}>
                홍익대학교 컴퓨터공학과
              </Box>
              <Box fontSize="14px" color="faint" mt="3px">
                2020.03 – 2026.02 (졸업)
              </Box>
            </Box>
          </Flex>
        </Box>

        {/* ─────────────── MAIN ─────────────── */}
        <Box flex="1" minW={0}>
          {/* 자기소개 */}
          <Box>
            <SectionHead idx="01" title="자기소개" />
            <Box
              fontSize="18px"
              lineHeight="1.7"
              color="ink"
              mb="20px"
              css={{ textWrap: "pretty" }}
            >
              안녕하세요, 화면 너머의 문제까지 들여다보며 일하는 프론트엔드 개발자 유세은입니다.
            </Box>
            <Box fontSize="15px" lineHeight="1.72" color="muted" css={{ textWrap: "pretty" }}>
              데이터로 문제를 정의하고 작은 단위로 검증하며 일하는 방식을 좋아합니다. AI와 자동화를
              실제 팀이 쓰는 도구로 만들고, 그 과정을 문서로 남겨 동료들이 스스로 활용하도록 돕는 데
              관심이 많습니다.
            </Box>
          </Box>

          {/* 업무 경험 */}
          <Box mt="44px">
            <SectionHead idx="02" title="업무 경험" />

            <Job
              company="당근"
              team="디자인시스템 팀"
              period="2026.02 – 2026.04"
              role="프론트엔드 개발자 인턴"
            >
              <Bullet>
                <Strong>Kraft — AI 기반 UI 생성 툴 개발</Strong> — SEED 디자인시스템 규칙을 AI가
                자동 적용해 프롬프트만으로 화면을 생성하는 사내 도구를{" "}
                <Strong>Claude Agent SDK 기반 멀티 에이전트</Strong>로 설계·구현
              </Bullet>
              <Bullet>
                npx 한 줄 CLI로 배포해 오픈 초기 <Key>하루 100건+</Key> 생성 요청으로 빠르게 확산
              </Bullet>
            </Job>

            <Job
              company="당근"
              team="Growth TF"
              period="2025.08 – 2026.01"
              role="프론트엔드 개발자 인턴"
              impact="MAU 11.3만 · New+Reactivated 5만 명 견인 — 그로스팀 역대 최고 성과(All-Time-High)"
            >
              <Bullet>
                <Strong>게임형 그로스 이벤트 0 → 1 개발·운영</Strong> — 알까기·글자게임·방어지원금
                게임 출시
              </Bullet>
              <Bullet>
                실시간 지표 모니터링으로 보상·게임 단계 정책을 <Strong>하루 만에</Strong> 조정해
                데이터 기반 개선 주도
              </Bullet>
              <Bullet>
                게임 로딩 <Key>50% 단축</Key>(2.5초 → 1.2초), 클라이언트 A/B 테스트 구조로 즉시 실험
                가능한 환경 구축
              </Bullet>
            </Job>

            <Job
              company="토스"
              team="Core Design Platform"
              period="2023.07 – 2024.02"
              role="UX Engineer Assistant"
            >
              <Bullet>
                <Strong>디자인시스템 컴포넌트 & 생산성 도구 개발</Strong> — 웹·iOS·Android에서
                동일하게 동작하는 크로스플랫폼 컴포넌트 설계·구현
              </Bullet>
              <Bullet>
                프리뷰·여백 린트·<Strong>Design-to-Code</Strong> 등 디자이너 생산성 도구를 개발해
                디자인–개발 핸드오프 최소화
              </Bullet>
            </Job>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
