"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: ReactNode;
  variant?: "primary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-0",
        {
          // ✅ PRIMARY — SOLID GOLD (NO CYAN, NO GRADIENT)
          "bg-[#f5c66a] text-black hover:bg-[#f5c66a] shadow-[0_0_20px_rgba(245,198,106,0.6)] border border-[#f3d08a]":
            variant === "primary",

          // OUTLINE
          "border-2 border-[#f5c66a] text-[#f5c66a] hover:bg-[#f5c66a]/10":
            variant === "outline",

          // DANGER
          "bg-red-600 text-white hover:bg-red-700": variant === "danger",

          // SIZES
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⏳</span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}