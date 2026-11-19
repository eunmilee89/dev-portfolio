import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FiArrowUpRight,
  FiCode,
  FiFolder,
  FiHome,
  FiX,
} from "react-icons/fi";
import { cn } from "@/shared/lib";
import { CONTACT_ITEM, NAV_ITEMS } from "../model/navItems";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
};

const NAV_ICONS: Record<string, IconType> = {
  "/": FiHome,
  "/projects": FiFolder,
  "/coding-test": FiCode,
};

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 flex h-full w-72 flex-col border-l border-line bg-background z-50 shadow-lg transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <span className="font-extrabold text-foreground text-lg">
            Dev<span className="text-primary">.Portfolio</span>
          </span>
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={onClose}
            className="rounded-md p-1 text-foreground cursor-pointer transition-colors duration-200 hover:bg-surface-2"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 pt-2">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <MenuCard
                  href={item.href}
                  label={item.label}
                  icon={NAV_ICONS[item.href]}
                  isActive={pathname === item.href}
                  onClick={onClose}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line p-4">
          <Link
            href={CONTACT_ITEM.href}
            onClick={onClose}
            aria-current={pathname === CONTACT_ITEM.href ? "page" : undefined}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-background transition-colors duration-200 hover:bg-primary/80"
          >
            {CONTACT_ITEM.label}
            <FiArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </aside>
    </>
  );
}

interface MenuCardProps {
  href: string;
  label: string;
  icon?: IconType;
  isActive: boolean;
  onClick: () => void;
}

function MenuCard({ href, label, icon: Icon, isActive, onClick }: MenuCardProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] transition-colors duration-200",
        isActive
          ? "bg-primary/10 font-semibold text-primary"
          : "font-medium text-subtext hover:bg-surface-2 hover:text-foreground",
      )}
    >
      {Icon && <Icon className="h-4 w-4" aria-hidden />}
      {label}
    </Link>
  );
}
