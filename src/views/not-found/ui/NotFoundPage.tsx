import { GradientText } from "@/shared/ui/gradient-text";
import { LinkButton } from "@/shared/ui/link-button";

/** 존재하지 않는 경로로 들어온 방문자를 주요 페이지로 안내한다 */
export function NotFoundPage() {
  return (
    // 헤더·푸터를 뺀 남은 화면 높이 안에서 세로 중앙에 오도록 한다.
    // 두 높이의 합이 화면 크기마다 달라(132px · 136px · 148px) 1px만 넘쳐도 스크롤이 생기므로 구간별로 맞춘다
    <section className="flex min-h-[calc(100dvh-8.25rem)] md:min-h-[calc(100dvh-8.5rem)] lg:min-h-[calc(100dvh-9.25rem)] flex-col items-center justify-center text-center animate-rise-in motion-reduce:animate-none">
      <h1 className="text-7xl font-black tracking-tight md:text-9xl">
        <GradientText>404</GradientText>
      </h1>
      <p className="mt-6 text-xl font-bold text-foreground md:text-2xl">
        페이지를 찾을 수 없어요
      </p>
      <p className="mt-3 text-sm leading-relaxed text-subtext break-keep md:text-base">
        주소가 잘못 입력되었거나, 페이지가 이동 또는 삭제되었을 수 있어요.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <LinkButton label="홈으로 가기" href="/" variant="primary" />
        <LinkButton label="프로젝트 보기" href="/projects" />
      </div>
    </section>
  );
}
