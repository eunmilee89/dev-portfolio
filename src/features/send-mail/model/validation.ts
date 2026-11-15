import {
  MAX_MESSAGE_LENGTH,
  MAX_MESSAGE_LINK_COUNT,
  MAX_NAME_LENGTH,
  MAX_SUBJECT_LENGTH,
  MIN_MESSAGE_LENGTH,
} from "./constants";

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactFormValues;
export type ContactFormErrors = Partial<Record<ContactField, string>>;

/** 화면 위에서 아래 순서. 전송 실패 시 이 순서로 첫 에러 칸에 포커스한다 */
export const CONTACT_FIELDS: ContactField[] = ["name", "email", "subject", "message"];

export const INITIAL_CONTACT_VALUES: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

// 아이디: 점으로 시작·끝나거나 점이 연속되면 안 된다
// 도메인: 각 부분이 하이픈으로 시작·끝나면 안 되고, 마지막(.com 등)은 영문 2자 이상이어야 한다
const EMAIL_PATTERN =
  /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

const LINK_PATTERN = /(?:https?:\/\/|www\.)\S+/gi;

function validateName(value: string) {
  if (!value) return "이름을 입력해 주세요.";
  if (value.length > MAX_NAME_LENGTH)
    return `이름은 ${MAX_NAME_LENGTH}자 이내로 입력해 주세요.`;
}

function validateEmail(value: string) {
  if (!value) return "답장받으실 이메일을 입력해 주세요.";
  if (!EMAIL_PATTERN.test(value))
    return "이메일 형식이 올바르지 않아요. 예: you@example.com";
}

/** 형식이 맞는 이메일에서만 도메인을 꺼낸다. 형식이 틀리면 조회할 필요가 없다 */
export function getEmailDomain(email: string) {
  const trimmed = email.trim();
  if (!EMAIL_PATTERN.test(trimmed)) return undefined;
  return trimmed.split("@")[1].toLowerCase();
}

function validateSubject(value: string) {
  if (!value) return "제목을 입력해 주세요.";
  if (value.length > MAX_SUBJECT_LENGTH)
    return `제목은 ${MAX_SUBJECT_LENGTH}자 이내로 입력해 주세요.`;
}

function validateMessage(value: string) {
  if (!value) return "내용을 입력해 주세요.";
  if (value.length < MIN_MESSAGE_LENGTH)
    return `내용을 ${MIN_MESSAGE_LENGTH}자 이상 적어 주세요. (지금 ${value.length}자)`;
  if (value.length > MAX_MESSAGE_LENGTH)
    return `내용은 ${MAX_MESSAGE_LENGTH}자 이내로 입력해 주세요.`;
  const linkCount = value.match(LINK_PATTERN)?.length ?? 0;
  if (linkCount > MAX_MESSAGE_LINK_COUNT)
    return `링크는 ${MAX_MESSAGE_LINK_COUNT}개까지만 넣을 수 있어요. 꼭 필요한 링크만 남겨 주세요. (지금 ${linkCount}개)`;
}

const VALIDATORS: Record<ContactField, (value: string) => string | undefined> = {
  name: validateName,
  email: validateEmail,
  subject: validateSubject,
  message: validateMessage,
};

/** 공백만 입력한 경우도 빈 값으로 보도록 앞뒤 공백을 잘라 검사한다 */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  for (const field of CONTACT_FIELDS) {
    const error = VALIDATORS[field](values[field].trim());
    if (error) errors[field] = error;
  }
  return errors;
}
