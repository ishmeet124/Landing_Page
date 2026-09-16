"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-xs focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2 focus:ring-offset-[#0c0e14] active:scale-[0.99]",
    outline:
      "bg-[#151824] hover:bg-[#1a1e2c] active:bg-[#12151f] border border-[#242938] text-slate-200 hover:text-white focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 focus:ring-offset-[#0c0e14] active:scale-[0.99]",
    ghost:
      "text-slate-400 hover:text-slate-100 hover:bg-white/5 focus:ring-2 focus:ring-indigo-500/30",
  };

  const sizes = {
    sm: "h-9 px-3.5 text-xs gap-1.5",
    md: "h-11 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-sm sm:text-base gap-2",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
      )}
      <span className={loading ? "opacity-80" : ""}>{children}</span>
    </button>
  );
}
