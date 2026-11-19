import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub, FiGlobe } from "react-icons/fi";
import { RESUME_PATH, SOCIAL_LINKS } from "@/shared/config";
import { GradientText } from "@/shared/ui/gradient-text";
import { LinkButton } from "@/shared/ui/link-button";
import { SocialLink } from "@/shared/ui/social-link";

export function Hero() {
  return (
    <div className="flex flex-col-reverse min-[64.0625rem]:flex-row items-center justify-between min-[64.0625rem]:gap-4 min-[64.0625rem]:py-10 min-[64.0625rem]:min-h-[calc(100svh-5.5rem)] md:px-8 min-[64.0625rem]:px-0 max-w-[102rem] mx-auto">
      <div className="text-center min-[64.0625rem]:text-left min-[64.0625rem]:pl-20 2xl:pl-30">
        <h2 className="text-3xl sm:text-4xl md:text-5xl min-[64.0625rem]:text-7xl font-black leading-tight break-keep tracking-tight block animate-rise-in [animation-delay:150ms] motion-reduce:animate-none">
          안녕하세요. <GradientText>프론트엔드</GradientText> 개발자
          이은미입니다.
        </h2>
        <div className="text-subtext mt-4 text-sm sm:text-base md:text-base max-w-md md:max-w-lg min-[64.0625rem]:max-w-3xl mx-auto min-[64.0625rem]:mx-0 break-keep tracking-wide block animate-rise-in [animation-delay:300ms] motion-reduce:animate-none">
          새로운 기술을 학습하고 실제 제품에 적용하는 과정을 좋아합니다. 사용자
          중심의 부드러운 인터렉션과 완성도 높은 인터페이스를 추구하는
          개발자입니다.
        </div>
        <div className="flex items-center justify-center min-[64.0625rem]:justify-start gap-3 min-[64.0625rem]:gap-4 mt-8 flex-wrap animate-rise-in [animation-delay:450ms] motion-reduce:animate-none">
          <LinkButton
            label="이력서 보기"
            href={RESUME_PATH}
            variant="primary"
            icon="demo"
            shouldOpenNewTab
          />
          <ul className="flex gap-2 min-[64.0625rem]:gap-4">
            <li>
              <SocialLink
                href={SOCIAL_LINKS.github}
                icon={<FiGithub />}
                label="GitHub"
              />
            </li>
            <li>
              <SocialLink
                href={SOCIAL_LINKS.velog}
                icon={<FiGlobe />}
                label="Velog"
              />
            </li>
            <li>
              <SocialLink
                href={SOCIAL_LINKS.linkedin}
                icon={<FaLinkedinIn />}
                label="LinkedIn"
              />
            </li>
          </ul>
        </div>
      </div>
      {/* rise-in 애니메이션이 끝난 뒤에도 filter: blur(0)을 유지해 invert를 덮으므로, 반전은 감싸는 요소에 건다 */}
      <div className="shrink-0 dark:mix-blend-screen dark:invert">
        <Image
          src="/icons/A Ghost.svg"
          alt="귀여운 유령 캐릭터 로고"
          width={500}
          height={500}
          className="w-56 h-56 md:w-72 md:h-72 min-[64.0625rem]:w-[500px] min-[64.0625rem]:h-[500px] block animate-rise-in [animation-delay:150ms] motion-reduce:animate-none"
          priority
        />
      </div>
    </div>
  );
}
