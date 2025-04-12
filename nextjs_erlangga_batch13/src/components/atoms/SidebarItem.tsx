// components/atoms/SidebarItem.tsx
"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  href: string;
  label: string;
  children: ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, children }) => {
  const pathname = usePathname();
  const active = href === pathname;

  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick}>
      <div
        className={`flex items-center p-2 rounded font-bold ${
          active
            ? "bg-[#FEEFFF] text-[#5A4CA8]"
            : "hover:bg-[#FEEFFF] text-[#787878]"
        }`}
      >
        {children}
        <span>{label}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
