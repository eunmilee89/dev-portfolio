"use client";

import { useState, type ChangeEvent } from "react";
import {
  MAX_FILE_COUNT,
  MAX_TOTAL_FILE_SIZE_BYTES,
  MAX_TOTAL_FILE_SIZE_MB,
} from "../model/constants";

const INPUT_ID = "contact-attachments";
const HINT_ID = "contact-attachments-hint";
const ERROR_ID = "contact-attachments-error";
const BYTES_PER_KB = 1024;

interface AttachmentInputProps {
  files: File[];
  onChange: (files: File[]) => void;
}

function getFileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function formatFileSize(bytes: number) {
  const kb = bytes / BYTES_PER_KB;
  if (kb < BYTES_PER_KB) return `${Math.max(1, Math.round(kb))}KB`;
  return `${(kb / BYTES_PER_KB).toFixed(1)}MB`;
}

/** 제한을 넘는 파일은 빼고, 왜 빠졌는지 알려줄 문구를 함께 돌려준다 */
function mergeFiles(current: File[], incoming: File[]) {
  const existingKeys = new Set(current.map(getFileKey));
  const merged = [...current];
  let totalSize = current.reduce((sum, file) => sum + file.size, 0);
  const oversized: string[] = [];
  const overflow: string[] = [];

  for (const file of incoming) {
    if (existingKeys.has(getFileKey(file))) continue;
    if (merged.length >= MAX_FILE_COUNT) {
      overflow.push(file.name);
    } else if (totalSize + file.size > MAX_TOTAL_FILE_SIZE_BYTES) {
      oversized.push(file.name);
    } else {
      merged.push(file);
      totalSize += file.size;
      existingKeys.add(getFileKey(file));
    }
  }

  const errors: string[] = [];
  if (oversized.length > 0) {
    errors.push(
      `${oversized.join(", ")}: 첨부 합계가 ${MAX_TOTAL_FILE_SIZE_MB}MB를 넘어 첨부하지 못했어요. 파일을 압축하거나 링크로 보내 주세요.`,
    );
  }
  if (overflow.length > 0) {
    errors.push(
      `${overflow.join(", ")}: 첨부는 최대 ${MAX_FILE_COUNT}개까지 가능해요. 다른 파일을 지운 뒤 다시 추가해 주세요.`,
    );
  }

  return { files: merged, errors };
}

export function AttachmentInput({ files, onChange }: AttachmentInputProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const hasError = errors.length > 0;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const result = mergeFiles(files, Array.from(event.target.files ?? []));
    onChange(result.files);
    setErrors(result.errors);
    // 같은 파일을 지웠다가 다시 고를 때도 change 이벤트가 나도록 비운다
    event.target.value = "";
  };

  const handleRemove = (key: string) => {
    onChange(files.filter((file) => getFileKey(file) !== key));
    setErrors([]);
  };

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-foreground">첨부파일</p>

      <label
        htmlFor={INPUT_ID}
        className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-line bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors duration-200 ease-out hover:border-primary/50 hover:text-primary has-[:focus-visible]:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/20"
      >
        <span aria-hidden>+</span>
        파일 선택
        <input
          id={INPUT_ID}
          type="file"
          multiple
          onChange={handleFileChange}
          aria-describedby={hasError ? `${HINT_ID} ${ERROR_ID}` : HINT_ID}
          className="sr-only"
        />
      </label>

      <p id={HINT_ID} className="mt-2 text-xs text-secondary">
        선택 사항 · 최대 {MAX_FILE_COUNT}개, 합계 {MAX_TOTAL_FILE_SIZE_MB}MB까지
      </p>

      {hasError && (
        <ul id={ERROR_ID} role="alert" className="mt-2 space-y-1">
          {errors.map((message) => (
            <li key={message} className="text-xs text-red-500">
              {message}
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file) => {
            const key = getFileKey(file);
            return (
              <li
                key={key}
                className="flex items-center justify-between gap-3 rounded-md border border-line bg-surface-2 px-3 py-2 text-sm"
              >
                <span className="min-w-0 truncate text-foreground">
                  {file.name}
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-secondary">
                    {formatFileSize(file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemove(key)}
                    aria-label={`${file.name} 첨부 취소`}
                    className="rounded px-1.5 text-subtext transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    ✕
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
