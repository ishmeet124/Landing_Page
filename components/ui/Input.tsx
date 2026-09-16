"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, id, className = "", ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-slate-300 mb-1.5"
        >
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`w-full h-11 bg-[#141722] border ${
              error
                ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-[#222736] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            } rounded-lg px-3.5 text-slate-100 placeholder-slate-500 text-sm transition-colors duration-150 focus:outline-none ${
              icon ? "pl-10" : ""
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} className="mt-1 text-xs text-red-400 font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
