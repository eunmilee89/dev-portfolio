import { TbCircleCheckFilled } from "react-icons/tb";

/** 폼이 사라지면 포커스가 갈 곳이 없어지므로, 완료 문구로 옮겨 스크린 리더가 바로 읽게 한다 */
function focusOnMount(node: HTMLElement | null) {
  node?.focus();
}

/** 메일을 보낸 뒤 폼 자리에 보여주는 완료 화면 */
export function ContactSentNotice() {
  return (
    <div
      ref={focusOnMount}
      tabIndex={-1}
      role="status"
      className="flex animate-rise-in flex-col items-center py-16 text-center outline-none"
    >
      <TbCircleCheckFilled aria-hidden className="size-16 text-primary" />
      <p className="mt-5 text-2xl font-bold text-foreground">메일을 보냈어요!</p>
      <p className="mt-2 text-sm text-subtext break-keep md:text-base">
        남겨 주신 이메일로 답장드릴게요.
      </p>
    </div>
  );
}
