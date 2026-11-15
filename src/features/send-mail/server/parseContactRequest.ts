import {
  ATTACHMENT_FIELD_NAME,
  MAX_FILE_COUNT,
  MAX_TOTAL_FILE_SIZE_BYTES,
  MAX_TOTAL_FILE_SIZE_MB,
} from "../model/constants";
import { HONEYPOT_FIELD_NAME } from "../model/spamGuard";
import {
  CONTACT_FIELDS,
  validateContactForm,
  type ContactFormValues,
} from "../model/validation";

export type ParsedContactRequest =
  | { kind: "bot" }
  | { kind: "invalid"; message: string }
  | { kind: "valid"; values: ContactFormValues; files: File[] };

function getText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function getValues(formData: FormData): ContactFormValues {
  return {
    name: getText(formData, "name"),
    email: getText(formData, "email"),
    subject: getText(formData, "subject"),
    message: getText(formData, "message"),
  };
}

/** 파일을 고르지 않아도 브라우저가 빈 파일을 보낼 수 있어 크기가 0인 항목은 뺀다 */
function getFiles(formData: FormData) {
  return formData
    .getAll(ATTACHMENT_FIELD_NAME)
    .filter((value): value is File => value instanceof File && value.size > 0);
}

function getAttachmentError(files: File[]) {
  if (files.length > MAX_FILE_COUNT)
    return `첨부는 최대 ${MAX_FILE_COUNT}개까지 가능해요. 파일을 줄여 다시 보내 주세요.`;
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_TOTAL_FILE_SIZE_BYTES)
    return `첨부 합계가 ${MAX_TOTAL_FILE_SIZE_MB}MB를 넘어요. 파일을 압축하거나 링크로 보내 주세요.`;
}

/** 클라이언트 검증을 거치지 않은 요청도 있을 수 있어 서버에서 같은 규칙으로 다시 검사한다 */
export function parseContactRequest(formData: FormData): ParsedContactRequest {
  if (getText(formData, HONEYPOT_FIELD_NAME) !== "") return { kind: "bot" };

  const values = getValues(formData);
  const errors = validateContactForm(values);
  const firstInvalidField = CONTACT_FIELDS.find((field) => errors[field]);
  if (firstInvalidField) {
    return { kind: "invalid", message: errors[firstInvalidField] ?? "" };
  }

  const files = getFiles(formData);
  const attachmentError = getAttachmentError(files);
  if (attachmentError) return { kind: "invalid", message: attachmentError };

  return { kind: "valid", values, files };
}
