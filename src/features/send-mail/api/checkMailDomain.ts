/** Google 공개 DNS의 JSON API. 키가 필요 없고 브라우저 요청(CORS)을 허용한다 */
const DNS_API_URL = "https://dns.google/resolve";
const MX_RECORD_TYPE = 15;
const DNS_STATUS_NO_ERROR = 0;
const DNS_STATUS_NOT_FOUND = 3;
/** "0 ."처럼 대상이 "."인 MX는 이 도메인이 메일을 받지 않는다는 뜻이다 (RFC 7505) */
const NULL_MX_TARGET = ".";
const LOOKUP_TIMEOUT_MS = 5000;

/** valid: 메일을 받는 도메인 / invalid: 없거나 메일을 받지 않는 도메인 / unknown: 조회 실패 */
export type MailDomainStatus = "valid" | "invalid" | "unknown";

interface DnsAnswer {
  type: number;
  data: string;
}

interface DnsResponse {
  Status: number;
  Answer?: unknown;
}

function isDnsResponse(value: unknown): value is DnsResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "Status" in value &&
    typeof value.Status === "number"
  );
}

function isDnsAnswer(value: unknown): value is DnsAnswer {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    typeof value.type === "number" &&
    "data" in value &&
    typeof value.data === "string"
  );
}

/** MX 레코드 data는 "우선순위 대상" 형태다 (예: "10 mx1.mail.naver.com.") */
function isNullMx(answer: DnsAnswer) {
  return answer.data.trim().split(/\s+/)[1] === NULL_MX_TARGET;
}

function getMailDomainStatus(response: DnsResponse): MailDomainStatus {
  if (response.Status === DNS_STATUS_NOT_FOUND) return "invalid";
  if (response.Status !== DNS_STATUS_NO_ERROR) return "unknown";

  const answers = Array.isArray(response.Answer) ? response.Answer : [];
  const mxRecords = answers
    .filter(isDnsAnswer)
    .filter((answer) => answer.type === MX_RECORD_TYPE);

  const hasMailServer = mxRecords.some((record) => !isNullMx(record));
  return hasMailServer ? "valid" : "invalid";
}

/** 도메인에 메일 서버(MX)가 있는지 조회한다. 메일함이 실제로 있는지까지는 알 수 없다 */
export async function checkMailDomain(domain: string): Promise<MailDomainStatus> {
  const url = `${DNS_API_URL}?name=${encodeURIComponent(domain)}&type=MX`;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
    });
    if (!response.ok) return "unknown";

    const data: unknown = await response.json();
    return isDnsResponse(data) ? getMailDomainStatus(data) : "unknown";
  } catch (error) {
    // 네트워크 오류·시간 초과는 주소 문제가 아니므로 전송을 막지 않고 "unknown"으로 돌려준다
    if (error instanceof Error) return "unknown";
    throw error;
  }
}
