/** /api/contact 응답. 실패하면 message에 사용자에게 보여줄 안내를 담는다 */
export interface ContactMailResponse {
  ok: boolean;
  message?: string;
}

export function isContactMailResponse(value: unknown): value is ContactMailResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "ok" in value &&
    typeof value.ok === "boolean" &&
    (!("message" in value) || typeof value.message === "string")
  );
}
