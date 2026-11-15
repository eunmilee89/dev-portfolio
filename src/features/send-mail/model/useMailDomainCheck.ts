import { useState } from "react";
import { checkMailDomain, type MailDomainStatus } from "../api/checkMailDomain";

export type DomainCheckState = MailDomainStatus | "checking";

const DEFAULT_EMAIL_HINT = "답장받으실 주소를 적어 주세요";
const CHECKING_EMAIL_HINT = "메일을 받을 수 있는 주소인지 확인하고 있어요…";

/** 도메인별 조회 결과를 기억해 같은 도메인을 다시 조회하지 않는다 */
export function useMailDomainCheck() {
  const [states, setStates] = useState<Record<string, DomainCheckState>>({});

  const getState = (domain?: string) => (domain ? states[domain] : undefined);

  const verify = async (domain: string): Promise<MailDomainStatus> => {
    const cached = states[domain];
    if (cached && cached !== "checking") return cached;

    setStates((prev) => ({ ...prev, [domain]: "checking" }));
    const status = await checkMailDomain(domain);
    setStates((prev) => ({ ...prev, [domain]: status }));
    return status;
  };

  return { getState, verify };
}

export function getDomainError(domain: string, state?: DomainCheckState) {
  if (state !== "invalid") return undefined;
  return `${domain}은(는) 메일을 받을 수 없는 주소예요. 이메일을 다시 확인해 주세요.`;
}

/**
 * 확인까지 끝난 주소에는 더 안내할 게 없으므로 문구를 숨긴다.
 * 조회에 실패한 경우("unknown")도 전송을 막지 않으므로, 다시 확인하라는 경고 없이 똑같이 숨긴다
 */
export function getEmailHint(state?: DomainCheckState) {
  if (state === "valid" || state === "unknown") return undefined;
  if (state === "checking") return CHECKING_EMAIL_HINT;
  return DEFAULT_EMAIL_HINT;
}
