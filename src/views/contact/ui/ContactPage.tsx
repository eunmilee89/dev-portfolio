import Image from "next/image";
import { ContactSection } from "./ContactSection";

const CONTACT_IMAGE_SRC = "/images/contact/Contact us.svg";
const CONTACT_IMAGE_SIZE = 288;

/** 방문자가 메일을 보낼 수 있는 연락 페이지 */
export function ContactPage() {
  return (
    <ContactSection
      intro={
        <header>
          <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Contact
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-subtext break-keep md:text-base">
            협업 제안, 궁금한 점, 피드백 모두 환영해요. 남겨 주신 이메일로
            답장드릴게요.
          </p>
          {/* 장식용이라 alt를 비우고, 모바일에서는 폼이 바로 보이도록 숨긴다 */}
          <Image
            src={CONTACT_IMAGE_SRC}
            alt=""
            width={CONTACT_IMAGE_SIZE}
            height={CONTACT_IMAGE_SIZE}
            className="mx-auto mt-8 hidden h-auto w-72 lg:block"
            loading="eager"
          />
        </header>
      }
    />
  );
}
