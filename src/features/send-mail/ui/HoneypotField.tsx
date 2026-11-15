import { HONEYPOT_FIELD_NAME } from "../model/spamGuard";

const HONEYPOT_ID = "contact-website";

/**
 * 봇만 채우는 함정 칸.
 * display:none은 봇이 건너뛰기도 해서 화면 밖으로 밀어내고,
 * 스크린 리더와 Tab 이동에서도 빠지게 한다.
 */
export function HoneypotField() {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
      <label htmlFor={HONEYPOT_ID}>이 칸은 비워 두세요</label>
      <input
        id={HONEYPOT_ID}
        type="text"
        name={HONEYPOT_FIELD_NAME}
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
