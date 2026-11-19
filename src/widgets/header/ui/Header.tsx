"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { LinkButton } from "@/shared/ui/link-button";
import { CONTACT_ITEM, NAV_ITEMS } from "../model/navItems";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    // body 좌우 여백(px-6 + mx-2)까지 배경을 덮어야 화면 끝까지 깔린 콘텐츠가 헤더 옆으로 비치지 않는다
    <header className="sticky top-0 z-100 flex items-center justify-between py-5 bg-background before:absolute before:inset-y-0 before:-inset-x-8 before:-z-10 before:bg-background">
      <div className="flex items-center justify-between w-full lg:hidden">
        <Link href="/" className="font-extrabold text-foreground text-xl">
          <h1>
            Dev<span className="text-primary">.Portfolio</span>
          </h1>
        </Link>

        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={() => setIsOpen(true)}
          className="text-foreground"
        >
          <FiMenu className="w-6 h-6 cursor-pointer" />
        </button>
      </div>

      <Link
        href="/"
        className="hidden lg:block font-extrabold text-foreground text-xl"
      >
        Dev<span className="text-primary">.Portfolio</span>
      </Link>

      <nav className="hidden lg:block">
        <ul className="flex gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative inline-block text-[15px] tracking-tight transition-[color,translate] duration-200 ease-out hover:-translate-y-0.5 ${
                    isActive
                      ? "font-bold text-primary"
                      : "font-medium text-subtext hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-primary transition-[width,opacity] duration-300 ease-out ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="hidden lg:block">
        <LinkButton
          label={CONTACT_ITEM.label}
          href={CONTACT_ITEM.href}
          variant="primary"
        />
      </div>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        pathname={pathname}
      />
    </header>
  );
}
