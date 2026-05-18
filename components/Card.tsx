"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={clsx(
        `
        rounded-xl p-6
        bg-gradient-to-br from-[#2a1f10] via-[#3a2a14] to-[#1f160b]
        border border-[#8b6a2b]
        text-[#f5e6c8]
        shadow-[0_8px_24px_rgba(180,140,60,0.25)]
        `,
        hover &&
          `
          cursor-pointer
          transition-all duration-300 ease-out
          hover:shadow-[0_10px_35px_rgba(180,140,60,0.4)]
          hover:border-[#c9a24d]
          `,
        className
      )}
    >
      {children}
    </div>
  );
}