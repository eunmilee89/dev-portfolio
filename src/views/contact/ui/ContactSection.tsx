"use client";

import { useState, type ReactNode } from "react";
import { ContactForm, ContactSentNotice } from "@/features/send-mail";
import { Reveal } from "@/shared/ui/reveal";

interface ContactSectionProps {
  /** 서버에서 그린 소개 영역을 그대로 받아, 메일을 보낸 뒤에는 숨긴다 */
  intro: ReactNode;
}

/** 넓은 화면에서는 왼쪽 소개, 오른쪽 폼. 메일을 보내면 완료 화면만 가운데에 보여준다 */
export function ContactSection({ intro }: ContactSectionProps) {
  const [isSent, setIsSent] = useState(false);

  // 헤더(5.5rem)와 푸터(4.5rem)를 뺀 높이를 채워 내용이 세로 가운데에 오게 한다
  if (isSent) {
    return (
      <div className="grid min-h-[calc(100svh-10rem)] w-full place-items-center py-12">
        <ContactSentNotice />
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 pt-6 pb-12 md:pt-10 md:pb-16 lg:min-h-[calc(100svh-10rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:content-center lg:items-center lg:gap-20">
      {intro}
      <Reveal>
        <ContactForm onSent={() => setIsSent(true)} />
      </Reveal>
    </div>
  );
}
