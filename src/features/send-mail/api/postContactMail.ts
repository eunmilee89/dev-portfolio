import {
  isContactMailResponse,
  type ContactMailResponse,
} from "../model/contactResponse";

const CONTACT_API_URL = "/api/contact";

/**
 * 문의 메일을 서버로 보낸다.
 * 요청이 너무 커서 플랫폼이 JSON이 아닌 응답을 주는 경우도 있어, 형식이 다르면 실패로 본다
 */
export async function postContactMail(formData: FormData): Promise<ContactMailResponse> {
  const response = await fetch(CONTACT_API_URL, { method: "POST", body: formData });

  let data: unknown;
  try {
    data = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) return { ok: false };
    throw error;
  }

  return isContactMailResponse(data) ? data : { ok: false };
}
