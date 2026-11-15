const MS_PER_SECOND = 1000;

/** 봇이 잘 채우는 이름으로 둔다. 사람은 이 칸을 볼 수 없다 */
export const HONEYPOT_FIELD_NAME = "website";

/** 네 칸을 사람이 이보다 빨리 채울 수는 없다 */
const MIN_FILL_TIME_MS = 3 * MS_PER_SECOND;

interface BotCheckParams {
  honeypotValue: FormDataEntryValue | null;
  /** 폼에 처음 포커스한 시각. 한 번도 포커스하지 않고 전송됐다면 null */
  startedAt: number | null;
  now: number;
}

export function isLikelyBot({ honeypotValue, startedAt, now }: BotCheckParams) {
  const isHoneypotFilled =
    typeof honeypotValue === "string" && honeypotValue.trim() !== "";
  const isTooFast = startedAt === null || now - startedAt < MIN_FILL_TIME_MS;
  return isHoneypotFilled || isTooFast;
}
