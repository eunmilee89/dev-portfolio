import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/lib";

const CONTROL_CLASS =
  "w-full rounded-md border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-secondary transition-colors duration-200 ease-out outline-none focus:ring-2 md:text-base";
const VALID_CONTROL_CLASS = "border-line focus:border-primary focus:ring-primary/20";
const INVALID_CONTROL_CLASS = "border-red-500 focus:border-red-500 focus:ring-red-500/20";

function getControlClass(hasError: boolean) {
  return cn(CONTROL_CLASS, hasError ? INVALID_CONTROL_CLASS : VALID_CONTROL_CLASS);
}

function getErrorId(id: string) {
  return `${id}-error`;
}

function getHintId(id: string) {
  return `${id}-hint`;
}

/** 보이는 문구(에러가 있으면 에러, 없으면 안내)를 입력칸에 연결해 스크린 리더가 함께 읽게 한다 */
function getDescriptionAttributes(id: string, hint?: string, error?: string) {
  if (error) return { "aria-invalid": true, "aria-describedby": getErrorId(id) };
  if (hint) return { "aria-describedby": getHintId(id) };
  return {};
}

interface FieldHintProps {
  id: string;
  hint?: string;
}

function FieldHint({ id, hint }: FieldHintProps) {
  if (!hint) return null;
  return (
    <p id={getHintId(id)} className="mt-1.5 text-xs text-secondary">
      {hint}
    </p>
  );
}

interface FieldLabelProps {
  htmlFor: string;
  label: string;
  isRequired?: boolean;
}

function FieldLabel({ htmlFor, label, isRequired }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold text-foreground"
    >
      {label}
      {isRequired && (
        <span className="ml-1 text-primary" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}

interface FieldErrorProps {
  id: string;
  error?: string;
}

function FieldError({ id, error }: FieldErrorProps) {
  if (!error) return null;
  return (
    <p id={getErrorId(id)} className="mt-1.5 text-xs text-red-500">
      {error}
    </p>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

export function TextField({
  id,
  label,
  required,
  hint,
  error,
  ...props
}: TextFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} isRequired={required} />
      <input
        id={id}
        required={required}
        className={getControlClass(Boolean(error))}
        {...getDescriptionAttributes(id, hint, error)}
        {...props}
      />
      {/* 문구가 두 줄로 겹치지 않도록 에러가 있으면 안내 문구 자리를 에러가 대신한다 */}
      {error ? (
        <FieldError id={id} error={error} />
      ) : (
        <FieldHint id={id} hint={hint} />
      )}
    </div>
  );
}

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
}

export function TextAreaField({
  id,
  label,
  required,
  error,
  ...props
}: TextAreaFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} isRequired={required} />
      <textarea
        id={id}
        required={required}
        className={cn(getControlClass(Boolean(error)), "min-h-40 resize-y")}
        {...getDescriptionAttributes(id, undefined, error)}
        {...props}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}
