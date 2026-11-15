"use client";

import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type SubmitEvent,
} from "react";
import { postContactMail } from "../api/postContactMail";
import {
  ATTACHMENT_FIELD_NAME,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MAX_SUBJECT_LENGTH,
} from "../model/constants";
import {
  CONTACT_FIELDS,
  INITIAL_CONTACT_VALUES,
  getEmailDomain,
  validateContactForm,
  type ContactField,
} from "../model/validation";
import { HONEYPOT_FIELD_NAME, isLikelyBot } from "../model/spamGuard";
import {
  getDomainError,
  getEmailHint,
  useMailDomainCheck,
} from "../model/useMailDomainCheck";
import { AttachmentInput } from "./AttachmentInput";
import { TextAreaField, TextField } from "./FormField";
import { HoneypotField } from "./HoneypotField";

const SEND_FAILED_NOTICE =
  "메일을 보내지 못했어요. 잠시 후 다시 시도하거나 eunoia0235@gmail.com으로 직접 보내 주세요.";
const NETWORK_ERROR_NOTICE =
  "서버에 연결하지 못했어요. 인터넷 연결을 확인한 뒤 다시 보내 주세요.";

function focusField(form: HTMLFormElement, field: ContactField) {
  const element = form.elements.namedItem(field);
  if (element instanceof HTMLElement) element.focus();
}

/** 텍스트 칸과 허니팟은 name으로 담기고, 첨부는 상태로 관리하므로 따로 붙인다 */
function buildContactFormData(form: HTMLFormElement, files: File[]) {
  const formData = new FormData(form);
  for (const file of files) formData.append(ATTACHMENT_FIELD_NAME, file);
  return formData;
}

function getSubmitLabel(isSending: boolean, isCheckingDomain: boolean) {
  if (isSending) return "보내는 중…";
  if (isCheckingDomain) return "확인 중…";
  return "보내기";
}

interface ContactFormProps {
  /** 전송에 성공하면(봇으로 판단해 버린 경우 포함) 호출된다 */
  onSent: () => void;
}

/** 방문자가 나에게 보내는 메일 작성 폼 */
export function ContactForm({ onSent }: ContactFormProps) {
  const [values, setValues] = useState(INITIAL_CONTACT_VALUES);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [notice, setNotice] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const domainCheck = useMailDomainCheck();

  const emailDomain = getEmailDomain(values.email);
  const domainState = domainCheck.getState(emailDomain);
  const isCheckingDomain = domainState === "checking";

  const formatErrors = validateContactForm(values);
  const domainError = emailDomain && getDomainError(emailDomain, domainState);
  const errors = domainError
    ? { ...formatErrors, email: domainError }
    : formatErrors;

  // 입력을 시작하자마자 에러를 띄우지 않도록, 칸을 떠났거나 전송을 시도한 뒤에만 보여준다
  const getFieldProps = (field: ContactField) => ({
    name: field,
    value: values[field],
    error: touched[field] || hasSubmitted ? errors[field] : undefined,
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setNotice("");
    },
    onBlur: () => setTouched((prev) => ({ ...prev, [field]: true })),
  });

  // 작성에 걸린 시간을 재기 위해 처음 포커스한 시각만 기록한다.
  // 시각은 모두 event.timeStamp(페이지가 열린 뒤 흐른 ms) 기준으로 맞춘다
  const handleFocus = (event: FocusEvent<HTMLFormElement>) => {
    if (startedAt === null) setStartedAt(event.timeStamp);
  };

  // 칸을 떠날 때 미리 조회해 두면 전송할 때 기다리지 않아도 된다
  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    if (emailDomain) void domainCheck.verify(emailDomain);
  };

  const sendMail = async (form: HTMLFormElement) => {
    setIsSending(true);
    try {
      const result = await postContactMail(buildContactFormData(form, files));
      if (result.ok) {
        onSent();
      } else {
        setNotice(result.message ?? SEND_FAILED_NOTICE);
      }
    } catch (error) {
      // fetch는 네트워크 오류일 때 TypeError를 던진다. 그 밖의 오류는 코드 문제라 그대로 올린다
      if (!(error instanceof TypeError)) throw error;
      setNotice(NETWORK_ERROR_NOTICE);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;
    setHasSubmitted(true);

    const form = event.currentTarget;
    const firstInvalidField = CONTACT_FIELDS.find((field) => errors[field]);
    if (firstInvalidField) {
      focusField(form, firstInvalidField);
      return;
    }

    const now = event.timeStamp;
    const honeypotValue = new FormData(form).get(HONEYPOT_FIELD_NAME);
    // 봇에게는 걸렸다는 걸 알리지 않도록 정상 전송과 같은 완료 화면을 보여주고 버린다
    if (isLikelyBot({ honeypotValue, startedAt, now })) {
      onSent();
      return;
    }

    // 조회에 실패한 경우("unknown")는 주소 문제가 아닐 수 있어 전송을 막지 않는다
    if (emailDomain && (await domainCheck.verify(emailDomain)) === "invalid") {
      focusField(form, "email");
      return;
    }

    await sendMail(form);
  };

  return (
    // 브라우저 기본 말풍선 대신 칸 아래 에러 문구로 안내한다
    <form
      onSubmit={handleSubmit}
      onFocus={handleFocus}
      noValidate
      className="relative space-y-6"
    >
      <HoneypotField />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="contact-name"
          label="이름"
          autoComplete="name"
          maxLength={MAX_NAME_LENGTH}
          placeholder="홍길동"
          required
          {...getFieldProps("name")}
        />
        <TextField
          id="contact-email"
          type="email"
          label="이메일"
          hint={getEmailHint(domainState)}
          autoComplete="email"
          placeholder="you@example.com"
          required
          {...getFieldProps("email")}
          onBlur={handleEmailBlur}
        />
      </div>

      <TextField
        id="contact-subject"
        label="제목"
        maxLength={MAX_SUBJECT_LENGTH}
        placeholder="어떤 이야기를 나누고 싶으신가요?"
        required
        {...getFieldProps("subject")}
      />

      <TextAreaField
        id="contact-message"
        label="내용"
        maxLength={MAX_MESSAGE_LENGTH}
        placeholder="자유롭게 적어 주세요."
        required
        {...getFieldProps("message")}
      />

      <AttachmentInput files={files} onChange={setFiles} />

      <div className="flex flex-col-reverse items-stretch gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" className="text-sm text-subtext">
          {notice}
        </p>
        <button
          type="submit"
          disabled={isCheckingDomain || isSending}
          className="shrink-0 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-background transition-colors duration-200 ease-out hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60"
        >
          {getSubmitLabel(isSending, isCheckingDomain)}
        </button>
      </div>
    </form>
  );
}
